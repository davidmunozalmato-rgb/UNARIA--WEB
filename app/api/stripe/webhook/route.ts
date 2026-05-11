import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { randomBytes } from 'crypto'
import prisma from '@/lib/prisma'
import {
  sendWelcomeEmail,
  sendReceiptEmail,
  sendMonthlyReceiptEmail,
  sendPaymentFailedEmail,
  sendCancellationEmail,
  sendReferralJoinedEmail,
  sendAdminPaymentNotification,
} from '@/lib/email'
import { appendPaymentRow } from '@/lib/sheets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const locale = (session.metadata?.locale as string) ?? 'ca'

        if (session.mode === 'subscription') {
          // Activate member
          const member = await prisma.member.findFirst({
            where: { email: session.customer_email! },
          })
          if (member) {
            const referralCode = member.referralCode ?? randomBytes(4).toString('hex').toUpperCase()
            await prisma.member.update({
              where: { id: member.id },
              data: {
                status: 'active',
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                referralCode,
              },
            })
            // Notify referrer if this member was referred
            if (member.referredBy) {
              const referrer = await prisma.member.findFirst({
                where: { referralCode: member.referredBy },
              })
              if (referrer) {
                try {
                  await sendReferralJoinedEmail({
                    referrerName: referrer.name,
                    referrerEmail: referrer.email,
                    locale: referrer.preferredLocale,
                    newMemberName: member.name,
                  })
                } catch (e) {
                  console.error('Failed to send referral email:', e)
                }
              }
            }
            // Record donation
            await prisma.donation.create({
              data: {
                donorName: `${member.name} ${member.surname}`,
                donorEmail: member.email,
                amount: member.monthlyQuota,
                currency: 'EUR',
                type: 'subscription',
                stripeSessionId: session.id,
                status: 'completed',
                locale,
                memberId: member.id,
              },
            })
            // Send welcome email
            try {
              await sendWelcomeEmail({
                name: member.name,
                email: member.email,
                quota: member.monthlyQuota,
                locale,
                memberId: member.id,
              })
            } catch (e) {
              console.error('Failed to send welcome email:', e)
            }
            // Notify admin
            try {
              await sendAdminPaymentNotification({
                type: 'subscription',
                name: `${member.name} ${member.surname}`,
                email: member.email,
                amount: member.monthlyQuota,
              })
            } catch (e) {
              console.error('Failed to send admin notification:', e)
            }
            // Register in Google Sheets
            await appendPaymentRow({
              date: new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' }),
              type: 'Soci',
              name: `${member.name} ${member.surname}`,
              email: member.email,
              amount: member.monthlyQuota,
              currency: 'EUR',
              status: 'Completat',
              reference: session.id,
            })
          }
        } else if (session.mode === 'payment') {
          // Complete donation
          await prisma.donation.updateMany({
            where: { stripeSessionId: session.id },
            data: { status: 'completed', stripePaymentIntentId: session.payment_intent as string },
          })
          const donorName = session.metadata?.donorName ?? 'Donant'
          const donorEmail = session.customer_email!
          const donorAmount = (session.amount_total ?? 0) / 100
          // Send receipt
          try {
            await sendReceiptEmail({
              name: donorName,
              email: donorEmail,
              amount: donorAmount,
              type: 'one_time',
              locale,
            })
          } catch (e) {
            console.error('Failed to send receipt email:', e)
          }
          // Notify admin
          try {
            await sendAdminPaymentNotification({
              type: 'donation',
              name: donorName,
              email: donorEmail,
              amount: donorAmount,
            })
          } catch (e) {
            console.error('Failed to send admin notification:', e)
          }
          // Register in Google Sheets
          await appendPaymentRow({
            date: new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' }),
            type: 'Donació puntual',
            name: donorName,
            email: donorEmail,
            amount: donorAmount,
            currency: 'EUR',
            status: 'Completat',
            reference: session.id,
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        // Record recurring payment
        if (invoice.subscription) {
          const member = await prisma.member.findFirst({
            where: { stripeSubscriptionId: invoice.subscription as string },
          })
          if (member) {
            await prisma.donation.create({
              data: {
                donorName: `${member.name} ${member.surname}`,
                donorEmail: member.email,
                amount: (invoice.amount_paid ?? 0) / 100,
                currency: invoice.currency.toUpperCase(),
                type: 'subscription',
                stripePaymentIntentId: invoice.payment_intent as string,
                status: 'completed',
                locale: member.preferredLocale,
                memberId: member.id,
              },
            })
            try {
              await sendMonthlyReceiptEmail({
                name: member.name,
                email: member.email,
                amount: (invoice.amount_paid ?? 0) / 100,
                locale: member.preferredLocale,
                memberId: member.id,
              })
            } catch (e) {
              console.error('Failed to send monthly receipt email:', e)
            }
            // Register in Google Sheets
            await appendPaymentRow({
              date: new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' }),
              type: 'Quota mensual',
              name: `${member.name} ${member.surname}`,
              email: member.email,
              amount: (invoice.amount_paid ?? 0) / 100,
              currency: invoice.currency.toUpperCase(),
              status: 'Completat',
              reference: invoice.payment_intent as string ?? invoice.id,
            })
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const cancelledMember = await prisma.member.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        })
        if (cancelledMember && !cancelledMember.cancelledAt) {
          // cancelledAt already set means the API already handled it — skip duplicate email
          await prisma.member.update({
            where: { id: cancelledMember.id },
            data: { status: 'cancelled', cancelledAt: new Date() },
          })
          try {
            await sendCancellationEmail({
              name: cancelledMember.name,
              email: cancelledMember.email,
              locale: cancelledMember.preferredLocale,
            })
          } catch (e) {
            console.error('Failed to send cancellation email:', e)
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const failedInvoice = event.data.object as Stripe.Invoice
        if (failedInvoice.subscription) {
          const failedMember = await prisma.member.findFirst({
            where: { stripeSubscriptionId: failedInvoice.subscription as string },
          })
          if (failedMember) {
            try {
              await sendPaymentFailedEmail({
                name: failedMember.name,
                email: failedMember.email,
                amount: (failedInvoice.amount_due ?? 0) / 100,
                locale: failedMember.preferredLocale,
              })
            } catch (e) {
              console.error('Failed to send payment failed email:', e)
            }
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        await prisma.donation.updateMany({
          where: { stripePaymentIntentId: pi.id },
          data: { status: 'failed' },
        })
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

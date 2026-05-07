import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { sendWelcomeEmail, sendReceiptEmail } from '@/lib/email'
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
            await prisma.member.update({
              where: { id: member.id },
              data: {
                status: 'active',
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
              },
            })
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
              })
            } catch (e) {
              console.error('Failed to send welcome email:', e)
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
              await sendReceiptEmail({
                name: member.name,
                email: member.email,
                amount: (invoice.amount_paid ?? 0) / 100,
                type: 'subscription',
                locale: member.preferredLocale,
              })
            } catch (e) {
              console.error('Failed to send receipt email:', e)
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
        await prisma.member.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: 'cancelled' },
        })
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

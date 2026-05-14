import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const memberId = session.metadata?.memberId
        if (!memberId || session.mode !== 'subscription') break

        await prisma.member.update({
          where: { id: memberId },
          data: {
            status: 'active',
            stripeSubscriptionId: session.subscription as string,
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.member.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'cancelled', cancelledAt: new Date() },
        })
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        if (sub.status === 'active') {
          await prisma.member.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: 'active' },
          })
        } else if (sub.status === 'past_due' || sub.status === 'unpaid') {
          await prisma.member.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: 'paused' },
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break

        await prisma.member.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: 'active' },
        })

        // Registra el cobrament com a donació
        const member = await prisma.member.findFirst({
          where: { stripeSubscriptionId: invoice.subscription as string },
        })
        if (member && invoice.amount_paid > 0) {
          await prisma.donation.create({
            data: {
              donorName: `${member.name} ${member.surname}`,
              donorEmail: member.email,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency.toUpperCase(),
              type: 'subscription',
              status: 'completed',
              memberId: member.id,
              stripePaymentIntentId: typeof invoice.payment_intent === 'string'
                ? invoice.payment_intent
                : null,
            },
          })
        }
        break
      }
    }
  } catch (err) {
    console.error('[webhook stripe]', err)
  }

  return NextResponse.json({ received: true })
}

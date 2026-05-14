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

      // ── Soci paga via link de checkout ──
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

      // ── Pagament mensual cobrat correctament ──
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription || invoice.amount_paid === 0) break

        const subscriptionId = invoice.subscription as string

        await prisma.member.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { status: 'active' },
        })

        const member = await prisma.member.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        })
        if (!member) break

        // Evita duplicats: si el payment_intent ja existeix, no crea una altra donació
        const paymentIntentId = typeof invoice.payment_intent === 'string'
          ? invoice.payment_intent
          : null

        if (paymentIntentId) {
          const existing = await prisma.donation.findUnique({
            where: { stripePaymentIntentId: paymentIntentId },
          })
          if (existing) break
        }

        await prisma.donation.create({
          data: {
            donorName: `${member.name} ${member.surname}`,
            donorEmail: member.email,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency.toUpperCase(),
            type: 'subscription',
            status: 'completed',
            memberId: member.id,
            stripePaymentIntentId: paymentIntentId,
          },
        })
        break
      }

      // ── Pagament fallit → soci passa a pausat ──
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break

        await prisma.member.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: 'paused' },
        })
        break
      }

      // ── Subscripció actualitzada (per exemple, reanudada manualment des de Stripe) ──
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        if (sub.status === 'active') {
          await prisma.member.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: 'active' },
          })
        } else if (sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'incomplete') {
          await prisma.member.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: 'paused' },
          })
        }
        break
      }

      // ── Subscripció cancel·lada (des de Stripe o per impagament definitiu) ──
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.member.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'cancelled', cancelledAt: new Date() },
        })
        break
      }
    }
  } catch (err) {
    console.error('[webhook stripe]', err)
    // Retornem 200 igualment perquè Stripe no reintenti indefinidament
  }

  return NextResponse.json({ received: true })
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

const ADMIN_URL = process.env.NEXTAUTH_URL ?? 'https://unaria-admin.vercel.app'
const stripeReady = process.env.STRIPE_SECRET_KEY?.startsWith('sk_')

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, surname, email, phone, monthlyQuota, status = 'pending' } = body

  if (!name?.trim() || !surname?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Nom, cognoms i email són obligatoris' }, { status: 400 })
  }

  const existing = await prisma.member.findUnique({ where: { email: email.trim() } })
  if (existing) {
    return NextResponse.json({ error: 'Aquest email ja està registrat' }, { status: 409 })
  }

  const quota = parseFloat(monthlyQuota) || 6

  let stripeCustomerId: string | undefined
  let checkoutUrl: string | null = null

  if (stripeReady) {
    const { stripe } = await import('@/lib/stripe')

    const customer = await stripe.customers.create({
      name: `${name.trim()} ${surname.trim()}`,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      metadata: { source: 'admin_manual' },
    })
    stripeCustomerId = customer.id

    const member = await prisma.member.create({
      data: {
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        monthlyQuota: quota,
        status,
        stripeCustomerId: customer.id,
        gdprConsent: true,
        gdprConsentAt: new Date(),
      },
    })

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Quota soci Unaria',
              description: `Aportació mensual de ${quota}€ a Unaria`,
            },
            unit_amount: Math.round(quota * 100),
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${ADMIN_URL}/ca/members?payment=ok&member=${member.id}`,
      cancel_url: `${ADMIN_URL}/ca/members?payment=cancelled`,
      locale: 'es',
      metadata: { memberId: member.id },
      subscription_data: {
        metadata: { memberId: member.id, source: 'admin_manual' },
      },
    })

    checkoutUrl = checkoutSession.url

    return NextResponse.json({ member, checkoutUrl }, { status: 201 })
  }

  // Stripe not configured yet — save member to DB without payment
  const member = await prisma.member.create({
    data: {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      monthlyQuota: quota,
      status,
      stripeCustomerId: stripeCustomerId ?? null,
      gdprConsent: true,
      gdprConsentAt: new Date(),
    },
  })

  return NextResponse.json({ member, checkoutUrl: null }, { status: 201 })
}

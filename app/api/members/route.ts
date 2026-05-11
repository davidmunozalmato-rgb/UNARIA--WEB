import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { stripe, getStripeLocale } from '@/lib/stripe'
import { sendWelcomeEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rateLimit'
import { getClientIp } from '@/lib/utils'

const memberSchema = z.object({
  name: z.string().min(1).max(100),
  surname: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  idNumber: z.string().min(1).max(30),
  monthlyQuota: z.number().min(6).max(10000),
  paymentMethod: z.enum(['sepa', 'card']),
  gdprRequired: z.boolean(),
  gdprMarketing: z.boolean(),
  locale: z.string().default('ca'),
  referredBy: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const limit = rateLimit(request)
  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = memberSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation error', details: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data

  if (!data.gdprRequired) {
    return NextResponse.json({ error: 'GDPR consent required' }, { status: 422 })
  }

  const ip = getClientIp(request)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const stripeLocale = getStripeLocale(data.locale)
  const stripeReady = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder'

  const commonMeta = {
    name: data.name,
    surname: data.surname,
    idNumber: data.idNumber,
    phone: data.phone || '',
    address: data.address || '',
    city: data.city || '',
    postalCode: data.postalCode || '',
    gdprMarketing: String(data.gdprMarketing),
    locale: data.locale,
    ip,
  }

  try {
    // Check for existing member
    const existing = await prisma.member.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    // Both card and SEPA use Stripe Checkout in subscription mode
    // Stripe handles IBAN collection and mandate for SEPA
    let checkoutUrl = `/${data.locale}/mock-checkout?amount=${data.monthlyQuota}&email=${encodeURIComponent(data.email)}&type=member`

    if (stripeReady) {
      const paymentMethodTypes = data.paymentMethod === 'sepa'
        ? ['sepa_debit' as const]
        : ['card' as const]

      const price = await stripe.prices.create({
        currency: 'eur',
        unit_amount: Math.round(data.monthlyQuota * 100),
        recurring: { interval: 'month' },
        product_data: { name: `Quota soci Unaria – ${data.monthlyQuota}€/mes` },
      })

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: paymentMethodTypes,
        line_items: [{ price: price.id, quantity: 1 }],
        customer_email: data.email,
        locale: stripeLocale,
        success_url: `${appUrl}/${data.locale}/become-member?success=1&email=${encodeURIComponent(data.email)}`,
        cancel_url: `${appUrl}/${data.locale}/become-member`,
        metadata: commonMeta,
      })

      checkoutUrl = session.url!
    }

    // Save pending member record
    try {
      await prisma.member.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          idNumber: data.idNumber,
          monthlyQuota: data.monthlyQuota,
          status: 'pending',
          gdprConsent: true,
          gdprConsentAt: new Date(),
          marketingConsent: data.gdprMarketing,
          marketingConsentAt: data.gdprMarketing ? new Date() : undefined,
          preferredLocale: data.locale,
          consentIp: ip,
          referredBy: data.referredBy ?? null,
        },
      })
    } catch (dbError) {
      console.warn('Could not save member to database (is it running?):', dbError)
      if (stripeReady) throw dbError
    }

    return NextResponse.json({ checkoutUrl })
  } catch (err: any) {
    console.error('Member creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

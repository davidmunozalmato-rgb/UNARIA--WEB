import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { stripe, getStripeLocale } from '@/lib/stripe'
import { encrypt } from '@/lib/encryption'
import { sendWelcomeEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rateLimit'
import { validateIban, getClientIp } from '@/lib/utils'

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
  iban: z.string().optional(),
  gdprRequired: z.boolean(),
  gdprMarketing: z.boolean(),
  locale: z.string().default('ca'),
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

  if (data.paymentMethod === 'sepa') {
    if (!data.iban) {
      return NextResponse.json({ error: 'IBAN required for SEPA' }, { status: 422 })
    }
    if (!validateIban(data.iban)) {
      return NextResponse.json({ error: 'Invalid IBAN' }, { status: 422 })
    }
  }

  const ip = getClientIp(request)

  try {
    // Check for existing member
    const existing = await prisma.member.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    let stripeCustomerId: string | undefined
    let stripeSubscriptionId: string | undefined
    let checkoutUrl: string | undefined

    if (data.paymentMethod === 'card') {
      // Create Stripe Checkout session for subscription
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const stripeLocale = getStripeLocale(data.locale)

      // Create price dynamically
      const price = await stripe.prices.create({
        currency: 'eur',
        unit_amount: Math.round(data.monthlyQuota * 100),
        recurring: { interval: 'month' },
        product_data: { name: `Quota soci Unaria – ${data.monthlyQuota}€/mes` },
      })

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: price.id, quantity: 1 }],
        customer_email: data.email,
        locale: stripeLocale,
        success_url: `${appUrl}/${data.locale}/become-member?success=1&email=${encodeURIComponent(data.email)}`,
        cancel_url: `${appUrl}/${data.locale}/become-member`,
        metadata: {
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
        },
      })

      checkoutUrl = session.url!

      // Create pending member record
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
        },
      })

      return NextResponse.json({ checkoutUrl })
    }

    // SEPA flow: create member directly
    const ibanEncrypted = encrypt(data.iban!)

    const member = await prisma.member.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        idNumber: data.idNumber,
        ibanEncrypted,
        monthlyQuota: data.monthlyQuota,
        status: 'pending',
        gdprConsent: true,
        gdprConsentAt: new Date(),
        marketingConsent: data.gdprMarketing,
        marketingConsentAt: data.gdprMarketing ? new Date() : undefined,
        preferredLocale: data.locale,
        consentIp: ip,
      },
    })

    // Send welcome email (best-effort)
    try {
      await sendWelcomeEmail({
        name: data.name,
        email: data.email,
        quota: data.monthlyQuota,
        locale: data.locale,
      })
    } catch (e) {
      console.error('Failed to send welcome email:', e)
    }

    return NextResponse.json({ success: true, memberId: member.id })
  } catch (err: any) {
    console.error('Member creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

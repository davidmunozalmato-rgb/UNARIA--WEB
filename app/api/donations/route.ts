import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { stripe, getStripeLocale } from '@/lib/stripe'
import { rateLimit } from '@/lib/rateLimit'
import { getClientIp } from '@/lib/utils'

const donationSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  amount: z.number().min(1).max(100000),
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

  const parsed = donationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation error', details: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const stripeLocale = getStripeLocale(data.locale)

  try {
    const stripeReady = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder'

    let sessionId = 'mock_session_id'
    let checkoutUrl = `/${data.locale}/mock-checkout?amount=${data.amount}&email=${encodeURIComponent(data.email)}&type=donate`

    if (stripeReady) {
      // Create Stripe Checkout session for one-time payment
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: Math.round(data.amount * 100),
              product_data: {
                name: `Donació a Unaria`,
                description: `Donació única de ${data.amount}€ a Unaria`,
              },
            },
          },
        ],
        customer_email: data.email,
        locale: stripeLocale,
        success_url: `${appUrl}/${data.locale}/donate?success=1&email=${encodeURIComponent(data.email)}`,
        cancel_url: `${appUrl}/${data.locale}/donate`,
        metadata: {
          donorName: data.name,
          locale: data.locale,
          ip: getClientIp(request),
        },
      })
      sessionId = session.id
      checkoutUrl = session.url || checkoutUrl
    }

    try {
      // Create pending donation record
      await prisma.donation.create({
        data: {
          donorName: data.name,
          donorEmail: data.email,
          amount: data.amount,
          currency: 'EUR',
          type: 'one_time',
          stripeSessionId: sessionId,
          status: 'pending',
          locale: data.locale,
        },
      })
    } catch (dbError) {
      console.warn('Could not save donation to database (is it running?):', dbError)
      // If we are in mock mode, continue anyway so the UI works
      if (process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
        throw dbError
      }
    }

    return NextResponse.json({ checkoutUrl })
  } catch (err: any) {
    console.error('Donation error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

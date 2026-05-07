import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable')
    _stripe = new Stripe(key, { apiVersion: '2023-10-16', typescript: true })
  }
  return _stripe
}

// Keep named export for backwards compat (lazy getter)
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop]
  },
})

export const STRIPE_LOCALE_MAP: Record<string, Stripe.Checkout.SessionCreateParams.Locale> = {
  ca: 'es',
  es: 'es',
  en: 'en',
  fr: 'fr',
  de: 'de',
}

export function getStripeLocale(locale: string): Stripe.Checkout.SessionCreateParams.Locale {
  return STRIPE_LOCALE_MAP[locale] ?? 'en'
}

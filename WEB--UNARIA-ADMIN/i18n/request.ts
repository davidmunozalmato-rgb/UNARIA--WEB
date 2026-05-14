import { getRequestConfig } from 'next-intl/server'

export const locales = ['ca', 'es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ca'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as Locale) ? locale : defaultLocale

  return {
    locale: validLocale as string,
    messages: (await import(`../messages/${validLocale}.json`)).default,
    timeZone: 'Europe/Madrid',
    now: new Date(),
  }
})

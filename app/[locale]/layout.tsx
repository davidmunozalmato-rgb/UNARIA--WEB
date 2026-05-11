export const dynamic = 'force-dynamic'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import type { Metadata } from 'next'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: LocaleLayoutProps): Promise<Metadata> {
  if (!locales.includes(locale as any)) return {}
  const t = await getTranslations({ locale, namespace: 'hero' })
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'
  return {
    metadataBase: new URL(appUrl),
    title: {
      default: 'Unaria – Solidaritat Organitzada',
      template: '%s | Unaria',
    },
    description: t('subtitle'),
    openGraph: {
      type: 'website',
      siteName: 'Unaria',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  }
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale as any)) notFound()

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar locale={locale} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CookieBanner />
      <ExitIntentPopup locale={locale} />
    </NextIntlClientProvider>
  )
}

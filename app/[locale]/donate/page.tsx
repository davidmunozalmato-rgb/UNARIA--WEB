import { getTranslations } from 'next-intl/server'
import DonateForm from './DonateForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'donate' })
  return { title: t('title') }
}

export default function DonatePage({ params: { locale } }: PageProps) {
  return <DonateForm locale={locale} />
}

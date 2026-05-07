import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import MemberForm from './MemberForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const memberDescriptions: Record<string, string> = {
  ca: 'Fes-te soci d\'Unaria amb una quota mensual des de 6€ i contribueix a un impacte humanitari real i mesurable.',
  es: 'Hazte socio de Unaria con una cuota mensual desde 6€ y contribuye a un impacto humanitario real y medible.',
  en: 'Become an Unaria member with a monthly fee from €6 and contribute to real, measurable humanitarian impact.',
  fr: 'Devenez membre d\'Unaria avec une cotisation mensuelle à partir de 6 € et contribuez à un impact humanitaire réel.',
  de: 'Werden Sie Unaria-Mitglied ab 6 €/Monat und tragen Sie zu echter, messbarer humanitärer Wirkung bei.',
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'becomeMember' })
  const description = memberDescriptions[locale] ?? memberDescriptions.ca
  return {
    title: t('title'),
    description,
    openGraph: {
      title: `${t('title')} | Unaria`,
      description,
      url: `/${locale}/become-member`,
    },
    twitter: {
      title: `${t('title')} | Unaria`,
      description,
    },
  }
}

export default function BecomeMemberPage({ params: { locale } }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-gray" />}>
      <MemberForm locale={locale} />
    </Suspense>
  )
}

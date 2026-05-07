import { getTranslations } from 'next-intl/server'
import DonateForm from './DonateForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const donateDescriptions: Record<string, string> = {
  ca: 'Fes una donació puntual a Unaria i ajuda a finançar projectes humanitaris de màxim impacte.',
  es: 'Haz una donación puntual a Unaria y ayuda a financiar proyectos humanitarios de máximo impacto.',
  en: 'Make a one-time donation to Unaria and help fund high-impact humanitarian projects.',
  fr: 'Faites un don ponctuel à Unaria et aidez à financer des projets humanitaires à fort impact.',
  de: 'Machen Sie eine einmalige Spende an Unaria und helfen Sie, humanitäre Projekte mit großer Wirkung zu finanzieren.',
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'donate' })
  const description = donateDescriptions[locale] ?? donateDescriptions.ca
  return {
    title: t('title'),
    description,
    openGraph: {
      title: `${t('title')} | Unaria`,
      description,
      url: `/${locale}/donate`,
    },
    twitter: {
      title: `${t('title')} | Unaria`,
      description,
    },
  }
}

export default function DonatePage({ params: { locale } }: PageProps) {
  return <DonateForm locale={locale} />
}

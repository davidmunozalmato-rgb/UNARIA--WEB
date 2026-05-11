import { Suspense } from 'react'
import MemberForm from './MemberForm'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const BECOME_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Fes-te soci d\'Unaria | Des de €6/mes | Unaria',
    description: 'Escull la teva quota mensual i comença a generar impacte avui. Pagament segur SEPA o targeta. Alta en 3 minuts. Cancel·la quan vulguis.',
    ogTitle: 'Fes-te soci i comença a generar impacte real | Unaria Barcelona',
    ogDescription: 'Des de 6€/mes, el teu excedent anirà íntegrament a Cruz Roja i altres ONG. Alta en 3 minuts. Sense compromisos permanents.',
    twitterTitle: 'Fes-te soci | Des de €6/mes | Unaria',
    twitterDescription: 'Alta en 3 minuts. Pagament segur. Impacte real a ONG com Cruz Roja.',
  },
  es: {
    title: 'Hazte socio de Unaria | Desde €6/mes | Unaria',
    description: 'Elige tu cuota mensual y empieza a generar impacto hoy. Pago seguro SEPA o tarjeta. Alta en 3 minutos. Cancela cuando quieras.',
    ogTitle: 'Hazte socio y empieza a generar impacto real | Unaria Barcelona',
    ogDescription: 'Desde 6€/mes, tu excedente irá íntegramente a Cruz Roja y otras ONG. Alta en 3 minutos. Sin compromisos permanentes.',
    twitterTitle: 'Hazte socio | Desde €6/mes | Unaria',
    twitterDescription: 'Alta en 3 minutos. Pago seguro. Impacto real en ONG como Cruz Roja.',
  },
  en: {
    title: 'Become a member of Unaria | From €6/month | Unaria',
    description: 'Choose your monthly fee and start creating impact today. Secure SEPA or card payment. Sign up in 3 minutes. Cancel anytime.',
    ogTitle: 'Become a member and start making real impact | Unaria Barcelona',
    ogDescription: 'From €6/month, your surplus goes entirely to Cruz Roja and other NGOs. Sign up in 3 minutes. No permanent commitment required.',
    twitterTitle: 'Become a member | From €6/month | Unaria',
    twitterDescription: 'Sign up in 3 minutes. Secure payment. Real impact at NGOs like Cruz Roja.',
  },
  fr: {
    title: 'Adhérez à Unaria | Dès 6€/mois | Unaria',
    description: 'Choisissez votre cotisation mensuelle et commencez à générer un impact aujourd\'hui. Paiement sécurisé SEPA ou carte. Inscription en 3 minutes.',
    ogTitle: 'Adhérez et commencez à générer un impact réel | Unaria Barcelone',
    ogDescription: 'Dès 6€/mois, votre excédent ira intégralement à Cruz Roja et d\'autres ONG. Inscription en 3 minutes. Sans engagement permanent.',
    twitterTitle: 'Adhérez | Dès 6€/mois | Unaria',
    twitterDescription: 'Inscription en 3 minutes. Paiement sécurisé. Impact réel sur des ONG comme Cruz Roja.',
  },
  de: {
    title: 'Mitglied bei Unaria werden | Ab 6€/Monat | Unaria',
    description: 'Wählen Sie Ihren monatlichen Beitrag und beginnen Sie noch heute, Wirkung zu erzielen. Sicheres SEPA oder Kartenzahlung. Anmeldung in 3 Minuten.',
    ogTitle: 'Mitglied werden und echte Wirkung erzielen | Unaria Barcelona',
    ogDescription: 'Ab 6€/Monat geht Ihr Überschuss vollständig an Cruz Roja und andere NGOs. Anmeldung in 3 Minuten. Keine dauerhafte Bindung erforderlich.',
    twitterTitle: 'Mitglied werden | Ab 6€/Monat | Unaria',
    twitterDescription: 'Anmeldung in 3 Minuten. Sichere Zahlung. Echte Wirkung bei NGOs wie Cruz Roja.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = BECOME_META[locale] ?? BECOME_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}/become-member`,
    },
    twitter: {
      title: m.twitterTitle,
      description: m.twitterDescription,
    },
  }
}

const memberSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://unaria.org/become-member#service',
  name: 'Subscripció de soci Unaria',
  description: 'Quota mensual recurrent que canalitza fons a ONG com Cruz Roja. Cancel·lació lliure en qualsevol moment.',
  provider: { '@id': 'https://unaria.org/#organization' },
  offers: [6, 10, 12, 15, 20, 25, 30].map((price) => ({
    '@type': 'Offer',
    name: `Quota ${price}€/mes`,
    price: price.toFixed(2),
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: price.toFixed(2),
      priceCurrency: 'EUR',
      unitCode: 'MON',
      unitText: 'mes',
    },
  })),
}

export default function BecomeMemberPage({ params: { locale } }: PageProps) {
  return (
    <>
      <JsonLd data={memberSchema} />
      <Suspense fallback={<div className="min-h-screen bg-brand-gray" />}>
        <MemberForm locale={locale} />
      </Suspense>
    </>
  )
}

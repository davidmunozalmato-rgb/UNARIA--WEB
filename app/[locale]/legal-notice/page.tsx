import { useTranslations } from 'next-intl'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const LEGAL_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Avís legal | Unaria — Associació sense ànim de lucre',
    description: 'Informació legal sobre Unaria. Representant legal: David Muñoz Almató. Registrada al Registre d\'Associacions de Catalunya.',
    ogTitle: 'Avís legal | Unaria Barcelona',
    ogDescription: 'Dades registrals, representant legal i condicions generals d\'ús de la plataforma Unaria.',
    twitterTitle: 'Avís legal | Unaria',
    twitterDescription: 'Dades registrals i condicions d\'ús.',
  },
  es: {
    title: 'Aviso legal | Unaria — Asociación sin ánimo de lucro',
    description: 'Información legal sobre Unaria. Representante legal: David Muñoz Almató. Registrada en el Registro de Asociaciones de Cataluña.',
    ogTitle: 'Aviso legal | Unaria Barcelona',
    ogDescription: 'Datos registrales, representante legal y condiciones generales de uso de la plataforma Unaria.',
    twitterTitle: 'Aviso legal | Unaria',
    twitterDescription: 'Datos registrales y condiciones de uso.',
  },
  en: {
    title: 'Legal notice | Unaria — Non-profit association',
    description: 'Legal information about Unaria. Legal representative: David Muñoz Almató. Registered with the Catalonia Associations Registry.',
    ogTitle: 'Legal notice | Unaria Barcelona',
    ogDescription: 'Registry data, legal representative and general terms of use of the Unaria platform.',
    twitterTitle: 'Legal notice | Unaria',
    twitterDescription: 'Registry data and terms of use.',
  },
  fr: {
    title: 'Mentions légales | Unaria — Association sans but lucratif',
    description: 'Informations légales sur Unaria. Représentant légal : David Muñoz Almató. Enregistrée au Registre des Associations de Catalogne.',
    ogTitle: 'Mentions légales | Unaria Barcelone',
    ogDescription: 'Données d\'enregistrement, représentant légal et conditions générales d\'utilisation de la plateforme Unaria.',
    twitterTitle: 'Mentions légales | Unaria',
    twitterDescription: 'Données d\'enregistrement et conditions d\'utilisation.',
  },
  de: {
    title: 'Impressum | Unaria — Gemeinnütziger Verein',
    description: 'Rechtliche Informationen über Unaria. Gesetzlicher Vertreter: David Muñoz Almató. Eingetragen im Vereinsregister Kataloniens.',
    ogTitle: 'Impressum | Unaria Barcelona',
    ogDescription: 'Registrierungsdaten, gesetzlicher Vertreter und allgemeine Nutzungsbedingungen der Unaria-Plattform.',
    twitterTitle: 'Impressum | Unaria',
    twitterDescription: 'Registrierungsdaten und Nutzungsbedingungen.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = LEGAL_META[locale] ?? LEGAL_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, url: `/${locale}/legal-notice` },
    twitter: { title: m.twitterTitle, description: m.twitterDescription },
  }
}

export default function LegalNoticePage() {
  const t = useTranslations('legal')

  const sections = [
    { title: t('ownerTitle'), content: t('ownerText') },
    { title: t('conditionsTitle'), content: t('conditionsText') },
    { title: t('ipTitle'), content: t('ipText') },
    { title: t('liabilityTitle'), content: t('liabilityText') },
    { title: t('jurisdictionTitle'), content: t('jurisdictionText') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t('title')}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="pb-8 border-b border-gray-100 last:border-0">
                <h2 className="text-lg font-bold text-brand-blue mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
            <p className="text-sm text-gray-600">
              <strong>Unaria</strong> · {' '}
              <a href="mailto:unariabcn@gmail.com" className="text-brand-blue hover:underline">
                unariabcn@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: t('title') }
}

export default function PrivacyPolicyPage({ params: { locale } }: PageProps) {
  const t = useTranslations('privacy')

  const today = new Date().toLocaleDateString(
    locale === 'ca' ? 'ca-ES' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const sections = [
    { title: t('responsibleTitle'), content: t('responsibleText') },
    { title: t('purposeTitle'), content: t('purposeText') },
    { title: t('legalBasisTitle'), content: t('legalBasisText') },
    { title: t('retentionTitle'), content: t('retentionText') },
    { title: t('rightsTitle'), content: t('rightsText') },
    { title: t('ibanTitle'), content: t('ibanText') },
    { title: t('cookiesTitle'), content: t('cookiesText') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t('title')}</h1>
          <p className="text-blue-100">{t('lastUpdated').replace('{date}', today)}</p>
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
              <a href="mailto:privacitat@unaria.org" className="text-brand-blue hover:underline">
                privacitat@unaria.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

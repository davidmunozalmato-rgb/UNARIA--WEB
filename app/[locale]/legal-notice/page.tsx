import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' })
  return { title: t('title') }
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
              <a href="mailto:contacte@unaria.org" className="text-brand-blue hover:underline">
                contacte@unaria.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

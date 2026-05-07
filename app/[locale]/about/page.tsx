import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { CheckCircle, Building, Users } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('title') }
}

export default function AboutPage({ params: { locale } }: PageProps) {
  const t = useTranslations('about')
  const values = [t('v1'), t('v2'), t('v3'), t('v4')]
  const founders = [
    { name: t('f1Name'), role: t('f1Role'), bio: t('f1Bio'), initials: 'DM' },
    { name: t('f2Name'), role: t('f2Role'), bio: t('f2Bio'), initials: 'DC' },
    { name: t('f3Name'), role: t('f3Role'), bio: t('f3Bio'), initials: 'AM' },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">{t('missionText')}</p>
          </div>

          {/* Values */}
          <h2 className="text-2xl font-bold text-brand-blue mb-6 text-center">{t('valuesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-brand-gray rounded-xl">
                <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              {t('foundersTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {founder.initials}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{founder.name}</h3>
                <p className="text-brand-teal font-medium text-sm mb-3">{founder.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card border-l-4 border-brand-blue">
            <h2 className="text-2xl font-bold text-brand-blue mb-4 flex items-center gap-2">
              <Building className="w-6 h-6" />
              {t('legalTitle')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">{t('legalText')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-semibold text-gray-500">{t('cifLabel')}:</span>
                <p className="text-gray-700">{t('cifValue')}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500">{t('addressLabel')}:</span>
                <p className="text-gray-700">{t('addressValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

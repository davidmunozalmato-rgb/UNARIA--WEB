import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, AlertCircle, Users, PiggyBank, Heart } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const howWeWorkDescriptions: Record<string, string> = {
  ca: 'Descobreix el model de funcionament d\'Unaria: recaptació solidària, gestió transparent i impacte directe a les ONG.',
  es: 'Descubre el modelo de funcionamiento de Unaria: recaudación solidaria, gestión transparente e impacto directo en las ONG.',
  en: 'Discover how Unaria works: solidarity fundraising, transparent management and direct impact for NGOs.',
  fr: 'Découvrez le modèle de fonctionnement d\'Unaria : collecte solidaire, gestion transparente et impact direct pour les ONG.',
  de: 'Entdecken Sie das Funktionsmodell von Unaria: solidarische Spendensammlung, transparentes Management und direkte Wirkung für NGOs.',
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'howWeWorkPage' })
  const description = howWeWorkDescriptions[locale] ?? howWeWorkDescriptions.ca
  return {
    title: t('title'),
    description,
    openGraph: {
      title: `${t('title')} | Unaria`,
      description,
      url: `/${locale}/how-we-work`,
    },
    twitter: {
      title: `${t('title')} | Unaria`,
      description,
    },
  }
}

export default function HowWeWorkPage({ params: { locale } }: PageProps) {
  const t = useTranslations('howWeWorkPage')
  const heroT = useTranslations('hero')

  const steps = [
    {
      number: '01',
      title: t('step1'),
      detail: t('step1Detail'),
      icon: <Users className="w-7 h-7" />,
      color: 'bg-blue-50 text-brand-blue border-brand-blue',
    },
    {
      number: '02',
      title: t('step2'),
      detail: t('step2Detail'),
      icon: <PiggyBank className="w-7 h-7" />,
      color: 'bg-teal-50 text-brand-teal border-brand-teal',
    },
    {
      number: '03',
      title: t('step3'),
      detail: t('step3Detail'),
      icon: <Heart className="w-7 h-7" />,
      color: 'bg-green-50 text-green-600 border-green-500',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-brand-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${step.color}`}>
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="card flex-1 mb-0">
                  <div className="text-xs font-bold text-gray-400 mb-1 tracking-wider">{step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">{t('diagramTitle')}</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { label: 'Socis', sub: '6–30€/mes', bg: 'bg-blue-50', text: 'text-brand-blue', icon: '👥' },
              { label: '→', sub: '', bg: '', text: 'text-gray-400', icon: '' },
              { label: 'Unaria', sub: 'Fons col·lectiu', bg: 'bg-brand-blue', text: 'text-white', icon: '🏛️' },
              { label: '→', sub: '', bg: '', text: 'text-gray-400', icon: '' },
              { label: 'ONG', sub: '87% del fons', bg: 'bg-teal-50', text: 'text-brand-teal', icon: '❤️' },
            ].map((item, i) => (
              item.label === '→' ? (
                <div key={i} className="text-3xl text-gray-300 font-bold rotate-90 md:rotate-0">{item.label}</div>
              ) : (
                <div key={i} className={`${item.bg} rounded-2xl px-6 py-5 text-center min-w-[120px] shadow-sm`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className={`font-bold text-lg ${item.text}`}>{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 text-lg mb-2">{t('importantTitle')}</h3>
              <p className="text-amber-700 text-sm leading-relaxed">{t('importantText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">Preparat per unir-te?</h2>
          <Link
            href={`/${locale}/become-member`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold text-lg rounded-xl hover:bg-brand-teal-dark transition-all"
          >
            {heroT('ctaMember')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

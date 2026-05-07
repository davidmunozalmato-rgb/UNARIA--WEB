import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, AlertCircle, Users, PiggyBank, Heart, ChevronDown } from 'lucide-react'
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
    openGraph: { title: `${t('title')} | Unaria`, description, url: `/${locale}/how-we-work` },
    twitter: { title: `${t('title')} | Unaria`, description },
  }
}

export default function HowWeWorkPage({ params: { locale } }: PageProps) {
  const t = useTranslations('howWeWorkPage')

  const steps = [
    {
      number: '01',
      title: t('step1'),
      detail: t('step1Detail'),
      icon: <Users className="w-6 h-6" />,
      accent: 'border-brand-blue',
      iconBg: 'bg-blue-50 text-brand-blue',
      numColor: 'text-brand-blue',
    },
    {
      number: '02',
      title: t('step2'),
      detail: t('step2Detail'),
      icon: <PiggyBank className="w-6 h-6" />,
      accent: 'border-brand-teal',
      iconBg: 'bg-teal-50 text-brand-teal',
      numColor: 'text-brand-teal',
    },
    {
      number: '03',
      title: t('step3'),
      detail: t('step3Detail'),
      icon: <Heart className="w-6 h-6" />,
      accent: 'border-green-500',
      iconBg: 'bg-green-50 text-green-600',
      numColor: 'text-green-600',
    },
  ]

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-24 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="bg-brand-gray rounded-2xl p-6 sm:p-8 border-l-4 border-brand-blue">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{t('intro')}</p>
          </div>
        </div>
      </section>

      {/* ── FLOW DIAGRAM ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 text-center mb-8">{t('diagramTitle')}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            {/* Socis */}
            <div className="w-full sm:w-auto flex-1 bg-blue-50 border-2 border-blue-200 rounded-2xl px-5 py-4 text-center">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-brand-blue text-lg">Socis</div>
              <div className="text-xs text-gray-500 mt-1">6–30€/mes</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* Unaria */}
            <div className="w-full sm:w-auto flex-1 bg-brand-blue rounded-2xl px-5 py-4 text-center shadow-lg">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-white text-lg">Unaria</div>
              <div className="text-xs text-blue-200 mt-1">Fons col·lectiu</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* ONG */}
            <div className="w-full sm:w-auto flex-1 bg-teal-50 border-2 border-teal-200 rounded-2xl px-5 py-4 text-center">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-brand-teal text-lg">ONG</div>
              <div className="text-xs text-gray-500 mt-1">87% del fons</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-10 sm:py-16 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="space-y-4 sm:space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className={`bg-white rounded-2xl p-5 sm:p-6 border-l-4 ${step.accent} shadow-sm`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center ${step.iconBg}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-black tracking-widest uppercase mb-1 ${step.numColor}`}>
                        Pas {step.number}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ChevronDown className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVÍS IMPORTANT ── */}
      <section className="py-10 sm:py-14 bg-amber-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex gap-4 items-start bg-white rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-800 text-base sm:text-lg mb-2">{t('importantTitle')}</h3>
              <p className="text-amber-700 text-sm leading-relaxed">{t('importantText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Preparat per unir-te?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">
            Des de 6€/mes formes part d'un moviment solidari amb impacte real i transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg"
            >
              Fes-te soci
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              Fes una donació
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

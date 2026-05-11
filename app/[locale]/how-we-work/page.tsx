import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, AlertCircle, Users, PiggyBank, Heart, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const HOW_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Com funciona Unaria: 3 passos simples | Unaria',
    description: 'Et fas soci, pagues la quota mensual, Unaria transfereix l\'excedent a ONG. Transparent, legal i segur. Descobreix el model complet.',
    ogTitle: 'Com funciona Unaria: el model de transparència solidària',
    ogDescription: '1. Et fas soci. 2. Pagues mensualment. 3. L\'excedent va a Cruz Roja. Unaria és l\'associació intermediària sense ànim de lucre. Descobreix-ho tot.',
    twitterTitle: 'Com funciona Unaria en 3 passos | Unaria Barcelona',
    twitterDescription: 'Et fas soci, pagues la quota, l\'excedent va a ONG. Transparent i legal.',
  },
  es: {
    title: 'Cómo funciona Unaria: 3 pasos simples | Unaria',
    description: 'Te haces socio, pagas la cuota mensual, Unaria transfiere el excedente a ONG. Transparente, legal y seguro. Descubre el modelo completo.',
    ogTitle: 'Cómo funciona Unaria: el modelo de transparencia solidaria',
    ogDescription: '1. Te haces socio. 2. Pagas mensualmente. 3. El excedente va a Cruz Roja. Unaria es la asociación intermediaria sin ánimo de lucro. Descúbrelo todo.',
    twitterTitle: 'Cómo funciona Unaria en 3 pasos | Unaria Barcelona',
    twitterDescription: 'Te haces socio, pagas la cuota, el excedente va a ONG. Transparente y legal.',
  },
  en: {
    title: 'How Unaria works: 3 simple steps | Unaria Barcelona',
    description: 'You become a member, pay your monthly fee, Unaria transfers the surplus to NGOs. Transparent, legal and secure. Discover the full model.',
    ogTitle: 'How Unaria works: the transparent solidarity model',
    ogDescription: '1. You join. 2. You pay monthly. 3. The surplus goes to Cruz Roja. Unaria is the non-profit intermediary association. Find out everything.',
    twitterTitle: 'How Unaria works in 3 steps | Unaria Barcelona',
    twitterDescription: 'You join, pay your fee, the surplus goes to NGOs. Transparent and legal.',
  },
  fr: {
    title: 'Comment fonctionne Unaria: 3 étapes | Unaria Barcelone',
    description: 'Vous adhérez, payez votre cotisation mensuelle, Unaria transfère l\'excédent aux ONG. Transparent, légal et sécurisé. Découvrez le modèle complet.',
    ogTitle: 'Comment fonctionne Unaria: le modèle de solidarité transparente',
    ogDescription: '1. Vous adhérez. 2. Vous payez mensuellement. 3. L\'excédent va à Cruz Roja. Unaria est l\'association intermédiaire sans but lucratif.',
    twitterTitle: 'Comment fonctionne Unaria en 3 étapes | Unaria Barcelone',
    twitterDescription: 'Vous adhérez, payez la cotisation, l\'excédent va aux ONG. Transparent et légal.',
  },
  de: {
    title: 'Wie Unaria funktioniert: 3 einfache Schritte | Unaria',
    description: 'Sie werden Mitglied, zahlen Ihren monatlichen Beitrag, Unaria überweist den Überschuss an NGOs. Transparent, legal und sicher.',
    ogTitle: 'Wie Unaria funktioniert: das transparente Solidaritätsmodell',
    ogDescription: '1. Sie werden Mitglied. 2. Sie zahlen monatlich. 3. Der Überschuss geht an Cruz Roja. Unaria ist der gemeinnützige Vermittlungsverein.',
    twitterTitle: 'Wie Unaria in 3 Schritten funktioniert | Unaria Barcelona',
    twitterDescription: 'Sie werden Mitglied, zahlen den Beitrag, der Überschuss geht an NGOs. Transparent und legal.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = HOW_META[locale] ?? HOW_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, url: `/${locale}/how-we-work` },
    twitter: { title: m.twitterTitle, description: m.twitterDescription },
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
              <div className="font-extrabold text-brand-blue text-lg">{t('diagramMembers')}</div>
              <div className="text-xs text-gray-500 mt-1">6–30€/mes</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* Unaria */}
            <div className="w-full sm:w-auto flex-1 bg-brand-blue rounded-2xl px-5 py-4 text-center shadow-lg">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-white text-lg">Unaria</div>
              <div className="text-xs text-blue-200 mt-1">{t('diagramFund')}</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* ONG */}
            <div className="w-full sm:w-auto flex-1 bg-teal-50 border-2 border-teal-200 rounded-2xl px-5 py-4 text-center">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-brand-teal text-lg">ONG</div>
              <div className="text-xs text-gray-500 mt-1">{t('diagramNGO')}</div>
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
                        {t('stepLabel')} {step.number}
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
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">
            {t('ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg"
            >
              {t('ctaMember')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              {t('ctaDonate')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

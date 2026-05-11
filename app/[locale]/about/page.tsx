import { useTranslations } from 'next-intl'
import { CheckCircle, Building, Users, Heart, Target, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const ABOUT_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Qui som | L\'equip d\'Unaria Barcelona | Unaria',
    description: 'Unaria és una associació sense ànim de lucre constituïda a Barcelona. Coneix l\'equip fundador, la nostra missió i els nostres valors.',
    ogTitle: 'Qui som | Unaria — l\'associació solidaria de Barcelona',
    ogDescription: 'Fundada a Barcelona per professionals compromesos. Registre d\'associacions. AEPD. Pagaments via Stripe. Descobreix qui hi ha darrere d\'Unaria.',
    twitterTitle: 'Qui som | Unaria Barcelona',
    twitterDescription: 'Associació sense ànim de lucre fundada a Barcelona. Coneix l\'equip i la missió.',
  },
  es: {
    title: 'Quiénes somos | El equipo de Unaria Barcelona | Unaria',
    description: 'Unaria es una asociación sin ánimo de lucro constituida en Barcelona. Conoce el equipo fundador, nuestra misión y nuestros valores.',
    ogTitle: 'Quiénes somos | Unaria — la asociación solidaria de Barcelona',
    ogDescription: 'Fundada en Barcelona por profesionales comprometidos. Registro de asociaciones. AEPD. Pagos vía Stripe. Descubre quién está detrás de Unaria.',
    twitterTitle: 'Quiénes somos | Unaria Barcelona',
    twitterDescription: 'Asociación sin ánimo de lucro fundada en Barcelona. Conoce el equipo y la misión.',
  },
  en: {
    title: 'About us | The Unaria team in Barcelona | Unaria',
    description: 'Unaria is a non-profit association founded in Barcelona. Meet the founding team, our mission and our values.',
    ogTitle: 'About Unaria | Barcelona\'s transparent solidarity association',
    ogDescription: 'Founded in Barcelona by committed professionals. Official registry. AEPD compliant. Stripe payments. Find out who is behind Unaria.',
    twitterTitle: 'About Unaria | Barcelona',
    twitterDescription: 'Non-profit association founded in Barcelona. Meet the team and mission.',
  },
  fr: {
    title: 'Qui sommes-nous | L\'équipe d\'Unaria Barcelone | Unaria',
    description: 'Unaria est une association sans but lucratif fondée à Barcelone. Découvrez l\'équipe fondatrice, notre mission et nos valeurs.',
    ogTitle: 'Qui sommes-nous | Unaria — l\'association solidaire de Barcelone',
    ogDescription: 'Fondée à Barcelone par des professionnels engagés. Registre officiel. Conforme RGPD. Paiements via Stripe. Découvrez qui est derrière Unaria.',
    twitterTitle: 'Qui sommes-nous | Unaria Barcelone',
    twitterDescription: 'Association sans but lucratif fondée à Barcelone. Découvrez l\'équipe et la mission.',
  },
  de: {
    title: 'Über uns | Das Unaria-Team in Barcelona | Unaria',
    description: 'Unaria ist ein gemeinnütziger Verein, der in Barcelona gegründet wurde. Lernen Sie das Gründungsteam, unsere Mission und unsere Werte kennen.',
    ogTitle: 'Über Unaria | Barcelonas transparenter Solidaritätsverein',
    ogDescription: 'In Barcelona von engagierten Fachleuten gegründet. Offizielles Register. DSGVO-konform. Stripe-Zahlungen. Erfahren Sie, wer hinter Unaria steckt.',
    twitterTitle: 'Über Unaria | Barcelona',
    twitterDescription: 'Gemeinnütziger Verein in Barcelona gegründet. Lernen Sie das Team und die Mission kennen.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = ABOUT_META[locale] ?? ABOUT_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, url: `/${locale}/about` },
    twitter: { title: m.twitterTitle, description: m.twitterDescription },
  }
}

const founderColors = [
  'from-brand-blue to-brand-blue-light',
  'from-brand-teal to-emerald-500',
  'from-purple-600 to-indigo-500',
]

const valueIcons = [Shield, Target, CheckCircle, Heart]
const valueColors = [
  'bg-blue-50 text-brand-blue',
  'bg-teal-50 text-brand-teal',
  'bg-purple-50 text-purple-600',
  'bg-green-50 text-green-600',
]

export default function AboutPage({ params: { locale } }: PageProps) {
  const t = useTranslations('about')
  const values = [t('v1'), t('v2'), t('v3'), t('v4')]
  const founders = [
    { name: t('f1Name'), role: t('f1Role'), bio: t('f1Bio'), initials: 'DM', gradient: founderColors[0] },
    { name: t('f2Name'), role: t('f2Role'), bio: t('f2Bio'), initials: 'DC', gradient: founderColors[1] },
    { name: t('f3Name'), role: t('f3Role'), bio: t('f3Bio'), initials: 'AM', gradient: founderColors[2] },
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
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-white/20">
            <Users className="w-3.5 h-3.5" />
            {t('foundersTitle')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
            {t('missionText')}
          </p>
        </div>
      </section>

      {/* ── VALORS ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">{t('valuesTitle')}</h2>
            <div className="w-12 h-1 bg-brand-blue rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${valueColors[i]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-1.5">{value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MISSIÓ ── */}
      <section className="py-14 sm:py-20 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">{t('missionTitle')}</h2>
          <blockquote className="relative px-8">
            <span className="absolute -top-4 left-0 text-7xl text-brand-blue/30 font-serif leading-none select-none">&ldquo;</span>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic relative z-10">
              {t('missionText')}
            </p>
            <span className="absolute -bottom-6 right-0 text-7xl text-brand-blue/30 font-serif leading-none select-none">&rdquo;</span>
          </blockquote>
        </div>
      </section>

      {/* ── FUNDADORS ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">{t('foundersTitle')}</h2>
            <div className="w-12 h-1 bg-brand-blue rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {founders.map((founder, i) => (
              <div key={i} className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow bg-white">
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${founder.gradient} h-28 sm:h-32 flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                    {founder.initials}
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">{founder.name}</h3>
                  <span className="inline-block text-xs font-bold text-brand-teal bg-teal-50 px-2.5 py-1 rounded-full self-start mb-4">
                    {founder.role}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1" style={{ textAlign: 'justify' }}>{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTRUCTURA LEGAL ── */}
      <section className="py-14 sm:py-20 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-brand-blue shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 flex items-center gap-2">
              <Building className="w-5 h-5" />
              {t('legalTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">{t('legalText')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('cifLabel')}</span>
                <p className="text-gray-800 font-medium mt-0.5">{t('cifValue')}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('addressLabel')}</span>
                <p className="text-gray-800 font-medium mt-0.5">{t('addressValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Forma part d'Unaria
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">
            Amb tan sols 6€/mes contribueixes a un impacte humanitari real i mesurable.
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

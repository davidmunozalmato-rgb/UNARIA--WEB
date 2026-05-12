import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeft, Eye } from 'lucide-react'
import type { Metadata } from 'next'
import ZoneCards, { type Zone } from '@/components/ZoneCards'

interface PageProps {
  params: { locale: string }
}

const OWN_PROJECTS_META: Record<string, { title: string; description: string }> = {
  ca: {
    title: 'Projectes Propis a Tailàndia | Unaria',
    description: 'Coneix la visió d\'Unaria per actuar directament en zones de vulnerabilitat documentada a Tailàndia.',
  },
  es: {
    title: 'Proyectos Propios en Tailandia | Unaria',
    description: 'Conoce la visión de Unaria para actuar directamente en zonas de vulnerabilidad documentada en Tailandia.',
  },
  en: {
    title: 'Own Projects in Thailand | Unaria',
    description: 'Learn about Unaria\'s vision to act directly in zones of documented vulnerability in Thailand.',
  },
  fr: {
    title: 'Projets Propres en Thaïlande | Unaria',
    description: 'Découvrez la vision d\'Unaria pour agir directement dans les zones de vulnérabilité documentée en Thaïlande.',
  },
  de: {
    title: 'Eigene Projekte in Thailand | Unaria',
    description: 'Erfahren Sie mehr über Unarias Vision, direkt in dokumentierten Schutzzonen in Thailand zu handeln.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = OWN_PROJECTS_META[locale] ?? OWN_PROJECTS_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description, url: `/${locale}/transparency/own-projects` },
  }
}

export default async function OwnProjectsPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'ownProjectsPage' })
  const tn = await getTranslations({ locale, namespace: 'nav' })

  const zones: Zone[] = [
    {
      number: '01',
      icon: 'alert',
      title: t('zone1Title'),
      loc: t('zone1Loc'),
      desc: t('zone1Desc'),
      tag: t('zone1Tag'),
      tag2: t('zone1Tag2'),
      accentColor: 'text-red-600',
      bgColor: 'bg-red-50',
      tagColor: 'bg-red-100 text-red-700',
      tag2Color: 'bg-orange-100 text-orange-700',
    },
    {
      number: '02',
      icon: 'anchor',
      title: t('zone2Title'),
      loc: t('zone2Loc'),
      desc: t('zone2Desc'),
      tag: t('zone2Tag'),
      tag2: t('zone2Tag2'),
      accentColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      tagColor: 'bg-blue-100 text-blue-800',
      tag2Color: 'bg-purple-100 text-purple-700',
    },
    {
      number: '03',
      icon: 'leaf',
      title: t('zone3Title'),
      loc: t('zone3Loc'),
      desc: t('zone3Desc'),
      tag: t('zone3Tag'),
      tag2: t('zone3Tag2'),
      accentColor: 'text-green-700',
      bgColor: 'bg-green-50',
      tagColor: 'bg-amber-100 text-amber-800',
      tag2Color: 'bg-green-100 text-green-700',
    },
    {
      number: '04',
      icon: 'building',
      title: t('zone4Title'),
      loc: t('zone4Loc'),
      desc: t('zone4Desc'),
      tag: t('zone4Tag'),
      tag2: t('zone4Tag2'),
      accentColor: 'text-gray-700',
      bgColor: 'bg-gray-100',
      tagColor: 'bg-rose-100 text-rose-700',
      tag2Color: 'bg-pink-100 text-pink-700',
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-blue to-brand-blue-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-8 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-6 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
          <Link
            href={`/${locale}/transparency`}
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tn('transparency')}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" />
            {t('subtitle')}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            {t('title')}
          </h1>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl">
            {t('heroDesc')}
          </p>
        </div>
      </section>

      {/* ── CRITICAL ZONES ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">

          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              {t('criticalZonesTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              {t('criticalZonesSubtitle')}
            </p>
          </div>

          <ZoneCards zones={zones} />
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-12 sm:py-14 bg-brand-gray border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
              {t('visionTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {t('visionDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${locale}/become-member`}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-colors text-center"
            >
              {t('ctaBtnMember')}
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-xl hover:bg-brand-blue hover:text-white transition-colors text-center"
            >
              {t('ctaBtnDonate')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

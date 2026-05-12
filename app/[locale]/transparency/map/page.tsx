import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

const WorldMap = dynamic(() => import('@/components/WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-gray-100 rounded-2xl animate-pulse" style={{ height: 420 }} />
  ),
})

interface PageProps {
  params: { locale: string }
}

const MAP_META: Record<string, { title: string; description: string }> = {
  ca: {
    title: 'Mapa d\'Impacte Global | Unaria',
    description: 'Visualitza els països on Unaria finança projectes humanitaris. Transparència geogràfica total.',
  },
  es: {
    title: 'Mapa de Impacto Global | Unaria',
    description: 'Visualiza los países donde Unaria financia proyectos humanitarios. Transparencia geográfica total.',
  },
  en: {
    title: 'Global Impact Map | Unaria',
    description: 'See the countries where Unaria funds humanitarian projects. Full geographic transparency.',
  },
  fr: {
    title: 'Carte d\'Impact Global | Unaria',
    description: 'Visualisez les pays où Unaria finance des projets humanitaires. Transparence géographique totale.',
  },
  de: {
    title: 'Globale Wirkungskarte | Unaria',
    description: 'Sehen Sie, in welchen Ländern Unaria humanitäre Projekte finanziert. Vollständige geografische Transparenz.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = MAP_META[locale] ?? MAP_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description, url: `/${locale}/transparency/map` },
  }
}

export default async function ImpactMapPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'mapPage' })
  const tn = await getTranslations({ locale, namespace: 'nav' })

  const fundedCountries = [
    { id: '764', name: t('thailand') },
    { id: '104', name: t('myanmar') },
    { id: '116', name: t('cambodia') },
    { id: '418', name: t('laos') },
  ]

  const partnerCountries = [
    { id: '724', name: t('spain') },
    { id: '250', name: t('france') },
    { id: '404', name: t('kenya') },
    { id: '076', name: t('brazil') },
    { id: '356', name: t('india') },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-8 right-8 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-8 w-48 h-48 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
          <Link
            href={`/${locale}/transparency`}
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tn('transparency')}
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">

          {/* Map container */}
          <div className="bg-brand-gray rounded-2xl p-4 sm:p-6 mb-4 border border-gray-100 shadow-sm">
            <WorldMap 
              fundedCountries={fundedCountries} 
              partnerCountries={partnerCountries}
              tooltipActiveLabel={t('tooltipActive')} 
              tooltipPartnerLabel={t('tooltipPartner')}
            />
          </div>

          {/* Mobile hint */}
          <p className="text-xs text-gray-400 text-center mb-8 sm:hidden">{t('mobileHint')}</p>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#0052FF' }} />
              <span className="text-sm text-gray-700 font-medium">{t('legendFunded')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#93C5FD' }} />
              <span className="text-sm text-gray-700 font-medium">{t('legendPartner')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm bg-gray-300 flex-shrink-0" />
              <span className="text-sm text-gray-500">{t('legendOther')}</span>
            </div>
          </div>

          {/* Countries list */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
              {t('countriesTitle')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {fundedCountries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3"
                >
                  <MapPin className="w-4 h-4 text-[#0052FF] flex-shrink-0" />
                  <span className="text-sm font-semibold text-brand-blue">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 bg-brand-gray border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            <span className="font-semibold text-gray-900">
              {`${fundedCountries.length} `}
            </span>
            {t('legendFunded').toLowerCase()}
          </p>
          <Link
            href={`/${locale}/transparency/own-projects`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-colors"
          >
            {tn('ownProjects')} →
          </Link>
        </div>
      </section>

    </div>
  )
}

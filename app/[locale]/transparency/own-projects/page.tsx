import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Layers } from 'lucide-react'
import type { Metadata } from 'next'
import { ownProjects, pageTitles, pageSubtitles, pageDescs } from '@/lib/own-projects'

interface PageProps {
  params: { locale: string }
}

const ctaLabels: Record<string, { member: string; donate: string; back: string }> = {
  ca: { member: 'Fes-te soci', donate: 'Fes una donació', back: 'Transparència' },
  es: { member: 'Hazte socio', donate: 'Haz una donación', back: 'Transparencia' },
  en: { member: 'Become a member', donate: 'Make a donation', back: 'Transparency' },
  fr: { member: 'Devenir membre', donate: 'Faire un don', back: 'Transparence' },
  de: { member: 'Mitglied werden', donate: 'Spenden', back: 'Transparenz' },
}

const ctaTitles: Record<string, string> = {
  ca: 'Ajuda\'ns a fer-ho possible',
  es: 'Ayúdanos a hacerlo posible',
  en: 'Help us make it happen',
  fr: 'Aidez-nous à le réaliser',
  de: 'Helfen Sie uns, es zu verwirklichen',
}

const ctaDescs: Record<string, string> = {
  ca: 'Cada aportació ens permet posar en marxa i mantenir aquests projectes d\'acció directa a Espanya.',
  es: 'Cada aportación nos permite poner en marcha y mantener estos proyectos de acción directa en España.',
  en: 'Every contribution helps us launch and sustain these direct-action projects in Spain.',
  fr: 'Chaque contribution nous permet de lancer et de maintenir ces projets d\'action directe en Espagne.',
  de: 'Jeder Beitrag hilft uns, diese Direkteinsatzprojekte in Spanien zu starten und aufrechtzuerhalten.',
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const title = `${pageTitles[lang]} | Unaria`
  const description = pageDescs[lang]
  return {
    title,
    description,
    openGraph: { title, description, url: `/${locale}/transparency/own-projects` },
  }
}

export default function OwnProjectsPage({ params: { locale } }: PageProps) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const cta = ctaLabels[lang]

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
            {cta.back}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5" />
            {pageSubtitles[lang]}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            {pageTitles[lang]}
          </h1>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl">
            {pageDescs[lang]}
          </p>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-12 sm:py-16 bg-brand-gray">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.titles[lang]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 text-xs font-bold text-white/60 tabular-nums drop-shadow">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <span className={`inline-flex items-center self-start px-2.5 py-1 rounded-lg text-xs font-semibold ${project.categoryColor}`}>
                    {project.category}
                  </span>

                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {project.titles[lang]}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {project.descs[lang]}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto pt-1 border-t border-gray-50">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{project.location}</span>
                    <span className="mx-1">·</span>
                    <span className="font-medium text-gray-500">{project.phase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            {ctaTitles[lang]}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
            {ctaDescs[lang]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${locale}/become-member`}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-colors text-center"
            >
              {cta.member}
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-xl hover:bg-brand-blue hover:text-white transition-colors text-center"
            >
              {cta.donate}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

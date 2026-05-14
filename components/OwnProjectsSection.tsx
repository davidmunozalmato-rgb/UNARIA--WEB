import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { ownProjects } from '@/lib/own-projects'
import { memberLabels, donateLabels } from '@/lib/projects'

const sectionTitles: Record<string, string> = {
  ca: 'Projectes propis',
  es: 'Proyectos propios',
  en: 'Own projects',
  fr: 'Projets propres',
  de: 'Eigene Projekte',
}

const sectionSubtitles: Record<string, string> = {
  ca: 'Acció directa a Espanya — projectes impulsats per Unaria sobre el terreny',
  es: 'Acción directa en España — proyectos impulsados por Unaria sobre el terreno',
  en: 'Direct action in Spain — projects driven by Unaria on the ground',
  fr: 'Action directe en Espagne — projets portés par Unaria sur le terrain',
  de: 'Direktmaßnahmen in Spanien — von Unaria vor Ort umgesetzte Projekte',
}

const viewAllLabels: Record<string, string> = {
  ca: 'Veure tots els projectes propis',
  es: 'Ver todos los proyectos propios',
  en: 'View all own projects',
  fr: 'Voir tous les projets propres',
  de: 'Alle eigenen Projekte ansehen',
}

export default function OwnProjectsSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const displayed = ownProjects.slice(0, 3)

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            {sectionTitles[lang]}
          </h2>
          <div className="w-12 h-1 bg-brand-blue rounded-full mb-3" />
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base">{sectionSubtitles[lang]}</p>
        </div>

        {/* Grid — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {displayed.map((project) => (
            <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col border border-gray-100">
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.titles[lang]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <span className={`inline-block self-start text-xs font-bold px-2 py-1 rounded-full mb-2 ${project.categoryColor}`}>
                  {project.category}
                </span>

                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {project.titles[lang]}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {project.descs[lang]}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 mb-4 pt-3 border-t border-gray-100">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{project.location}</span>
                  <span className="mx-1">·</span>
                  <span className="font-medium text-gray-500">{project.phase}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/${locale}/become-member`}
                    className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2.5 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-blue-900 transition-colors"
                  >
                    {memberLabels[lang]}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/${locale}/donate`}
                    className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2.5 bg-white text-brand-teal border border-brand-teal font-semibold text-sm rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    {donateLabels[lang]}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href={`/${locale}/transparency/own-projects`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-blue font-bold text-sm rounded-xl border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
          >
            {viewAllLabels[lang]}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

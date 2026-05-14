import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects, donateLabels, memberLabels } from '@/lib/projects'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const pageTitles: Record<string, string> = {
  ca: 'Projectes externs',
  es: 'Proyectos externos',
  en: 'External projects',
  fr: 'Projets externes',
  de: 'Externe Projekte',
}

const pageSubtitles: Record<string, string> = {
  ca: 'Les ONG acreditades amb qui col·laborem per transformar vides',
  es: 'Las ONG acreditadas con quienes colaboramos para transformar vidas',
  en: 'The accredited NGOs we work with to transform lives',
  fr: 'Les ONG accréditées avec lesquelles nous collaborons pour transformer des vies',
  de: 'Die akkreditierten NGOs, mit denen wir zusammenarbeiten, um Leben zu verändern',
}

// Entitats en ordre d'aparició, amb el slug que usem als ancoratges del nav
const entities = [
  { name: 'Cruz Roja',             slug: 'cruz-roja',         headerColor: 'bg-red-50 border-red-200',     badgeDot: 'bg-red-500' },
  { name: 'Cáritas',               slug: 'caritas',           headerColor: 'bg-yellow-50 border-yellow-200', badgeDot: 'bg-yellow-500' },
  { name: 'Médicos Sin Fronteras', slug: 'msf',               headerColor: 'bg-orange-50 border-orange-200', badgeDot: 'bg-orange-500' },
  { name: 'Save the Children',     slug: 'save-the-children', headerColor: 'bg-green-50 border-green-200',  badgeDot: 'bg-green-500' },
  { name: 'Oxfam',                 slug: 'oxfam',             headerColor: 'bg-emerald-50 border-emerald-200', badgeDot: 'bg-emerald-500' },
  { name: 'Vicenç Ferrer',         slug: 'vicenc-ferrer',     headerColor: 'bg-pink-50 border-pink-200',   badgeDot: 'bg-pink-500' },
]

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  return {
    title: `${pageTitles[lang]} - Unaria`,
    description: pageSubtitles[lang],
  }
}

export default function ProjectsPage({ params: { locale } }: PageProps) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-24 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {pageTitles[lang]}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto sm:mx-0">
            {pageSubtitles[lang]}
          </p>
        </div>
      </section>

      {/* Seccions per entitat */}
      <div className="bg-brand-gray">
        {entities.map(({ name, slug, headerColor, badgeDot }) => {
          const entityProjects = projects.filter(p => p.entity === name)
          if (entityProjects.length === 0) return null

          return (
            <section key={slug} id={slug} className="py-12 sm:py-16 scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Capçalera d'entitat */}
                <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border mb-8 ${headerColor}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${badgeDot}`} />
                  <span className="text-base font-bold text-gray-800">{name}</span>
                </div>

                {/* Grid de projectes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {entityProjects.map((project) => (
                    <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col hover:-translate-y-1">
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <Image
                          src={project.image}
                          alt={project.imageAlt[lang]}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                          {project.titles[lang]}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1">
                          {project.descs[lang]}
                        </p>
                        <div className="mt-6 flex flex-col gap-2.5">
                          <Link
                            href={`/${locale}/become-member`}
                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                          >
                            {memberLabels[lang]}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/${locale}/donate`}
                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-white text-brand-teal border-2 border-brand-teal font-semibold text-sm rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
                          >
                            {donateLabels[lang]}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

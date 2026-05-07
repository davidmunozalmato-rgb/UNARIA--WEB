import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { projects, sectionTitles, sectionSubtitles, donateLabels, memberLabels } from '@/lib/projects'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  return {
    title: `${sectionTitles[lang]} - Unaria`,
    description: sectionSubtitles[lang],
  }
}

export default function ProjectsPage({ params: { locale } }: PageProps) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'

  return (
    <div className="bg-brand-gray min-h-screen">
      {/* Hero Header */}
      <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'ca' ? 'Tornar a l\'inici' : lang === 'es' ? 'Volver al inicio' : lang === 'en' ? 'Back to home' : lang === 'fr' ? 'Retour à l\'accueil' : 'Zurück zur Startseite'}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {sectionTitles[lang]}
          </h1>
          <div className="w-16 h-1.5 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {sectionSubtitles[lang]}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.imageAlt[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 self-start ${project.entityColor}`}>
                    {project.entity}
                  </span>
                  <h3 className="font-bold text-gray-900 text-xl leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                    {project.titles[lang]}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed flex-1">
                    {project.descs[lang]}
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/${locale}/become-member`}
                      className="inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 bg-brand-blue text-white font-semibold text-base rounded-xl hover:bg-blue-900 transition-colors shadow-sm"
                    >
                      {memberLabels[lang]}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/${locale}/donate`}
                      className="inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 bg-white text-brand-teal border-2 border-brand-teal font-semibold text-base rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
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
    </div>
  )
}

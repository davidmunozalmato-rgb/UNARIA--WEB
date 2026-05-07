import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-24 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {sectionTitles[lang]}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto sm:mx-0">
            {sectionSubtitles[lang]}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 sm:py-20 bg-brand-gray">
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

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { articles, sectionTitles, monthLabels, readMoreLabels } from '@/lib/news'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  return {
    title: `${sectionTitles[lang]} - Unaria`,
  }
}

export default function NewsPage({ params: { locale } }: PageProps) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const monthMap = monthLabels[lang] ?? monthLabels.ca

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'ca' ? 'Tornar a l\'inici' : lang === 'es' ? 'Volver al inicio' : lang === 'en' ? 'Back to home' : lang === 'fr' ? 'Retour à l\'accueil' : 'Zurück zur Startseite'}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {sectionTitles[lang]}
          </h1>
          <div className="w-16 h-1.5 bg-brand-blue rounded-full mx-auto mb-6" />
        </div>
      </section>

      {/* News Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {articles.map((article) => {
              const monthLabel = monthMap[article.date.month] ?? article.date.month
              return (
                <article key={article.id} className="group flex flex-col">
                  {/* Image with date badge */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-sm">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Date badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-4 py-3 text-center min-w-[64px]">
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide leading-none mb-1">
                        {monthLabel}
                      </div>
                      <div className="text-3xl font-extrabold text-brand-blue leading-none mb-1">
                        {article.date.day}
                      </div>
                      <div className="w-6 h-px bg-brand-blue/30 mx-auto my-2" />
                      <div className="text-xs text-gray-400 font-medium leading-none">{article.date.year}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 pt-6 px-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                      {article.titles[lang]}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed flex-1">
                      {article.excerpts[lang]}
                    </p>
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <Link
                        href={`/${locale}/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-brand-blue font-bold text-base hover:gap-3 transition-all"
                      >
                        {readMoreLabels[lang]}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

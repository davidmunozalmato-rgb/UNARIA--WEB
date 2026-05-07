import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getArticleBySlug, monthLabels } from '@/lib/news'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params: { locale, slug } }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  return {
    title: article.titles[lang],
    description: article.excerpts[lang],
  }
}

const backLabels: Record<string, string> = {
  ca: 'Tornar a les notícies',
  es: 'Volver a las noticias',
  en: 'Back to news',
  fr: 'Retour aux actualités',
  de: 'Zurück zu den Nachrichten',
}

export default function NewsArticlePage({ params: { locale, slug } }: PageProps) {
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const monthMap = monthLabels[lang] ?? monthLabels.ca
  const monthLabel = monthMap[article.date.month] ?? article.date.month
  const paragraphs = article.bodies[lang].split('\n\n').filter(Boolean)

  return (
    <main className="bg-white min-h-screen">
      {/* Hero image */}
      <div className="relative w-full h-[240px] sm:h-[360px] md:h-[480px] bg-gray-200">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-20 relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 md:p-12">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span className="font-semibold text-brand-blue">{article.date.day}</span>
            <span>{monthLabel}</span>
            <span>{article.date.year}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
            {article.titles[lang]}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-brand-teal pl-4 italic">
            {article.excerpts[lang]}
          </p>

          {/* Body */}
          <div className="prose prose-gray max-w-none">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabels[lang]}
            </Link>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </main>
  )
}

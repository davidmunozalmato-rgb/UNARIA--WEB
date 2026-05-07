import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles, monthLabels, sectionTitles, readMoreLabels } from '@/lib/news'

export default function NewsSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const monthMap = monthLabels[lang] ?? monthLabels.ca

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {sectionTitles[lang]}
          </h2>
          <div className="w-12 h-1 bg-brand-blue rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => {
            const monthLabel = monthMap[article.date.month] ?? article.date.month
            return (
              <article key={article.id} className="group flex flex-col">
                {/* Image with date badge */}
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md px-3 py-2 text-center min-w-[52px]">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-none">
                      {monthLabel}
                    </div>
                    <div className="text-2xl font-extrabold text-brand-blue leading-tight">
                      {article.date.day}
                    </div>
                    <div className="w-5 h-px bg-brand-blue mx-auto my-1" />
                    <div className="text-xs text-gray-400 leading-none">{article.date.year}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 pt-5">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                    {article.titles[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {article.excerpts[lang]}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/${locale}/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      {readMoreLabels[lang]}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

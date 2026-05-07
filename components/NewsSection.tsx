import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles, monthLabels, sectionTitles, readMoreLabels, viewAllLabels } from '@/lib/news'

export default function NewsSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const monthMap = monthLabels[lang] ?? monthLabels.ca

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            {sectionTitles[lang]}
          </h2>
          <div className="w-12 h-1 bg-brand-blue rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {articles.slice(0, 3).map((article) => {
            const monthLabel = monthMap[article.date.month] ?? article.date.month
            return (
              <article key={article.id} className="group flex flex-row sm:flex-col gap-3 sm:gap-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-28 h-28 sm:w-full sm:aspect-[4/3] sm:h-auto bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 50vw, 33vw"
                  />
                  {/* Date badge — only on desktop */}
                  <div className="hidden sm:block absolute top-3 right-3 bg-white rounded-lg shadow-md px-3 py-2 text-center min-w-[52px]">
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
                <div className="flex flex-col flex-1 sm:pt-4">
                  {/* Mobile date */}
                  <span className="sm:hidden text-xs text-gray-400 mb-1">
                    {article.date.day} {monthLabel} {article.date.year}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug mb-1 sm:mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {article.titles[lang]}
                  </h3>
                  <p className="hidden sm:block text-sm text-gray-600 leading-relaxed flex-1">
                    {article.excerpts[lang]}
                  </p>
                  <div className="mt-auto pt-2 sm:pt-4 sm:border-t sm:border-gray-100">
                    <Link
                      href={`/${locale}/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-xs sm:text-sm hover:gap-2.5 transition-all"
                    >
                      {readMoreLabels[lang]}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        
        {/* View All Button */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href={`/${locale}/news`}
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

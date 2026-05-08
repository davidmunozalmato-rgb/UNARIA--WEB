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
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-0 sm:gap-8 divide-y divide-gray-100 sm:divide-y-0">
          {articles.slice(0, 3).map((article) => {
            const monthLabel = monthMap[article.date.month] ?? article.date.month
            return (
              <article key={article.id} className="group py-5 sm:py-0 first:pt-0 last:pb-0 sm:first:pt-0 sm:last:pb-0">

                {/* ── MOBILE: imatge gran + badge data al costat ── */}
                <div className="sm:hidden flex gap-3 mb-3">
                  {/* Imatge gran */}
                  <div className="relative flex-1 h-44 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 75vw"
                    />
                  </div>
                  {/* Badge data estil Cruz Roja */}
                  <div className="flex-shrink-0 self-stretch flex flex-col items-center justify-around bg-white border border-gray-200 rounded-xl px-2.5 w-16 text-center shadow-sm">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide leading-tight">{monthLabel}</span>
                    <div className="w-8 h-px bg-gray-300" />
                    <span className="text-3xl font-extrabold text-brand-blue leading-none">{article.date.day}</span>
                    <div className="w-8 h-px bg-gray-300" />
                    <span className="text-[11px] text-gray-400 leading-none">{article.date.year}</span>
                  </div>
                </div>

                {/* ── MOBILE: títol + extract + link ── */}
                <div className="sm:hidden">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {article.titles[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                    {article.excerpts[lang]}
                  </p>
                  <Link
                    href={`/${locale}/news/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-2.5 transition-all"
                  >
                    {readMoreLabels[lang]}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* ── DESKTOP: layout original ── */}
                <div className="hidden sm:block">
                  <div className="relative overflow-hidden rounded-xl w-full aspect-[4/3] bg-gray-100 mb-4">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md px-3 py-2 text-center min-w-[52px]">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-none">{monthLabel}</div>
                      <div className="text-2xl font-extrabold text-brand-blue leading-tight">{article.date.day}</div>
                      <div className="w-5 h-px bg-brand-blue mx-auto my-1" />
                      <div className="text-xs text-gray-400 leading-none">{article.date.year}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {article.titles[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {article.excerpts[lang]}
                  </p>
                  <div className="pt-4 border-t border-gray-100">
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

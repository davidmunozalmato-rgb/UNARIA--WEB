import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects, sectionTitles, sectionSubtitles, donateLabels, memberLabels, viewAllProjectsLabels } from '@/lib/projects'

export default function ProjectsSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'

  // Show only up to 6 projects on the home page
  const displayedProjects = projects.slice(0, 6)

  return (
    <section id="projects" className="py-14 sm:py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            {sectionTitles[lang]}
          </h2>
          <div className="w-12 h-1 bg-brand-blue rounded-full mb-3" />
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base">{sectionSubtitles[lang]}</p>
        </div>

        {/* Grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {displayedProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-row sm:flex-col">
              {/* Image */}
              <div className="relative w-28 flex-shrink-0 sm:w-full sm:h-52 overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.imageAlt[lang]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-3 sm:p-5">
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full mb-2 self-start ${project.entityColor}`}>
                  {project.entity}
                </span>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-1 sm:mb-2 group-hover:text-brand-blue transition-colors">
                  {project.titles[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
                  {project.descs[lang]}
                </p>
                <div className="mt-3 sm:mt-5 flex flex-col sm:flex-col gap-1.5 sm:gap-2">
                  <Link
                    href={`/${locale}/become-member`}
                    className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 sm:py-2.5 bg-brand-blue text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-blue-900 transition-colors"
                  >
                    {memberLabels[lang]}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/${locale}/donate`}
                    className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 sm:py-2.5 bg-white text-brand-teal border border-brand-teal font-semibold text-xs sm:text-sm rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    {donateLabels[lang]}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-blue font-bold text-sm rounded-xl border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
          >
            {viewAllProjectsLabels[lang]}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

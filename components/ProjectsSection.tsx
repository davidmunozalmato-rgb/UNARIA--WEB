import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects, sectionTitles, sectionSubtitles, viewAllProjectsLabels } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

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
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} lang={lang} />
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

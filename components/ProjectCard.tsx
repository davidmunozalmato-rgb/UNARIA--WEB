'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { donateLabels, memberLabels } from '@/lib/projects'

export default function ProjectCard({ project, locale, lang }: { project: Project; locale: string; lang: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(v => !v)}
      className={`
        group cursor-pointer bg-white transition-shadow
        sm:rounded-2xl sm:overflow-hidden sm:shadow-sm sm:hover:shadow-lg
        ${expanded
          ? 'flex flex-col rounded-2xl overflow-hidden shadow-md'
          : 'flex flex-row sm:flex-col gap-3 sm:gap-0'
        }
      `}
    >
      {/* Image */}
      <div className={`
        relative flex-shrink-0 overflow-hidden bg-gray-100 transition-all duration-300
        ${expanded
          ? 'w-full h-48 rounded-none'
          : 'w-28 h-28 rounded-xl sm:w-full sm:h-52 sm:rounded-none'
        }
      `}>
        <Image
          src={project.image}
          alt={project.imageAlt[lang]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${expanded ? 'p-4' : 'sm:p-5'}`}>
        <div className="flex items-start justify-between gap-2">
          <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full mb-1.5 self-start ${project.entityColor}`}>
            {project.entity}
          </span>
          <ChevronDown className={`sm:hidden w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>

        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-1 sm:mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
          {project.titles[lang]}
        </h3>

        {/* Description: always visible on desktop, visible when expanded on mobile */}
        <p className={`text-sm text-gray-500 leading-relaxed flex-1 ${expanded ? 'block mb-2' : 'hidden sm:block'}`}>
          {project.descs[lang]}
        </p>

        {/* Actions */}
        <div className={`mt-auto ${expanded ? 'pt-3 border-t border-gray-100' : 'pt-2 sm:pt-4 sm:border-t sm:border-gray-100'}`}>
          {/* Mobile collapsed: simple link */}
          {!expanded && (
            <Link
              href={`/${locale}/become-member`}
              className="sm:hidden inline-flex items-center gap-1.5 text-brand-blue font-semibold text-xs hover:gap-2.5 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {memberLabels[lang]}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          {/* Desktop always + Mobile when expanded: full buttons */}
          <div className={`flex-col gap-2 ${expanded ? 'flex' : 'hidden sm:flex'}`}>
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2.5 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-blue-900 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {memberLabels[lang]}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2.5 bg-white text-brand-teal border border-brand-teal font-semibold text-sm rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {donateLabels[lang]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown, Globe, BarChart2, FolderOpen, Sparkles } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

interface NavbarProps {
  locale: string
}

const externalEntities = [
  { entity: 'Cruz Roja',            slug: 'cruz-roja',        dot: 'bg-red-500' },
  { entity: 'Cáritas',              slug: 'caritas',          dot: 'bg-yellow-500' },
  { entity: 'Médicos Sin Fronteras',slug: 'msf',              dot: 'bg-orange-500' },
  { entity: 'Save the Children',    slug: 'save-the-children',dot: 'bg-green-500' },
  { entity: 'Oxfam',                slug: 'oxfam',            dot: 'bg-emerald-500' },
  { entity: 'Vicenç Ferrer',        slug: 'vicenc-ferrer',    dot: 'bg-pink-500' },
]

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen]               = useState(false)
  const [scrolled, setScrolled]                   = useState(false)
  const [transparencyOpen, setTransparencyOpen]   = useState(false)
  const [projectsOpen, setProjectsOpen]           = useState(false)
  const [projectsMobileOpen, setProjectsMobileOpen] = useState(false)
  const transparencyRef = useRef<HTMLDivElement>(null)
  const projectsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (transparencyRef.current && !transparencyRef.current.contains(e.target as Node))
        setTransparencyOpen(false)
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node))
        setProjectsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setTransparencyOpen(false)
    setProjectsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const toggleTransparency  = useCallback(() => { setTransparencyOpen(v => !v); setProjectsOpen(false) }, [])
  const toggleProjects      = useCallback(() => { setProjectsOpen(v => !v); setTransparencyOpen(false) }, [])

  const links = [
    { href: `/${locale}`,            label: t('home') },
    { href: `/${locale}/about`,      label: t('about') },
    { href: `/${locale}/how-we-work`,label: t('howWeWork') },
    { href: `/${locale}/strategy`,   label: t('strategy') },
  ]

  const transparencyLinks = [
    { href: `/${locale}/transparency`,     label: t('transparencyReports'), icon: BarChart2 },
    { href: `/${locale}/transparency/map`, label: t('impactMap'),           icon: Globe },
  ]

  const isTransparencyActive = pathname.startsWith(`/${locale}/transparency`)
  const isProjectsActive     = pathname.startsWith(`/${locale}/projects`) ||
                               pathname.startsWith(`/${locale}/transparency/own-projects`)

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Image src="/images/logo-icon.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
            <span className="text-xl font-bold text-[#1a2e4a]">Unaria</span>
          </Link>

          <div className="flex items-center gap-0.5">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}
                  className={`whitespace-nowrap px-2.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-blue font-semibold border-b-2 border-brand-blue rounded-none pb-1.5'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* ── Projectes dropdown ── */}
            <div className="relative" ref={projectsRef}>
              <button
                onClick={toggleProjects}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isProjectsActive
                    ? 'text-brand-blue font-semibold border-b-2 border-brand-blue rounded-none pb-1.5'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
                }`}
                aria-expanded={projectsOpen}
                aria-haspopup="menu"
              >
                {t('projects')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsOpen ? 'rotate-180' : ''}`} />
              </button>

              {projectsOpen && (
                <div role="menu" className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">

                  {/* Propis */}
                  <Link
                    href={`/${locale}/transparency/own-projects`}
                    role="menuitem"
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      pathname === `/${locale}/transparency/own-projects`
                        ? 'bg-blue-50 text-brand-blue font-semibold'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-brand-blue'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    {t('ownProjects')}
                  </Link>

                  {/* Separador Externs */}
                  <div className="mx-4 my-1.5 border-t border-gray-100" />
                  <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {t('externalProjects')}
                  </p>

                  {externalEntities.map(({ entity, slug, dot }) => {
                    const href = `/${locale}/projects#${slug}`
                    return (
                      <Link
                        key={slug}
                        href={href}
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                        {entity}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* ── Transparència dropdown ── */}
            <div className="relative" ref={transparencyRef}>
              <button
                onClick={toggleTransparency}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isTransparencyActive
                    ? 'text-brand-blue font-semibold border-b-2 border-brand-blue rounded-none pb-1.5'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
                }`}
                aria-expanded={transparencyOpen}
                aria-haspopup="menu"
              >
                {t('transparency')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${transparencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {transparencyOpen && (
                <div role="menu" className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                  {transparencyLinks.map(({ href, label, icon: Icon }) => {
                    const isItemActive = pathname === href
                    return (
                      <Link key={href} href={href} role="menuitem"
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          isItemActive
                            ? 'bg-blue-50 text-brand-blue font-semibold'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-brand-blue'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <LanguageSwitcher currentLocale={locale} />
            <Link href={`/${locale}/donate`} className="whitespace-nowrap px-3 py-2 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
              {t('donate')}
            </Link>
            <Link href={`/${locale}/become-member`} className="whitespace-nowrap px-3 py-2 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors">
              {t('becomeMember')}
            </Link>
          </div>
        </div>

        {/* ── MOBILE header ── */}
        <div className="md:hidden flex items-center h-16 relative">
          <div className="w-10" />
          <Link href={`/${locale}`} className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Image src="/images/logo-icon.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" priority />
            <span className="text-lg font-bold text-[#1a2e4a]">Unaria</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="ml-auto p-2 rounded-lg text-gray-700 hover:bg-gray-100" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-brand-blue font-semibold border-l-2 border-brand-blue'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Projectes (mobile accordion) */}
            <button
              onClick={() => setProjectsMobileOpen(v => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className={isProjectsActive ? 'text-brand-blue font-semibold' : ''}>{t('projects')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${projectsMobileOpen ? 'rotate-180' : ''}`} />
            </button>

            {projectsMobileOpen && (
              <div className="pl-3 space-y-0.5 border-l-2 border-blue-100 ml-3">
                <Link href={`/${locale}/transparency/own-projects`} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname === `/${locale}/transparency/own-projects`
                      ? 'text-brand-blue font-semibold bg-blue-50'
                      : 'text-gray-600 hover:text-brand-blue hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  {t('ownProjects')}
                </Link>
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {t('externalProjects')}
                </p>
                {externalEntities.map(({ entity, slug, dot }) => (
                  <Link key={slug} href={`/${locale}/projects#${slug}`} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                    {entity}
                  </Link>
                ))}
              </div>
            )}

            {/* Transparència */}
            <Link href={`/${locale}/transparency`} onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                pathname === `/${locale}/transparency`
                  ? 'bg-blue-50 text-brand-blue font-semibold border-l-2 border-brand-blue'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
              }`}
            >
              {t('transparency')}
            </Link>
            <Link href={`/${locale}/transparency/map`} onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                pathname === `/${locale}/transparency/map`
                  ? 'bg-blue-50 text-brand-blue font-semibold border-l-2 border-brand-blue'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
              }`}
            >
              {t('impactMap')}
            </Link>

            <div className="pt-2 pb-1 space-y-2 border-t border-gray-100 mt-2">
              <Link href={`/${locale}/donate`} onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                {t('donate')}
              </Link>
              <Link href={`/${locale}/become-member`} onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors">
                {t('becomeMember')}
              </Link>
              <div className="flex justify-center pt-1">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

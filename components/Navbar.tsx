'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu, X, Heart } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

interface NavbarProps {
  locale: string
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/how-we-work`, label: t('howWeWork') },
    { href: `/${locale}/strategy`, label: t('strategy') },
    { href: `/${locale}/transparency`, label: t('transparency') },
  ]

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── DESKTOP header ── */}
        <div className="hidden md:flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-brand-blue">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span>Unaria</span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-blue font-semibold border-b-2 border-brand-blue rounded-none pb-1.5'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/donate`}
              className="px-4 py-2 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
            >
              {t('donate')}
            </Link>
            <Link
              href={`/${locale}/become-member`}
              className="px-4 py-2 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
            >
              {t('becomeMember')}
            </Link>
          </div>
        </div>

        {/* ── MOBILE header: logo centrat ── */}
        <div className="md:hidden flex items-center h-16 relative">
          {/* Spacer esquerra igual d'amplada que el botó dret */}
          <div className="w-10" />

          {/* Logo centrat absolutament */}
          <Link
            href={`/${locale}`}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-bold text-xl text-brand-blue"
          >
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span>Unaria</span>
          </Link>

          {/* Hamburger a la dreta */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-auto p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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
            <div className="pt-2 pb-1 space-y-2 border-t border-gray-100 mt-2">
              <Link
                href={`/${locale}/donate`}
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
              >
                {t('donate')}
              </Link>
              <Link
                href={`/${locale}/become-member`}
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
              >
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

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { ChevronDown } from 'lucide-react'

const languages = [
  { code: 'ca', label: 'Català', flag: '/images/flag-ca.svg', short: 'CA' },
  { code: 'es', label: 'Castellano', flag: 'https://flagcdn.com/w40/es.png', short: 'ES' },
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png', short: 'EN' },
  { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png', short: 'FR' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png', short: 'DE' },
]

interface LanguageSwitcherProps {
  currentLocale: string
  variant?: 'light' | 'dark'
}

export default function LanguageSwitcher({ currentLocale, variant = 'light' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const current = languages.find((l) => l.code === currentLocale) ?? languages[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchLocale(locale: string) {
    setCookie('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    // Replace current locale prefix in pathname
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
    setOpen(false)
  }

  const isDark = variant === 'dark'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isDark
            ? 'text-white hover:bg-white/10'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <img 
          src={current.flag} 
          alt="" 
          className="w-4 h-3 object-cover rounded-sm flex-shrink-0 shadow-sm" 
        />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.short}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
          role="listbox"
          aria-label="Available languages"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                lang.code === currentLocale
                  ? 'bg-brand-blue/5 text-brand-blue font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={lang.code === currentLocale}
            >
              <img 
                src={lang.flag} 
                alt="" 
                className="w-4 h-3 object-cover rounded-sm flex-shrink-0 shadow-sm" 
              />
              <span>{lang.label}</span>
              {lang.code === currentLocale && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-blue" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

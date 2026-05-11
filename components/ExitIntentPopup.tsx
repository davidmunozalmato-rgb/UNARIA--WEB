'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import ImpactCalculator from './ImpactCalculator'
import { Analytics } from '@/lib/analytics'

const TITLES: Record<string, string> = {
  ca: 'Espera! Quin impacte pots generar?',
  es: '¡Espera! ¿Qué impacto puedes generar?',
  en: 'Wait! What impact can you generate?',
  fr: 'Attendez ! Quel impact pouvez-vous générer ?',
  de: 'Warte! Welche Wirkung kannst du erzielen?',
}

const SUBTITLES: Record<string, string> = {
  ca: 'Descobreix el que pots aconseguir amb la teva quota mensual.',
  es: 'Descubre lo que puedes lograr con tu cuota mensual.',
  en: 'Discover what you can achieve with your monthly fee.',
  fr: 'Découvrez ce que vous pouvez accomplir avec votre cotisation mensuelle.',
  de: 'Entdecke, was du mit deinem monatlichen Beitrag erreichen kannst.',
}

interface Props {
  locale?: string
}

export default function ExitIntentPopup({ locale = 'ca' }: Props) {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY > 10) return
    if (sessionStorage.getItem('exit_intent_shown')) return
    sessionStorage.setItem('exit_intent_shown', '1')
    setVisible(true)
    Analytics.exitIntentShown()
  }, [])

  useEffect(() => {
    // Don't show on become-member page (already converting)
    if (pathname?.includes('become-member') || pathname?.includes('donate')) return
    // Only on desktop
    if (window.innerWidth < 768) return
    // Minimum 5 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [pathname, handleMouseLeave])

  function handleClose() {
    setVisible(false)
  }

  function handleCtaClick() {
    Analytics.exitIntentConverted('become_member')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Tancar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-extrabold text-gray-900 mb-1 pr-8">
          {TITLES[locale] ?? TITLES.en}
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          {SUBTITLES[locale] ?? SUBTITLES.en}
        </p>

        <div onClick={handleCtaClick}>
          <ImpactCalculator locale={locale} showCta />
        </div>
      </div>
    </div>
  )
}

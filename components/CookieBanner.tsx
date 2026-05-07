'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { setCookie, getCookie } from 'cookies-next'
import { X, Settings } from 'lucide-react'

export default function CookieBanner() {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)
  const [configuring, setConfiguring] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = getCookie('unaria_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function acceptAll() {
    setCookie('unaria_cookie_consent', JSON.stringify({ technical: true, analytics: true }), {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    setVisible(false)
  }

  function savePreferences() {
    setCookie('unaria_cookie_consent', JSON.stringify({ technical: true, analytics }), {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:bottom-6 md:left-6 md:right-auto md:max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-base">{t('title')}</h3>
            <button
              onClick={() => savePreferences()}
              className="text-gray-400 hover:text-gray-600 ml-4"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!configuring ? (
            <>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{t('text')}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setConfiguring(true)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  {t('configure')}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
                >
                  {t('accept')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-4 h-4 accent-brand-blue"
                  />
                  <span className="text-sm text-gray-700">{t('technical')}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-4 h-4 accent-brand-blue cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{t('analytics')}</span>
                </label>
              </div>
              <button
                onClick={savePreferences}
                className="w-full px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
              >
                {t('save')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

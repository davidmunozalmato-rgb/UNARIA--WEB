'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { getCookie } from 'cookies-next'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // On mount, read existing cookie consent and update GA accordingly
    try {
      const raw = getCookie('unaria_cookie_consent')
      if (raw) {
        const consent = JSON.parse(raw as string)
        window.gtag?.('consent', 'update', {
          analytics_storage: consent.analytics ? 'granted' : 'denied',
        })
      }
    } catch {}
  }, [])

  if (!GA_ID) return null

  return (
    <>
      {/* Consent Mode v2 — must execute before gtag.js loads */}
      <Script id="ga-consent-default" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500
        });
      `}</Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: true });
      `}</Script>
    </>
  )
}

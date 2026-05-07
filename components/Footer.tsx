'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { Heart, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const navT = useTranslations('nav')
  const { locale } = useParams() as { locale: string }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-xl">Unaria</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t('desc')}</p>
            <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Barcelona, Catalunya</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a href="mailto:contacte@unaria.org" className="hover:text-white transition-colors">
                contacte@unaria.org
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              {t('links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/how-we-work`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('howWeWork')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/transparency`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('transparency')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/become-member`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('becomeMember')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/donate`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {navT('donate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy-policy`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal-notice`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('legalNotice')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Unaria. {t('rights')}.
          </p>
          <p className="text-gray-500 text-xs">{t('registered')}</p>
        </div>
      </div>
    </footer>
  )
}

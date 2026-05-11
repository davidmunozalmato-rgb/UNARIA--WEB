import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes that don't need locale
  if (
    pathname.startsWith('/api/stripe/webhook') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check locale cookie preference
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && locales.includes(localeCookie as any)) {
    // If no locale in path, redirect to cookie locale
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    if (!pathnameHasLocale && pathname === '/') {
      return NextResponse.redirect(new URL(`/${localeCookie}`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|r/|_next/static|_next/image|favicon.ico|robots.txt|llms.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
}

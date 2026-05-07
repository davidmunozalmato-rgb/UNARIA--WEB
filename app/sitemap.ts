import type { MetadataRoute } from 'next'

const locales = ['ca', 'es', 'en', 'fr', 'de']

const staticRoutes = [
  '',
  '/about',
  '/how-we-work',
  '/strategy',
  '/transparency',
  '/projects',
  '/news',
  '/donate',
  '/become-member',
  '/privacy-policy',
  '/legal-notice',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://unaria.org'

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${appUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/become-member' || route === '/donate' ? 0.9 : 0.7,
      })
    }
  }

  return entries
}

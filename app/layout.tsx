import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'Unaria – Solidaritat Organitzada',
    template: '%s | Unaria',
  },
  description: 'Unaria és una associació sense ànim de lucre que canalitza les aportacions dels seus socis cap a les ONG que més impacte generen.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://unaria.org'),
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

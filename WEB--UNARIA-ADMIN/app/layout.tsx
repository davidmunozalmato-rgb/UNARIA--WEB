import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unaria Admin',
  description: 'Panell d\'administració d\'Unaria',
  robots: 'noindex, nofollow', // Never index admin panel
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  )
}

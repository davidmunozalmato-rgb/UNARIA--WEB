'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard, Users, CreditCard, ArrowRightLeft,
  FileText, LogOut, Heart, Menu, X, ExternalLink,
} from 'lucide-react'

export default function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: `/${locale}/dashboard`, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: `/${locale}/members`, label: 'Socis', icon: <Users className="w-5 h-5" /> },
    { href: `/${locale}/donations`, label: 'Donacions', icon: <CreditCard className="w-5 h-5" /> },
    { href: `/${locale}/transfers`, label: 'Transferències', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { href: `/${locale}/reports`, label: 'Informes', icon: <FileText className="w-5 h-5" /> },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-tight">Unaria</div>
            <div className="text-xs text-brand-blue font-medium">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-brand-blue'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <a
          href="https://unaria.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-brand-blue transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Web pública
        </a>

        {session?.user && (
          <div className="px-3 py-2 text-xs text-gray-500">
            <div className="font-medium text-gray-700 truncate">{session.user.name}</div>
            <div className="truncate">{session.user.email}</div>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Tancar sessió
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-blue rounded-lg flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-bold text-gray-900">Unaria Admin</span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-20 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white shadow-xl flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}

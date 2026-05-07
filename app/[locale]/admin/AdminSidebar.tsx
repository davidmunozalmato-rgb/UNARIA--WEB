'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowRightLeft,
  FileText,
  LogOut,
  Heart,
  Menu,
  X,
} from 'lucide-react'

export default function AdminSidebar({ locale }: { locale: string }) {
  const t = useTranslations('admin')
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: `/${locale}/admin`, label: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: `/${locale}/admin/members`, label: t('members'), icon: <Users className="w-5 h-5" /> },
    { href: `/${locale}/admin/donations`, label: t('donations'), icon: <CreditCard className="w-5 h-5" /> },
    { href: `/${locale}/admin/transfers`, label: t('transfers'), icon: <ArrowRightLeft className="w-5 h-5" /> },
    { href: `/${locale}/admin/reports`, label: t('reports'), icon: <FileText className="w-5 h-5" /> },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900">Unaria</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-blue text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-brand-blue'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {session?.user && (
          <div className="mb-3 px-3 py-2">
            <div className="text-xs font-medium text-gray-700">{session.user.name}</div>
            <div className="text-xs text-gray-400">{session.user.email}</div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          {t('logout')}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="ml-3 font-bold text-gray-900">Unaria Admin</span>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-20">
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

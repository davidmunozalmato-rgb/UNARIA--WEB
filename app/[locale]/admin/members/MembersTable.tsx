'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react'

interface Member {
  id: string
  name: string
  surname: string
  email: string
  phone?: string | null
  monthlyQuota: number
  status: string
  preferredLocale: string
  createdAt: Date
}

interface MembersTableProps {
  members: Member[]
  total: number
  page: number
  pageSize: number
  locale: string
}

export default function MembersTable({ members, total, page, pageSize, locale }: MembersTableProps) {
  const t = useTranslations('admin')
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  function applyFilter() {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status !== 'all') params.set('status', status)
    router.push(`/${locale}/admin/members?${params.toString()}`)
  }

  function downloadCsv() {
    const headers = ['ID', 'Nom', 'Cognoms', 'Email', 'Telèfon', 'Quota (€)', 'Estat', 'Locale', 'Data alta']
    const rows = members.map((m) => [
      m.id,
      m.name,
      m.surname,
      m.email,
      m.phone ?? '',
      m.monthlyQuota,
      m.status,
      m.preferredLocale,
      new Date(m.createdAt).toISOString().split('T')[0],
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `unaria-socis-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="card">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
            className="form-input pl-9"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input w-full sm:w-40"
        >
          <option value="all">{t('filterStatus')}</option>
          <option value="active">Actiu</option>
          <option value="pending">Pendent</option>
          <option value="inactive">Inactiu</option>
          <option value="cancelled">Cancel·lat</option>
        </select>
        <button onClick={applyFilter} className="btn-primary px-4 py-2.5 text-sm">
          {t('search')}
        </button>
        <button
          onClick={downloadCsv}
          className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {t('exportCsv')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Nom</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Telèfon</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600">Quota</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Estat</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Alta</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  Sense resultats
                </td>
              </tr>
            ) : members.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium">{m.name} {m.surname}</td>
                <td className="py-2.5 px-3 text-gray-600">{m.email}</td>
                <td className="py-2.5 px-3 text-gray-500">{m.phone ?? '—'}</td>
                <td className="py-2.5 px-3 text-right font-semibold text-brand-blue">{m.monthlyQuota}€</td>
                <td className="py-2.5 px-3">
                  <span className={`badge text-xs ${
                    m.status === 'active' ? 'bg-green-50 text-green-700' :
                    m.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    m.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-gray-500 text-xs">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Pàgina {page} de {totalPages} ({total} resultats)
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`/${locale}/admin/members?page=${page - 1}`}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </a>
            )}
            {page < totalPages && (
              <a
                href={`/${locale}/admin/members?page=${page + 1}`}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

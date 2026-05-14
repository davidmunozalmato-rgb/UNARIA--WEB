'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Download, ChevronLeft, ChevronRight, User } from 'lucide-react'

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
    router.push(`/${locale}/members?${params.toString()}`)
  }

  async function updateMemberStatus(memberId: string, newStatus: string) {
    await fetch(`/api/admin/members/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
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

  const statusColor: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    cancelled: 'bg-red-50 text-red-700',
    inactive: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="card">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
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
          className="form-input w-full md:w-48"
        >
          <option value="all">{t('filterStatus')}</option>
          <option value="active">Actiu</option>
          <option value="pending">Pendent</option>
          <option value="inactive">Inactiu</option>
          <option value="cancelled">Cancel·lat</option>
        </select>
        <button onClick={applyFilter} className="btn-primary px-6 py-2.5">
          {t('search')}
        </button>
        <button
          onClick={downloadCsv}
          className="btn-secondary px-4 py-2.5 flex items-center gap-2 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          {t('exportCsv')}
        </button>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-y border-gray-100">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-600">Nom i cognoms</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Telèfon</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600">Quota</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Estat</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-600">Data d'alta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-8 h-8 text-gray-200" />
                    <p>No s'han trobat socis amb aquests filtres</p>
                  </div>
                </td>
              </tr>
            ) : members.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-6">
                  <div className="font-semibold text-gray-900">{m.name} {m.surname}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{m.id}</div>
                </td>
                <td className="py-3.5 px-3 text-gray-600">{m.email}</td>
                <td className="py-3.5 px-3 text-gray-500">{m.phone ?? '—'}</td>
                <td className="py-3.5 px-3 text-right font-bold text-brand-blue">{m.monthlyQuota}€</td>
                <td className="py-3.5 px-3">
                  <select
                    value={m.status}
                    onChange={(e) => updateMemberStatus(m.id, e.target.value)}
                    className={`badge text-[11px] uppercase tracking-wider font-bold cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-full pr-6 ${statusColor[m.status] ?? 'bg-gray-100 text-gray-600'}`}
                  >
                    <option value="pending">pending</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="paused">paused</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td className="py-3.5 px-6 text-gray-500 text-xs">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Mostrant pàgina <span className="text-gray-900">{page}</span> de <span className="text-gray-900">{totalPages}</span> (<span className="text-brand-blue">{total}</span> socis)
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <button
                onClick={() => router.push(`/${locale}/members?page=${page - 1}`)}
                className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {page < totalPages && (
              <button
                onClick={() => router.push(`/${locale}/members?page=${page + 1}`)}
                className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

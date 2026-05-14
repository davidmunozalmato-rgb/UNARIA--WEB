'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Filter, X } from 'lucide-react'

export default function DonationsFilters({ locale }: { locale: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [type, setType] = useState(searchParams.get('type') ?? 'all')
  const [from, setFrom] = useState(searchParams.get('from') ?? '')
  const [to, setTo] = useState(searchParams.get('to') ?? '')

  function applyFilters() {
    const params = new URLSearchParams()
    if (type !== 'all') params.set('type', type)
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    const query = params.toString()
    router.push(`/${locale}/donations${query ? `?${query}` : ''}`)
  }

  function clearFilters() {
    setType('all')
    setFrom('')
    setTo('')
    router.push(`/${locale}/donations`)
  }

  const hasFilter = type !== 'all' || from || to

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium shrink-0">
        <Filter className="w-4 h-4" />
        Filtres:
      </div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
      >
        <option value="all">Tots els tipus</option>
        <option value="subscription">Quota (subscripció)</option>
        <option value="one_time">Donació única</option>
      </select>
      <div className="h-5 w-[1px] bg-gray-200 hidden sm:block"></div>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <span className="text-gray-300">→</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
      <div className="flex gap-2 ml-auto">
        {hasFilter && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Netejar
          </button>
        )}
        <button
          onClick={applyFilters}
          className="btn-primary px-4 py-1.5 text-xs"
        >
          Aplicar
        </button>
      </div>
    </div>
  )
}

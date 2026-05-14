'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page: number
  totalPages: number
  total: number
  locale: string
}

export default function DonationsPagination({ page, totalPages, total, locale }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function goToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    router.push(`/${locale}/donations?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-gray-500 font-medium">
        Pàgina <span className="text-gray-900">{page}</span> de{' '}
        <span className="text-gray-900">{totalPages}</span>{' '}
        (<span className="text-brand-blue">{total}</span> donacions)
      </p>
      <div className="flex gap-2">
        {page > 1 && (
          <button
            onClick={() => goToPage(page - 1)}
            className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => goToPage(page + 1)}
            className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

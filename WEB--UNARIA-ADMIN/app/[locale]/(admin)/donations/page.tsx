import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import { CreditCard, Download } from 'lucide-react'
import { Suspense } from 'react'
import DonationsFilters from './DonationsFilters'
import DonationsPagination from './DonationsPagination'
import AddDonationButton from './AddDonationButton'

interface PageProps {
  params: { locale: string }
  searchParams: { from?: string; to?: string; type?: string; page?: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Donacions | Unaria Admin' }

export default async function AdminDonationsPage({ params: { locale }, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const page = Math.max(1, parseInt(searchParams.page ?? '1'))
  const pageSize = 25
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}
  if (searchParams.type && searchParams.type !== 'all') where.type = searchParams.type
  if (searchParams.from || searchParams.to) {
    where.createdAt = {}
    if (searchParams.from) where.createdAt.gte = new Date(searchParams.from)
    if (searchParams.to) where.createdAt.lte = new Date(searchParams.to)
  }

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.donation.count({ where }),
  ])

  const totalPages = Math.ceil(total / pageSize)

  const statusColor: Record<string, string> = {
    completed: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    failed: 'bg-red-50 text-red-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('donations')}</h1>
          <p className="text-sm text-gray-500 mt-1">Registre històric de totes les aportacions rebudes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm font-medium text-gray-400">Total: </span>
            <span className="text-sm font-bold text-brand-blue">{total}</span>
          </div>
          <button className="btn-secondary px-4 py-2 flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <AddDonationButton />
        </div>
      </div>

      <Suspense fallback={<div className="h-14 bg-white rounded-xl border border-gray-100 animate-pulse" />}>
        <DonationsFilters locale={locale} />
      </Suspense>

      <div className="card overflow-x-auto -mx-6 md:mx-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">Donant</th>
              <th className="text-left py-4 px-3 font-semibold text-gray-600">Email</th>
              <th className="text-right py-4 px-3 font-semibold text-gray-600">{t('amount')}</th>
              <th className="text-left py-4 px-3 font-semibold text-gray-600">Tipus</th>
              <th className="text-left py-4 px-3 font-semibold text-gray-600">Estat</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="w-10 h-10 text-gray-100" />
                    <p>No s&apos;han trobat donacions amb aquests criteris</p>
                  </div>
                </td>
              </tr>
            ) : donations.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-gray-900">{d.donorName}</td>
                <td className="py-4 px-3 text-gray-600">{d.donorEmail}</td>
                <td className="py-4 px-3 text-right font-bold text-brand-teal">
                  {formatCurrency(d.amount, d.currency, locale)}
                </td>
                <td className="py-4 px-3">
                  <span className={`badge text-[10px] uppercase tracking-wide font-bold ${d.type === 'subscription' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                    {d.type === 'subscription' ? 'Quota' : 'Única'}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <span className={`badge text-[10px] uppercase tracking-wide font-bold ${statusColor[d.status] ?? 'bg-gray-50 text-gray-600'}`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500 text-xs">
                  {formatDate(d.createdAt, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Suspense>
          <DonationsPagination
            page={page}
            totalPages={totalPages}
            total={total}
            locale={locale}
          />
        </Suspense>
      )}
    </div>
  )
}

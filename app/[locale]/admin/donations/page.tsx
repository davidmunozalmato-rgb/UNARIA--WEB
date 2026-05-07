import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
  searchParams: { from?: string; to?: string; type?: string; page?: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Donacions | Unaria Admin' }

export default async function AdminDonationsPage({ params: { locale }, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/admin/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const page = parseInt(searchParams.page ?? '1')
  const pageSize = 25
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('donations')}</h1>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Donant</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Email</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600">{t('amount')}</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Tipus</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Estat</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">Data</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  Sense donacions
                </td>
              </tr>
            ) : donations.map((d) => (
              <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium">{d.donorName}</td>
                <td className="py-2.5 px-3 text-gray-600">{d.donorEmail}</td>
                <td className="py-2.5 px-3 text-right font-semibold text-brand-teal">
                  {formatCurrency(d.amount, d.currency, locale)}
                </td>
                <td className="py-2.5 px-3">
                  <span className={`badge text-xs ${d.type === 'subscription' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                    {d.type === 'subscription' ? 'Quota' : 'Única'}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className={`badge text-xs ${
                    d.status === 'completed' ? 'bg-green-50 text-green-700' :
                    d.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    d.status === 'failed' ? 'bg-red-50 text-red-700' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-gray-500 text-xs">
                  {formatDate(d.createdAt, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

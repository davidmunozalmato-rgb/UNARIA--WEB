import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import AddTransferForm from './AddTransferForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Transferències ONG | Unaria Admin' }

export default async function AdminTransfersPage({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/admin/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const transfers = await prisma.ngoTransfer.findMany({
    orderBy: { transferDate: 'desc' },
  })

  const total = transfers.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('transfers')}</h1>
        <div className="text-right">
          <div className="text-sm text-gray-500">Total transferit</div>
          <div className="text-xl font-bold text-brand-teal">{formatCurrency(total, 'EUR', locale)}</div>
        </div>
      </div>

      <AddTransferForm locale={locale} />

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 font-semibold text-gray-600">{t('ngoName')}</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600">{t('amount')}</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">{t('transferDate')}</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">{t('reference')}</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-600">{t('notes')}</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400">
                  Sense transferències
                </td>
              </tr>
            ) : transfers.map((tr) => (
              <tr key={tr.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium">{tr.ngoName}</td>
                <td className="py-2.5 px-3 text-right font-semibold text-brand-teal">
                  {formatCurrency(tr.amount, tr.currency, locale)}
                </td>
                <td className="py-2.5 px-3 text-gray-600">{formatDate(tr.transferDate, locale)}</td>
                <td className="py-2.5 px-3 text-gray-400 text-xs">{tr.reference ?? '—'}</td>
                <td className="py-2.5 px-3 text-gray-500 text-xs">{tr.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

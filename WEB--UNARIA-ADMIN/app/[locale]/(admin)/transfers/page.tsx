import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import { ArrowRightLeft } from 'lucide-react'
import AddTransferButton from './AddTransferButton'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Transferències ONG | Unaria Admin' }

export default async function AdminTransfersPage({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const transfers = await prisma.ngoTransfer.findMany({
    orderBy: { transferDate: 'desc' },
  })

  const total = transfers.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('transfers')}</h1>
          <p className="text-sm text-gray-500 mt-1">Registre de fons enviats a entitats col·laboradores</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm text-right">
          <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">Total transferit</div>
          <div className="text-2xl font-black text-brand-teal">{formatCurrency(total, 'EUR', locale)}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <AddTransferButton label={t('addTransfer')} />
      </div>

      <div className="card overflow-x-auto -mx-6 md:mx-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">{t('ngoName')}</th>
              <th className="text-right py-4 px-3 font-semibold text-gray-600">{t('amount')}</th>
              <th className="text-left py-4 px-3 font-semibold text-gray-600">{t('transferDate')}</th>
              <th className="text-left py-4 px-3 font-semibold text-gray-600">{t('reference')}</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">{t('notes')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400">
                   <div className="flex flex-col items-center gap-2">
                    <ArrowRightLeft className="w-10 h-10 text-gray-100" />
                    <p>Encara no s'ha registrat cap transferència a ONG</p>
                  </div>
                </td>
              </tr>
            ) : transfers.map((tr) => (
              <tr key={tr.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-gray-900">{tr.ngoName}</td>
                <td className="py-4 px-3 text-right font-bold text-brand-teal">
                  {formatCurrency(tr.amount, tr.currency, locale)}
                </td>
                <td className="py-4 px-3 text-gray-600">{formatDate(tr.transferDate, locale)}</td>
                <td className="py-4 px-3">
                  <span className="font-mono text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                    {tr.reference ?? 'SENSE REF'}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500 text-xs italic">{tr.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Informes | Unaria Admin' }

export default async function AdminReportsPage({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/admin/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })
  const year = new Date().getFullYear()

  const startOfYear = new Date(`${year}-01-01`)
  const endOfYear = new Date(`${year}-12-31T23:59:59`)

  const [income, transfers, activeMembers, totalMembers, pendingMembers] = await Promise.all([
    prisma.donation.aggregate({
      where: { status: 'completed', createdAt: { gte: startOfYear, lte: endOfYear } },
      _sum: { amount: true },
    }),
    prisma.ngoTransfer.aggregate({
      where: { transferDate: { gte: startOfYear, lte: endOfYear } },
      _sum: { amount: true },
    }),
    prisma.member.count({ where: { status: 'active' } }),
    prisma.member.count(),
    prisma.member.count({ where: { status: 'pending' } }),
  ])

  const totalIncome = income._sum.amount ?? 0
  const totalTransferred = transfers._sum.amount ?? 0
  const operatingCosts = totalIncome - totalTransferred
  const percentage = totalIncome > 0 ? ((totalTransferred / totalIncome) * 100).toFixed(1) : '0'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('reports')}</h1>

      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Memòria Anual {year}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Ingressos totals', value: formatCurrency(totalIncome, 'EUR', locale), note: 'Donacions i quotes rebudes' },
            { label: 'Costos operatius', value: formatCurrency(operatingCosts, 'EUR', locale), note: `${totalIncome > 0 ? (100 - Number(percentage)).toFixed(1) : 0}% dels ingressos` },
            { label: 'Transferit a ONG', value: formatCurrency(totalTransferred, 'EUR', locale), note: `${percentage}% dels ingressos` },
            { label: 'Socis actius', value: String(activeMembers), note: `de ${totalMembers} total` },
            { label: 'Socis pendents', value: String(pendingMembers), note: 'Pendents de verificació' },
            { label: '% destinat a ONG', value: `${percentage}%`, note: 'Objectiu: >85%' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-gray-900">{item.value}</div>
              <div className="text-xs text-gray-400 mt-1">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Text per a memòria</h2>
        <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 whitespace-pre-line">
{`UNARIA – Memòria Econòmica ${year}

1. INGRESSOS
   Quotes de socis i donacions: ${formatCurrency(totalIncome, 'EUR', 'ca')}

2. DESPESES OPERATIVES
   Costos de funcionament: ${formatCurrency(operatingCosts, 'EUR', 'ca')}

3. DESTINACIÓ DE FONS A ONG
   Total transferit a ONG: ${formatCurrency(totalTransferred, 'EUR', 'ca')}
   Percentatge: ${percentage}% dels ingressos

4. SOCIS
   Socis actius a 31/12/${year}: ${activeMembers}
   Total socis registrats: ${totalMembers}

Tots els imports han estat verificats i estan disponibles
per a consulta pública a unaria.org/transparencia`}
        </div>
        <button
          onClick={() => {}}
          className="btn-secondary mt-4 text-sm"
        >
          Copiar text
        </button>
      </div>
    </div>
  )
}

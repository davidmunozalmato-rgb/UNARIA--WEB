import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import type { Metadata } from 'next'
import { FileText, CheckCircle2 } from 'lucide-react'
import CopyButton from './CopyButton'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Informes | Unaria Admin' }

export default async function AdminReportsPage({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/login`)

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
  
  const reportText = `UNARIA – Memòria Econòmica ${year}

1. INGRESSOS
   Quotes de socis i donacions: ${formatCurrency(totalIncome, 'EUR', 'ca')}

2. DESPESES OPERATIVES
   Costos de funcionament: ${formatCurrency(operatingCosts, 'EUR', 'ca')}

3. DESTINACIÓ DE FONS A ONG
   Total transferit a ONG: ${formatCurrency(totalTransferred, 'EUR', 'ca')}

4. SOCIS
   Socis actius a 31/12/${year}: ${activeMembers}
   Total socis registrats: ${totalMembers}

Tots els imports han estat verificats i estan disponibles per a consulta pública a unaria.org/transparencia`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('reports')}</h1>
          <p className="text-sm text-gray-500 mt-1">Dades per a la memòria de transparència d'Unaria</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Resum Executiu {year}</h2>
            <p className="text-xs text-gray-400">Dades acumulades des de l'1 de gener</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { label: 'Ingressos totals', value: formatCurrency(totalIncome, 'EUR', locale), note: 'Donacions i quotes rebudes', color: 'text-brand-blue' },
            { label: 'Transferit a ONG', value: formatCurrency(totalTransferred, 'EUR', locale), note: 'Fons enviats a projectes', color: 'text-brand-teal' },
            { label: 'Socis actius', value: String(activeMembers), note: `de ${totalMembers} registrats`, color: 'text-indigo-600' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{item.label}</div>
              <div className={`text-3xl font-black ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-2 font-medium">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Text per a la Memòria Anual</h2>
            <CopyButton text={reportText} />
          </div>
          <pre className="bg-gray-900 text-gray-300 rounded-xl p-6 font-mono text-xs leading-relaxed overflow-x-auto border border-gray-800 shadow-inner">
            {reportText}
          </pre>
        </div>

        <div className="card bg-brand-blue text-white border-none shadow-brand-blue/20 shadow-lg">
          <h3 className="font-bold mb-4">Estat de Transparència</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
              <p className="text-sm text-blue-100">Dades sincronitzades amb la base de dades en temps real.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
              <p className="text-sm text-blue-100">Càlcul de costos operatius basat en el superàvit no transferit.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] text-blue-300 leading-tight">
                Recorda que legalment s'ha de conservar la documentació comptable durant un mínim de 5 anys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

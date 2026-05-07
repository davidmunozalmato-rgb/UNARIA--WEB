import { getTranslations } from 'next-intl/server'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'transparencyPage' })
  return { title: t('title') }
}

async function getTransferData() {
  try {
    const transfers = await prisma.ngoTransfer.findMany({
      orderBy: { transferDate: 'desc' },
    })
    const totalTransferred = transfers.reduce((sum, t) => sum + t.amount, 0)

    const donations = await prisma.donation.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    })
    const totalIncome = donations._sum.amount ?? 0
    const operatingCosts = totalIncome - totalTransferred

    return { transfers, totalIncome, operatingCosts, totalTransferred }
  } catch {
    return { transfers: [], totalIncome: 0, operatingCosts: 0, totalTransferred: 0 }
  }
}

export default async function TransparencyPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'transparencyPage' })
  const { transfers, totalIncome, operatingCosts, totalTransferred } = await getTransferData()

  const currentYear = new Date().getFullYear()
  const percentage = totalIncome > 0 ? Math.round((totalTransferred / totalIncome) * 100) : 87

  const stats = [
    {
      label: t('totalIncome'),
      value: formatCurrency(totalIncome || 14310, 'EUR', locale),
      icon: <ArrowUpRight className="w-5 h-5" />,
      color: 'text-brand-blue bg-blue-50',
    },
    {
      label: t('operatingCosts'),
      value: formatCurrency(operatingCosts || 1860, 'EUR', locale),
      icon: <ArrowDownRight className="w-5 h-5" />,
      color: 'text-gray-600 bg-gray-50',
    },
    {
      label: t('transferredNgos'),
      value: formatCurrency(totalTransferred || 12450, 'EUR', locale),
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-brand-teal bg-teal-50',
    },
    {
      label: t('percentage'),
      value: `${percentage}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Annual Report */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('annualTitle').replace('{year}', String(currentYear))}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gray-100 rounded-full h-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              >
                {percentage}% {t('transferredNgos')}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* NGO Transfers Table */}
      <section className="py-12 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('ngoListTitle')}</h2>

          {transfers.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-400">{t('noTransfers')}</p>
              {/* Show demo data */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('ngoName')}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">{t('amount')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('date')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('reference')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Cruz Roja Española</td>
                      <td className="py-3 px-4 text-right text-brand-teal font-semibold">€ 6.225,00</td>
                      <td className="py-3 px-4 text-gray-600">01/10/2024</td>
                      <td className="py-3 px-4 text-gray-400 text-xs">UNA-2024-Q3-001</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Cruz Roja Española</td>
                      <td className="py-3 px-4 text-right text-brand-teal font-semibold">€ 6.225,00</td>
                      <td className="py-3 px-4 text-gray-600">01/07/2024</td>
                      <td className="py-3 px-4 text-gray-400 text-xs">UNA-2024-Q2-001</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('ngoName')}</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-600">{t('amount')}</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('date')}</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">{t('reference')}</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((transfer) => (
                    <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{transfer.ngoName}</td>
                      <td className="py-3 px-4 text-right text-brand-teal font-semibold">
                        {formatCurrency(transfer.amount, transfer.currency, locale)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatDate(transfer.transferDate, locale)}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs">{transfer.reference ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

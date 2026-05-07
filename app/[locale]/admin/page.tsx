import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import { Users, TrendingUp, ArrowRightLeft, CreditCard } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin Dashboard | Unaria' }

export default async function AdminDashboardPage({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/admin/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const [activeMembers, monthlyRevenueAgg, totalTransferredAgg, totalDonations] = await Promise.all([
    prisma.member.count({ where: { status: 'active' } }),
    prisma.member.aggregate({ where: { status: 'active' }, _sum: { monthlyQuota: true } }),
    prisma.ngoTransfer.aggregate({ _sum: { amount: true } }),
    prisma.donation.aggregate({ where: { status: 'completed' }, _sum: { amount: true } }),
  ])

  const stats = [
    {
      label: t('totalMembers'),
      value: activeMembers,
      icon: <Users className="w-6 h-6" />,
      color: 'text-brand-blue bg-blue-50',
    },
    {
      label: t('monthlyRevenue'),
      value: formatCurrency(monthlyRevenueAgg._sum.monthlyQuota ?? 0, 'EUR', locale),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-brand-teal bg-teal-50',
    },
    {
      label: t('totalDonated'),
      value: formatCurrency(totalTransferredAgg._sum.amount ?? 0, 'EUR', locale),
      icon: <ArrowRightLeft className="w-6 h-6" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Total donacions rebudes',
      value: formatCurrency(totalDonations._sum.amount ?? 0, 'EUR', locale),
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-amber-600 bg-amber-50',
    },
  ]

  const recentMembers = await prisma.member.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, name: true, surname: true, email: true, monthlyQuota: true, status: true, createdAt: true },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent members */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Darrers socis</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Nom</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Email</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Quota</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Estat</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium">{m.name} {m.surname}</td>
                  <td className="py-2.5 px-3 text-gray-600">{m.email}</td>
                  <td className="py-2.5 px-3 text-right text-brand-blue font-semibold">{m.monthlyQuota}€</td>
                  <td className="py-2.5 px-3">
                    <span className={`badge text-xs ${
                      m.status === 'active' ? 'bg-green-50 text-green-700' :
                      m.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

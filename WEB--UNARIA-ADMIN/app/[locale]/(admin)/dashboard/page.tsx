import prisma from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import { Users, TrendingUp, ArrowRightLeft, CreditCard, UserCheck, UserX } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard | Unaria Admin' }

export default async function DashboardPage() {
  const [
    activeMembers,
    pendingMembers,
    cancelledMembers,
    monthlyRevenueAgg,
    totalTransferredAgg,
    totalDonationsAgg,
    recentMembers,
    recentDonations,
  ] = await Promise.all([
    prisma.member.count({ where: { status: 'active' } }),
    prisma.member.count({ where: { status: 'pending' } }),
    prisma.member.count({ where: { status: 'cancelled' } }),
    prisma.member.aggregate({ where: { status: 'active' }, _sum: { monthlyQuota: true } }),
    prisma.ngoTransfer.aggregate({ _sum: { amount: true } }),
    prisma.donation.aggregate({ where: { status: 'completed' }, _sum: { amount: true } }),
    prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      select: { id: true, name: true, surname: true, email: true, monthlyQuota: true, status: true, createdAt: true },
    }),
    prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, donorName: true, donorEmail: true, amount: true, currency: true, type: true, status: true, createdAt: true },
    }),
  ])

  const stats = [
    {
      label: 'Socis actius',
      value: activeMembers,
      icon: <Users className="w-6 h-6" />,
      color: 'text-brand-blue bg-blue-50',
    },
    {
      label: 'Ingressos mensuals',
      value: formatCurrency(monthlyRevenueAgg._sum.monthlyQuota ?? 0, 'EUR', 'ca'),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-brand-teal bg-teal-50',
    },
    {
      label: 'Total transferit ONGs',
      value: formatCurrency(totalTransferredAgg._sum.amount ?? 0, 'EUR', 'ca'),
      icon: <ArrowRightLeft className="w-6 h-6" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Total donacions rebudes',
      value: formatCurrency(totalDonationsAgg._sum.amount ?? 0, 'EUR', 'ca'),
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Pendents validació',
      value: pendingMembers,
      icon: <UserCheck className="w-6 h-6" />,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: 'Baixes',
      value: cancelledMembers,
      icon: <UserX className="w-6 h-6" />,
      color: 'text-red-600 bg-red-50',
    },
  ]

  const statusColor: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    cancelled: 'bg-red-50 text-red-700',
    inactive: 'bg-gray-100 text-gray-600',
    completed: 'bg-green-50 text-green-700',
    failed: 'bg-red-50 text-red-700',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Resum general d'Unaria</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent members */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Darrers socis</h2>
            <a href="/members" className="text-sm text-brand-blue hover:underline">Veure tots →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {recentMembers.map((m) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 pr-3">
                      <div className="font-medium text-gray-900">{m.name} {m.surname}</div>
                      <div className="text-xs text-gray-400">{m.email}</div>
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-brand-blue whitespace-nowrap">{m.monthlyQuota}€</td>
                    <td className="py-2.5 pl-2">
                      <span className={`badge text-xs ${statusColor[m.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent donations */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Darreres donacions</h2>
            <a href="/donations" className="text-sm text-brand-blue hover:underline">Veure totes →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {recentDonations.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 pr-3">
                      <div className="font-medium text-gray-900">{d.donorName}</div>
                      <div className="text-xs text-gray-400">{d.donorEmail}</div>
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-brand-teal whitespace-nowrap">
                      {formatCurrency(d.amount, d.currency, 'ca')}
                    </td>
                    <td className="py-2.5 pl-2">
                      <span className={`badge text-xs ${statusColor[d.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

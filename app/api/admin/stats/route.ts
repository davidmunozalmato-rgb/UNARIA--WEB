import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [activeMembers, monthlyRevenue, totalTransferred, recentDonations] = await Promise.all([
    prisma.member.count({ where: { status: 'active' } }),
    prisma.member.aggregate({
      where: { status: 'active' },
      _sum: { monthlyQuota: true },
    }),
    prisma.ngoTransfer.aggregate({ _sum: { amount: true } }),
    prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        donorName: true,
        donorEmail: true,
        amount: true,
        type: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  return NextResponse.json({
    activeMembers,
    monthlyRevenue: monthlyRevenue._sum.monthlyQuota ?? 0,
    totalTransferred: totalTransferred._sum.amount ?? 0,
    recentDonations,
  })
}

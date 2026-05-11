import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendAnnualTransparencyEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const year = new Date().getFullYear() - 1

  const transfers = await prisma.ngoTransfer.findMany({
    where: {
      transferDate: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31T23:59:59`),
      },
    },
  })

  const totalTransferred = transfers.reduce((sum, t) => sum + t.amount, 0)
  const ngoNames = Array.from(new Set(transfers.map((t) => t.ngoName)))

  const activeMembers = await prisma.member.findMany({
    where: { status: 'active' },
    select: {
      id: true,
      name: true,
      email: true,
      preferredLocale: true,
      monthlyQuota: true,
    },
  })

  let sent = 0
  for (const member of activeMembers) {
    try {
      await sendAnnualTransparencyEmail({
        name: member.name,
        email: member.email,
        locale: member.preferredLocale,
        year,
        totalTransferred,
        ngoNames,
        totalMembers: activeMembers.length,
        personalContribution: member.monthlyQuota * 12,
      })
      sent++
    } catch (e) {
      console.error(`Failed to send annual email to ${member.email}:`, e)
    }
  }

  return NextResponse.json({ ok: true, sent, year, totalTransferred })
}

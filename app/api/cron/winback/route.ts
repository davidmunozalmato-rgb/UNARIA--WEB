import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendWinbackEmail } from '@/lib/email'
import { generateManageToken } from '@/lib/token'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Find members cancelled between 29 and 31 days ago, no winback sent yet
  const now = new Date()
  const from = new Date(now)
  from.setDate(from.getDate() - 31)
  const to = new Date(now)
  to.setDate(to.getDate() - 29)

  const candidates = await prisma.member.findMany({
    where: {
      status: 'cancelled',
      cancelledAt: { gte: from, lte: to },
      winbackEmailSentAt: null,
    },
  })

  let sent = 0
  for (const member of candidates) {
    try {
      const token = generateManageToken(member.id)
      await sendWinbackEmail({
        name: member.name,
        email: member.email,
        locale: member.preferredLocale,
        memberId: member.id,
        token,
      })
      await prisma.member.update({
        where: { id: member.id },
        data: { winbackEmailSentAt: new Date() },
      })
      sent++
    } catch (e) {
      console.error(`Failed to send winback to ${member.email}:`, e)
    }
  }

  return NextResponse.json({ ok: true, sent, candidates: candidates.length })
}

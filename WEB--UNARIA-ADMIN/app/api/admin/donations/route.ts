import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { donorName, donorEmail, amount, type = 'one_time', currency = 'EUR' } = body

  if (!donorName?.trim() || !donorEmail?.trim() || !amount) {
    return NextResponse.json({ error: 'Name, email and amount are required' }, { status: 400 })
  }

  const donation = await prisma.donation.create({
    data: {
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim().toLowerCase(),
      amount: parseFloat(amount),
      currency,
      type,
      status: 'completed',
      locale: 'ca',
    },
  })

  return NextResponse.json(donation, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { ngoName, amount, currency = 'EUR', transferDate, reference, notes } = body

  if (!ngoName?.trim() || !amount || !transferDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const transfer = await prisma.ngoTransfer.create({
    data: {
      ngoName: ngoName.trim(),
      amount: parseFloat(amount),
      currency,
      transferDate: new Date(transferDate),
      reference: reference?.trim() || null,
      notes: notes?.trim() || null,
    },
  })

  return NextResponse.json(transfer, { status: 201 })
}

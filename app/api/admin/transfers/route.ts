import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sendTransferNotification } from '@/lib/email'
import { z } from 'zod'

const transferSchema = z.object({
  ngoName: z.string().min(1).max(200),
  amount: z.number().min(0.01),
  transferDate: z.string(),
  reference: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const transfers = await prisma.ngoTransfer.findMany({
    orderBy: { transferDate: 'desc' },
  })
  return NextResponse.json(transfers)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = transferSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation error' }, { status: 422 })
  }

  const transfer = await prisma.ngoTransfer.create({
    data: {
      ngoName: parsed.data.ngoName,
      amount: parsed.data.amount,
      transferDate: new Date(parsed.data.transferDate),
      reference: parsed.data.reference,
      notes: parsed.data.notes,
    },
  })

  // Send internal notification
  try {
    await sendTransferNotification({
      ngoName: transfer.ngoName,
      amount: transfer.amount,
      transferDate: transfer.transferDate.toISOString().split('T')[0],
      reference: transfer.reference ?? undefined,
    })
  } catch (e) {
    console.error('Failed to send transfer notification:', e)
  }

  return NextResponse.json(transfer, { status: 201 })
}

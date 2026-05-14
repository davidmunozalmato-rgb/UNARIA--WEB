import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { status } = body

  const validStatuses = ['pending', 'active', 'inactive', 'paused', 'cancelled']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const member = await prisma.member.update({
    where: { id: params.id },
    data: {
      status,
      ...(status === 'cancelled' ? { cancelledAt: new Date() } : {}),
    },
    select: { id: true, status: true },
  })

  return NextResponse.json(member)
}

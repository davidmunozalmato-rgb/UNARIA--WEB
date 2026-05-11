import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? undefined
  const page = parseInt(searchParams.get('page') ?? '1')
  const pageSize = 25

  const where: any = {}
  if (status && status !== 'all') where.status = status
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { surname: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [members, total] = await Promise.all([
    prisma.member.findMany({
      where,
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        monthlyQuota: true,
        status: true,
        preferredLocale: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.member.count({ where }),
  ])

  return NextResponse.json({ members, total, page, pageSize })
}

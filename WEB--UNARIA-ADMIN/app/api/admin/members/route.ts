import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, surname, email, phone, monthlyQuota, status = 'active' } = body

  if (!name?.trim() || !surname?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name, surname and email are required' }, { status: 400 })
  }

  const existing = await prisma.member.findUnique({ where: { email: email.trim() } })
  if (existing) {
    return NextResponse.json({ error: 'Aquest email ja està registrat' }, { status: 409 })
  }

  const member = await prisma.member.create({
    data: {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      monthlyQuota: parseFloat(monthlyQuota) || 6,
      status,
      gdprConsent: true,
      gdprConsentAt: new Date(),
    },
  })

  return NextResponse.json(member, { status: 201 })
}

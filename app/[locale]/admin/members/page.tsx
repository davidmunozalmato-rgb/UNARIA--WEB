import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import prisma from '@/lib/prisma'
import MembersTable from './MembersTable'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
  searchParams: { search?: string; status?: string; page?: string }
}

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Socis | Unaria Admin' }

export default async function AdminMembersPage({ params: { locale }, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/admin/login`)

  const t = await getTranslations({ locale, namespace: 'admin' })

  const search = searchParams.search ?? ''
  const status = searchParams.status ?? 'all'
  const page = parseInt(searchParams.page ?? '1')
  const pageSize = 25

  const where: any = {}
  if (status !== 'all') where.status = status
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('members')}</h1>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>
      <MembersTable members={members} total={total} page={page} pageSize={pageSize} locale={locale} />
    </div>
  )
}

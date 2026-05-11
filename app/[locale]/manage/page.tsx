import { verifyManageToken } from '@/lib/token'
import prisma from '@/lib/prisma'
import ManageSubscription from './ManageSubscription'

interface Props {
  params: { locale: string }
  searchParams: { id?: string; token?: string }
}

export default async function ManagePage({ params, searchParams }: Props) {
  const { locale } = params
  const { id, token } = searchParams

  if (!id || !token || !verifyManageToken(id, token)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full text-center py-12 px-8 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Enllaç no vàlid</h2>
          <p className="text-gray-500 text-sm">Aquest enllaç no és vàlid o ha caducat. Si necessites ajuda, escriu-nos a hola@unaria.org.</p>
        </div>
      </div>
    )
  }

  const member = await prisma.member.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      monthlyQuota: true,
      status: true,
      pausedUntil: true,
    },
  })

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full text-center py-12 px-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Soci no trobat</h2>
          <p className="text-gray-500 text-sm">No hem trobat cap soci associat a aquest enllaç.</p>
        </div>
      </div>
    )
  }

  return (
    <ManageSubscription
      member={{
        id: member.id,
        name: member.name,
        monthlyQuota: member.monthlyQuota,
        status: member.status,
        pausedUntil: member.pausedUntil?.toISOString() ?? null,
      }}
      locale={locale}
      token={token}
    />
  )
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SessionProvider from '@/components/SessionProvider'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ 
  children,
  params: { locale }
}: { 
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(`/${locale}/login`)

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar locale={locale} />
        <main className="md:ml-64 p-4 sm:p-6 lg:p-8 pt-20 md:pt-8 min-h-screen">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}

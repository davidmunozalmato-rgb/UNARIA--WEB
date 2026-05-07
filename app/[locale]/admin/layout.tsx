import AdminSidebar from './AdminSidebar'
import SessionProvider from '@/components/SessionProvider'

interface AdminLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function AdminLayout({ children, params: { locale } }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar locale={locale} />
        <main className="md:ml-64 p-4 sm:p-6 lg:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}

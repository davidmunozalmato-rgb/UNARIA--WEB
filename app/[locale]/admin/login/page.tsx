'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Heart, Loader2, Lock } from 'lucide-react'

interface PageProps {
  params: { locale: string }
}

export default function AdminLoginPage({ params: { locale } }: PageProps) {
  const t = useTranslations('admin')
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError(t('loginError'))
    } else {
      router.push(`/${locale}/admin`)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Unaria</h1>
          <p className="text-gray-500 text-sm mt-1">{t('login')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">{t('loginEmail')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="form-label">{t('loginPassword')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Accedint...</>
            ) : (
              t('loginBtn')
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

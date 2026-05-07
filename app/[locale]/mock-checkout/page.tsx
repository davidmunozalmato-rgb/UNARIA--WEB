'use client'

import React, { useState } from 'react'
import { Lock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function MockCheckoutContent({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams.get('amount') || '0'
  const email = searchParams.get('email') || ''
  const type = searchParams.get('type') || 'donate'

  const [loading, setLoading] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const returnPath = type === 'member' ? 'become-member' : 'donate'
      router.push(`/${locale}/${returnPath}?success=1&email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full overflow-hidden">
        {/* Warning banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-amber-800 text-xs font-medium">
          Entorn de simulació — Stripe no configurat
        </div>

        {/* Summary */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Unaria</p>
              <p className="text-2xl font-extrabold text-gray-900">{amount}.00 €</p>
            </div>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-bold text-white text-lg">U</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Correu</label>
            <input type="email" value={email} readOnly className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Targeta (simulada)</label>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <input type="text" defaultValue="4242 4242 4242 4242" className="w-full px-3 py-2.5 text-sm border-b border-gray-200 focus:outline-none" />
              <div className="flex">
                <input type="text" defaultValue="12/34" className="w-1/2 px-3 py-2.5 text-sm border-r border-gray-200 focus:outline-none" />
                <input type="text" defaultValue="123" className="w-1/2 px-3 py-2.5 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processant...</> : <>Pagar {amount}.00 €</>}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <Lock className="w-3.5 h-3.5" />
            Simulació local — cap dada real enviada
          </div>
        </form>

        <div className="px-6 pb-5">
          <Link href={`/${locale}`} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Tornar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MockCheckoutPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <MockCheckoutContent params={params} />
    </Suspense>
  )
}

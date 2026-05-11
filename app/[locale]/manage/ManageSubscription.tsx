'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MemberData {
  id: string
  name: string
  monthlyQuota: number
  status: string
  pausedUntil: string | null
}

interface Props {
  member: MemberData
  locale: string
  token: string
}

type ActionState = 'idle' | 'loading' | 'paused' | 'cancelled' | 'error'

export default function ManageSubscription({ member, locale, token }: Props) {
  const [state, setState] = useState<ActionState>('idle')
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleAction(action: 'pause' | 'cancel') {
    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/members/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: member.id, token, action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error del servidor')
      setState(action === 'pause' ? 'paused' : 'cancelled')
    } catch (err: any) {
      setErrorMsg(err.message)
      setState('error')
    }
  }

  const isPaused = member.status === 'paused'
  const pausedUntilDate = member.pausedUntil
    ? new Date(member.pausedUntil).toLocaleDateString(
        locale === 'ca' ? 'ca-ES' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : 'en-GB',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : null

  if (state === 'paused') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full text-center py-12 px-8 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Subscripció pausada</h2>
          <p className="text-gray-500 text-sm">Hem pausat la teva subscripció per 30 dies. Rebràs un email de confirmació.</p>
          <Link href={`/${locale}`} className="inline-block mt-6 text-sm text-[#1B4F72] hover:underline">Tornar a l'inici</Link>
        </div>
      </div>
    )
  }

  if (state === 'cancelled') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full text-center py-12 px-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Baixa confirmada</h2>
          <p className="text-gray-500 text-sm">La teva baixa ha estat processada. Gràcies per tot el temps que has format part d'Unaria.</p>
          <Link href={`/${locale}`} className="inline-block mt-6 text-sm text-[#1B4F72] hover:underline">Tornar a l'inici</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full py-10 px-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Gestiona la teva subscripció</h1>
          <p className="text-gray-500 text-sm mt-1">Hola, {member.name}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-700 border border-gray-100">
          <div className="flex justify-between">
            <span>Quota mensual</span>
            <span className="font-semibold">{member.monthlyQuota}€/mes</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Estat</span>
            <span className={`font-semibold ${isPaused ? 'text-yellow-600' : 'text-green-600'}`}>
              {isPaused ? `Pausada fins ${pausedUntilDate}` : 'Activa'}
            </span>
          </div>
        </div>

        {state === 'error' && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {errorMsg}
          </div>
        )}

        {!isPaused && !confirmCancel && (
          <div className="space-y-3">
            <button
              onClick={() => handleAction('pause')}
              disabled={state === 'loading'}
              className="w-full py-3 px-4 bg-[#1B4F72] text-white font-semibold rounded-xl hover:bg-[#163e5a] transition-colors disabled:opacity-50"
            >
              {state === 'loading' ? 'Processant...' : 'Pausar 1 mes (recomanat)'}
            </button>
            <button
              onClick={() => setConfirmCancel(true)}
              className="w-full py-3 px-4 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors text-sm"
            >
              Vull cancel·lar definitivament
            </button>
          </div>
        )}

        {confirmCancel && (
          <div className="space-y-3">
            <div className="bg-red-50 rounded-xl p-4 text-sm text-red-700 text-center">
              Segur que vols cancel·lar? Perdràs l'impacte dels propers mesos.
            </div>
            <button
              onClick={() => handleAction('cancel')}
              disabled={state === 'loading'}
              className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {state === 'loading' ? 'Processant...' : 'Sí, cancel·lar la subscripció'}
            </button>
            <button
              onClick={() => setConfirmCancel(false)}
              className="w-full py-3 px-4 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Torna enrere
            </button>
          </div>
        )}

        {isPaused && !confirmCancel && (
          <div className="space-y-3">
            <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-800 text-center">
              La teva subscripció reprèn automàticament el {pausedUntilDate}.
            </div>
            <button
              onClick={() => setConfirmCancel(true)}
              className="w-full py-3 px-4 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors text-sm"
            >
              Vull cancel·lar definitivament
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Necessites ajuda? <a href="mailto:hola@unaria.org" className="text-[#1B4F72] hover:underline">hola@unaria.org</a>
        </p>
      </div>
    </div>
  )
}

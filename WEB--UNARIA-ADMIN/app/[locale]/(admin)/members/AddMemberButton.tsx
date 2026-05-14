'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, X, Copy, Check, ExternalLink } from 'lucide-react'

type Step = 'form' | 'confirm'

export default function AddMemberButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [memberName, setMemberName] = useState('')
  const [copied, setCopied] = useState(false)

  function handleClose() {
    setOpen(false)
    setStep('form')
    setError('')
    setCheckoutUrl('')
    setMemberName('')
    setCopied(false)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(checkoutUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name') as string
    const surname = fd.get('surname') as string
    const body = {
      name,
      surname,
      email: fd.get('email'),
      phone: fd.get('phone') || null,
      monthlyQuota: fd.get('monthlyQuota'),
      status: 'pending',
    }
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setCheckoutUrl(data.checkoutUrl ?? '')
      setMemberName(`${name} ${surname}`)
      setStep('confirm')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar el soci')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary px-5 py-2.5 flex items-center gap-2 text-sm"
      >
        <UserPlus className="w-4 h-4" />
        Nou soci
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={step === 'form' ? handleClose : undefined} />

          {/* ── STEP 1: Formulari ── */}
          {step === 'form' && (
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Registrar nou soci</h2>
                <button type="button" onClick={handleClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">Nom *</label>
                    <input name="name" required className="form-input" placeholder="Joan" autoFocus />
                  </div>
                  <div>
                    <label className="form-label">Cognoms *</label>
                    <input name="surname" required className="form-input" placeholder="Garcia Pérez" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input name="email" type="email" required className="form-input" placeholder="joan@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">Telèfon</label>
                    <input name="phone" type="tel" className="form-input" placeholder="612 345 678" />
                  </div>
                  <div>
                    <label className="form-label">Quota mensual (€)</label>
                    <input name="monthlyQuota" type="number" step="0.01" min="1" defaultValue="6" className="form-input" />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={handleClose} className="btn-secondary flex-1 py-2.5 text-sm">
                    Cancel·lar
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-60">
                    {loading ? 'Creant compte...' : 'Registrar soci →'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── STEP 2: Confirmació ── */}
          {step === 'confirm' && (
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{memberName}</p>
                  <p className="text-sm text-gray-500">Soci registrat correctament</p>
                </div>
              </div>

              {checkoutUrl ? (
                <>
                  <p className="text-sm text-gray-500 mb-3">
                    Envia l&apos;enllaç de pagament al soci per activar la quota mensual:
                  </p>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-4">
                    <span className="text-xs text-gray-400 truncate flex-1">{checkoutUrl}</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiat!' : 'Copiar link'}
                    </button>
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Obrir
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-4">
                  Stripe no està configurat. Quan afegeixis les claus a Vercel, podràs generar l&apos;enllaç de pagament.
                </p>
              )}

              <button onClick={handleClose} className="w-full btn-primary py-2.5 text-sm">
                Tancar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, X, QrCode, Copy, Check, ExternalLink } from 'lucide-react'

type Step = 'form' | 'payment'

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
      setStep('payment')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar el soci')
    } finally {
      setLoading(false)
    }
  }

  const qrUrl = checkoutUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(checkoutUrl)}`
    : ''

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

          {/* ── STEP 1: Form ── */}
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
                    {loading ? 'Creant compte...' : 'Registrar i generar pagament →'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── STEP 2: Payment QR or no-Stripe confirmation ── */}
          {step === 'payment' && (
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${checkoutUrl ? 'bg-green-50' : 'bg-blue-50'}`}>
                {checkoutUrl
                  ? <QrCode className="w-6 h-6 text-green-600" />
                  : <Check className="w-6 h-6 text-blue-600" />
                }
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Soci registrat ✓
              </h2>

              {checkoutUrl ? (
                <>
                  <p className="text-sm text-gray-500 mb-5">
                    Fes que <span className="font-semibold text-gray-700">{memberName}</span> escanegi el QR per activar el pagament mensual
                  </p>

                  <div className="flex justify-center mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrUrl}
                      alt="QR pagament Stripe"
                      width={220}
                      height={220}
                      className="rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>

                  <p className="text-[11px] text-gray-400 mb-4">
                    El soci pot pagar amb targeta o SEPA (IBAN)
                  </p>

                  <div className="flex gap-2 mb-3">
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
                      Obrir link
                    </a>
                  </div>
                </>
              ) : (
                <div className="mb-5">
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700">{memberName}</span> s&apos;ha guardat correctament com a soci.
                  </p>
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                    Stripe no està configurat encara. Quan afegeixis les claus de Stripe a Vercel, podràs generar l&apos;enllaç de pagament des del llistat de socis.
                  </p>
                </div>
              )}

              <button
                onClick={handleClose}
                className="w-full btn-primary py-2.5 text-sm"
              >
                Fet — Tancar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Lock, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

const AMOUNT_OPTIONS = [10, 25, 50, 100, 200]

export default function DonateForm({ locale }: { locale: string }) {
  const t = useTranslations('donate')
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amount = customAmount ? Number(customValue) : selectedAmount

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!gdpr) { setError('GDPR consent required'); return }
    if (!name || !email || amount < 1) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, amount, locale }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Server error')
      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t('title')}</h1>
          <p className="text-blue-100">{t('subtitle')}</p>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Amount */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('amountTitle')}</h2>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {AMOUNT_OPTIONS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(false) }}
                  className={`py-3 rounded-xl font-bold transition-all border-2 text-sm ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                  }`}
                >
                  {amt}€
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCustomAmount(true)}
                className={`py-3 rounded-xl font-bold transition-all border-2 text-sm ${
                  customAmount
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                }`}
              >
                {t('amountOther')}
              </button>
            </div>
            {customAmount && (
              <input
                type="number"
                min={1}
                className="form-input w-32"
                placeholder="€"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
              />
            )}
          </div>

          {/* Personal data */}
          <div className="card">
            <div className="space-y-4">
              <div>
                <label className="form-label">{t('nameLabel')} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">{t('emailLabel')} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* GDPR */}
          <div className="card">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={(e) => setGdpr(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">{t('gdprText')}</span>
            </label>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-500 text-center">{t('oneTimeNote')}</p>
          <p className="text-xs text-gray-400 text-center">
            <Link href={`/${locale}/become-member`} className="text-brand-blue hover:underline">
              Fes-te soci →
            </Link>
          </p>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !gdpr}
            className="btn-teal w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processant...</>
            ) : (
              <>{t('submitBtn')}</>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock className="w-3.5 h-3.5" />
            {t('securePayment')}
          </div>
        </form>
      </div>
    </div>
  )
}

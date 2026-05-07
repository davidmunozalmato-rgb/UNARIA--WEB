'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Lock, Loader2, Heart, ArrowRight, CheckCircle } from 'lucide-react'
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
      if (!res.ok) {
        if (json.details?.fieldErrors) {
          const errors = Object.values(json.details.fieldErrors).flat()
          throw new Error(errors.join(', '))
        }
        throw new Error(json.error ?? 'Server error')
      }
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
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{t('title')}</h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-white border-b border-gray-100 py-3 px-5">
        <div className="max-w-lg mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          {['87% va a ONG', 'Pagament segur', 'Sense comissions'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="bg-brand-gray min-h-[calc(100vh-200px)]">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Amount selector */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">{t('amountTitle')}</h2>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {AMOUNT_OPTIONS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(false) }}
                    className={`py-3 rounded-xl font-bold transition-all border-2 text-sm ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md scale-105'
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
                      ? 'bg-brand-blue text-white border-brand-blue shadow-md scale-105'
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
                  className="form-input w-36"
                  placeholder="€ import"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  autoFocus
                />
              )}
              {/* Selected amount summary */}
              {!customAmount && (
                <p className="text-sm text-brand-teal font-semibold mt-3 text-center">
                  Donaràs <span className="text-xl font-extrabold">{amount}€</span> a projectes humanitaris
                </p>
              )}
            </div>

            {/* Personal data */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Les teves dades</h2>
              <div className="space-y-3">
                <div>
                  <label className="form-label">{t('nameLabel')} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Nom complet"
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
                    placeholder="correu@exemple.com"
                  />
                </div>
              </div>
            </div>

            {/* GDPR */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={(e) => setGdpr(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer flex-shrink-0"
                />
                <span className="text-xs text-gray-600 leading-relaxed">{t('gdprText')}</span>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !gdpr}
              className="w-full py-4 bg-brand-teal text-white font-extrabold rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processant...</>
              ) : (
                <>{t('submitBtn')} <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              {t('securePayment')}
            </div>

            <p className="text-xs text-gray-400 text-center">
              {t('oneTimeNote')}{' '}
              <Link href={`/${locale}/become-member`} className="text-brand-blue font-medium hover:underline">
                Fes-te soci →
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

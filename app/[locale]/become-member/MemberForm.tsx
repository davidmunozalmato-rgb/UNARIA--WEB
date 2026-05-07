'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, CreditCard, Building, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const QUOTA_OPTIONS = [6, 10, 12, 15, 20, 25, 30]

const memberSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  idNumber: z.string().min(1),
  monthlyQuota: z.number().min(6),
  paymentMethod: z.enum(['sepa', 'card']),
  iban: z.string().optional(),
  gdprRequired: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
  gdprMarketing: z.boolean(),
})

type MemberFormData = z.infer<typeof memberSchema>

export default function MemberForm({ locale }: { locale: string }) {
  const t = useTranslations('becomeMember')
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [customQuota, setCustomQuota] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      monthlyQuota: 10,
      paymentMethod: 'card',
      gdprRequired: undefined,
      gdprMarketing: false,
    },
  })

  const quota = watch('monthlyQuota')
  const paymentMethod = watch('paymentMethod')

  async function onConfirm(data: MemberFormData) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? 'Server error')

      if (data.paymentMethod === 'card' && json.checkoutUrl) {
        window.location.href = json.checkoutUrl
        return
      }

      setSubmittedEmail(data.email)
      setStep('success')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full text-center py-12 px-8 shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{t('successTitle')}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{t('successText').replace('{email}', submittedEmail)}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue-dark transition-all"
          >
            Tornar a l'inici
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{t('title')}</h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── STEP INDICATOR ── */}
      <div className="bg-white border-b border-gray-100 py-3 px-5">
        <div className="max-w-lg mx-auto flex items-center justify-center gap-2 text-xs">
          {[t('stepForm') || 'Dades', t('stepConfirm') || 'Confirmació'].map((label, i) => {
            const stepIndex = step === 'form' ? 0 : 1
            return (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-gray-300" />}
                <div className={`flex items-center gap-1.5 ${stepIndex === i ? 'text-brand-blue font-semibold' : stepIndex > i ? 'text-brand-teal' : 'text-gray-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stepIndex === i ? 'bg-brand-blue text-white' : stepIndex > i ? 'bg-brand-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {stepIndex > i ? '✓' : i + 1}
                  </div>
                  {label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-brand-gray min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

          {step === 'form' && (
            <form onSubmit={handleSubmit(() => setStep('confirm'))} className="space-y-4">

              {/* Quota selector */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-extrabold text-gray-900 mb-4">{t('quotaTitle')}</h2>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {QUOTA_OPTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => { setValue('monthlyQuota', q); setCustomQuota(false) }}
                      className={`relative py-3 rounded-xl font-bold transition-all border-2 text-sm ${
                        quota === q && !customQuota
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md scale-105'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                      }`}
                    >
                      {q}€
                      {q === 10 && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-teal text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          Popular
                        </span>
                      )}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCustomQuota(true)}
                    className={`py-3 rounded-xl font-bold transition-all border-2 text-xs ${
                      customQuota
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                    }`}
                  >
                    {t('quotaOther')}
                  </button>
                </div>
                {customQuota && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min={6}
                      className="form-input w-32"
                      placeholder="€ (mínim 6)"
                      onChange={(e) => setValue('monthlyQuota', Number(e.target.value))}
                      autoFocus
                    />
                    <span className="text-xs text-gray-500">{t('quotaMin')}</span>
                  </div>
                )}
                <p className="text-sm text-brand-teal font-semibold mt-3 text-center">
                  {quota}€{t('monthlyLabel')} · <span className="text-gray-500 font-normal">{quota * 12}€/any</span>
                </p>
              </div>

              {/* Personal data */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-extrabold text-gray-900 mb-4">{t('personalTitle')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">{t('name')} *</label>
                    <input {...register('name')} className="form-input" placeholder="Nom" />
                    {errors.name && <p className="form-error">{t('required')}</p>}
                  </div>
                  <div>
                    <label className="form-label">{t('surname')} *</label>
                    <input {...register('surname')} className="form-input" placeholder="Cognoms" />
                    {errors.surname && <p className="form-error">{t('required')}</p>}
                  </div>
                  <div>
                    <label className="form-label">{t('email')} *</label>
                    <input {...register('email')} type="email" className="form-input" placeholder="correu@exemple.com" />
                    {errors.email && <p className="form-error">{t('invalidEmail')}</p>}
                  </div>
                  <div>
                    <label className="form-label">{t('phone')}</label>
                    <input {...register('phone')} type="tel" className="form-input" placeholder="6xx xxx xxx" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label">{t('address')}</label>
                    <input {...register('address')} className="form-input" placeholder="Carrer, número, pis..." />
                  </div>
                  <div>
                    <label className="form-label">{t('city')}</label>
                    <input {...register('city')} className="form-input" placeholder="Ciutat" />
                  </div>
                  <div>
                    <label className="form-label">{t('postalCode')}</label>
                    <input {...register('postalCode')} className="form-input" placeholder="08001" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label">{t('idNumber')} *</label>
                    <input {...register('idNumber')} className="form-input" placeholder="DNI / NIE / Passaport" />
                    {errors.idNumber && <p className="form-error">{t('required')}</p>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-extrabold text-gray-900 mb-4">{t('paymentTitle')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { value: 'sepa', icon: Building, label: t('paymentSepa') },
                    { value: 'card', icon: CreditCard, label: t('paymentCard') },
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setValue('paymentMethod', value as 'sepa' | 'card')}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                        paymentMethod === value
                          ? 'border-brand-blue bg-blue-50'
                          : 'border-gray-200 hover:border-brand-blue bg-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${paymentMethod === value ? 'text-brand-blue' : 'text-gray-400'}`} />
                      <span className={`font-semibold text-sm ${paymentMethod === value ? 'text-brand-blue' : 'text-gray-700'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
                {paymentMethod === 'sepa' && (
                  <div>
                    <label className="form-label">{t('ibanLabel')} *</label>
                    <input
                      {...register('iban')}
                      className="form-input font-mono"
                      placeholder={t('ibanPlaceholder')}
                    />
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <p className="text-sm text-gray-500 flex items-center gap-2 bg-blue-50 rounded-xl p-3">
                    <CreditCard className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    {t('processingCard')}
                  </p>
                )}
              </div>

              {/* GDPR */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="text-base font-extrabold text-gray-900 mb-3">{t('gdprTitle')}</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('gdprRequired')}
                      className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">{t('gdprRequired')}</span>
                  </label>
                  {errors.gdprRequired && (
                    <p className="form-error ml-7">{t('required')}</p>
                  )}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('gdprMarketing')}
                      className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">{t('gdprMarketing')}</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-blue text-white font-extrabold rounded-xl hover:bg-brand-blue-dark transition-all shadow-lg text-base flex items-center justify-center gap-2"
              >
                {t('submitBtn')} <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 'confirm' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">{t('confirmTitle')}</h2>
              {(() => {
                const data = getValues()
                const rows = [
                  { label: t('name'), value: `${data.name} ${data.surname}` },
                  { label: t('email'), value: data.email },
                  { label: 'Quota', value: <span className="text-brand-blue font-extrabold">{data.monthlyQuota}€/mes</span> },
                  { label: t('idNumber'), value: data.idNumber },
                  { label: t('paymentTitle'), value: data.paymentMethod === 'sepa' ? `SEPA · ${data.iban}` : 'Targeta bancària' },
                ]
                return (
                  <div className="space-y-3 mb-6">
                    {rows.map((row, i) => (
                      <div key={i} className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0 text-sm">
                        <span className="text-gray-500 flex-shrink-0">{row.label}</span>
                        <span className="font-semibold text-gray-900 text-right">{row.value}</span>
                      </div>
                    ))}
                  </div>
                )
              })()}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('form')}
                  className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-all text-sm"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4" /> {t('backBtn')}
                </button>
                <button
                  onClick={handleSubmit(onConfirm)}
                  disabled={loading}
                  className="flex-1 py-3 bg-brand-teal text-white font-extrabold rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processant...</>
                  ) : (
                    <>{t('confirmBtn')} <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

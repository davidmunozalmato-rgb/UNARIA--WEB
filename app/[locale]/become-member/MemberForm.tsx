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
        <div className="card max-w-md w-full text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('successTitle')}</h2>
          <p className="text-gray-600">{t('successText').replace('{email}', submittedEmail)}</p>
          <Link href={`/${locale}`} className="btn-primary mt-8">
            Tornar a l'inici
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t('title')}</h1>
          <p className="text-blue-100">{t('subtitle')}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {step === 'form' && (
          <form onSubmit={handleSubmit(() => setStep('confirm'))} noValidate>
            {/* Quota selector */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('quotaTitle')}</h2>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {QUOTA_OPTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => { setValue('monthlyQuota', q); setCustomQuota(false) }}
                    className={`py-3 rounded-xl font-bold transition-all border-2 text-sm ${
                      quota === q && !customQuota
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                    }`}
                  >
                    {q}€
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCustomQuota(true)}
                  className={`py-3 rounded-xl font-bold transition-all border-2 text-sm col-span-1 ${
                    customQuota
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue'
                  }`}
                >
                  {t('quotaOther')}
                </button>
              </div>
              {customQuota && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={6}
                    className="form-input w-32"
                    placeholder="€"
                    onChange={(e) => setValue('monthlyQuota', Number(e.target.value))}
                  />
                  <span className="text-sm text-gray-500">{t('quotaMin')}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3">
                {quota}€{t('monthlyLabel')}
              </p>
            </div>

            {/* Personal data */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('personalTitle')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{t('name')} *</label>
                  <input {...register('name')} className="form-input" />
                  {errors.name && <p className="form-error">{t('required')}</p>}
                </div>
                <div>
                  <label className="form-label">{t('surname')} *</label>
                  <input {...register('surname')} className="form-input" />
                  {errors.surname && <p className="form-error">{t('required')}</p>}
                </div>
                <div>
                  <label className="form-label">{t('email')} *</label>
                  <input {...register('email')} type="email" className="form-input" />
                  {errors.email && <p className="form-error">{t('invalidEmail')}</p>}
                </div>
                <div>
                  <label className="form-label">{t('phone')}</label>
                  <input {...register('phone')} type="tel" className="form-input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">{t('address')}</label>
                  <input {...register('address')} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('city')}</label>
                  <input {...register('city')} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t('postalCode')}</label>
                  <input {...register('postalCode')} className="form-input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">{t('idNumber')} *</label>
                  <input {...register('idNumber')} className="form-input" />
                  {errors.idNumber && <p className="form-error">{t('required')}</p>}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('paymentTitle')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setValue('paymentMethod', 'sepa')}
                  className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'sepa'
                      ? 'border-brand-blue bg-blue-50'
                      : 'border-gray-200 hover:border-brand-blue'
                  }`}
                >
                  <Building className={`w-5 h-5 ${paymentMethod === 'sepa' ? 'text-brand-blue' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold text-sm ${paymentMethod === 'sepa' ? 'text-brand-blue' : 'text-gray-700'}`}>
                      {t('paymentSepa')}
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('paymentMethod', 'card')}
                  className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-blue bg-blue-50'
                      : 'border-gray-200 hover:border-brand-blue'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-brand-blue' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold text-sm ${paymentMethod === 'card' ? 'text-brand-blue' : 'text-gray-700'}`}>
                      {t('paymentCard')}
                    </div>
                  </div>
                </button>
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
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {t('processingCard')}
                </p>
              )}
            </div>

            {/* GDPR */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('gdprTitle')}</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('gdprRequired')}
                    className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">{t('gdprRequired')}</span>
                </label>
                {errors.gdprRequired && (
                  <p className="form-error ml-7">{t('required')}</p>
                )}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('gdprMarketing')}
                    className="w-4 h-4 mt-0.5 accent-brand-blue cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">{t('gdprMarketing')}</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
            >
              {t('submitBtn')} <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {step === 'confirm' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('confirmTitle')}</h2>
            {(() => {
              const data = getValues()
              return (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500">{t('name')}:</span> <strong>{data.name}</strong></div>
                    <div><span className="text-gray-500">{t('surname')}:</span> <strong>{data.surname}</strong></div>
                    <div><span className="text-gray-500">{t('email')}:</span> <strong>{data.email}</strong></div>
                    <div><span className="text-gray-500">Quota:</span> <strong className="text-brand-blue">{data.monthlyQuota}€/mes</strong></div>
                    <div><span className="text-gray-500">{t('idNumber')}:</span> <strong>{data.idNumber}</strong></div>
                    <div><span className="text-gray-500">{t('paymentTitle')}:</span> <strong>{data.paymentMethod === 'sepa' ? 'SEPA' : 'Targeta'}</strong></div>
                  </div>
                </div>
              )
            })()}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep('form')}
                className="btn-secondary flex items-center gap-2"
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4" /> {t('backBtn')}
              </button>
              <button
                onClick={handleSubmit(onConfirm)}
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
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
  )
}

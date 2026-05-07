'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Plus, Loader2 } from 'lucide-react'

export default function AddTransferForm({ locale }: { locale: string }) {
  const t = useTranslations('admin')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    ngoName: '',
    amount: '',
    transferDate: new Date().toISOString().split('T')[0],
    reference: '',
    notes: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      if (res.ok) {
        setOpen(false)
        setForm({ ngoName: '', amount: '', transferDate: new Date().toISOString().split('T')[0], reference: '', notes: '' })
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('addTransfer')}
        </button>
      ) : (
        <div className="card border-brand-blue/20 border-2">
          <h3 className="font-bold text-gray-900 mb-4">{t('addTransfer')}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">{t('ngoName')} *</label>
              <input
                required
                value={form.ngoName}
                onChange={(e) => setForm({ ...form, ngoName: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t('amount')} *</label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t('transferDate')} *</label>
              <input
                type="date"
                required
                value={form.transferDate}
                onChange={(e) => setForm({ ...form, transferDate: e.target.value })}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t('reference')}</label>
              <input
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">{t('notes')}</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="form-input"
                rows={2}
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-secondary"
                disabled={loading}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {t('save')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

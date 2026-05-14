'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, X } from 'lucide-react'

export default function AddDonationButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleClose() {
    setOpen(false)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const body = {
      donorName: fd.get('donorName'),
      donorEmail: fd.get('donorEmail'),
      amount: fd.get('amount'),
      type: fd.get('type'),
    }
    try {
      const res = await fetch('/api/admin/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      handleClose()
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar la donació')
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
        <PlusCircle className="w-4 h-4" />
        Nova donació
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Registrar donació manual</h2>
              <button type="button" onClick={handleClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nom del donant *</label>
                <input name="donorName" required className="form-input" placeholder="Maria López" autoFocus />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input name="donorEmail" type="email" required className="form-input" placeholder="maria@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Import (€) *</label>
                  <input name="amount" type="number" step="0.01" min="0.01" required className="form-input" placeholder="20.00" />
                </div>
                <div>
                  <label className="form-label">Tipus</label>
                  <select name="type" className="form-input">
                    <option value="one_time">Donació única</option>
                    <option value="subscription">Quota mensual</option>
                  </select>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
                El registre manual marca la donació com a <strong>completada</strong>. Usa-ho per a pagaments en efectiu o transferències presencials.
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={handleClose} className="btn-secondary flex-1 py-2.5 text-sm">
                  Cancel·lar
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-60">
                  {loading ? 'Guardant...' : 'Registrar donació'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

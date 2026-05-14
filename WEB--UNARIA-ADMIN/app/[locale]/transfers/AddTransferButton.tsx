'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

export default function AddTransferButton({ label }: { label: string }) {
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
      ngoName: fd.get('ngoName'),
      amount: fd.get('amount'),
      transferDate: fd.get('transferDate'),
      reference: fd.get('reference') || null,
      notes: fd.get('notes') || null,
    }
    try {
      const res = await fetch('/api/admin/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      handleClose()
      router.refresh()
    } catch {
      setError('Error al guardar la transferència. Torna-ho a intentar.')
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
        <Plus className="w-4 h-4" />
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Nova transferència ONG</h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Nom de l&apos;ONG *</label>
                <input
                  name="ngoName"
                  required
                  className="form-input"
                  placeholder="ex. Save the Children"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Import (€) *</label>
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    className="form-input"
                    placeholder="500.00"
                  />
                </div>
                <div>
                  <label className="form-label">Data *</label>
                  <input
                    name="transferDate"
                    type="date"
                    required
                    className="form-input"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Referència</label>
                <input
                  name="reference"
                  className="form-input"
                  placeholder="ex. TRF-2025-001"
                />
              </div>
              <div>
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="form-input resize-none"
                  placeholder="Descripció del projecte o motiu..."
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary flex-1 py-2.5 text-sm"
                >
                  Cancel·lar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-60"
                >
                  {loading ? 'Guardant...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

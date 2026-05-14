'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, X } from 'lucide-react'

export default function AddMemberButton() {
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
      name: fd.get('name'),
      surname: fd.get('surname'),
      email: fd.get('email'),
      phone: fd.get('phone') || null,
      monthlyQuota: fd.get('monthlyQuota'),
      status: fd.get('status'),
    }
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      handleClose()
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar el soci')
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
          <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
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
              <div>
                <label className="form-label">Estat inicial</label>
                <select name="status" className="form-input">
                  <option value="active">Actiu</option>
                  <option value="pending">Pendent</option>
                </select>
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={handleClose} className="btn-secondary flex-1 py-2.5 text-sm">
                  Cancel·lar
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-60">
                  {loading ? 'Guardant...' : 'Registrar soci'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

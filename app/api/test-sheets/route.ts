import { NextResponse } from 'next/server'
import { appendPaymentRow } from '@/lib/sheets'

// Only available in development
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  await appendPaymentRow({
    date: new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' }),
    type: 'Donació puntual',
    name: 'Test Usuari',
    email: 'test@unaria.org',
    amount: 25,
    currency: 'EUR',
    status: 'Completat',
    reference: 'test_' + Date.now(),
  })

  return NextResponse.json({ ok: true, message: 'Fila afegida al full de càlcul' })
}

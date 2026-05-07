import { NextRequest } from 'next/server'

const store = new Map<string, { count: number; reset: number }>()

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '10')
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW || '60000')

export function rateLimit(request: NextRequest): { success: boolean; remaining: number } {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const key = `rl:${ip}`
  const now = Date.now()

  const entry = store.get(key)

  if (!entry || entry.reset < now) {
    store.set(key, { count: 1, reset: now + WINDOW_MS })
    return { success: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 }
  }

  entry.count += 1
  store.set(key, entry)
  return { success: true, remaining: MAX_REQUESTS - entry.count }
}

// Cleanup stale entries periodically
setInterval(() => {
  const now = Date.now()
  store.forEach((value, key) => {
    if (value.reset < now) store.delete(key)
  })
}, WINDOW_MS * 2)

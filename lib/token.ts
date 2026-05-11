import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.NEXTAUTH_SECRET ?? 'dev-secret-change-in-prod'

export function generateManageToken(memberId: string): string {
  return createHmac('sha256', SECRET).update(memberId).digest('hex').slice(0, 40)
}

export function verifyManageToken(memberId: string, token: string): boolean {
  const expected = generateManageToken(memberId)
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected))
  } catch {
    return false
  }
}

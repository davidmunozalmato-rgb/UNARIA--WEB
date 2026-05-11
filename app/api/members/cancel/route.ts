import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { verifyManageToken } from '@/lib/token'
import { sendCancellationEmail, sendPauseEmail } from '@/lib/email'

const stripeReady = () =>
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { memberId, token, action } = body as {
    memberId?: string
    token?: string
    action?: string
  }

  if (!memberId || !token || !action || !['pause', 'cancel'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!verifyManageToken(memberId, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const member = await prisma.member.findUnique({ where: { id: memberId } })
  if (!member || member.status === 'cancelled') {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  }

  if (action === 'pause') {
    const resumesAt = new Date()
    resumesAt.setDate(resumesAt.getDate() + 30)

    if (stripeReady() && member.stripeSubscriptionId) {
      await stripe.subscriptions.update(member.stripeSubscriptionId, {
        pause_collection: {
          behavior: 'void',
          resumes_at: Math.floor(resumesAt.getTime() / 1000),
        },
      })
    }

    await prisma.member.update({
      where: { id: memberId },
      data: { status: 'paused', pausedUntil: resumesAt },
    })

    try {
      await sendPauseEmail({
        name: member.name,
        email: member.email,
        locale: member.preferredLocale,
        resumesAt,
        memberId,
        token,
      })
    } catch (e) {
      console.error('Failed to send pause email:', e)
    }

    return NextResponse.json({ ok: true, action: 'paused', resumesAt })
  }

  // Cancel
  if (stripeReady() && member.stripeSubscriptionId) {
    await stripe.subscriptions.cancel(member.stripeSubscriptionId)
  }

  await prisma.member.update({
    where: { id: memberId },
    data: { status: 'cancelled', cancelledAt: new Date() },
  })

  try {
    await sendCancellationEmail({
      name: member.name,
      email: member.email,
      locale: member.preferredLocale,
    })
  } catch (e) {
    console.error('Failed to send cancellation email:', e)
  }

  return NextResponse.json({ ok: true, action: 'cancelled' })
}

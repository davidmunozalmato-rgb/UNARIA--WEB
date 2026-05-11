import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'

function detectLocale(): string {
  const headersList = headers()
  const lang = headersList.get('accept-language') ?? ''
  if (lang.startsWith('es')) return 'es'
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('de')) return 'de'
  return 'ca'
}

export default async function ReferralRedirect({ params }: { params: { code: string } }) {
  const { code } = params
  const locale = detectLocale()

  const member = await prisma.member.findFirst({
    where: { referralCode: code.toUpperCase(), status: 'active' },
  })

  if (!member) {
    redirect(`/${locale}/become-member`)
  }

  redirect(`/${locale}/become-member?ref=${code.toUpperCase()}`)
}

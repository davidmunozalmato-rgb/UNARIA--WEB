import { getTranslations } from 'next-intl/server'
import MemberForm from './MemberForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'becomeMember' })
  return { title: t('title') }
}

export default function BecomeMemberPage({ params: { locale } }: PageProps) {
  return <MemberForm locale={locale} />
}

import { useTranslations } from 'next-intl'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const PRIVACY_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Política de privacitat | Unaria Barcelona',
    description: 'Informació sobre com Unaria tracta les teves dades personals d\'acord amb el RGPD. Registrada a l\'AEPD. Dades xifrades AES-256.',
    ogTitle: 'Política de privacitat | Unaria Barcelona',
    ogDescription: 'Com tractem les teves dades, quins drets tens i com exercir-los. Compliment RGPD. AEPD. Stripe PCI-DSS.',
    twitterTitle: 'Política de privacitat | Unaria',
    twitterDescription: 'Compliment RGPD. Dades xifrades. Drets garantits.',
  },
  es: {
    title: 'Política de privacidad | Unaria Barcelona',
    description: 'Información sobre cómo Unaria trata tus datos personales de acuerdo con el RGPD. Registrada en la AEPD. Datos cifrados AES-256.',
    ogTitle: 'Política de privacidad | Unaria Barcelona',
    ogDescription: 'Cómo tratamos tus datos, qué derechos tienes y cómo ejercerlos. Cumplimiento RGPD. AEPD. Stripe PCI-DSS.',
    twitterTitle: 'Política de privacidad | Unaria',
    twitterDescription: 'Cumplimiento RGPD. Datos cifrados. Derechos garantizados.',
  },
  en: {
    title: 'Privacy Policy | Unaria Barcelona',
    description: 'Information on how Unaria processes your personal data in accordance with GDPR. Registered with AEPD. AES-256 encrypted data.',
    ogTitle: 'Privacy Policy | Unaria Barcelona',
    ogDescription: 'How we process your data, your rights and how to exercise them. GDPR compliant. AEPD registered. Stripe PCI-DSS.',
    twitterTitle: 'Privacy Policy | Unaria',
    twitterDescription: 'GDPR compliant. Encrypted data. Rights guaranteed.',
  },
  fr: {
    title: 'Politique de confidentialité | Unaria Barcelone',
    description: 'Informations sur la façon dont Unaria traite vos données personnelles conformément au RGPD. Enregistrée auprès de l\'AEPD. Données chiffrées AES-256.',
    ogTitle: 'Politique de confidentialité | Unaria Barcelone',
    ogDescription: 'Comment nous traitons vos données, vos droits et comment les exercer. Conforme RGPD. AEPD. Stripe PCI-DSS.',
    twitterTitle: 'Politique de confidentialité | Unaria',
    twitterDescription: 'Conforme RGPD. Données chiffrées. Droits garantis.',
  },
  de: {
    title: 'Datenschutzrichtlinie | Unaria Barcelona',
    description: 'Informationen darüber, wie Unaria Ihre persönlichen Daten gemäß DSGVO verarbeitet. Bei der AEPD registriert. AES-256 verschlüsselte Daten.',
    ogTitle: 'Datenschutzrichtlinie | Unaria Barcelona',
    ogDescription: 'Wie wir Ihre Daten verarbeiten, Ihre Rechte und wie Sie diese ausüben können. DSGVO-konform. AEPD. Stripe PCI-DSS.',
    twitterTitle: 'Datenschutzrichtlinie | Unaria',
    twitterDescription: 'DSGVO-konform. Verschlüsselte Daten. Rechte garantiert.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = PRIVACY_META[locale] ?? PRIVACY_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, url: `/${locale}/privacy-policy` },
    twitter: { title: m.twitterTitle, description: m.twitterDescription },
  }
}

export default function PrivacyPolicyPage({ params: { locale } }: PageProps) {
  const t = useTranslations('privacy')

  const today = new Date().toLocaleDateString(
    locale === 'ca' ? 'ca-ES' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const sections = [
    { title: t('responsibleTitle'), content: t('responsibleText') },
    { title: t('purposeTitle'), content: t('purposeText') },
    { title: t('legalBasisTitle'), content: t('legalBasisText') },
    { title: t('retentionTitle'), content: t('retentionText') },
    { title: t('rightsTitle'), content: t('rightsText') },
    { title: t('ibanTitle'), content: t('ibanText') },
    { title: t('cookiesTitle'), content: t('cookiesText') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t('title')}</h1>
          <p className="text-blue-100">{t('lastUpdated').replace('{date}', today)}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="pb-8 border-b border-gray-100 last:border-0">
                <h2 className="text-lg font-bold text-brand-blue mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
            <p className="text-sm text-gray-600">
              <strong>Unaria</strong> · {' '}
              <a href="mailto:unariabcn@gmail.com" className="text-brand-blue hover:underline">
                unariabcn@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

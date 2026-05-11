import { Suspense } from 'react'
import DonateForm from './DonateForm'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const DONATE_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Fes una donació a ONG via Unaria | Unaria Barcelona',
    description: 'Fes una donació puntual i Unaria la destinarà íntegrament a Cruz Roja i altres ONG. Pagament segur. Rebut immediat per correu.',
    ogTitle: 'La teva donació arriba 100% a la ONG | Unaria Barcelona',
    ogDescription: 'Unaria no és intermediari corrupte: rebràs el justificant de la transferència a la ONG. Cada euro compta. Donació des de 5€.',
    twitterTitle: 'Donació transparent a ONG | Unaria Barcelona',
    twitterDescription: '100% de la teva donació va a Cruz Roja. Rebut immediat. Pagament segur.',
  },
  es: {
    title: 'Haz una donación a ONG vía Unaria | Unaria Barcelona',
    description: 'Haz una donación puntual y Unaria la destinará íntegramente a Cruz Roja y otras ONG. Pago seguro. Recibo inmediato por correo.',
    ogTitle: 'Tu donación llega 100% a la ONG | Unaria Barcelona',
    ogDescription: 'Unaria no es un intermediario corrupto: recibirás el justificante de la transferencia a la ONG. Cada euro cuenta. Donación desde 5€.',
    twitterTitle: 'Donación transparente a ONG | Unaria Barcelona',
    twitterDescription: '100% de tu donación va a Cruz Roja. Recibo inmediato. Pago seguro.',
  },
  en: {
    title: 'Make a donation to NGOs via Unaria | Unaria Barcelona',
    description: 'Make a one-off donation and Unaria will pass it entirely to Cruz Roja and other NGOs. Secure payment. Instant receipt by email.',
    ogTitle: 'Your donation reaches the NGO 100% | Unaria Barcelona',
    ogDescription: 'Unaria is a fully transparent charity: you\'ll receive the bank transfer receipt to the NGO. Every euro counts. Donations from €5.',
    twitterTitle: 'Transparent donation to NGOs | Unaria Barcelona',
    twitterDescription: '100% of your donation goes to Cruz Roja. Instant receipt. Secure payment.',
  },
  fr: {
    title: 'Faites un don aux ONG via Unaria | Unaria Barcelone',
    description: 'Faites un don ponctuel et Unaria le destinera intégralement à Cruz Roja et d\'autres ONG. Paiement sécurisé. Reçu immédiat par e-mail.',
    ogTitle: 'Votre don arrive à 100% à l\'ONG | Unaria Barcelone',
    ogDescription: 'Unaria est totalement transparent : vous recevrez le reçu du virement bancaire vers l\'ONG. Chaque euro compte. Don à partir de 5€.',
    twitterTitle: 'Don transparent aux ONG | Unaria Barcelone',
    twitterDescription: '100% de votre don va à Cruz Roja. Reçu immédiat. Paiement sécurisé.',
  },
  de: {
    title: 'NGOs über Unaria spenden | Unaria Barcelona',
    description: 'Spenden Sie einmalig und Unaria leitet alles an Cruz Roja und andere NGOs weiter. Sichere Zahlung. Sofortige Bestätigung per E-Mail.',
    ogTitle: 'Ihre Spende kommt zu 100% bei der NGO an | Unaria Barcelona',
    ogDescription: 'Unaria ist vollkommen transparent: Sie erhalten den Banküberweisung-Beleg an die NGO. Jeder Euro zählt. Spenden ab 5€.',
    twitterTitle: 'Transparente Spende an NGOs | Unaria Barcelona',
    twitterDescription: '100% Ihrer Spende geht an Cruz Roja. Sofortige Bestätigung. Sichere Zahlung.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = DONATE_META[locale] ?? DONATE_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}/donate`,
    },
    twitter: {
      title: m.twitterTitle,
      description: m.twitterDescription,
    },
  }
}

export default function DonatePage({ params: { locale } }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-gray" />}>
      <DonateForm locale={locale} />
    </Suspense>
  )
}

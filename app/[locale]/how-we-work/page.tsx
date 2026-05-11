import { useTranslations } from 'next-intl'
import { ArrowRight, AlertCircle, Users, PiggyBank, Heart, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const HOW_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Com funciona Unaria: 3 passos simples | Unaria',
    description: 'Et fas soci, pagues la quota mensual, Unaria transfereix l\'excedent a ONG. Transparent, legal i segur. Descobreix el model complet.',
    ogTitle: 'Com funciona Unaria: el model de transparència solidària',
    ogDescription: '1. Et fas soci. 2. Pagues mensualment. 3. L\'excedent va a Cruz Roja. Unaria és l\'associació intermediària sense ànim de lucre. Descobreix-ho tot.',
    twitterTitle: 'Com funciona Unaria en 3 passos | Unaria Barcelona',
    twitterDescription: 'Et fas soci, pagues la quota, l\'excedent va a ONG. Transparent i legal.',
  },
  es: {
    title: 'Cómo funciona Unaria: 3 pasos simples | Unaria',
    description: 'Te haces socio, pagas la cuota mensual, Unaria transfiere el excedente a ONG. Transparente, legal y seguro. Descubre el modelo completo.',
    ogTitle: 'Cómo funciona Unaria: el modelo de transparencia solidaria',
    ogDescription: '1. Te haces socio. 2. Pagas mensualmente. 3. El excedente va a Cruz Roja. Unaria es la asociación intermediaria sin ánimo de lucro. Descúbrelo todo.',
    twitterTitle: 'Cómo funciona Unaria en 3 pasos | Unaria Barcelona',
    twitterDescription: 'Te haces socio, pagas la cuota, el excedente va a ONG. Transparente y legal.',
  },
  en: {
    title: 'How Unaria works: 3 simple steps | Unaria Barcelona',
    description: 'You become a member, pay your monthly fee, Unaria transfers the surplus to NGOs. Transparent, legal and secure. Discover the full model.',
    ogTitle: 'How Unaria works: the transparent solidarity model',
    ogDescription: '1. You join. 2. You pay monthly. 3. The surplus goes to Cruz Roja. Unaria is the non-profit intermediary association. Find out everything.',
    twitterTitle: 'How Unaria works in 3 steps | Unaria Barcelona',
    twitterDescription: 'You join, pay your fee, the surplus goes to NGOs. Transparent and legal.',
  },
  fr: {
    title: 'Comment fonctionne Unaria: 3 étapes | Unaria Barcelone',
    description: 'Vous adhérez, payez votre cotisation mensuelle, Unaria transfère l\'excédent aux ONG. Transparent, légal et sécurisé. Découvrez le modèle complet.',
    ogTitle: 'Comment fonctionne Unaria: le modèle de solidarité transparente',
    ogDescription: '1. Vous adhérez. 2. Vous payez mensuellement. 3. L\'excédent va à Cruz Roja. Unaria est l\'association intermédiaire sans but lucratif.',
    twitterTitle: 'Comment fonctionne Unaria en 3 étapes | Unaria Barcelone',
    twitterDescription: 'Vous adhérez, payez la cotisation, l\'excédent va aux ONG. Transparent et légal.',
  },
  de: {
    title: 'Wie Unaria funktioniert: 3 einfache Schritte | Unaria',
    description: 'Sie werden Mitglied, zahlen Ihren monatlichen Beitrag, Unaria überweist den Überschuss an NGOs. Transparent, legal und sicher.',
    ogTitle: 'Wie Unaria funktioniert: das transparente Solidaritätsmodell',
    ogDescription: '1. Sie werden Mitglied. 2. Sie zahlen monatlich. 3. Der Überschuss geht an Cruz Roja. Unaria ist der gemeinnützige Vermittlungsverein.',
    twitterTitle: 'Wie Unaria in 3 Schritten funktioniert | Unaria Barcelona',
    twitterDescription: 'Sie werden Mitglied, zahlen den Beitrag, der Überschuss geht an NGOs. Transparent und legal.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = HOW_META[locale] ?? HOW_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, url: `/${locale}/how-we-work` },
    twitter: { title: m.twitterTitle, description: m.twitterDescription },
  }
}

type FaqItem = { q: string; a: string }

const FAQ_ITEMS: Record<string, FaqItem[]> = {
  ca: [
    { q: 'Què és Unaria exactament?', a: 'Unaria és una associació sense ànim de lucre constituïda a Barcelona. Els socis paguen una quota mensual (des de 6€/mes) i Unaria destina l\'excedent, un cop coberts els costos operatius, íntegrament a ONG com Cruz Roja.' },
    { q: 'On van exactament els meus diners?', a: 'Les teves quotes van a Unaria. Unaria dedueix els costos operatius (sous, tecnologia, assegurances) i transfereix l\'excedent íntegrament a ONG com Cruz Roja. La pàgina de transparència mostra el percentatge exacte en temps real.' },
    { q: 'Puc cancel·lar quan vulgui?', a: 'Sí. Pots cancel·lar la teva subscripció amb un sol clic des del teu perfil, en qualsevol moment, sense trucades ni formularis. Abans de cancel·lar, t\'oferirem la possibilitat de fer una pausa d\'un mes.' },
    { q: 'És segur donar les meves dades bancàries?', a: 'Sí. El pagament es processa via Stripe (certificació PCI-DSS), les dades SEPA es xifren amb AES-256, i mai tenim accés directe al teu número de compte complet. Unaria compleix el RGPD i està registrada a l\'AEPD.' },
    { q: 'Quant percentatge arriba realment a les ONG?', a: 'El percentatge varia en funció dels ingressos totals i els costos operatius del mes. Pots veure el percentatge exacte en temps real a la pàgina de transparència. Unaria publica la memòria anual completa.' },
    { q: 'Per quines ONG destina Unaria els fons?', a: 'Actualment, Unaria destina els fons principalment a Cruz Roja Española. A mesura que creixem, ampliarem la llista d\'ONG partners. La llista actualitzada és sempre visible a la pàgina de transparència.' },
    { q: 'Quina diferència hi ha entre Unaria i Cruz Roja?', a: 'Cruz Roja és una ONG directa que opera programes propis. Unaria és una associació intermediària que canalitza fons a Cruz Roja amb transparència total sobre com es distribueixen.' },
    { q: 'Com sé que Unaria és legítima?', a: 'Unaria està registrada al Registre d\'Associacions de Catalunya, compleix el RGPD (registrada a l\'AEPD), i els pagaments es processen via Stripe (PCI-DSS). El representant legal és David Muñoz Almató (DNI 39444468C).' },
  ],
  es: [
    { q: '¿Qué es Unaria exactamente?', a: 'Unaria es una asociación sin ánimo de lucro constituida en Barcelona. Los socios pagan una cuota mensual (desde 6€/mes) y Unaria destina el excedente, una vez cubiertos los costes operativos, íntegramente a ONG como Cruz Roja.' },
    { q: '¿Adónde va exactamente mi dinero?', a: 'Tus cuotas van a Unaria. Unaria deduce los costes operativos (sueldos, tecnología, seguros) y transfiere el excedente íntegramente a ONG como Cruz Roja. La página de transparencia muestra el porcentaje exacto en tiempo real.' },
    { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Puedes cancelar tu suscripción con un solo clic desde tu perfil, en cualquier momento, sin llamadas ni formularios. Antes de cancelar, te ofreceremos la posibilidad de hacer una pausa de un mes.' },
    { q: '¿Es seguro dar mis datos bancarios?', a: 'Sí. El pago se procesa vía Stripe (certificación PCI-DSS), los datos SEPA se cifran con AES-256, y nunca tenemos acceso directo a tu número de cuenta completo. Unaria cumple el RGPD y está registrada en la AEPD.' },
    { q: '¿Qué porcentaje llega realmente a las ONG?', a: 'El porcentaje varía según los ingresos totales y los costes operativos del mes. Puedes ver el porcentaje exacto en tiempo real en la página de transparencia. Unaria publica la memoria anual completa.' },
    { q: '¿A qué ONG destina Unaria los fondos?', a: 'Actualmente, Unaria destina los fondos principalmente a Cruz Roja Española. A medida que crecemos, ampliaremos la lista de ONG partners.' },
    { q: '¿Cuál es la diferencia entre Unaria y Cruz Roja?', a: 'Cruz Roja es una ONG directa que opera programas propios. Unaria es una asociación intermediaria que canaliza fondos a Cruz Roja con transparencia total.' },
    { q: '¿Cómo sé que Unaria es legítima?', a: 'Unaria está registrada en el Registro de Asociaciones de Cataluña, cumple el RGPD (registrada en la AEPD), y los pagos se procesan vía Stripe (PCI-DSS). El representante legal es David Muñoz Almató.' },
  ],
  en: [
    { q: 'What exactly is Unaria?', a: 'Unaria is a non-profit association founded in Barcelona. Members pay a monthly fee (from €6/month) and Unaria passes the surplus, after covering operating costs, entirely to NGOs like Cruz Roja.' },
    { q: 'Where exactly does my money go?', a: 'Your fees go to Unaria. Unaria deducts operating costs (salaries, technology, insurance) and transfers the surplus entirely to NGOs like Cruz Roja. The transparency page shows the exact percentage in real time.' },
    { q: 'Can I cancel whenever I want?', a: 'Yes. You can cancel your subscription with a single click from your profile, at any time, without calls or forms. Before cancelling, we\'ll offer you the option to pause for one month.' },
    { q: 'Is it safe to give my bank details?', a: 'Yes. Payment is processed via Stripe (PCI-DSS certified), SEPA data is encrypted with AES-256, and we never have direct access to your full account number. Unaria is GDPR compliant and registered with the AEPD.' },
    { q: 'What percentage actually reaches the NGOs?', a: 'The percentage varies depending on total income and operating costs. You can see the exact percentage in real time on the transparency page. Unaria publishes the full annual report.' },
    { q: 'Which NGOs does Unaria fund?', a: 'Currently, Unaria primarily channels funds to Cruz Roja Española. As we grow, we\'ll expand our list of partner NGOs.' },
    { q: 'What\'s the difference between Unaria and Cruz Roja?', a: 'Cruz Roja is a direct NGO that runs its own programmes. Unaria is an intermediary association that channels funds to Cruz Roja with full transparency.' },
    { q: 'How do I know Unaria is legitimate?', a: 'Unaria is registered with the Catalonia Associations Registry, is GDPR compliant (registered with AEPD), and payments are processed via Stripe (PCI-DSS). Legal representative: David Muñoz Almató.' },
  ],
  fr: [
    { q: 'Qu\'est-ce qu\'Unaria exactement?', a: 'Unaria est une association sans but lucratif fondée à Barcelone. Les membres paient une cotisation mensuelle (à partir de 6€/mois) et Unaria reverse l\'excédent, après déduction des coûts opérationnels, intégralement à des ONG comme Cruz Roja.' },
    { q: 'Où va exactement mon argent?', a: 'Vos cotisations vont à Unaria. Unaria déduit les coûts opérationnels et transfère l\'excédent intégralement aux ONG. La page de transparence affiche le pourcentage exact en temps réel.' },
    { q: 'Puis-je annuler quand je veux?', a: 'Oui. Vous pouvez annuler votre abonnement en un seul clic depuis votre profil, à tout moment, sans appels ni formulaires.' },
    { q: 'Est-il sûr de donner mes coordonnées bancaires?', a: 'Oui. Le paiement est traité via Stripe (certifié PCI-DSS), les données SEPA sont chiffrées avec AES-256. Unaria est conforme au RGPD.' },
    { q: 'Quel pourcentage arrive vraiment aux ONG?', a: 'Le pourcentage varie selon les revenus totaux et les coûts opérationnels. Vous pouvez voir le pourcentage exact en temps réel sur la page de transparence.' },
    { q: 'Quelles ONG Unaria finance-t-elle?', a: 'Actuellement, Unaria destine les fonds principalement à Cruz Roja Española.' },
    { q: 'Quelle est la différence entre Unaria et Cruz Roja?', a: 'Cruz Roja est une ONG directe. Unaria est une association intermédiaire qui canalise des fonds vers Cruz Roja avec une transparence totale.' },
    { q: 'Comment savoir qu\'Unaria est légitime?', a: 'Unaria est enregistrée au Registre des Associations de Catalogne, est conforme au RGPD et les paiements sont traités via Stripe (PCI-DSS).' },
  ],
  de: [
    { q: 'Was genau ist Unaria?', a: 'Unaria ist ein gemeinnütziger Verein aus Barcelona. Mitglieder zahlen einen monatlichen Beitrag (ab 6€/Monat) und Unaria leitet den Überschuss, nach Abzug der Betriebskosten, vollständig an NGOs wie Cruz Roja weiter.' },
    { q: 'Wohin geht mein Geld genau?', a: 'Ihre Beiträge gehen an Unaria. Unaria zieht Betriebskosten ab und überweist den Überschuss vollständig an NGOs wie Cruz Roja. Die Transparenzseite zeigt den genauen Prozentsatz in Echtzeit.' },
    { q: 'Kann ich jederzeit kündigen?', a: 'Ja. Sie können Ihr Abonnement mit einem einzigen Klick aus Ihrem Profil heraus jederzeit kündigen, ohne Anrufe oder Formulare.' },
    { q: 'Ist es sicher, meine Bankdaten anzugeben?', a: 'Ja. Die Zahlung wird über Stripe (PCI-DSS-zertifiziert) abgewickelt, SEPA-Daten werden mit AES-256 verschlüsselt. Unaria ist DSGVO-konform.' },
    { q: 'Welcher Prozentsatz erreicht die NGOs wirklich?', a: 'Der Prozentsatz variiert je nach Gesamteinnahmen und Betriebskosten. Den genauen Prozentsatz sehen Sie in Echtzeit auf der Transparenzseite.' },
    { q: 'Welche NGOs finanziert Unaria?', a: 'Derzeit leitet Unaria Gelder hauptsächlich an Cruz Roja Española weiter.' },
    { q: 'Was ist der Unterschied zwischen Unaria und Cruz Roja?', a: 'Cruz Roja ist eine direkte NGO. Unaria ist ein Vermittlungsverein, der Gelder mit vollständiger Transparenz an Cruz Roja weiterleitet.' },
    { q: 'Woher weiß ich, dass Unaria legitim ist?', a: 'Unaria ist im katalanischen Vereinsregister eingetragen, DSGVO-konform und Zahlungen werden über Stripe (PCI-DSS) abgewickelt.' },
  ],
}

const HOW_TO_STEPS: Record<string, { name: string; text: string }[]> = {
  ca: [
    { name: 'Escull la teva quota mensual', text: 'Selecciona la quota mensual que millor s\'adapti a les teves possibilitats: 6, 10, 12, 15, 20, 25 o 30€/mes.' },
    { name: 'Omple les teves dades', text: 'Introdueix el teu nom, cognoms, email i adreça. Totes les dades es tracten d\'acord amb el RGPD.' },
    { name: 'Configura el pagament', text: 'Escull entre domiciliació bancària SEPA o pagament amb targeta. El primer cobrament es realitza en el moment de l\'alta.' },
  ],
  es: [
    { name: 'Elige tu cuota mensual', text: 'Selecciona la cuota mensual que mejor se adapte a tus posibilidades: 6, 10, 12, 15, 20, 25 o 30€/mes.' },
    { name: 'Rellena tus datos', text: 'Introduce tu nombre, apellidos, email y dirección. Todos los datos se tratan según el RGPD.' },
    { name: 'Configura el pago', text: 'Elige entre domiciliación bancaria SEPA o pago con tarjeta. El primer cargo se realiza en el momento del alta.' },
  ],
  en: [
    { name: 'Choose your monthly fee', text: 'Select the monthly fee that best suits your budget: €6, 10, 12, 15, 20, 25 or 30/month.' },
    { name: 'Fill in your details', text: 'Enter your name, surname, email and address. All data is processed in accordance with GDPR.' },
    { name: 'Set up payment', text: 'Choose between SEPA direct debit or card payment. The first charge is made at the time of sign-up.' },
  ],
  fr: [
    { name: 'Choisissez votre cotisation mensuelle', text: 'Sélectionnez la cotisation mensuelle qui vous convient : 6, 10, 12, 15, 20, 25 ou 30€/mois.' },
    { name: 'Remplissez vos coordonnées', text: 'Entrez votre nom, prénom, email et adresse. Toutes les données sont traitées conformément au RGPD.' },
    { name: 'Configurez le paiement', text: 'Choisissez entre prélèvement SEPA ou paiement par carte. Le premier prélèvement est effectué lors de l\'inscription.' },
  ],
  de: [
    { name: 'Wählen Sie Ihren monatlichen Beitrag', text: 'Wählen Sie den Monatsbeitrag, der am besten zu Ihnen passt: 6, 10, 12, 15, 20, 25 oder 30€/Monat.' },
    { name: 'Geben Sie Ihre Daten ein', text: 'Tragen Sie Ihren Namen, Nachnamen, E-Mail und Adresse ein. Alle Daten werden gemäß DSGVO verarbeitet.' },
    { name: 'Zahlung einrichten', text: 'Wählen Sie zwischen SEPA-Lastschrift oder Kartenzahlung. Die erste Abbuchung erfolgt bei der Anmeldung.' },
  ],
}

function buildHowWeWorkSchema(locale: string) {
  const faqItems = FAQ_ITEMS[locale] ?? FAQ_ITEMS.ca
  const steps = HOW_TO_STEPS[locale] ?? HOW_TO_STEPS.ca
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'HowTo',
        name: steps[0]?.name ? 'Fer-se soci d\'Unaria' : 'Become an Unaria member',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '6' },
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      },
    ],
  }
}

export default function HowWeWorkPage({ params: { locale } }: PageProps) {
  const t = useTranslations('howWeWorkPage')

  const steps = [
    {
      number: '01',
      title: t('step1'),
      detail: t('step1Detail'),
      icon: <Users className="w-6 h-6" />,
      accent: 'border-brand-blue',
      iconBg: 'bg-blue-50 text-brand-blue',
      numColor: 'text-brand-blue',
    },
    {
      number: '02',
      title: t('step2'),
      detail: t('step2Detail'),
      icon: <PiggyBank className="w-6 h-6" />,
      accent: 'border-brand-teal',
      iconBg: 'bg-teal-50 text-brand-teal',
      numColor: 'text-brand-teal',
    },
    {
      number: '03',
      title: t('step3'),
      detail: t('step3Detail'),
      icon: <Heart className="w-6 h-6" />,
      accent: 'border-green-500',
      iconBg: 'bg-green-50 text-green-600',
      numColor: 'text-green-600',
    },
  ]

  return (
    <>
      <JsonLd data={buildHowWeWorkSchema(locale)} />
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-brand-teal blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-24 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="bg-brand-gray rounded-2xl p-6 sm:p-8 border-l-4 border-brand-blue">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{t('intro')}</p>
          </div>
        </div>
      </section>

      {/* ── FLOW DIAGRAM ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 text-center mb-8">{t('diagramTitle')}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            {/* Socis */}
            <div className="w-full sm:w-auto flex-1 bg-blue-50 border-2 border-blue-200 rounded-2xl px-5 py-4 text-center">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-brand-blue text-lg">{t('diagramMembers')}</div>
              <div className="text-xs text-gray-500 mt-1">6–30€/mes</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* Unaria */}
            <div className="w-full sm:w-auto flex-1 bg-brand-blue rounded-2xl px-5 py-4 text-center shadow-lg">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-white text-lg">Unaria</div>
              <div className="text-xs text-blue-200 mt-1">{t('diagramFund')}</div>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-300 rotate-0 sm:-rotate-90 flex-shrink-0" />

            {/* ONG */}
            <div className="w-full sm:w-auto flex-1 bg-teal-50 border-2 border-teal-200 rounded-2xl px-5 py-4 text-center">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-brand-teal text-lg">ONG</div>
              <div className="text-xs text-gray-500 mt-1">{t('diagramNGO')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-10 sm:py-16 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="space-y-4 sm:space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className={`bg-white rounded-2xl p-5 sm:p-6 border-l-4 ${step.accent} shadow-sm`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center ${step.iconBg}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-black tracking-widest uppercase mb-1 ${step.numColor}`}>
                        {t('stepLabel')} {step.number}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ChevronDown className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVÍS IMPORTANT ── */}
      <section className="py-10 sm:py-14 bg-amber-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex gap-4 items-start bg-white rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-800 text-base sm:text-lg mb-2">{t('importantTitle')}</h3>
              <p className="text-amber-700 text-sm leading-relaxed">{t('importantText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">
            {t('ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg"
            >
              {t('ctaMember')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              {t('ctaDonate')}
            </Link>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

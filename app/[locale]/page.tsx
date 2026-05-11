import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, ArrowDownCircle, Shield, Target, Eye, Handshake, BarChart3 } from 'lucide-react'
import NewsSection from '@/components/NewsSection'
import ProjectsSection from '@/components/ProjectsSection'
import AnimatedCounter from '@/components/AnimatedCounter'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

const HOME_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Fes-te soci i genera impacte a ONG | Unaria Barcelona',
    description: 'Unaria canalitza les teves quotes mensuals a ONG com Cruz Roja. Des de 6€/mes. 100% transparent. Cancel·la quan vulguis.',
    ogTitle: 'La manera més transparent de donar a ONG | Unaria Barcelona',
    ogDescription: 'Unaria és l\'associació barcelonina on pots fer-te soci des de 6€/mes. Tot l\'excedent va a ONG. Sabràs exactament on van els teus diners.',
    twitterTitle: 'La manera més transparent de donar a ONG | Unaria',
    twitterDescription: 'Des de 6€/mes. 100% transparent. Cancel·la quan vulguis. Unaria canalitza les teves quotes a Cruz Roja i altres ONG.',
  },
  es: {
    title: 'Hazte socio y genera impacto en ONG | Unaria Barcelona',
    description: 'Unaria canaliza tus cuotas mensuales a ONG como Cruz Roja. Desde 6€/mes. 100% transparente. Cancela cuando quieras.',
    ogTitle: 'La forma más transparente de donar a ONG | Unaria Barcelona',
    ogDescription: 'Unaria es la asociación barcelonesa donde puedes hacerte socio desde 6€/mes. Todo el excedente va a ONG. Sabrás exactamente dónde van tu dinero.',
    twitterTitle: 'La forma más transparente de donar a ONG | Unaria',
    twitterDescription: 'Desde 6€/mes. 100% transparente. Cancela cuando quieras. Unaria canaliza tus cuotas a Cruz Roja y otras ONG.',
  },
  en: {
    title: 'Join & create social impact through NGOs | Unaria Barcelona',
    description: 'Unaria channels your monthly membership to NGOs like Cruz Roja. From €6/month. 100% transparent. Cancel anytime.',
    ogTitle: 'The most transparent way to donate to NGOs in Barcelona | Unaria',
    ogDescription: 'Unaria is Barcelona\'s association where you can become a member from €6/month. All surplus goes to NGOs. You\'ll know exactly where your money goes.',
    twitterTitle: 'The most transparent way to donate to NGOs | Unaria',
    twitterDescription: 'From €6/month. 100% transparent. Cancel anytime. Unaria channels your fees to Cruz Roja and other NGOs.',
  },
  fr: {
    title: 'Adhérez et générez un impact social | Unaria Barcelone',
    description: 'Unaria canalise vos cotisations mensuelles vers des ONG comme Cruz Roja. Dès 6€/mois. 100% transparent. Résiliez quand vous voulez.',
    ogTitle: 'La façon la plus transparente de donner à des ONG | Unaria Barcelone',
    ogDescription: 'Unaria est l\'association barcelonaise où vous pouvez adhérer dès 6€/mois. Tout l\'excédent va aux ONG. Vous saurez exactement où va votre argent.',
    twitterTitle: 'La façon la plus transparente de donner à des ONG | Unaria',
    twitterDescription: 'Dès 6€/mois. 100% transparent. Résiliez quand vous voulez. Unaria canalise vos cotisations vers Cruz Roja et d\'autres ONG.',
  },
  de: {
    title: 'Mitglied werden und NGOs unterstützen | Unaria Barcelona',
    description: 'Unaria leitet Ihre monatlichen Beiträge an NGOs wie Cruz Roja weiter. Ab 6€/Monat. 100% transparent. Jederzeit kündbar.',
    ogTitle: 'Die transparenteste Art, NGOs in Barcelona zu unterstützen | Unaria',
    ogDescription: 'Unaria ist Barcelonas Verein, dem Sie ab 6€/Monat beitreten können. Der gesamte Überschuss geht an NGOs. Sie wissen genau, wohin Ihr Geld geht.',
    twitterTitle: 'Die transparenteste Art, NGOs zu unterstützen | Unaria',
    twitterDescription: 'Ab 6€/Monat. 100% transparent. Jederzeit kündbar. Unaria leitet Ihre Beiträge an Cruz Roja und andere NGOs weiter.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = HOME_META[locale] ?? HOME_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}`,
    },
    twitter: {
      title: m.twitterTitle,
      description: m.twitterDescription,
    },
  }
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-brand-teal blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border border-white/20">
            <Shield className="w-3 h-3 flex-shrink-0" />
            <span className="sm:hidden">Registrada a Catalunya</span>
            <span className="hidden sm:inline">{t('badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
            {t('title')}
          </h1>

          <p className="text-base sm:text-xl text-blue-100 mb-7 sm:mb-10 leading-relaxed max-w-2xl mx-auto sm:mx-0">
            {t('subtitle')}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-teal text-white font-bold text-base sm:text-lg rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg"
            >
              {t('ctaMember')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              {t('ctaDonate')}
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#projects"
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce cursor-pointer z-10"
        aria-label="Anar a projectes"
      >
        <ArrowDownCircle className="w-8 h-8" />
      </a>
    </section>
  )
}



const objectiusData: Record<string, { title: string; subtitle: string; items: { icon: React.ReactNode; color: string; title: string; desc: string }[] }> = {
  ca: {
    title: 'Els nostres objectius',
    subtitle: 'Unaria neix amb una missió clara: canalitzar la solidaritat col·lectiva cap a on més fa falta',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Recaptació solidària', desc: 'Mobilitzar quotes mensuals de socis per generar un fons estable i previsible que permeti planificar l\'ajuda a llarg termini.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Transparència total', desc: 'Publicar anualment totes les transferències realitzades a ONGs, amb imports, destinataris i referències verificables.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'Partenariat amb ONGs', desc: 'Col·laborar exclusivament amb entitats auditades, acreditades i amb historial demostrat d\'impacte social real.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impacte mesurable', desc: 'Garantir que el superàvit de cada euro recaptat arriba directament a projectes concrets, amb indicadors d\'impacte publicats.' },
    ],
  },
  es: {
    title: 'Nuestros objetivos',
    subtitle: 'Unaria nace con una misión clara: canalizar la solidaridad colectiva hacia donde más se necesita',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Recaudación solidaria', desc: 'Movilizar cuotas mensuales de socios para generar un fondo estable y previsible que permita planificar la ayuda a largo plazo.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Transparencia total', desc: 'Publicar anualmente todas las transferencias realizadas a ONGs, con importes, destinatarios y referencias verificables.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'Asociación con ONGs', desc: 'Colaborar exclusivamente con entidades auditadas, acreditadas y con historial demostrado de impacto social real.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impacto medible', desc: 'Garantizar que el superávit de cada euro recaudado llega directamente a proyectos concretos, con indicadores de impacto publicados.' },
    ],
  },
  en: {
    title: 'Our objectives',
    subtitle: 'Unaria was born with a clear mission: channelling collective solidarity towards where it is needed most',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Solidarity fundraising', desc: 'Mobilising monthly member fees to build a stable, predictable fund that enables long-term aid planning.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Full transparency', desc: 'Publishing annual reports of all NGO transfers, with amounts, recipients and verifiable references.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'NGO partnerships', desc: 'Working exclusively with audited, accredited organisations with a proven track record of real social impact.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Measurable impact', desc: 'Ensuring the surplus of every euro raised reaches concrete projects directly, with published impact indicators.' },
    ],
  },
  fr: {
    title: 'Nos objectifs',
    subtitle: 'Unaria est née avec une mission claire : canaliser la solidarité collective là où elle est le plus nécessaire',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Collecte solidaire', desc: 'Mobiliser les cotisations mensuelles des membres pour créer un fonds stable et prévisible permettant une aide à long terme.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Transparence totale', desc: 'Publier chaque année tous les transferts effectués aux ONG, avec montants, bénéficiaires et références vérifiables.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'Partenariat avec les ONG', desc: 'Collaborer exclusivement avec des entités auditées, accréditées et ayant un bilan démontré d\'impact social réel.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impact mesurable', desc: 'Garantir que le surplus de chaque euro collecté parvient directement à des projets concrets, avec des indicateurs publiés.' },
    ],
  },
  de: {
    title: 'Unsere Ziele',
    subtitle: 'Unaria wurde mit einer klaren Mission gegründet: kollektive Solidarität dorthin zu leiten, wo sie am meisten gebraucht wird',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Solidarische Spendensammlung', desc: 'Monatliche Mitgliedsbeiträge mobilisieren, um einen stabilen, planbaren Fonds für langfristige Hilfe aufzubauen.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Vollständige Transparenz', desc: 'Jährliche Veröffentlichung aller NGO-Überweisungen mit Beträgen, Empfängern und nachprüfbaren Referenzen.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'NGO-Partnerschaften', desc: 'Ausschließlich mit geprüften, akkreditierten Organisationen zusammenarbeiten, die nachweislich soziale Wirkung erzielen.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Messbarer Einfluss', desc: 'Sicherstellen, dass der Überschuss jedes gesammelten Euros direkt in konkrete Projekte fließt, mit veröffentlichten Wirkungsindikatoren.' },
    ],
  },
}

function ObjectiusSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const data = objectiusData[lang]

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">{data.title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{data.subtitle}</p>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {data.items.map((item, i) => (
            <div key={i} className="flex flex-row sm:flex-col items-start gap-3 sm:gap-0 p-4 sm:p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white">
              <div className={`w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center sm:mb-5 ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const destacatsData: Record<string, { title: string; subtitle: string; items: { stat: string; label: string; source: string; accent: string }[] }> = {
  ca: {
    title: 'Xifres que no podem ignorar',
    subtitle: 'La realitat global que impulsa la missió d\'Unaria',
    items: [
      { stat: '117M', label: 'persones desplaçades forçosament al món', source: 'ACNUR 2024', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' },
      { stat: '733M', label: 'persones passen fam cada nit', source: 'FAO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300' },
      { stat: '780M', label: 'persones sense accés a aigua potable', source: 'OMS / UNICEF', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' },
      { stat: '258M', label: 'infants sense escolaritzar', source: 'UNESCO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400' },
    ],
  },
  es: {
    title: 'Cifras que no podemos ignorar',
    subtitle: 'La realidad global que impulsa la misión de Unaria',
    items: [
      { stat: '117M', label: 'personas desplazadas forzosamente en el mundo', source: 'ACNUR 2024', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' },
      { stat: '733M', label: 'personas pasan hambre cada noche', source: 'FAO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300' },
      { stat: '780M', label: 'personas sin acceso a agua potable', source: 'OMS / UNICEF', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' },
      { stat: '258M', label: 'niños sin escolarizar', source: 'UNESCO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400' },
    ],
  },
  en: {
    title: 'Figures we cannot ignore',
    subtitle: 'The global reality that drives Unaria\'s mission',
    items: [
      { stat: '117M', label: 'people forcibly displaced worldwide', source: 'UNHCR 2024', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' },
      { stat: '733M', label: 'people go to bed hungry every night', source: 'FAO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300' },
      { stat: '780M', label: 'people without access to clean water', source: 'WHO / UNICEF', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' },
      { stat: '258M', label: 'children out of school', source: 'UNESCO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400' },
    ],
  },
  fr: {
    title: 'Des chiffres qu\'on ne peut ignorer',
    subtitle: 'La réalité mondiale qui anime la mission d\'Unaria',
    items: [
      { stat: '117M', label: 'personnes déplacées de force dans le monde', source: 'UNHCR 2024', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' },
      { stat: '733M', label: 'personnes se couchent avec la faim chaque nuit', source: 'FAO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300' },
      { stat: '780M', label: 'personnes sans accès à l\'eau potable', source: 'OMS / UNICEF', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' },
      { stat: '258M', label: 'enfants non scolarisés', source: 'UNESCO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400' },
    ],
  },
  de: {
    title: 'Zahlen, die wir nicht ignorieren können',
    subtitle: 'Die globale Realität, die die Mission von Unaria antreibt',
    items: [
      { stat: '117M', label: 'Menschen weltweit zwangsvertrieben', source: 'UNHCR 2024', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' },
      { stat: '733M', label: 'Menschen gehen jeden Abend hungrig ins Bett', source: 'FAO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300' },
      { stat: '780M', label: 'Menschen ohne Zugang zu sauberem Wasser', source: 'WHO / UNICEF', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300' },
      { stat: '258M', label: 'Kinder ohne Schulbildung', source: 'UNESCO 2023', accent: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400' },
    ],
  },
}

function DestacatsSection({ locale }: { locale: string }) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const data = destacatsData[lang]

  return (
    <section className="relative py-20 sm:py-32 bg-[#0a0f1c] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] opacity-50 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] opacity-50 mix-blend-screen pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-20">
          <h2 className="text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-3 sm:mb-4 tracking-tight">
            {data.title}
          </h2>
          <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {data.items.map((item, i) => {
            const value = parseInt(item.stat.replace(/\D/g, ''), 10)
            const suffix = item.stat.replace(/\d/g, '')

            return (
              <div
                key={i}
                className="group relative bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative text-3xl sm:text-5xl lg:text-6xl font-black mb-2 sm:mb-4 tracking-tighter ${item.accent}`}>
                  <AnimatedCounter end={value} suffix={suffix} duration={2500} />
                </div>

                <p className="relative text-white/80 text-xs sm:text-base font-medium leading-snug sm:leading-relaxed mb-3 sm:mb-6">
                  {item.label}
                </p>

                <div className="relative inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[11px] sm:text-xs text-gray-400 font-bold tracking-widest uppercase">
                    {item.source}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ locale }: { locale: string }) {
  const heroT = useTranslations('hero')
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Preparat per marcar la diferència?
        </h2>
        <p className="text-blue-100 text-base sm:text-lg mb-8 sm:mb-10">
          Amb tan sols 6€/mes pots formar part de la comunitat Unaria i contribuir a un impacte real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/become-member`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold text-lg rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg"
          >
            {heroT('ctaMember')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={`/${locale}/donate`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all border border-white/30"
          >
            {heroT('ctaDonate')}
          </Link>
        </div>
      </div>
    </section>
  )
}

const nonprofitSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': 'https://unaria.org/#organization',
  name: 'Unaria',
  alternateName: ['Associació Unaria', 'Asociación Unaria'],
  url: 'https://unaria.org',
  logo: {
    '@type': 'ImageObject',
    url: 'https://unaria.org/images/logo.png',
    width: 200,
    height: 60,
  },
  description: 'Unaria és una associació sense ànim de lucre constituïda a Barcelona que canalitza les quotes dels socis vers ONG com Cruz Roja. 100% transparent.',
  foundingDate: '2024',
  founder: { '@type': 'Person', name: 'David Muñoz Almató' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressRegion: 'Catalunya',
    addressCountry: 'ES',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hola@unaria.org',
    availableLanguage: ['Catalan', 'Spanish', 'English', 'French', 'German'],
  },
  sameAs: [
    'https://www.instagram.com/unariabcn',
    'https://www.facebook.com/unariabcn',
    'https://www.linkedin.com/company/unaria',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Quotes de soci',
    itemListElement: [6, 10, 12, 15, 20, 25, 30].map((price) => ({
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: price.toFixed(2),
        priceCurrency: 'EUR',
        unitCode: 'MON',
      },
    })),
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://unaria.org/#website',
  url: 'https://unaria.org',
  name: 'Unaria',
  description: 'Associació solidaria de Barcelona. Canalitzem quotes mensuals a ONG de forma 100% transparent.',
  inLanguage: ['ca', 'es', 'en', 'fr', 'de'],
  publisher: { '@id': 'https://unaria.org/#organization' },
}

export default function HomePage({ params: { locale } }: PageProps) {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [nonprofitSchema, websiteSchema] }} />
      <HeroSection locale={locale} />
      <ObjectiusSection locale={locale} />
      <ProjectsSection locale={locale} />
      <NewsSection locale={locale} />
      <DestacatsSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  )
}

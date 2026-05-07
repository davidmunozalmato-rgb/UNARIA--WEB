import React from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, ArrowDownCircle, Shield, Target, Eye, Handshake, BarChart3 } from 'lucide-react'
import NewsSection from '@/components/NewsSection'
import ProjectsSection from '@/components/ProjectsSection'
import AnimatedCounter from '@/components/AnimatedCounter'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  const description = t('subtitle')
  return {
    title: 'Unaria – Solidaritat Organitzada',
    description,
    openGraph: {
      title: 'Unaria – Solidaritat Organitzada',
      description,
      url: `/${locale}`,
    },
    twitter: {
      title: 'Unaria – Solidaritat Organitzada',
      description,
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            <Shield className="w-4 h-4" />
            {t('badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {t('title')}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/become-member`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold text-lg rounded-xl hover:bg-brand-teal-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('ctaMember')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all border border-white/30"
            >
              {t('ctaDonate')}
            </Link>
          </div>
        </div>
      </div>

      <a 
        href="#projects"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce cursor-pointer z-10"
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
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impacte mesurable', desc: 'Garantir que el 87% de cada euro recaptat arriba directament a projectes concrets, amb indicadors d\'impacte publicats.' },
    ],
  },
  es: {
    title: 'Nuestros objetivos',
    subtitle: 'Unaria nace con una misión clara: canalizar la solidaridad colectiva hacia donde más se necesita',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Recaudación solidaria', desc: 'Movilizar cuotas mensuales de socios para generar un fondo estable y previsible que permita planificar la ayuda a largo plazo.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Transparencia total', desc: 'Publicar anualmente todas las transferencias realizadas a ONGs, con importes, destinatarios y referencias verificables.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'Asociación con ONGs', desc: 'Colaborar exclusivamente con entidades auditadas, acreditadas y con historial demostrado de impacto social real.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impacto medible', desc: 'Garantizar que el 87% de cada euro recaudado llega directamente a proyectos concretos, con indicadores de impacto publicados.' },
    ],
  },
  en: {
    title: 'Our objectives',
    subtitle: 'Unaria was born with a clear mission: channelling collective solidarity towards where it is needed most',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Solidarity fundraising', desc: 'Mobilising monthly member fees to build a stable, predictable fund that enables long-term aid planning.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Full transparency', desc: 'Publishing annual reports of all NGO transfers, with amounts, recipients and verifiable references.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'NGO partnerships', desc: 'Working exclusively with audited, accredited organisations with a proven track record of real social impact.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Measurable impact', desc: 'Ensuring 87% of every euro raised reaches concrete projects directly, with published impact indicators.' },
    ],
  },
  fr: {
    title: 'Nos objectifs',
    subtitle: 'Unaria est née avec une mission claire : canaliser la solidarité collective là où elle est le plus nécessaire',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Collecte solidaire', desc: 'Mobiliser les cotisations mensuelles des membres pour créer un fonds stable et prévisible permettant une aide à long terme.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Transparence totale', desc: 'Publier chaque année tous les transferts effectués aux ONG, avec montants, bénéficiaires et références vérifiables.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'Partenariat avec les ONG', desc: 'Collaborer exclusivement avec des entités auditées, accréditées et ayant un bilan démontré d\'impact social réel.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Impact mesurable', desc: 'Garantir que 87 % de chaque euro collecté parvient directement à des projets concrets, avec des indicateurs publiés.' },
    ],
  },
  de: {
    title: 'Unsere Ziele',
    subtitle: 'Unaria wurde mit einer klaren Mission gegründet: kollektive Solidarität dorthin zu leiten, wo sie am meisten gebraucht wird',
    items: [
      { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-blue', title: 'Solidarische Spendensammlung', desc: 'Monatliche Mitgliedsbeiträge mobilisieren, um einen stabilen, planbaren Fonds für langfristige Hilfe aufzubauen.' },
      { icon: <Eye className="w-7 h-7" />, color: 'bg-teal-50 text-brand-teal', title: 'Vollständige Transparenz', desc: 'Jährliche Veröffentlichung aller NGO-Überweisungen mit Beträgen, Empfängern und nachprüfbaren Referenzen.' },
      { icon: <Handshake className="w-7 h-7" />, color: 'bg-purple-50 text-purple-600', title: 'NGO-Partnerschaften', desc: 'Ausschließlich mit geprüften, akkreditierten Organisationen zusammenarbeiten, die nachweislich soziale Wirkung erzielen.' },
      { icon: <BarChart3 className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Messbarer Einfluss', desc: '87 % jedes gesammelten Euros fließen direkt in konkrete Projekte, mit veröffentlichten Wirkungsindikatoren.' },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.items.map((item, i) => (
            <div key={i} className="flex flex-col items-start p-5 sm:p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ textAlign: 'justify' }}>{item.desc}</p>
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
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 tracking-tight">
            {data.title}
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.items.map((item, i) => {
            const value = parseInt(item.stat.replace(/\D/g, ''), 10)
            const suffix = item.stat.replace(/\d/g, '')

            return (
              <div 
                key={i} 
                className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`relative text-5xl sm:text-6xl font-black mb-4 tracking-tighter ${item.accent}`}>
                  <AnimatedCounter end={value} suffix={suffix} duration={2500} />
                </div>
                
                <p className="relative text-white/80 text-base font-medium leading-relaxed mb-6">
                  {item.label}
                </p>
                
                <div className="relative inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
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

export default function HomePage({ params: { locale } }: PageProps) {
  return (
    <>
      <HeroSection locale={locale} />
      <ObjectiusSection locale={locale} />
      <ProjectsSection locale={locale} />
      <NewsSection locale={locale} />
      <DestacatsSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  )
}

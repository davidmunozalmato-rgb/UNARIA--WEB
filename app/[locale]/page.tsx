import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, ArrowDownCircle } from 'lucide-react'
import NewsSection from '@/components/NewsSection'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: 'Unaria – Solidaritat Organitzada',
    description: t('subtitle'),
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ArrowDownCircle className="w-6 h-6" />
      </div>
    </section>
  )
}


function HowItWorksSection({ locale }: { locale: string }) {
  const t = useTranslations('howItWorks')
  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      desc: t('step1Desc'),
      color: 'bg-blue-50',
      textColor: 'text-brand-blue',
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: '02',
      title: t('step2Title'),
      desc: t('step2Desc'),
      color: 'bg-teal-50',
      textColor: 'text-brand-teal',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      number: '03',
      title: t('step3Title'),
      desc: t('step3Desc'),
      color: 'bg-green-50',
      textColor: 'text-green-600',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ]

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0" />
              )}
              <div className={`card relative z-10 text-center hover:shadow-md transition-shadow`}>
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 ${step.textColor}`}>
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-gray-400 mb-2 tracking-wider">{step.number}</div>
                <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/how-we-work`}
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all"
          >
            Saber-ne més <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function TransparencyBar() {
  const t = useTranslations('transparency')
  const percentage = 87

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mb-10">{t('subtitle')}</p>

          <div className="bg-gray-100 rounded-full h-6 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            >
              <span className="text-white text-xs font-bold">{percentage}%</span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('operatingCosts')} (13%)</span>
            <span className="font-semibold text-brand-teal">{percentage}% {t('barLabel')}</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-gray-400">13%</div>
              <div className="text-sm text-gray-600 mt-1">{t('operatingCosts')}</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-brand-teal">{percentage}%</div>
              <div className="text-sm text-gray-600 mt-1">{t('transferredNgos')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NgoSection() {
  const t = useTranslations('ngos')
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cruz Roja */}
          <div className="card hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
              🏥
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{t('cruzRoja')}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{t('cruzRojaDesc')}</p>
            <div className="mt-4">
              <span className="badge bg-red-50 text-red-700 text-xs">Soci actiu</span>
            </div>
          </div>

          {/* Placeholder 2 */}
          <div className="card border-dashed border-gray-300 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
              🌍
            </div>
            <h3 className="font-bold text-gray-500 text-lg mb-2">{t('placeholder')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('placeholderDesc')}</p>
          </div>

          {/* Placeholder 3 */}
          <div className="card border-dashed border-gray-300 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
              💧
            </div>
            <h3 className="font-bold text-gray-500 text-lg mb-2">{t('placeholder')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('placeholderDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const testimonials = [
    { name: t('t1Name'), role: t('t1Role'), text: t('t1Text'), stars: 5 },
    { name: t('t2Name'), role: t('t2Role'), text: t('t2Text'), stars: 5 },
    { name: t('t3Name'), role: t('t3Role'), text: t('t3Text'), stars: 5 },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue font-bold text-sm">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ locale }: { locale: string }) {
  const heroT = useTranslations('hero')
  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Preparat per marcar la diferència?
        </h2>
        <p className="text-blue-100 text-lg mb-10">
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
      <HowItWorksSection locale={locale} />
      <TransparencyBar />
      <NgoSection />
      <NewsSection locale={locale} />
      <TestimonialsSection />
      <CtaSection locale={locale} />
    </>
  )
}

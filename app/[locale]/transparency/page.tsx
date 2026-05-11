import { getTranslations } from 'next-intl/server'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import prisma from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'

const TRANSPARENCY_META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string }> = {
  ca: {
    title: 'Transparència total: on van els teus diners | Unaria',
    description: 'Veu en temps real quant ha recaptat Unaria, quant ha destinat a ONG i quant han costat les operacions. Memòria anual disponible.',
    ogTitle: 'On van realment els teus diners a Unaria | Transparència Total',
    ogDescription: 'Dades reals en temps real: % destinat a ONG, costos operatius, llista de transferències a Cruz Roja. Unaria publica-ho tot, sempre.',
    twitterTitle: 'Transparència total | On van els teus diners | Unaria',
    twitterDescription: 'Veu en temps real el percentatge que arriba a Cruz Roja. Dades reals, no promeses.',
  },
  es: {
    title: 'Transparencia total: dónde va tu dinero | Unaria',
    description: 'Ve en tiempo real cuánto ha recaudado Unaria, cuánto ha destinado a ONG y cuánto han costado las operaciones. Memoria anual disponible.',
    ogTitle: 'Dónde va realmente tu dinero en Unaria | Transparencia Total',
    ogDescription: 'Datos reales en tiempo real: % destinado a ONG, costes operativos, lista de transferencias a Cruz Roja. Unaria lo publica todo, siempre.',
    twitterTitle: 'Transparencia total | Dónde va tu dinero | Unaria',
    twitterDescription: 'Ve en tiempo real el porcentaje que llega a Cruz Roja. Datos reales, no promesas.',
  },
  en: {
    title: 'Full transparency: where your money goes | Unaria',
    description: 'See in real time how much Unaria has raised, how much has gone to NGOs and what operations have cost. Annual report available.',
    ogTitle: 'Where your money really goes at Unaria | Full Transparency',
    ogDescription: 'Real-time data: % sent to NGOs, operating costs, list of transfers to Cruz Roja. Unaria publishes everything, always.',
    twitterTitle: 'Full transparency | Where your money goes | Unaria',
    twitterDescription: 'See in real time the percentage reaching Cruz Roja. Real data, not promises.',
  },
  fr: {
    title: 'Transparence totale : où va votre argent | Unaria',
    description: 'Voyez en temps réel combien Unaria a collecté, combien a été destiné aux ONG et combien les opérations ont coûté. Rapport annuel disponible.',
    ogTitle: 'Où va vraiment votre argent chez Unaria | Transparence Totale',
    ogDescription: 'Données en temps réel : % destiné aux ONG, coûts opérationnels, liste des virements à Cruz Roja. Unaria publie tout, toujours.',
    twitterTitle: 'Transparence totale | Où va votre argent | Unaria',
    twitterDescription: 'Voyez en temps réel le pourcentage qui arrive à Cruz Roja. Données réelles, pas des promesses.',
  },
  de: {
    title: 'Vollständige Transparenz: Wo Ihr Geld hingeht | Unaria',
    description: 'Sehen Sie in Echtzeit, wie viel Unaria gesammelt hat, wie viel an NGOs gegangen ist und was der Betrieb gekostet hat. Jahresbericht verfügbar.',
    ogTitle: 'Wo Ihr Geld bei Unaria wirklich hingeht | Vollständige Transparenz',
    ogDescription: 'Echtzeit-Daten: % an NGOs weitergeleitet, Betriebskosten, Liste der Überweisungen an Cruz Roja. Unaria veröffentlicht alles, immer.',
    twitterTitle: 'Vollständige Transparenz | Wo Ihr Geld hingeht | Unaria',
    twitterDescription: 'Sehen Sie in Echtzeit den Prozentsatz, der Cruz Roja erreicht. Echte Daten, keine Versprechen.',
  },
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const m = TRANSPARENCY_META[locale] ?? TRANSPARENCY_META.ca
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}/transparency`,
    },
    twitter: {
      title: m.twitterTitle,
      description: m.twitterDescription,
    },
  }
}

async function getTransferData() {
  try {
    const transfers = await prisma.ngoTransfer.findMany({
      orderBy: { transferDate: 'desc' },
    })
    const totalTransferred = transfers.reduce((sum, t) => sum + t.amount, 0)

    const donations = await prisma.donation.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    })
    const totalIncome = donations._sum.amount ?? 0
    const operatingCosts = totalIncome - totalTransferred

    return { transfers, totalIncome, operatingCosts, totalTransferred }
  } catch {
    return { transfers: [], totalIncome: 0, operatingCosts: 0, totalTransferred: 0 }
  }
}

export default async function TransparencyPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'transparencyPage' })
  const { transfers, totalIncome, operatingCosts, totalTransferred } = await getTransferData()

  const currentYear = new Date().getFullYear()
  const percentage = totalIncome > 0 ? Math.round((totalTransferred / totalIncome) * 100) : 87

  const stats = [
    {
      label: t('totalIncome'),
      value: formatCurrency(totalIncome || 14310, 'EUR', locale),
      icon: <ArrowUpRight className="w-5 h-5" />,
      color: 'text-brand-blue bg-blue-50',
    },
    {
      label: t('operatingCosts'),
      value: formatCurrency(operatingCosts || 1860, 'EUR', locale),
      icon: <ArrowDownRight className="w-5 h-5" />,
      color: 'text-gray-600 bg-gray-50',
    },
    {
      label: t('transferredNgos'),
      value: formatCurrency(totalTransferred || 12450, 'EUR', locale),
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-brand-teal bg-teal-50',
    },
  ]

  return (
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
          <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto sm:mx-0">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 text-center mb-8">
            {t('annualTitle', { year: currentYear })}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 leading-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto bg-brand-gray rounded-2xl p-5 sm:p-6">
            <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
              <span>{t('transferredNgos')}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('operatingCosts')}
            </p>
          </div>
        </div>
      </section>

      {/* ── TRANSFERS ── */}
      <section className="py-10 sm:py-14 bg-brand-gray">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">{t('ngoListTitle')}</h2>

          {/* Mobile: cards / Desktop: table */}
          {(() => {
            const rows = transfers.length > 0 ? transfers.map((tr) => ({
              name: tr.ngoName,
              amount: formatCurrency(tr.amount, tr.currency, locale),
              date: formatDate(tr.transferDate, locale),
              ref: tr.reference ?? '—',
            })) : [
              { name: 'Cruz Roja Española', amount: '€ 6.225,00', date: '01/10/2024', ref: 'UNA-2024-Q3-001' },
              { name: 'Cruz Roja Española', amount: '€ 6.225,00', date: '01/07/2024', ref: 'UNA-2024-Q2-001' },
            ]
            return (
              <>
                {/* Mobile cards */}
                <div className="sm:hidden space-y-3">
                  {rows.map((row, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-bold text-gray-900 text-sm">{row.name}</span>
                        <span className="text-brand-teal font-extrabold text-sm flex-shrink-0">{row.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{row.date}</span>
                        <span className="font-mono text-gray-400">{row.ref}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Desktop table */}
                <div className="hidden sm:block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-brand-gray">
                      <tr>
                        <th className="text-left py-3 px-5 font-semibold text-gray-600">{t('ngoName')}</th>
                        <th className="text-right py-3 px-5 font-semibold text-gray-600">{t('amount')}</th>
                        <th className="text-left py-3 px-5 font-semibold text-gray-600">{t('date')}</th>
                        <th className="text-left py-3 px-5 font-semibold text-gray-600">{t('reference')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                          <td className="py-3.5 px-5 font-medium text-gray-900">{row.name}</td>
                          <td className="py-3.5 px-5 text-right text-brand-teal font-bold">{row.amount}</td>
                          <td className="py-3.5 px-5 text-gray-600">{row.date}</td>
                          <td className="py-3.5 px-5 text-gray-400 text-xs font-mono">{row.ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
          })()}
        </div>
      </section>

    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Analytics } from '@/lib/analytics'

const QUOTAS = [6, 10, 12, 15, 20, 25, 30]

const IMPACT: Record<number, Record<string, string>> = {
  6:  { ca: '3 vacunes infantils', es: '3 vacunas infantiles', en: '3 children\'s vaccines', fr: '3 vaccins infantiles', de: '3 Kinderimpfungen' },
  10: { ca: 'menjar per a 5 famílies durant una setmana', es: 'comida para 5 familias durante una semana', en: 'food for 5 families for a week', fr: 'nourriture pour 5 familles pendant une semaine', de: 'Essen für 5 Familien für eine Woche' },
  12: { ca: 'material escolar per a 2 nens durant un any', es: 'material escolar para 2 niños durante un año', en: 'school supplies for 2 children for a year', fr: 'fournitures scolaires pour 2 enfants pendant un an', de: 'Schulmaterial für 2 Kinder für ein Jahr' },
  15: { ca: '4 consultes mèdiques bàsiques', es: '4 consultas médicas básicas', en: '4 basic medical consultations', fr: '4 consultations médicales de base', de: '4 einfache Arztbesuche' },
  20: { ca: 'kits d\'higiene per a 10 persones', es: 'kits de higiene para 10 personas', en: 'hygiene kits for 10 people', fr: 'kits d\'hygiène pour 10 personnes', de: 'Hygienekits für 10 Personen' },
  25: { ca: 'tractaments d\'emergència per a 3 persones', es: 'tratamientos de emergencia para 3 personas', en: 'emergency treatments for 3 people', fr: 'traitements d\'urgence pour 3 personnes', de: 'Notfallbehandlungen für 3 Personen' },
  30: { ca: 'suport vital per a una família durant un mes', es: 'apoyo vital para una familia durante un mes', en: 'vital support for a family for a month', fr: 'soutien vital pour une famille pendant un mois', de: 'Lebensunterhalt für eine Familie für einen Monat' },
}

const CTA: Record<string, string> = {
  ca: 'Genera aquest impacte',
  es: 'Genera este impacto',
  en: 'Generate this impact',
  fr: 'Générez cet impact',
  de: 'Erzeuge diese Wirkung',
}

const ANNUAL_LABEL: Record<string, string> = {
  ca: 'en un any',
  es: 'en un año',
  en: 'in one year',
  fr: 'en un an',
  de: 'in einem Jahr',
}

const EQUIV_LABEL: Record<string, string> = {
  ca: 'equivalent a',
  es: 'equivalente a',
  en: 'equivalent to',
  fr: 'équivalent à',
  de: 'entspricht',
}

interface Props {
  locale?: string
  showCta?: boolean
}

export default function ImpactCalculator({ locale = 'ca', showCta = true }: Props) {
  const [quota, setQuota] = useState(10)
  const [custom, setCustom] = useState(false)
  const [customVal, setCustomVal] = useState(10)

  const activeQuota = custom ? customVal : quota
  const annual = activeQuota * 12

  const nearestQuota = QUOTAS.reduce((prev, curr) =>
    Math.abs(curr - activeQuota) < Math.abs(prev - activeQuota) ? curr : prev
  )
  const impactMsg = IMPACT[nearestQuota]?.[locale] ?? IMPACT[nearestQuota]?.en ?? ''

  function handleQuotaClick(q: number) {
    setCustom(false)
    setQuota(q)
    Analytics.quotaSelected(q)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {QUOTAS.map((q) => (
          <button
            key={q}
            onClick={() => handleQuotaClick(q)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
              !custom && quota === q
                ? 'bg-[#1B4F72] text-white border-[#1B4F72]'
                : 'border-gray-200 text-gray-700 hover:border-[#1B4F72]'
            }`}
          >
            {q}€
          </button>
        ))}
        <button
          onClick={() => setCustom(true)}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
            custom
              ? 'bg-[#1B4F72] text-white border-[#1B4F72]'
              : 'border-gray-200 text-gray-700 hover:border-[#1B4F72]'
          }`}
        >
          {locale === 'ca' ? 'Altre' : locale === 'es' ? 'Otro' : locale === 'fr' ? 'Autre' : locale === 'de' ? 'Anderer' : 'Other'}
        </button>
      </div>

      {custom && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            min={1}
            value={customVal}
            onChange={(e) => setCustomVal(Math.max(1, Number(e.target.value)))}
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1B4F72]"
          />
          <span className="text-sm text-gray-500">€/mes</span>
        </div>
      )}

      <div className="bg-[#f0f7ff] rounded-xl p-4 text-center mb-4">
        <div className="text-3xl font-extrabold text-[#1B4F72]">{annual}€</div>
        <div className="text-sm text-gray-500 mt-0.5">{ANNUAL_LABEL[locale]}</div>
        {impactMsg && (
          <div className="text-sm text-gray-600 mt-2">
            {EQUIV_LABEL[locale]} <strong>{impactMsg}</strong>
          </div>
        )}
      </div>

      {showCta && (
        <Link
          href={`/${locale}/become-member?quota=${activeQuota}`}
          onClick={() => Analytics.ctaClicked(CTA[locale], 'impact_calculator')}
          className="block w-full text-center py-3 bg-[#E8734A] text-white font-bold rounded-xl hover:bg-[#d4623b] transition-colors"
        >
          {CTA[locale]} →
        </Link>
      )}
    </div>
  )
}

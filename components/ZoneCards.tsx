'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Anchor, Leaf, Building2 } from 'lucide-react'

type IconKey = 'alert' | 'anchor' | 'leaf' | 'building'

export interface Zone {
  number: string
  icon: IconKey
  title: string
  loc: string
  desc: string
  tag: string
  tag2: string
  accentColor: string
  bgColor: string
  tagColor: string
  tag2Color: string
}

interface ZoneCardsProps {
  zones: Zone[]
}

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  alert: AlertTriangle,
  anchor: Anchor,
  leaf: Leaf,
  building: Building2,
}

export default function ZoneCards({ zones }: ZoneCardsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {zones.map((zone, i) => {
        const Icon = ICONS[zone.icon]
        return (
          <motion.div
            key={zone.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl ${zone.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
              >
                <Icon className={`w-6 h-6 ${zone.accentColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-300 font-mono tracking-wider">
                    {zone.number}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">{zone.title}</h3>
                </div>

                <p className="text-xs font-semibold text-brand-blue mb-2.5 uppercase tracking-wide">
                  {zone.loc}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">{zone.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${zone.tagColor}`}
                  >
                    {zone.tag}
                  </span>
                  {zone.tag2 && (
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${zone.tag2Color}`}
                    >
                      {zone.tag2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

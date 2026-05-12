'use client'

import { useState, useCallback } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  type GeographyFeature,
} from 'react-simple-maps'

const GEO_URL = '/world-110m.json'

const UNARIA_BLUE = '#0052FF'
const UNARIA_BLUE_DARK = '#003ACC'
const PARTNER_BLUE = '#93C5FD'
const PARTNER_BLUE_DARK = '#60A5FA'

interface TooltipState {
  name: string
  x: number
  y: number
  type: 'active' | 'partner'
}

interface FundedCountry {
  id: string
  name: string
}

interface WorldMapProps {
  fundedCountries: FundedCountry[]
  partnerCountries: FundedCountry[]
  tooltipActiveLabel: string
  tooltipPartnerLabel: string
}

export default function WorldMap({ 
  fundedCountries, 
  partnerCountries, 
  tooltipActiveLabel,
  tooltipPartnerLabel
}: WorldMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const fundedMap = new Map(fundedCountries.map((c) => [c.id, c.name]))
  const partnerMap = new Map(partnerCountries.map((c) => [c.id, c.name]))

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<SVGPathElement>, geoId: string) => {
      const fundedName = fundedMap.get(geoId)
      const partnerName = partnerMap.get(geoId)
      
      if (fundedName) {
        setTooltip({ name: fundedName, x: e.clientX, y: e.clientY, type: 'active' })
      } else if (partnerName) {
        setTooltip({ name: partnerName, x: e.clientX, y: e.clientY, type: 'partner' })
      }
    },
    [fundedMap, partnerMap]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGPathElement>, geoId: string) => {
      if (fundedMap.has(geoId) || partnerMap.has(geoId)) {
        setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null))
      }
    },
    [fundedMap, partnerMap]
  )

  const handleMouseLeave = useCallback(() => setTooltip(null), [])

  return (
    <div className="relative w-full">
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x + 14, top: tooltip.y - 52 }}
        >
          <div className="bg-gray-900 text-white text-sm font-medium rounded-lg px-3 py-2 shadow-xl">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: tooltip.type === 'active' ? UNARIA_BLUE : PARTNER_BLUE }}
              />
              {tooltip.name}
            </div>
            <div className="text-xs text-blue-300">
              {tooltip.type === 'active' ? tooltipActiveLabel : tooltipPartnerLabel}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          <ComposableMap
            projectionConfig={{ scale: 155, center: [10, 15] }}
            width={960}
            height={490}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: GeographyFeature[] }) =>
                geographies.map((geo: GeographyFeature) => {
                  const geoId = String(geo.id)
                  const isFunded = fundedMap.has(geoId)
                  const isPartner = partnerMap.has(geoId)
                  
                  let fillColor = '#D1D5DB'
                  let hoverColor = '#B8BDC8'
                  
                  if (isFunded) {
                    fillColor = UNARIA_BLUE
                    hoverColor = UNARIA_BLUE_DARK
                  } else if (isPartner) {
                    fillColor = PARTNER_BLUE
                    hoverColor = PARTNER_BLUE_DARK
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => handleMouseEnter(e, geoId)}
                      onMouseMove={(e) => handleMouseMove(e, geoId)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: (isFunded || isPartner) ? 'pointer' : 'default',
                          transition: 'fill 0.15s ease',
                        },
                        hover: {
                          fill: hoverColor,
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: fillColor,
                          outline: 'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  )
}

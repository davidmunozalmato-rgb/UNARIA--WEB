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

interface FundedCountry {
  id: string
  name: string
}

interface TooltipState {
  name: string
  x: number
  y: number
}

interface WorldMapProps {
  fundedCountries: FundedCountry[]
  tooltipLabel: string
}

export default function WorldMap({ fundedCountries, tooltipLabel }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const fundedMap = new Map(fundedCountries.map((c) => [c.id, c.name]))

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<SVGPathElement>, geoId: string) => {
      const name = fundedMap.get(geoId)
      if (name) setTooltip({ name, x: e.clientX, y: e.clientY })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fundedCountries]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGPathElement>, geoId: string) => {
      if (fundedMap.has(geoId)) {
        setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fundedCountries]
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
                style={{ background: UNARIA_BLUE }}
              />
              {tooltip.name}
            </div>
            <div className="text-xs text-blue-300">{tooltipLabel}</div>
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
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => handleMouseEnter(e, geoId)}
                      onMouseMove={(e) => handleMouseMove(e, geoId)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: isFunded ? UNARIA_BLUE : '#D1D5DB',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: isFunded ? 'pointer' : 'default',
                          transition: 'fill 0.15s ease',
                        },
                        hover: {
                          fill: isFunded ? UNARIA_BLUE_DARK : '#B8BDC8',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: isFunded ? UNARIA_BLUE : '#D1D5DB',
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

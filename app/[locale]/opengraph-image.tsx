import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Unaria – Solidaritat Organitzada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)',
          padding: '80px',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 240,
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />
        {/* Decorative circle bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: 160,
            width: 280,
            height: 280,
            borderRadius: 140,
            background: 'rgba(26,188,156,0.18)',
            display: 'flex',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: '#1ABC9C',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: 'white',
                borderRadius: 19,
                display: 'flex',
              }}
            />
          </div>
          <span
            style={{
              color: 'white',
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Unaria
          </span>
        </div>

        {/* Main tagline */}
        <div
          style={{
            color: 'white',
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.15,
            maxWidth: 820,
            marginBottom: 36,
            letterSpacing: -1,
          }}
        >
          Junts transformem vides a través de la solidaritat
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: 'rgba(255,255,255,0.72)',
            fontSize: 28,
            fontWeight: 400,
            maxWidth: 680,
          }}
        >
          Associació sense ànim de lucre · Registrada a Catalunya
        </div>

        {/* Bottom teal bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: '#1ABC9C',
            display: 'flex',
          }}
        />

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 80,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 22,
            fontWeight: 500,
            display: 'flex',
          }}
        >
          unaria.org
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

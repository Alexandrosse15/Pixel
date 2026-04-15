import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'InsertCoins.press, le média indépendant du jeu vidéo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#FF4500',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 96,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            INSERT
          </span>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 96,
              fontWeight: 900,
              color: '#FF4500',
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            COINS
          </span>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 40,
              fontWeight: 700,
              color: '#555555',
            }}
          >
            .press
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'sans-serif',
            fontSize: 24,
            color: '#888888',
            marginTop: 16,
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Le média indépendant du jeu vidéo
        </p>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: '#FF4500',
            opacity: 0.4,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

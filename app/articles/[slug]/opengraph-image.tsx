import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/articles'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_COLORS: Record<string, string> = {
  tests: '#FF4500',
  previews: '#F59E0B',
  dossiers: '#7C3AED',
  industrie: '#059669',
}

const CATEGORY_LABELS: Record<string, string> = {
  tests: 'TEST',
  previews: 'PREVIEW',
  dossiers: 'DOSSIER',
  industrie: 'INDUSTRIE',
}

export default function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return new ImageResponse(
      <div style={{ background: '#0A0A0A', width: '100%', height: '100%', display: 'flex' }} />,
      { width: 1200, height: 630 }
    )
  }

  const accentColor = CATEGORY_COLORS[article.category] || '#FF4500'
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category.toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: accentColor,
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: accentColor,
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: '3px',
              padding: '6px 14px',
              fontFamily: 'sans-serif',
            }}
          >
            {categoryLabel}
          </div>
          {article.score && (
            <div
              style={{
                border: `2px solid ${accentColor}`,
                color: accentColor,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: '2px',
                padding: '6px 14px',
                fontFamily: 'sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{article.score}</span>
              <span style={{ color: '#555', fontSize: 14 }}>/10</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: article.title.length > 60 ? 48 : 60,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {article.title}
        </div>

        {/* Bottom: author + site */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #242424',
            paddingTop: 24,
            marginTop: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'sans-serif',
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              {article.author.charAt(0)}
            </div>
            <span style={{ color: '#888', fontFamily: 'sans-serif', fontSize: 18 }}>
              {article.author} · {article.readTime} de lecture
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: 24,
                fontWeight: 900,
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              INSERT
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: 24,
                fontWeight: 900,
                color: accentColor,
                textTransform: 'uppercase',
              }}
            >
              COINS
            </span>
            <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: '#555' }}>
              .press
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useLocale } from './LocaleProvider'

interface Props {
  slug: string
}

export default function CommunityRating({ slug }: Props) {
  const { locale } = useLocale()
  const [average, setAverage] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const STORAGE_KEY = `rating_voted_${slug}`

  useEffect(() => {
    // Charger la note courante
    fetch(`/api/ratings/${slug}`)
      .then((r) => r.json())
      .then((data: { average: number; count: number }) => {
        if (data.count > 0) {
          setAverage(data.average)
          setCount(data.count)
        }
      })
      .catch(() => {})

    // Vérifier si déjà voté
    if (localStorage.getItem(STORAGE_KEY)) {
      setHasVoted(true)
    }
  }, [slug, STORAGE_KEY])

  async function submitRating(score: number) {
    if (hasVoted || submitting) return
    setSubmitting(true)
    setSelected(score)

    try {
      const res = await fetch(`/api/ratings/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })
      const data = await res.json() as { average: number; count: number }
      setAverage(data.average)
      setCount(data.count)
      setHasVoted(true)
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      setSelected(null)
    } finally {
      setSubmitting(false)
    }
  }

  const dots = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
  const displayValue = hovered ?? selected
  const label = locale === 'fr' ? 'Note communauté' : 'Community score'
  const votesLabel = locale === 'fr'
    ? `${count} vote${count !== 1 ? 's' : ''}`
    : `${count} vote${count !== 1 ? 's' : ''}`
  const thanksLabel = locale === 'fr' ? 'Merci pour votre note !' : 'Thanks for rating!'
  const rateLabel = locale === 'fr' ? 'Notez ce jeu' : 'Rate this game'

  return (
    <div className="mt-8 rounded-sm border border-line bg-bg-card p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

        {/* Score affiché */}
        <div>
          <p className="font-display text-xs uppercase tracking-widest text-ink-muted">{label}</p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-4xl font-black text-brand">
              {average !== null ? average : '--'}
            </span>
            <span className="font-display text-lg font-bold text-ink-muted">/100</span>
          </div>
          {count > 0 && (
            <p className="mt-1 text-xs text-ink-muted">{votesLabel}</p>
          )}
        </div>

        {/* Voteur */}
        <div className="flex flex-col gap-3">
          {hasVoted ? (
            <p className="font-display text-sm font-bold text-brand">{thanksLabel}</p>
          ) : (
            <>
              <p className="font-display text-xs uppercase tracking-widest text-ink-muted">{rateLabel}</p>
              <div className="flex items-center gap-1.5">
                {dots.map((val) => {
                  const active = displayValue !== null && val <= displayValue
                  return (
                    <button
                      key={val}
                      onMouseEnter={() => !hasVoted && setHovered(val)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => submitRating(val)}
                      disabled={submitting}
                      title={`${val}/100`}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-100 ${
                        active
                          ? 'bg-brand scale-125'
                          : 'bg-bg-elevated hover:bg-brand/40'
                      }`}
                    />
                  )
                })}
                {displayValue !== null && (
                  <span className="ml-2 font-display text-sm font-black text-brand">
                    {displayValue}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

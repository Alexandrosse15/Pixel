'use client'

import { useState, useEffect } from 'react'
import { useLocale } from './LocaleProvider'

interface Props {
  slug: string
  variant?: 'sidebar' | 'inline'
}

export default function CommunityRating({ slug, variant = 'sidebar' }: Props) {
  const { locale } = useLocale()
  const [average, setAverage] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const STORAGE_KEY = `rating_voted_${slug}`

  useEffect(() => {
    fetch(`/api/ratings/${slug}`)
      .then((r) => r.json())
      .then((data: { average: number; count: number }) => {
        if (data.count > 0) {
          setAverage(data.average)
          setCount(data.count)
        }
      })
      .catch(() => {})

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

  const labels = {
    score: locale === 'fr' ? 'Note communauté' : 'Community score',
    votes: (n: number) => `${n} vote${n !== 1 ? 's' : ''}`,
    noVotes: locale === 'fr' ? 'Aucun vote' : 'No votes yet',
    thanks: locale === 'fr' ? 'Merci !' : 'Thanks!',
    rate: locale === 'fr' ? 'Notez ce jeu' : 'Rate this game',
    yourScore: locale === 'fr' ? 'Votre note' : 'Your score',
  }

  if (variant === 'sidebar') {
    return (
      <div className="rounded-sm border border-line bg-bg-card p-5">
        {/* Score affiché */}
        <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
          {labels.score}
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-display text-5xl font-black text-brand">
            {average !== null ? average : '--'}
          </span>
          <span className="font-display text-base font-bold text-ink-muted">/100</span>
        </div>
        <p className="mt-1 text-xs text-ink-muted">
          {count > 0 ? labels.votes(count) : labels.noVotes}
        </p>

        {/* Barre de progression */}
        <div className="mt-3 h-1 w-full rounded-full bg-bg-elevated">
          <div
            className="h-full rounded-full bg-brand transition-all duration-700"
            style={{ width: average !== null ? `${average}%` : '0%' }}
          />
        </div>

        <div className="mt-5 border-t border-line pt-4">
          {hasVoted ? (
            <p className="font-display text-sm font-bold text-brand">{labels.thanks}</p>
          ) : (
            <>
              <p className="mb-3 font-display text-xs uppercase tracking-widest text-ink-muted">
                {labels.rate}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {dots.map((val) => {
                  const active = displayValue !== null && val <= displayValue
                  return (
                    <button
                      key={val}
                      onMouseEnter={() => setHovered(val)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => submitRating(val)}
                      disabled={submitting}
                      title={`${val}/100`}
                      className={`h-3 w-3 rounded-full transition-all duration-100 ${
                        active ? 'bg-brand scale-125' : 'bg-bg-elevated hover:bg-brand/40'
                      }`}
                    />
                  )
                })}
              </div>
              {displayValue !== null && (
                <p className="mt-2 font-display text-xs text-ink-muted">
                  {labels.yourScore} :{' '}
                  <span className="font-black text-brand">{displayValue}/100</span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // variant inline (fallback mobile)
  return (
    <div className="mt-8 rounded-sm border border-line bg-bg-card p-5">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="font-display text-xs uppercase tracking-widest text-ink-muted">{labels.score}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-3xl font-black text-brand">
              {average !== null ? average : '--'}
            </span>
            <span className="font-display text-sm font-bold text-ink-muted">/100</span>
          </div>
          {count > 0 && <p className="text-xs text-ink-muted">{labels.votes(count)}</p>}
        </div>
        {hasVoted ? (
          <p className="font-display text-sm font-bold text-brand">{labels.thanks}</p>
        ) : (
          <div>
            <p className="mb-2 font-display text-xs uppercase tracking-widest text-ink-muted">{labels.rate}</p>
            <div className="flex gap-1.5">
              {dots.map((val) => {
                const active = displayValue !== null && val <= displayValue
                return (
                  <button
                    key={val}
                    onMouseEnter={() => setHovered(val)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => submitRating(val)}
                    disabled={submitting}
                    title={`${val}/100`}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      active ? 'bg-brand scale-125' : 'bg-bg-elevated hover:bg-brand/40'
                    }`}
                  />
                )
              })}
              {displayValue !== null && (
                <span className="ml-1 font-display text-xs font-black text-brand">{displayValue}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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
    if (localStorage.getItem(STORAGE_KEY)) setHasVoted(true)
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

  const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const displayValue = hovered ?? selected

  const labels = {
    community: locale === 'fr' ? 'Communauté' : 'Community',
    votes: (n: number) => locale === 'fr' ? `${n} vote${n > 1 ? 's' : ''}` : `${n} vote${n > 1 ? 's' : ''}`,
    noVotes: locale === 'fr' ? 'Soyez le premier' : 'Be the first',
    thanks: locale === 'fr' ? 'Vote enregistré !' : 'Vote saved!',
    rate: locale === 'fr' ? 'Votre note' : 'Your rating',
    press: locale === 'fr' ? 'Presse' : 'Press',
  }

  const scoreColor = (s: number) =>
    s >= 80 ? 'text-emerald-400' : s >= 60 ? 'text-brand' : s >= 40 ? 'text-amber-400' : 'text-red-400'

  if (variant === 'sidebar') {
    return (
      <div className="overflow-hidden rounded-sm border border-brand/30 bg-bg-card shadow-lg shadow-brand/5">
        {/* Header accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />

        <div className="p-5">
          {/* Label */}
          <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-brand">
            {labels.community}
          </p>

          {/* Score */}
          <div className="mt-3 flex items-end gap-2">
            <span className={`font-display text-6xl font-black leading-none ${average !== null ? scoreColor(average) : 'text-white/20'}`}>
              {average !== null ? average : '--'}
            </span>
            <span className="mb-1 font-display text-lg font-bold text-white/30">/100</span>
          </div>

          {/* Votes count */}
          <p className="mt-1.5 text-xs text-white/40">
            {count >= 100 ? labels.votes(count) : labels.noVotes}
          </p>

          {/* Barre */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-brand transition-all duration-700"
              style={{ width: average !== null ? `${average}%` : '0%' }}
            />
          </div>

          {/* Séparateur */}
          <div className="my-5 h-px bg-white/5" />

          {/* Zone de vote */}
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            {hasVoted ? labels.thanks : labels.rate}
          </p>

          {hasVoted ? (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              {selected && (
                <span className="font-display text-sm font-black text-brand">{selected}/100</span>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {steps.map((val) => {
                const active = displayValue !== null && val <= displayValue
                return (
                  <button
                    key={val}
                    onMouseEnter={() => setHovered(val)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => submitRating(val)}
                    disabled={submitting}
                    title={`${val}/100`}
                    className={`group relative flex h-8 w-full items-center justify-center rounded-sm border text-xs font-bold font-display transition-all duration-100 ${
                      active
                        ? 'border-brand bg-brand text-white shadow-sm shadow-brand/30'
                        : 'border-white/10 bg-white/5 text-white/30 hover:border-brand/50 hover:bg-brand/10 hover:text-white/70'
                    }`}
                  >
                    {val}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Inline (mobile)
  return (
    <div className="mt-8 overflow-hidden rounded-sm border border-brand/30 bg-bg-card">
      <div className="h-0.5 w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-brand">{labels.community}</p>
            <div className="mt-1 flex items-end gap-1">
              <span className={`font-display text-4xl font-black leading-none ${average !== null ? scoreColor(average) : 'text-white/20'}`}>
                {average !== null ? average : '--'}
              </span>
              <span className="mb-0.5 font-display text-base font-bold text-white/30">/100</span>
            </div>
            {count >= 100 && <p className="mt-1 text-xs text-white/40">{labels.votes(count)}</p>}
          </div>

          {hasVoted ? (
            <div className="flex flex-col items-end gap-1">
              <p className="font-display text-xs font-bold text-brand">{labels.thanks}</p>
              {selected && <span className="font-display text-lg font-black text-brand">{selected}/100</span>}
            </div>
          ) : (
            <div>
              <p className="mb-2 text-right font-display text-xs font-bold uppercase tracking-widest text-white/40">{labels.rate}</p>
              <div className="flex gap-1.5">
                {steps.map((val) => {
                  const active = displayValue !== null && val <= displayValue
                  return (
                    <button
                      key={val}
                      onMouseEnter={() => setHovered(val)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => submitRating(val)}
                      disabled={submitting}
                      title={`${val}/100`}
                      className={`h-5 w-5 rounded-sm border text-xs font-display transition-all ${
                        active
                          ? 'border-brand bg-brand text-white'
                          : 'border-white/10 bg-white/5 text-white/30 hover:border-brand/50 hover:text-white/60'
                      }`}
                    >
                      {val === 100 ? '!' : val / 10}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useLocale } from './LocaleProvider'

interface Nominee {
  slug: string
  game: string
  score: number
  coverImage?: string
}

interface Props {
  categoryId: string
  title: string
  description: string
  nominees: Nominee[]
}

export default function PalmaresCategory({ categoryId, title, description, nominees }: Props) {
  const { locale } = useLocale()
  const [results, setResults] = useState<Record<string, number>>({})
  const [voted, setVoted] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const storageKey = `palmares:${categoryId}`

  useEffect(() => {
    try {
      const prev = localStorage.getItem(storageKey)
      if (prev) setVoted(prev)
    } catch {}
    fetch(`/api/palmares/${categoryId}`)
      .then((r) => r.json())
      .then((d: Record<string, number>) => setResults(d))
      .catch(() => {})
  }, [categoryId, storageKey])

  const total = Object.values(results).reduce((a, b) => a + b, 0)

  const labels = locale === 'en'
    ? { vote: 'Vote', voted: 'Your pick', votes: (n: number) => `${n} vote${n > 1 ? 's' : ''}`, none: 'No votes yet', total: (n: number) => `${n} vote${n > 1 ? 's' : ''} cast` }
    : { vote: 'Voter', voted: 'Votre choix', votes: (n: number) => `${n} voix`, none: 'Aucun vote pour le moment', total: (n: number) => `${n} vote${n > 1 ? 's' : ''} exprimé${n > 1 ? 's' : ''}` }

  async function submit(slug: string) {
    if (voted || sending) return
    setSending(true)
    try {
      const res = await fetch(`/api/palmares/${categoryId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: slug }),
      })
      if (res.ok) {
        const data = (await res.json()) as Record<string, number>
        setResults(data)
        setVoted(slug)
        try { localStorage.setItem(storageKey, slug) } catch {}
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/50">{description}</p>
      <p className="mt-1 text-xs text-white/30">{total > 0 ? labels.total(total) : labels.none}</p>

      <ul className="mt-5 space-y-2">
        {nominees.map((n) => {
          const count = results[n.slug] ?? 0
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          const isPick = voted === n.slug
          return (
            <li key={n.slug}>
              <button
                type="button"
                onClick={() => submit(n.slug)}
                disabled={!!voted || sending}
                aria-label={`${labels.vote} ${n.game}`}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-sm border px-4 py-3 text-left transition-colors ${
                  isPick ? 'border-brand bg-brand/10' : 'border-line bg-bg-card hover:border-brand/50'
                } ${voted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {voted && (
                  <span
                    className="absolute inset-y-0 left-0 bg-brand/10 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                    aria-hidden
                  />
                )}
                <span className="relative flex-1 font-semibold text-white">{n.game}</span>
                <span className="relative font-display text-xs font-bold text-white/30">{n.score}/10</span>
                {voted && (
                  <span className="relative w-24 text-right font-display text-sm font-bold text-brand">
                    {pct}% <span className="text-xs font-normal text-white/40">({labels.votes(count)})</span>
                  </span>
                )}
                {isPick && <span className="relative text-xs font-bold uppercase text-brand">{labels.voted}</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

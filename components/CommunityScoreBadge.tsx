'use client'

import { useState, useEffect } from 'react'

interface Props {
  slug: string
}

export default function CommunityScoreBadge({ slug }: Props) {
  const [average, setAverage] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/ratings/${slug}`)
      .then((r) => r.json())
      .then((data: { average: number; count: number }) => {
        if (data.count > 0) setAverage(data.average)
      })
      .catch(() => {})
  }, [slug])

  if (average === null) return null

  return (
    <div className="flex items-center gap-1 rounded-sm border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-sm" title="Note communauté">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-ink-muted">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v6h-2zm0-4h2v2h-2z"/>
      </svg>
      <span className="font-display text-xs font-black text-white/70">{average}</span>
      <span className="font-display text-xs text-white/40">/100</span>
    </div>
  )
}

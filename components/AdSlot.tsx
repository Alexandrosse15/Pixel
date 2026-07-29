'use client'

import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADS_ENABLED } from '@/lib/config'

interface Props {
  slot?: string
  locale: string
  variant?: 'inline' | 'sidebar'
  // Hauteur mini de la maquette en mode test (px)
  testHeight?: number
}

// Emplacement publicitaire discret, réservé aux pages guides.
// Tant que NEXT_PUBLIC_ADSENSE_CLIENT n'est pas renseigné, on affiche une maquette
// (placeholder "Publicité") pour visualiser l'emplacement sans compte AdSense actif.
// Une fois l'ID renseigné, le même composant sert de vraie annonce responsive.
export default function AdSlot({ slot, locale, variant = 'inline', testHeight = 250 }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!ADS_ENABLED || pushed.current) return
    try {
      // @ts-expect-error adsbygoogle est injecté par le script AdSense
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // silencieux : si le script n'est pas encore chargé, AdSense réessaiera
    }
  }, [])

  const label = locale === 'en' ? 'Advertisement' : 'Publicité'

  return (
    <div className={`${variant === 'inline' ? 'my-10' : ''} not-prose w-full`}>
      <p className="mb-1 text-center font-display text-[10px] uppercase tracking-widest text-ink-muted/60">
        {label}
      </p>
      {ADS_ENABLED ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-sm border border-dashed border-line bg-bg-card/50 text-xs text-ink-muted/50"
          style={{ minHeight: testHeight }}
        >
          {locale === 'en' ? 'Ad slot (test mode)' : 'Emplacement pub (mode test)'}
        </div>
      )}
    </div>
  )
}

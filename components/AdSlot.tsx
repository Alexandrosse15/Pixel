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

  // Emplacements validés. Tant qu'aucun ID AdSense n'est renseigné, on n'affiche la maquette
  // qu'en développement local : en production, on ne montre rien aux visiteurs (pas de cadre
  // "mode test"). Une fois l'ID posé, la vraie annonce s'affiche partout.
  const showPlaceholder = !ADS_ENABLED && process.env.NODE_ENV !== 'production'
  if (!ADS_ENABLED && !showPlaceholder) return null

  // Format bandeau uniquement : annonces horizontales et plates (type 728x90 / 320x100).
  // On plafonne la hauteur pour interdire tout format carré ou pleine hauteur qui
  // envahirait l'écran. Le paramètre testHeight n'est plus utilisé (conservé pour compat).
  const maxW = variant === 'sidebar' ? 300 : 728
  const bannerH = 110

  return (
    <div className={`${variant === 'inline' ? 'my-8' : ''} not-prose flex w-full flex-col items-center`}>
      <p className="mb-1 text-center font-display text-[10px] uppercase tracking-widest text-ink-muted/60">
        {label}
      </p>
      {ADS_ENABLED ? (
        <div className="mx-auto w-full overflow-hidden" style={{ maxWidth: maxW, maxHeight: bannerH }}>
          <ins
            ref={ref}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: bannerH }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-sm border border-dashed border-line bg-bg-card/50 text-xs text-ink-muted/50"
          style={{ maxWidth: maxW, height: bannerH }}
        >
          {locale === 'en' ? 'Ad banner (test mode)' : 'Bandeau pub (mode test)'}
        </div>
      )}
    </div>
  )
}

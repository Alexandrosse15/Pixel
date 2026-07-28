import { gamesplanetLink } from '@/lib/config'

interface Props {
  gameName?: string
  buyUrl?: string
  locale: string
  variant?: 'sidebar' | 'inline'
}

// Bouton d'affiliation Gamesplanet. La mention de lien affilié est obligatoire
// (transparence), et le lien est marqué sponsored/nofollow pour le SEO.
export default function BuyButton({ gameName, buyUrl, locale, variant = 'sidebar' }: Props) {
  if (!gameName && !buyUrl) return null

  const href = gamesplanetLink(gameName, buyUrl)
  const label = locale === 'en' ? 'Buy on Gamesplanet' : 'Acheter sur Gamesplanet'
  const disclosure =
    locale === 'en'
      ? 'Affiliate link: a purchase earns us a commission, at no extra cost to you.'
      : 'Lien affilié : un achat via ce lien nous reverse une commission, sans surcoût pour vous.'

  return (
    <div
      className={`rounded-sm border border-line bg-bg-card p-5 ${
        variant === 'inline' ? 'mt-8' : ''
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="flex items-center justify-center gap-2 rounded-sm bg-brand px-4 py-3 font-display text-sm font-black uppercase tracking-wide text-white no-underline transition-opacity hover:opacity-90"
      >
        {label}
        <span aria-hidden>↗</span>
      </a>
      <p className="mt-2 text-center text-[11px] leading-tight text-ink-muted">{disclosure}</p>
    </div>
  )
}

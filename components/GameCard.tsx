import Link from 'next/link'
import Image from 'next/image'
import type { SimilarGame } from '@/lib/games'
import type { Locale } from '@/lib/i18n'

interface Props {
  game: SimilarGame
  locale: Locale
}

export default function GameCard({ game, locale }: Props) {
  const href = locale === 'en' ? `/en/jeu/${game.slug}` : `/jeu/${game.slug}`
  const label =
    locale === 'en'
      ? `${game.articleCount} article${game.articleCount > 1 ? 's' : ''}`
      : `${game.articleCount} article${game.articleCount > 1 ? 's' : ''}`

  return (
    <Link href={href} className="group no-underline">
      <article className="card-hover relative h-32 overflow-hidden rounded-sm border border-line bg-bg-card">
        {game.coverImage ? (
          <Image
            src={game.coverImage}
            alt={game.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${game.imageColor ?? 'from-zinc-900 to-zinc-800'}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/60 to-transparent" />

        {typeof game.score === 'number' && (
          <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm border border-brand/40 bg-bg-base/80 backdrop-blur-sm">
            <span className="font-display text-sm font-black text-brand">{game.score}</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 font-display text-sm font-black uppercase leading-tight text-ink-primary transition-colors group-hover:text-brand">
            {game.name}
          </h3>
          <p className="mt-1 text-xs text-ink-muted">{label}</p>
        </div>
      </article>
    </Link>
  )
}

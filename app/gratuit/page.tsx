import { headers } from 'next/headers'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import type { Metadata } from 'next'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FreeGame {
  id: string
  title: string
  imageUrl: string | null
  storeUrl: string
  endDate: string | null
  startDate: string | null
  isCurrent: boolean
  platform: 'epic' | 'gog'
}

// ─── Epic Games Store ──────────────────────────────────────────────────────────

async function fetchEpicFreeGames(): Promise<FreeGame[]> {
  try {
    const res = await fetch(
      'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    const elements = data?.data?.Catalog?.searchStore?.elements ?? []

    const now = new Date()
    const games: FreeGame[] = []

    for (const el of elements) {
      const originalPrice = el?.price?.totalPrice?.originalPrice ?? 0
      const discountPrice = el?.price?.totalPrice?.discountPrice ?? 0

      // Ignore permanently free games
      if (originalPrice === 0) continue

      const activeOffers = el?.promotions?.promotionalOffers ?? []
      const upcomingOffers = el?.promotions?.upcomingPromotionalOffers ?? []

      let isCurrent = false
      let endDate: string | null = null
      let startDate: string | null = null

      // Check active free offers
      for (const promo of activeOffers) {
        for (const offer of promo?.promotionalOffers ?? []) {
          const start = new Date(offer.startDate)
          const end = new Date(offer.endDate)
          if (now >= start && now <= end && discountPrice === 0) {
            isCurrent = true
            endDate = offer.endDate
            break
          }
        }
        if (isCurrent) break
      }

      // Check upcoming free offers
      if (!isCurrent) {
        for (const promo of upcomingOffers) {
          for (const offer of promo?.promotionalOffers ?? []) {
            if (offer?.discountSetting?.discountPercentage === 100) {
              startDate = offer.startDate
              endDate = offer.endDate
              break
            }
          }
          if (startDate) break
        }
        if (!startDate) continue
      }

      // Pick best image
      const images: { type: string; url: string }[] = el?.keyImages ?? []
      const priority = ['OfferImageWide', 'DieselStoreFrontWide', 'Thumbnail', 'DieselStoreFrontTall']
      let imageUrl: string | null = null
      for (const type of priority) {
        const found = images.find((img) => img.type === type)
        if (found) { imageUrl = found.url; break }
      }
      if (!imageUrl && images.length > 0) imageUrl = images[0].url

      // Build store URL
      const slug = el?.productSlug ?? el?.urlSlug ?? null
      const storeUrl = slug
        ? `https://store.epicgames.com/fr/p/${slug.replace(/\/home$/, '')}`
        : 'https://store.epicgames.com/fr/free-games'

      games.push({
        id: el?.id ?? Math.random().toString(),
        title: el?.title ?? '',
        imageUrl,
        storeUrl,
        endDate,
        startDate,
        isCurrent,
        platform: 'epic',
      })
    }

    return games
  } catch {
    return []
  }
}

// ─── GOG ──────────────────────────────────────────────────────────────────────

async function fetchGOGFreeGames(): Promise<FreeGame[]> {
  try {
    const res = await fetch(
      'https://catalog.gog.com/v1/catalog?limit=12&price=between:0,0&discounted=true&order=desc:discountedToDate',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    const products = data?.products ?? []

    return products
      .filter((p: Record<string, unknown>) => {
        const price = p?.price as Record<string, string> | undefined
        const discount = parseInt(price?.discount ?? '0', 10)
        return discount === 100
      })
      .map((p: Record<string, unknown>) => {
        const cover = p?.coverHorizontal as string | undefined
        const imageUrl = cover
          ? cover.startsWith('//') ? `https:${cover}` : cover
          : null
        const storeLink = p?.storeLink as string | undefined
        const storeUrl = storeLink
          ? `https://www.gog.com${storeLink}`
          : 'https://www.gog.com/games?priceRange=0,0&discounted=true'

        return {
          id: String(p?.id ?? Math.random()),
          title: String(p?.title ?? ''),
          imageUrl,
          storeUrl,
          endDate: null,
          startDate: null,
          isCurrent: true,
          platform: 'gog' as const,
        }
      })
  } catch {
    return []
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.gratuit
  const frBase = `${SITE_URL}/gratuit`
  const enBase = `${SITE_URL}/en/gratuit`
  const canonicalUrl = locale === 'en' ? enBase : frBase
  return {
    title: s.title,
    description: s.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: frBase, en: enBase, 'x-default': frBase },
    },
    openGraph: {
      title: `${s.title} | ${SITE_NAME}`,
      description: s.description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@insertcoinspress',
      title: `${s.title} | ${SITE_NAME}`,
      description: s.description,
    },
  }
}

// ─── Utils ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, locale: Locale): string {
  try {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// ─── Game Card ────────────────────────────────────────────────────────────────

function GameCard({ game, tg, locale }: { game: FreeGame; tg: ReturnType<typeof getT>['gratuit']; locale: Locale }) {
  return (
    <a
      href={game.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-sm border border-line bg-bg-elevated transition-all hover:border-brand"
    >
      {/* Cover */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-surface">
        {game.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={game.imageUrl}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-surface text-ink-muted text-sm">
            {game.title}
          </div>
        )}
        {/* Badge */}
        <span
          className={`absolute left-2 top-2 rounded-sm px-2 py-0.5 font-display text-xs font-black uppercase tracking-widest ${
            game.isCurrent
              ? 'bg-brand text-white'
              : 'bg-bg-elevated text-ink-secondary border border-line'
          }`}
        >
          {game.isCurrent ? tg.free_badge : tg.upcoming_badge}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white line-clamp-2 transition-colors group-hover:text-brand">
          {game.title}
        </h3>
        {game.isCurrent && game.endDate && (
          <p className="text-xs text-ink-muted">
            {tg.until} {formatDate(game.endDate, locale)}
          </p>
        )}
        {!game.isCurrent && game.startDate && (
          <p className="text-xs text-ink-muted">
            {tg.from} {formatDate(game.startDate, locale)}
          </p>
        )}
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-brand px-3 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            {tg.claim}
          </span>
        </div>
      </div>
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GratuitPage() {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.gratuit
  const tg = t.gratuit

  const [epicGames, gogGames] = await Promise.all([
    fetchEpicFreeGames(),
    fetchGOGFreeGames(),
  ])

  const epicCurrent = epicGames.filter((g) => g.isCurrent)
  const epicUpcoming = epicGames.filter((g) => !g.isCurrent)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      {/* Header */}
      <div className="mb-12 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          <span className="block h-10 w-1.5 bg-brand" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-brand">{t.sections.label}</p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">{s.title}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">{s.description}</p>
      </div>

      {/* Epic Games Store */}
      <section className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-6 w-1 bg-brand" />
          <h2 className="font-display text-xl font-black uppercase tracking-wide text-white">
            {tg.epic_section}
          </h2>
        </div>

        {epicCurrent.length === 0 && epicUpcoming.length === 0 ? (
          <p className="py-8 text-sm text-ink-muted">{tg.no_games}</p>
        ) : (
          <div className="space-y-8">
            {epicCurrent.length > 0 && (
              <div>
                <p className="mb-4 font-display text-xs uppercase tracking-widest text-ink-secondary">{tg.current}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {epicCurrent.map((game) => (
                    <GameCard key={game.id} game={game} tg={tg} locale={locale} />
                  ))}
                </div>
              </div>
            )}
            {epicUpcoming.length > 0 && (
              <div>
                <p className="mb-4 font-display text-xs uppercase tracking-widest text-ink-secondary">{tg.upcoming}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {epicUpcoming.map((game) => (
                    <GameCard key={game.id} game={game} tg={tg} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* GOG */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-6 w-1 bg-brand" />
          <h2 className="font-display text-xl font-black uppercase tracking-wide text-white">
            {tg.gog_section}
          </h2>
        </div>

        {gogGames.length === 0 ? (
          <p className="py-8 text-sm text-ink-muted">{tg.no_games}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gogGames.map((game) => (
              <GameCard key={game.id} game={game} tg={tg} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

import {
  extraLabels,
  featureLabels,
  genreLabels,
  platformLabels,
  priceLabel,
  releaseLabel,
  studioLabel,
  type SteamSheet,
} from '@/lib/games'
import type { Locale, Translations } from '@/lib/i18n'

interface Props {
  sheet: SteamSheet
  locale: Locale
  t: Translations
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 last:border-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="font-display text-xs uppercase tracking-widest text-ink-muted sm:w-32 sm:flex-shrink-0">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-secondary">{children}</dd>
    </div>
  )
}

export default function GameFacts({ sheet, locale, t }: Props) {
  const { developer, publisher } = studioLabel(sheet)
  const release = releaseLabel(sheet, locale)
  const price = priceLabel(sheet, locale)
  const platforms = platformLabels(sheet)
  const genres = genreLabels(sheet, locale)
  const modes = featureLabels(sheet, locale)
  const extras = extraLabels(sheet, locale)
  const reviews = sheet.reviews

  return (
    <aside className="rounded-sm border border-line bg-bg-card p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
        <span className="block h-5 w-1 bg-brand" />
        <h2 className="font-display text-sm font-black uppercase tracking-wide text-white">
          {t.game.sheet_title}
        </h2>
      </div>

      <dl>
        {release && (
          <Row label={t.game.release}>
            {release}
            {sheet.comingSoon && (
              <span className="ml-2 rounded-sm border border-brand/40 px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wide text-brand">
                {t.game.coming_soon}
              </span>
            )}
            {!sheet.comingSoon && sheet.earlyAccess && (
              <span className="ml-2 rounded-sm border border-line px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wide text-ink-muted">
                {t.game.early_access}
              </span>
            )}
          </Row>
        )}

        {developer && <Row label={t.game.developer}>{developer}</Row>}
        {publisher && <Row label={t.game.publisher}>{publisher}</Row>}

        {price && (
          <Row label={t.game.price}>
            <span className="font-display font-bold text-ink-primary">{price}</span>
            {!sheet.price?.isFree && (
              <span className="ml-2 text-xs text-ink-muted">({t.game.price_note})</span>
            )}
          </Row>
        )}

        {platforms.length > 0 && <Row label={t.game.platforms}>{platforms.join(', ')}</Row>}
        {genres.length > 0 && <Row label={t.game.genres}>{genres.join(', ')}</Row>}
        {modes.length > 0 && <Row label={t.game.modes}>{modes.join(', ')}</Row>}
        {extras.length > 0 && <Row label={t.game.extras}>{extras.join(', ')}</Row>}

        {reviews && reviews.label && (
          <Row label={t.game.steam_reviews}>
            <span className="text-ink-primary">{reviews.label[locale]}</span>
            <span className="ml-2 text-xs text-ink-muted">
              {locale === 'en' ? `${reviews.percent}%` : `${reviews.percent} %`} ·{' '}
              {reviews.total.toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR')}{' '}
              {reviews.total > 1 ? t.game.reviews_many : t.game.reviews_one}
            </span>
          </Row>
        )}

        {sheet.metacritic && <Row label={t.game.metacritic}>{sheet.metacritic} / 100</Row>}
      </dl>

      <div className="mt-4 border-t border-line pt-4">
        <a
          href={`https://store.steampowered.com/app/${sheet.appId}/`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-brand"
        >
          {t.game.on_steam}
        </a>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          {t.game.updated} {sheet.fetchedAt}
        </p>
      </div>
    </aside>
  )
}

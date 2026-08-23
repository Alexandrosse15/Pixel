import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAllGames, getGameBySlug } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import {
  genreLabels,
  getGameSheet,
  getSimilarGames,
  hasUsableSheet,
  platformLabels,
  priceLabel,
  releaseLabel,
  studioLabel,
} from '@/lib/games'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import ArticleCard from '@/components/ArticleCard'
import GameCard from '@/components/GameCard'
import GameFacts from '@/components/GameFacts'
import JsonLd from '@/components/JsonLd'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllGames('fr').map((g) => ({ slug: g.slug }))
}

/**
 * La description d'un hub reprend l'accroche de l'article principal : c'est du
 * texte écrit à la main, différent pour chaque jeu. La formule générique qui
 * traînait ici auparavant produisait quatre cents descriptions identiques.
 */
function describe(name: string, excerpt: string | undefined, locale: Locale): string {
  if (excerpt && excerpt.length > 40) return excerpt
  return locale === 'en'
    ? `Everything we have published on ${name}, with the facts and our verdict.`
    : `Tout ce que nous avons publié sur ${name}, avec la fiche du jeu et notre avis.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const game = getGameBySlug(params.slug, locale)
  if (!game) return {}

  const frUrl = `${SITE_URL}/jeu/${game.slug}`
  const enUrl = `${SITE_URL}/en/jeu/${game.slug}`
  const canonicalUrl = locale === 'en' ? enUrl : frUrl

  const lead = game.articles.find((a) => a.category === 'tests') ?? game.articles[0]
  const description = describe(game.name, lead?.excerpt, locale)
  const sheet = getGameSheet(game.slug)

  const ogImage = lead?.coverImage
    ? lead.coverImage.startsWith('http')
      ? lead.coverImage
      : `${SITE_URL}${lead.coverImage}`
    : `${SITE_URL}/opengraph-image`

  // Un hub mérite l'indexation dès qu'il apporte autre chose que la redite d'un
  // article : soit une fiche de jeu renseignée, soit plusieurs articles à réunir.
  const worthIndexing = hasUsableSheet(sheet) || game.articles.length >= 2

  // Un titre qui dit ce que la page contient vraiment, plutôt que le seul nom du
  // jeu. On n'annonce un test que s'il y en a un : c'est la règle de la maison.
  const tested = game.articles.some((a) => a.category === 'tests')
  const title = !sheet
    ? game.name
    : locale === 'en'
      ? tested
        ? `${game.name}: review, price and release date`
        : `${game.name}: price, release date and news`
      : tested
        ? `${game.name} : test, prix et date de sortie`
        : `${game.name} : prix, date de sortie et actus`

  return {
    robots: worthIndexing ? { index: true, follow: true } : { index: false, follow: true },
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: frUrl, en: enUrl, 'x-default': frUrl },
    },
    openGraph: {
      title: `${game.name} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: game.name }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@insertcoinspress',
      title: `${game.name} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  }
}

export default async function GamePage({ params }: Props) {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const game = getGameBySlug(params.slug, locale)
  if (!game) notFound()

  const articles = await enrichArticlesWithCovers(game.articles)
  const test = articles.find((a) => a.category === 'tests')
  const hero = test ?? articles[0]
  const sheet = getGameSheet(game.slug)
  const similar = getSimilarGames(game.slug, locale)

  const articleHref = (slug: string) =>
    locale === 'en' ? `/en/articles/${slug}` : `/articles/${slug}`
  const gameUrl =
    locale === 'en' ? `${SITE_URL}/en/jeu/${game.slug}` : `${SITE_URL}/jeu/${game.slug}`
  const absImg = (src?: string) =>
    src ? (src.startsWith('http') ? src : `${SITE_URL}${src}`) : undefined

  const reviews = articles
    .filter((a) => a.score)
    .map((a) => ({
      '@type': 'Review',
      name: a.title,
      datePublished: a.date,
      author: { '@type': 'Person', name: a.author },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: a.score,
        bestRating: 10,
        worstRating: 0,
      },
      url: `${SITE_URL}${articleHref(a.slug)}`,
    }))

  // Note agrégée (obligatoire dès qu'on expose des review, sinon Google invalide le balisage)
  const scores = articles.map((a) => a.score).filter((s): s is number => typeof s === 'number')
  const aggregateRating = scores.length
    ? {
        '@type': 'AggregateRating',
        ratingValue: Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10,
        reviewCount: scores.length,
        bestRating: 10,
        worstRating: 0,
      }
    : null

  const studio = sheet ? studioLabel(sheet) : { developer: null, publisher: null }

  const gameSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    url: gameUrl,
    inLanguage: locale === 'en' ? 'en-US' : 'fr-FR',
    ...(absImg(hero?.coverImage) && { image: absImg(hero?.coverImage) }),
    ...(aggregateRating && { aggregateRating }),
    ...(reviews.length && { review: reviews }),
    ...(sheet && {
      sameAs: `https://store.steampowered.com/app/${sheet.appId}/`,
      ...(sheet.releaseDate && { datePublished: sheet.releaseDate }),
      ...(genreLabels(sheet, locale).length && { genre: genreLabels(sheet, locale) }),
      ...(platformLabels(sheet).length && { gamePlatform: platformLabels(sheet) }),
      ...(studio.developer && {
        author: { '@type': 'Organization', name: studio.developer },
      }),
      ...(studio.publisher && {
        publisher: { '@type': 'Organization', name: studio.publisher },
      }),
      ...(sheet.price && {
        offers: {
          '@type': 'Offer',
          price: sheet.price.isFree ? '0' : ((sheet.price.cents ?? 0) / 100).toFixed(2),
          priceCurrency: sheet.price.currency ?? 'EUR',
          url: `https://store.steampowered.com/app/${sheet.appId}/`,
          availability: sheet.comingSoon
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStock',
        },
      }),
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'en' ? 'Home' : 'Accueil',
        item: locale === 'en' ? `${SITE_URL}/en` : SITE_URL,
      },
      { '@type': 'ListItem', position: 2, name: game.name, item: gameUrl },
    ],
  }

  const countLabel = `${articles.length} article${articles.length > 1 ? 's' : ''}`

  // Regroupe le contenu du hub par type, pour une table des matières claire du jeu
  const groupOrder = ['tests', 'previews', 'guides', 'dossiers', 'industrie', 'cinema'] as const
  const groups = groupOrder
    .map((cat) => ({ cat, items: articles.filter((a) => a.category === cat) }))
    .filter((g) => g.items.length > 0)

  // La ligne sous le titre : l'accroche de l'article principal, écrite à la main.
  const lead = test ?? articles[0]

  return (
    <div>
      <JsonLd data={gameSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <div
        className={`relative bg-gradient-to-br ${
          hero?.imageColor ?? 'from-zinc-900 to-zinc-800'
        } overflow-hidden`}
      >
        {hero?.coverImage && (
          <Image
            src={hero.coverImage}
            alt={game.name}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
        <div className="absolute left-0 top-0 h-1 w-full bg-brand" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pt-24">
          <p className="mb-4 font-display text-xs uppercase tracking-widest text-brand">
            {t.game.eyebrow}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display text-4xl font-black uppercase leading-tight text-white md:text-6xl">
              {game.name}
            </h1>
            {test?.score && (
              <div className="flex items-center gap-2 rounded-sm border border-brand/40 bg-bg-base/60 px-3 py-1 backdrop-blur-sm">
                <span className="font-display text-2xl font-black leading-none text-brand">
                  {test.score}
                </span>
                <span className="font-display text-sm font-bold text-ink-muted">/10</span>
              </div>
            )}
          </div>

          {/* Les faits qui tiennent en une ligne, juste sous le titre */}
          {sheet && (
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xs uppercase tracking-widest text-white/60">
              {[
                releaseLabel(sheet, locale),
                studioLabel(sheet).developer,
                priceLabel(sheet, locale),
              ]
                .filter(Boolean)
                .map((bit, i, arr) => (
                  <span key={bit as string}>
                    {bit}
                    {i < arr.length - 1 && <span className="ml-3 text-white/25">/</span>}
                  </span>
                ))}
            </p>
          )}

          {lead?.excerpt && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{lead.excerpt}</p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Colonne principale : notre couverture */}
          <div>
            <div className="mb-8 flex items-center gap-4 border-b border-line pb-6">
              <span className="block h-8 w-1.5 bg-brand" />
              <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
                {t.game.coverage}
                <span className="ml-2 text-ink-secondary">· {countLabel}</span>
              </p>
            </div>

            {groups.length > 1 ? (
              <div className="flex flex-col gap-12">
                {groups.map((g) => (
                  <section key={g.cat}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="block h-5 w-1 bg-brand" />
                      <h2 className="font-display text-lg font-black uppercase text-white">
                        {t.sections[g.cat].title}
                      </h2>
                      <span className="font-display text-xs text-ink-muted">· {g.items.length}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {g.items.map((article) => (
                        <ArticleCard key={article.slug} article={article} locale={locale} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} locale={locale} />
                ))}
              </div>
            )}
          </div>

          {/* Colonne latérale : la fiche factuelle */}
          {sheet && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <GameFacts sheet={sheet} locale={locale} t={t} />
            </div>
          )}
        </div>

        {/* Jeux similaires : le maillage qui manquait entre les hubs */}
        {similar.length > 0 && (
          <section className="mt-16 border-t border-line pt-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="block h-8 w-1.5 bg-brand" />
              <h2 className="font-display text-xs uppercase tracking-widest text-ink-muted">
                {t.game.similar}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {similar.map((g) => (
                <GameCard key={g.slug} game={g} locale={locale} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 border-t border-line pt-8">
          <Link
            href={locale === 'en' ? '/en/tests' : '/tests'}
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-brand"
          >
            {t.sections.tests.title}
          </Link>
        </div>
      </div>
    </div>
  )
}

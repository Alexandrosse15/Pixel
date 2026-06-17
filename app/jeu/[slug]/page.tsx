import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAllGames, getGameBySlug } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import ArticleCard from '@/components/ArticleCard'
import JsonLd from '@/components/JsonLd'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllGames('fr').map((g) => ({ slug: g.slug }))
}

function describe(name: string, locale: Locale): string {
  return locale === 'en'
    ? `All our coverage of ${name}: review, preview, score and verdict on ${SITE_NAME}.`
    : `Tous nos articles sur ${name} : test, preview, note et avis sur ${SITE_NAME}.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const game = getGameBySlug(params.slug, locale)
  if (!game) return {}

  const frUrl = `${SITE_URL}/jeu/${game.slug}`
  const enUrl = `${SITE_URL}/en/jeu/${game.slug}`
  const canonicalUrl = locale === 'en' ? enUrl : frUrl
  const description = describe(game.name, locale)

  const test = game.articles.find((a) => a.category === 'tests') ?? game.articles[0]
  const ogImage = test?.coverImage
    ? test.coverImage.startsWith('http')
      ? test.coverImage
      : `${SITE_URL}${test.coverImage}`
    : `${SITE_URL}/opengraph-image`

  return {
    title: game.name,
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
  const description = describe(game.name, locale)

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
      url:
        locale === 'en'
          ? `${SITE_URL}/en/articles/${a.slug}`
          : `${SITE_URL}/articles/${a.slug}`,
    }))

  const gameSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    url: gameUrl,
    inLanguage: locale === 'en' ? 'en-US' : 'fr-FR',
    ...(absImg(hero?.coverImage) && { image: absImg(hero?.coverImage) }),
    ...(reviews.length && { review: reviews }),
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

  const countLabel =
    locale === 'en'
      ? `${articles.length} article${articles.length > 1 ? 's' : ''}`
      : `${articles.length} article${articles.length > 1 ? 's' : ''}`

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

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 md:px-8 md:pt-24">
          <p className="mb-4 font-display text-xs uppercase tracking-widest text-brand">
            {locale === 'en' ? 'Game' : 'Jeu'}
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
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        </div>
      </div>

      {/* Liste des articles sur ce jeu */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex items-center gap-4 border-b border-line pb-6">
          <span className="block h-8 w-1.5 bg-brand" />
          <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
            {locale === 'en' ? 'Our coverage' : 'Notre couverture'}
            <span className="ml-2 text-ink-secondary">· {countLabel}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>

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

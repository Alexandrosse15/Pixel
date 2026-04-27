import { headers } from 'next/headers'
import { getArticlesByCategory } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import { getT, type Locale } from '@/lib/i18n'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string }
}): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const frBase = `${SITE_URL}/previews`
  const enBase = `${SITE_URL}/en/previews`
  const base = locale === 'en' ? enBase : frBase
  const canonicalUrl = page === 1 ? base : `${base}?page=${page}`
  const sectionTitle = t.sections.previews.title
  const title = page === 1 ? sectionTitle : `${sectionTitle}, page ${page}`
  const description = t.sections.previews.description
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: page === 1 ? frBase : `${frBase}?page=${page}`, en: page === 1 ? enBase : `${enBase}?page=${page}`, 'x-default': frBase },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${sectionTitle} | ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@insertcoinspress',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  }
}

const ARTICLES_PER_PAGE = 9

export default async function PreviewsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.previews

  const allArticles = await enrichArticlesWithCovers(getArticlesByCategory('previews', locale))
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE)
  const articles = allArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          <span className="block h-10 w-1.5 bg-amber-500" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-amber-500">{t.sections.label}</p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">{s.title}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">{s.description}</p>
      </div>

      {articles.length === 0 ? (
        <p className="py-24 text-center text-ink-muted">{s.empty}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/previews" />
        </>
      )}
    </div>
  )
}

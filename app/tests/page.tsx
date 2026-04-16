import { cookies } from 'next/headers'
import { getArticlesByCategory } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import { getT, type Locale } from '@/lib/i18n'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Tests',
  description: 'Tous les tests de jeux vidéo par InsertCoins.press. Des critiques honnêtes et sans compromis.',
  alternates: { canonical: `${SITE_URL}/tests` },
  openGraph: {
    title: `Tests | ${SITE_NAME}`,
    description: 'Tous les tests de jeux vidéo par InsertCoins.press. Des critiques honnêtes et sans compromis.',
    url: `${SITE_URL}/tests`,
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `Tests | ${SITE_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@insertcoinspress',
    title: `Tests | ${SITE_NAME}`,
    description: 'Tous les tests de jeux vidéo par InsertCoins.press. Des critiques honnêtes et sans compromis.',
  },
}

const ARTICLES_PER_PAGE = 9

export default async function TestsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const locale = ((cookies().get('locale')?.value) ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.tests

  const allArticles = await enrichArticlesWithCovers(getArticlesByCategory('tests', locale))
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
          <span className="block h-10 w-1.5 bg-brand" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-brand">{t.sections.label}</p>
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
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/tests" />
        </>
      )}
    </div>
  )
}

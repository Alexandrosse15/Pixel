import { getArticlesByCategory } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Previews',
  description: 'Nos aperçus et présentations des jeux à venir. Anticipez les sorties avec InsertCoin.press.',
}

export default async function PreviewsPage() {
  const articles = await enrichArticlesWithCovers(getArticlesByCategory('previews'))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          <span className="block h-10 w-1.5 bg-amber-500" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-amber-500">Rubrique</p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">Previews</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">
          On a mis les mains dessus avant vous. Découvrez nos premières impressions sur les jeux qui arrivent.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="py-24 text-center text-ink-muted">Aucune preview pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

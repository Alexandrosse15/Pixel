import { getArticlesByCategory } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industrie',
  description: "L'actualité de l'industrie du jeu vidéo : acquisitions, tendances, économie du secteur.",
}

export default function IndustriePage() {
  const articles = getArticlesByCategory('industrie')

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          <span className="block h-10 w-1.5 bg-emerald-600" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-emerald-400">
              Rubrique
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              Industrie
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">
          Acquisitions, licenciements, tendances de marché. L&apos;industrie du jeu vidéo vue de l&apos;intérieur.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-ink-muted py-24">Aucun article industrie pour le moment.</p>
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

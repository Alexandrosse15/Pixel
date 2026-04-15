import { getArticlesByCategory } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dossiers',
  description: 'Analyses de fond, rétrospectives et grands dossiers sur le jeu vidéo par InsertCoins.press.',
}

export default async function DossiersPage() {
  const articles = await enrichArticlesWithCovers(getArticlesByCategory('dossiers'))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12 border-b border-line pb-8">
        <div className="flex items-center gap-4">
          <span className="block h-10 w-1.5 bg-violet-600" />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-violet-400">Rubrique</p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">Dossiers</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary">
          Quand on creuse plus loin. Analyses, enquêtes et rétrospectives sur le jeu vidéo et sa culture.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="py-24 text-center text-ink-muted">Aucun dossier pour le moment.</p>
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

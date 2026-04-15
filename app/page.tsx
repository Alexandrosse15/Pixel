import { getAllArticles } from '@/lib/articles'
import { enrichArticlesWithCovers } from '@/lib/igdb'
import HeroArticle from '@/components/HeroArticle'
import ArticleCard from '@/components/ArticleCard'
import SectionHeader from '@/components/SectionHeader'

export default async function HomePage() {
  const all = await enrichArticlesWithCovers(getAllArticles())

  const featured = all.find((a) => a.featured) ?? all[0] ?? null
  const latestArticles = all.slice(0, 6)
  const tests = all.filter((a) => a.category === 'tests')
  const previews = all.filter((a) => a.category === 'previews')
  const dossiers = all.filter((a) => a.category === 'dossiers')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">

      {/* Hero */}
      {featured && (
        <section className="mb-16">
          <HeroArticle article={featured} />
        </section>
      )}

      {/* Latest articles grid */}
      {latestArticles.length > 0 && (
        <section className="mb-16">
          <SectionHeader title="À la une" accent />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Two-column layout: Tests + Sidebar */}
      <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {tests.length > 0 && (
          <div className="lg:col-span-2">
            <SectionHeader title="Tests" href="/tests" accent />
            <div className="space-y-4">
              {tests.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-10">
          {previews.length > 0 && (
            <div>
              <SectionHeader title="Previews" href="/previews" accent />
              <div className="space-y-0">
                {previews.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {dossiers.length > 0 && (
            <div>
              <SectionHeader title="Dossiers" href="/dossiers" accent />
              <div className="space-y-0">
                {dossiers.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA band */}
      <section className="mb-16 rounded-sm border border-brand/20 bg-bg-card p-8 text-center">
        <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
          Presse gaming indépendante
        </p>
        <h2 className="mt-2 font-display text-2xl font-black uppercase text-white md:text-3xl">
          La critique sans compromis
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink-secondary">
          InsertCoins.press défend une presse gaming libre, honnête et passionnée. Pas de scores gonflés, pas de preview sous embargo draconien.
        </p>
        <div className="mt-4 inline-block h-px w-16 bg-brand" />
      </section>
    </div>
  )
}

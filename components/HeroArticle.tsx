import Link from 'next/link'
import { Article, formatDate } from '@/lib/articles'
import CategoryBadge from './CategoryBadge'

interface Props {
  article: Article
}

export default function HeroArticle({ article }: Props) {
  return (
    <Link href={`/articles/${article.slug}`} className="group no-underline">
      <article
        className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${article.imageColor} min-h-[480px] flex flex-col justify-end`}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Decorative accent */}
        <div className="absolute left-0 top-0 h-1 w-full bg-brand" />

        {/* Content */}
        <div className="relative p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <CategoryBadge category={article.category} />
            {article.score && (
              <div className="flex items-center gap-1.5 rounded-sm border border-brand/50 bg-bg-base/70 px-2.5 py-1 backdrop-blur-sm">
                <span className="font-display text-xs uppercase tracking-widest text-ink-muted">
                  Note
                </span>
                <span className="font-display text-lg font-black leading-none text-brand">
                  {article.score}
                </span>
                <span className="font-display text-xs text-ink-muted">/10</span>
              </div>
            )}
          </div>

          <h1 className="font-display text-3xl font-black uppercase leading-tight text-white transition-colors group-hover:text-brand md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium text-white/70">
              Par <span className="text-white">{article.author}</span>
            </span>
            <span className="text-white/30">·</span>
            <span className="text-sm text-white/70">{formatDate(article.date)}</span>
            <span className="text-white/30">·</span>
            <span className="text-sm text-white/70">{article.readTime} de lecture</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 border border-brand/50 px-4 py-2 text-xs font-display font-bold uppercase tracking-widest text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
            <span>Lire l'article</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Article, formatDate } from '@/lib/articles'
import CategoryBadge from './CategoryBadge'

interface Props {
  article: Article
  variant?: 'default' | 'horizontal' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/articles/${article.slug}`} className="group no-underline">
        <article className="card-hover flex gap-4 rounded-sm border border-line bg-bg-card p-4 transition-colors hover:border-brand/30">
          {/* Thumbnail */}
          <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-sm">
            {article.coverImage ? (
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
            ) : (
              <div className={`h-full w-full bg-gradient-to-br ${article.imageColor}`} />
            )}
            {article.score && (
              <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-sm bg-brand font-display text-sm font-black text-white">
                {article.score}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <CategoryBadge category={article.category} size="sm" />
              <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-bold uppercase leading-tight text-ink-primary transition-colors group-hover:text-brand">
                {article.title}
              </h3>
            </div>
            <p className="mt-1 text-xs text-ink-muted">
              {formatDate(article.date)} · {article.readTime}
            </p>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className="group no-underline">
        <article className="flex items-start gap-3 border-b border-line py-3 last:border-0">
          <CategoryBadge category={article.category} size="sm" />
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 font-display text-sm font-bold uppercase leading-tight text-ink-primary transition-colors group-hover:text-brand">
              {article.title}
            </h3>
            <p className="mt-0.5 text-xs text-ink-muted">{formatDate(article.date)}</p>
          </div>
        </article>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/articles/${article.slug}`} className="group no-underline">
      <article className="card-hover flex h-full flex-col overflow-hidden rounded-sm border border-line bg-bg-card">
        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          {article.coverImage ? (
            <>
              <Image src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent" />
            </>
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${article.imageColor}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent" />
            </div>
          )}

          {/* Score badge */}
          {article.score && (
            <div className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-sm border border-brand/40 bg-bg-base/80 backdrop-blur-sm">
              <span className="font-display text-xl font-black text-brand">
                {article.score}
              </span>
            </div>
          )}

          {/* Category */}
          <div className="absolute left-3 top-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-display text-base font-black uppercase leading-tight text-ink-primary transition-colors group-hover:text-brand line-clamp-2">
            {article.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-xs font-medium text-ink-muted">{article.author}</span>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span>{formatDate(article.date)}</span>
              <span className="text-line">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

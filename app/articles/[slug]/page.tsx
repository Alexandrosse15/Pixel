import { notFound } from 'next/navigation'
import { getAllSlugs, getArticleBySlug, formatDate, categoryConfig } from '@/lib/articles'
import { enrichArticleWithCover } from '@/lib/igdb'
import CategoryBadge from '@/components/CategoryBadge'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SITE_URL, SITE_NAME } from '@/lib/config'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  const url = `${SITE_URL}/articles/${article.slug}`
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: 'article',
      locale: 'fr_FR',
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.category, 'jeux vidéo', 'gaming'],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const raw = getArticleBySlug(params.slug)
  if (!raw) notFound()

  const article = await enrichArticleWithCover(raw)

  const catConfig = categoryConfig[article.category]
  const articleUrl = `${SITE_URL}/articles/${article.slug}`

  const articleSchema = article.score
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: article.title,
        description: article.excerpt,
        url: articleUrl,
        datePublished: article.date,
        author: { '@type': 'Person', name: article.author },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        inLanguage: 'fr-FR',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: article.score,
          bestRating: 10,
          worstRating: 0,
        },
        itemReviewed: {
          '@type': 'VideoGame',
          name: article.title.split('—')[0].trim(),
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        url: articleUrl,
        datePublished: article.date,
        author: { '@type': 'Person', name: article.author },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        inLanguage: 'fr-FR',
        articleSection: article.category,
      }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: catConfig.label + 's',
        item: `${SITE_URL}/${article.category}`,
      },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  }

  return (
    <div>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${article.imageColor} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
        <div className="absolute left-0 top-0 h-1 w-full bg-brand" />

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 md:px-8 md:pt-24">
          {/* Back link */}
          <Link
            href={`/${article.category}`}
            className="mb-6 inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-ink-muted transition-colors hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {catConfig.label}s
          </Link>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <CategoryBadge category={article.category} />
            {article.score && (
              <div className="flex items-center gap-2 rounded-sm border border-brand/40 bg-bg-base/60 px-3 py-1 backdrop-blur-sm">
                <span className="font-display text-xs uppercase tracking-widest text-ink-muted">
                  Note
                </span>
                <span className="font-display text-2xl font-black leading-none text-brand">
                  {article.score}
                </span>
                <span className="font-display text-sm font-bold text-ink-muted">/10</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-black uppercase leading-tight text-white md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {article.excerpt}
          </p>

          {/* Author / date */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-black text-white">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{article.author}</p>
                <p className="text-xs text-white/50">Rédacteur</p>
              </div>
            </div>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/60">{formatDate(article.date)}</span>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/60">{article.readTime} de lecture</span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        {/* Score bar for reviews */}
        {article.score && (
          <div className="mb-12 rounded-sm border border-line bg-bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
                  Note InsertCoin.press
                </p>
                <p className="mt-1 font-display text-4xl font-black text-brand">
                  {article.score}
                  <span className="ml-1 text-lg font-bold text-ink-muted">/10</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-xs uppercase tracking-widest text-ink-muted">
                  Verdict
                </p>
                <p className="mt-1 font-display text-sm font-bold uppercase text-white">
                  {article.score >= 9
                    ? 'Indispensable'
                    : article.score >= 7
                    ? 'Recommandé'
                    : article.score >= 5
                    ? 'Mitigé'
                    : 'Déçevant'}
                </p>
              </div>
            </div>
            {/* Score bar */}
            <div className="mt-4 h-1.5 w-full rounded-full bg-bg-elevated">
              <div
                className="h-full rounded-full bg-brand transition-all duration-1000"
                style={{ width: `${article.score * 10}%` }}
              />
            </div>
          </div>
        )}

        {/* Markdown content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => (
                <span className="my-8 block overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || ''}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </span>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 border-t border-line pt-8">
          <Link
            href={`/${article.category}`}
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Retour aux {categoryConfig[article.category].label}s
          </Link>
        </div>
      </div>
    </div>
  )
}

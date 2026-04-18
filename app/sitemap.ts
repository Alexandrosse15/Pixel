import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { SITE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/tests`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/previews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/dossiers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industrie`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/cinema`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: article.featured ? 0.9 : 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}

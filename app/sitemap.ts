import { MetadataRoute } from 'next'
import { getAllArticles, getArticlesByCategory } from '@/lib/articles'
import { SITE_URL } from '@/lib/config'

const ARTICLES_PER_PAGE = 9

function paginatedRoutes(
  basePath: string,
  count: number,
  changeFrequency: 'daily' | 'weekly' | 'monthly',
  priority: number
): MetadataRoute.Sitemap {
  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE)
  const routes: MetadataRoute.Sitemap = []
  for (let page = 2; page <= totalPages; page++) {
    routes.push({
      url: `${SITE_URL}${basePath}?page=${page}`,
      lastModified: new Date(),
      changeFrequency,
      priority: priority - 0.1,
    })
  }
  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const testsCount = getArticlesByCategory('tests').length
  const previewsCount = getArticlesByCategory('previews').length
  const dossiersCount = getArticlesByCategory('dossiers').length
  const industrieCount = getArticlesByCategory('industrie').length
  const cinemaCount = getArticlesByCategory('cinema').length

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/tests`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/previews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/dossiers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industrie`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/cinema`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const paginationRoutes: MetadataRoute.Sitemap = [
    ...paginatedRoutes('/tests', testsCount, 'daily', 0.9),
    ...paginatedRoutes('/previews', previewsCount, 'daily', 0.9),
    ...paginatedRoutes('/dossiers', dossiersCount, 'weekly', 0.8),
    ...paginatedRoutes('/industrie', industrieCount, 'daily', 0.8),
    ...paginatedRoutes('/cinema', cinemaCount, 'weekly', 0.8),
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: article.featured ? 0.9 : 0.7,
  }))

  return [...staticRoutes, ...paginationRoutes, ...articleRoutes]
}

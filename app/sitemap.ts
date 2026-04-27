import { MetadataRoute } from 'next'
import { getAllArticles, getArticlesByCategory } from '@/lib/articles'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

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
  const articles = getAllArticles('fr')

  const testsCount = getArticlesByCategory('tests', 'fr').length
  const previewsCount = getArticlesByCategory('previews', 'fr').length
  const dossiersCount = getArticlesByCategory('dossiers', 'fr').length
  const industrieCount = getArticlesByCategory('industrie', 'fr').length
  const cinemaCount = getArticlesByCategory('cinema', 'fr').length

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1, alternates: { languages: { fr: SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/tests`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: `${SITE_URL}/tests`, en: `${SITE_URL}/en/tests` } } },
    { url: `${SITE_URL}/previews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: `${SITE_URL}/previews`, en: `${SITE_URL}/en/previews` } } },
    { url: `${SITE_URL}/dossiers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/dossiers`, en: `${SITE_URL}/en/dossiers` } } },
    { url: `${SITE_URL}/industrie`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/industrie`, en: `${SITE_URL}/en/industrie` } } },
    { url: `${SITE_URL}/cinema`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/cinema`, en: `${SITE_URL}/en/cinema` } } },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
    // EN versions
    { url: `${SITE_URL}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/en/tests`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/tests`, en: `${SITE_URL}/en/tests` } } },
    { url: `${SITE_URL}/en/previews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/previews`, en: `${SITE_URL}/en/previews` } } },
    { url: `${SITE_URL}/en/dossiers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/dossiers`, en: `${SITE_URL}/en/dossiers` } } },
    { url: `${SITE_URL}/en/industrie`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/industrie`, en: `${SITE_URL}/en/industrie` } } },
    { url: `${SITE_URL}/en/cinema`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/cinema`, en: `${SITE_URL}/en/cinema` } } },
    { url: `${SITE_URL}/en/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
  ]

  const paginationRoutes: MetadataRoute.Sitemap = [
    ...paginatedRoutes('/tests', testsCount, 'daily', 0.9),
    ...paginatedRoutes('/previews', previewsCount, 'daily', 0.9),
    ...paginatedRoutes('/dossiers', dossiersCount, 'weekly', 0.8),
    ...paginatedRoutes('/industrie', industrieCount, 'daily', 0.8),
    ...paginatedRoutes('/cinema', cinemaCount, 'weekly', 0.8),
    ...paginatedRoutes('/en/tests', testsCount, 'daily', 0.8),
    ...paginatedRoutes('/en/previews', previewsCount, 'daily', 0.8),
    ...paginatedRoutes('/en/dossiers', dossiersCount, 'weekly', 0.7),
    ...paginatedRoutes('/en/industrie', industrieCount, 'daily', 0.7),
    ...paginatedRoutes('/en/cinema', cinemaCount, 'weekly', 0.7),
  ]

  // FR article entries with alternates for hreflang
  const frArticleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.9 : 0.7,
    alternates: {
      languages: {
        fr: `${SITE_URL}/articles/${article.slug}`,
        en: `${SITE_URL}/en/articles/${article.slug}`,
      },
    },
  }))

  // EN article entries with alternates for hreflang
  const enArticleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/en/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        fr: `${SITE_URL}/articles/${article.slug}`,
        en: `${SITE_URL}/en/articles/${article.slug}`,
      },
    },
  }))

  return [...staticRoutes, ...paginationRoutes, ...frArticleRoutes, ...enArticleRoutes]
}

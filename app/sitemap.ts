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

function latestDate(articles: { date: string }[]): Date {
  if (!articles.length) return new Date()
  return new Date(articles.reduce((a, b) => (a.date > b.date ? a : b)).date)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles('fr')

  const tests = getArticlesByCategory('tests', 'fr')
  const previews = getArticlesByCategory('previews', 'fr')
  const dossiers = getArticlesByCategory('dossiers', 'fr')
  const industrie = getArticlesByCategory('industrie', 'fr')
  const cinema = getArticlesByCategory('cinema', 'fr')

  const testsCount = tests.length
  const previewsCount = previews.length
  const dossiersCount = dossiers.length
  const industrieCount = industrie.length
  const cinemaCount = cinema.length

  const testsDate = latestDate(tests)
  const previewsDate = latestDate(previews)
  const dossiersDate = latestDate(dossiers)
  const industrieDate = latestDate(industrie)
  const cinemaDate = latestDate(cinema)
  const homeDate = latestDate(articles)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: homeDate, changeFrequency: 'daily', priority: 1, alternates: { languages: { fr: SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/tests`, lastModified: testsDate, changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: `${SITE_URL}/tests`, en: `${SITE_URL}/en/tests` } } },
    { url: `${SITE_URL}/previews`, lastModified: previewsDate, changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: `${SITE_URL}/previews`, en: `${SITE_URL}/en/previews` } } },
    { url: `${SITE_URL}/dossiers`, lastModified: dossiersDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/dossiers`, en: `${SITE_URL}/en/dossiers` } } },
    { url: `${SITE_URL}/industrie`, lastModified: industrieDate, changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/industrie`, en: `${SITE_URL}/en/industrie` } } },
    { url: `${SITE_URL}/cinema`, lastModified: cinemaDate, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/cinema`, en: `${SITE_URL}/en/cinema` } } },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.5, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
    // EN versions
    { url: `${SITE_URL}/en`, lastModified: homeDate, changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/en/tests`, lastModified: testsDate, changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/tests`, en: `${SITE_URL}/en/tests` } } },
    { url: `${SITE_URL}/en/previews`, lastModified: previewsDate, changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/previews`, en: `${SITE_URL}/en/previews` } } },
    { url: `${SITE_URL}/en/dossiers`, lastModified: dossiersDate, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/dossiers`, en: `${SITE_URL}/en/dossiers` } } },
    { url: `${SITE_URL}/en/industrie`, lastModified: industrieDate, changeFrequency: 'daily', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/industrie`, en: `${SITE_URL}/en/industrie` } } },
    { url: `${SITE_URL}/en/cinema`, lastModified: cinemaDate, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/cinema`, en: `${SITE_URL}/en/cinema` } } },
    { url: `${SITE_URL}/en/a-propos`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.4, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
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

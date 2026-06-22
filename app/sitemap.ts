import { MetadataRoute } from 'next'
import { getAllArticles, getArticlesByCategory, getAllGames } from '@/lib/articles'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

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
    { url: `${SITE_URL}/creation-equipe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/creation-equipe`, en: `${SITE_URL}/en/creation-equipe` } } },
    { url: `${SITE_URL}/creation-equipe/maitre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/creation-equipe/maitre`, en: `${SITE_URL}/en/creation-equipe/maitre` } } },
    { url: `${SITE_URL}/creation-equipe/mission-courses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/creation-equipe/mission-courses`, en: `${SITE_URL}/en/creation-equipe/mission-courses` } } },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.5, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
    // EN versions
    { url: `${SITE_URL}/en`, lastModified: homeDate, changeFrequency: 'daily', priority: 0.9, alternates: { languages: { fr: SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/en/tests`, lastModified: testsDate, changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/tests`, en: `${SITE_URL}/en/tests` } } },
    { url: `${SITE_URL}/en/previews`, lastModified: previewsDate, changeFrequency: 'daily', priority: 0.8, alternates: { languages: { fr: `${SITE_URL}/previews`, en: `${SITE_URL}/en/previews` } } },
    { url: `${SITE_URL}/en/dossiers`, lastModified: dossiersDate, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/dossiers`, en: `${SITE_URL}/en/dossiers` } } },
    { url: `${SITE_URL}/en/industrie`, lastModified: industrieDate, changeFrequency: 'daily', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/industrie`, en: `${SITE_URL}/en/industrie` } } },
    { url: `${SITE_URL}/en/cinema`, lastModified: cinemaDate, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: { fr: `${SITE_URL}/cinema`, en: `${SITE_URL}/en/cinema` } } },
    { url: `${SITE_URL}/en/creation-equipe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6, alternates: { languages: { fr: `${SITE_URL}/creation-equipe`, en: `${SITE_URL}/en/creation-equipe` } } },
    { url: `${SITE_URL}/en/creation-equipe/maitre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6, alternates: { languages: { fr: `${SITE_URL}/creation-equipe/maitre`, en: `${SITE_URL}/en/creation-equipe/maitre` } } },
    { url: `${SITE_URL}/en/creation-equipe/mission-courses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6, alternates: { languages: { fr: `${SITE_URL}/creation-equipe/mission-courses`, en: `${SITE_URL}/en/creation-equipe/mission-courses` } } },
    { url: `${SITE_URL}/en/a-propos`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.4, alternates: { languages: { fr: `${SITE_URL}/a-propos`, en: `${SITE_URL}/en/a-propos` } } },
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

  // Pages par jeu (hubs SEO ciblant le nom nu du jeu)
  const games = getAllGames('fr')
  const gameRoutes: MetadataRoute.Sitemap = games.flatMap((game) => {
    const lastModified = latestDate(game.articles)
    const frUrl = `${SITE_URL}/jeu/${game.slug}`
    const enUrl = `${SITE_URL}/en/jeu/${game.slug}`
    const languages = { fr: frUrl, en: enUrl }
    return [
      { url: frUrl, lastModified, changeFrequency: 'weekly' as const, priority: 0.8, alternates: { languages } },
      { url: enUrl, lastModified, changeFrequency: 'weekly' as const, priority: 0.6, alternates: { languages } },
    ]
  })

  return [...staticRoutes, ...frArticleRoutes, ...enArticleRoutes, ...gameRoutes]
}

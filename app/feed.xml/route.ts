import { headers } from 'next/headers'
import { getAllArticles } from '@/lib/articles'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/config'

/** Nombre d'articles publiés dans le flux. Suffisant pour un bot, léger à télécharger. */
const FEED_SIZE = 50

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Le frontmatter ne porte qu'une date, sans heure : tous les articles d'un même
 * jour partagent donc le même horodatage, ce qui empêche les bots de les trier.
 * On répartit ceux d'une même journée de quelques minutes pour garantir un ordre
 * stable et déterministe. Il s'agit d'une métadonnée de tri, pas d'une heure réelle.
 */
function orderedDate(dateStr: string, indexInDay: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`)
  d.setUTCMinutes(d.getUTCMinutes() - indexInDay)
  return d.toUTCString()
}

export async function GET() {
  const locale = headers().get('x-locale') === 'en' ? 'en' : 'fr'
  const isEn = locale === 'en'
  const prefix = isEn ? '/en' : ''

  const articles = getAllArticles(locale).slice(0, FEED_SIZE)

  const seenPerDay = new Map<string, number>()

  const items = articles
    .map((article) => {
      const seen = seenPerDay.get(article.date) ?? 0
      seenPerDay.set(article.date, seen + 1)

      const url = `${SITE_URL}${prefix}/articles/${article.slug}`
      const cover = article.coverImage ? `${SITE_URL}${article.coverImage}` : null
      const media = cover
        ? `
      <enclosure url="${escapeAttr(cover)}" type="image/webp" length="0"/>
      <media:content url="${escapeAttr(cover)}" medium="image" type="image/webp"/>
      <media:thumbnail url="${escapeAttr(cover)}"/>`
        : ''

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${orderedDate(article.date, seen)}</pubDate>
      <author>${article.author}</author>
      <category>${article.category}</category>${media}
    </item>`
    })
    .join('')

  const feedUrl = `${SITE_URL}${prefix}/feed.xml`

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}${prefix}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>${isEn ? 'en-US' : 'fr-FR'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, stale-while-revalidate=3600',
    },
  })
}

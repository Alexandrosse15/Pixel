import { Article } from './articles'

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token'
const IGDB_API_URL = 'https://api.igdb.com/v4'

// Module-level caches (persistent between requests in the same process)
let tokenCache: { access_token: string; expires_at: number } | null = null
const coverCache = new Map<string, string | null>()

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expires_at) {
    return tokenCache.access_token
  }

  const res = await fetch(
    `${TWITCH_AUTH_URL}?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  if (!res.ok) throw new Error(`Twitch auth failed: ${res.status}`)

  const data = await res.json() as { access_token: string; expires_in: number }
  tokenCache = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in - 300) * 1000,
  }

  return tokenCache.access_token
}

async function igdbPost<T>(endpoint: string, query: string): Promise<T> {
  const token = await getAccessToken()

  const res = await fetch(`${IGDB_API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID!,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body: query,
    next: { revalidate: 86400 }, // cache 24h côté Next.js
  })

  if (!res.ok) throw new Error(`IGDB /${endpoint} failed: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getGameCover(gameName: string): Promise<string | null> {
  if (coverCache.has(gameName)) return coverCache.get(gameName) ?? null

  try {
    type GameResult = { id: number; cover?: number; screenshots?: number[] }
    const games = await igdbPost<GameResult[]>(
      'games',
      `search "${gameName}"; fields cover, screenshots; limit 1;`
    )

    if (!games?.[0]) {
      coverCache.set(gameName, null)
      return null
    }

    const game = games[0]

    // Screenshots d'abord (format paysage, idéal pour les cards/hero)
    if (game.screenshots?.length) {
      type ImgResult = { image_id: string }
      const shots = await igdbPost<ImgResult[]>(
        'screenshots',
        `fields image_id; where id = ${game.screenshots[0]};`
      )
      if (shots?.[0]?.image_id) {
        const url = `https://images.igdb.com/igdb/image/upload/t_1080p/${shots[0].image_id}.jpg`
        coverCache.set(gameName, url)
        return url
      }
    }

    // Fallback : cover art du jeu
    if (game.cover) {
      type ImgResult = { image_id: string }
      const covers = await igdbPost<ImgResult[]>(
        'covers',
        `fields image_id; where id = ${game.cover};`
      )
      if (covers?.[0]?.image_id) {
        const url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers[0].image_id}.jpg`
        coverCache.set(gameName, url)
        return url
      }
    }

    coverCache.set(gameName, null)
    return null
  } catch (err) {
    console.error(`[IGDB] Erreur pour "${gameName}":`, err)
    coverCache.set(gameName, null)
    return null
  }
}

// Enrichit un tableau d'articles avec leurs covers IGDB en parallèle
export async function enrichArticlesWithCovers(articles: Article[]): Promise<Article[]> {
  return Promise.all(
    articles.map(async (article) => {
      if (article.coverImage || !article.gameName) return article
      const cover = await getGameCover(article.gameName)
      return cover ? { ...article, coverImage: cover } : article
    })
  )
}

// Enrichit un seul article
export async function enrichArticleWithCover(article: Article): Promise<Article> {
  if (article.coverImage || !article.gameName) return article
  const cover = await getGameCover(article.gameName)
  return cover ? { ...article, coverImage: cover } : article
}

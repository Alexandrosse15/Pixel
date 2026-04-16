import { unstable_cache } from 'next/cache'
import { Article } from './articles'

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token'
const IGDB_API_URL = 'https://api.igdb.com/v4'

// Token cache en mémoire (même process)
let tokenCache: { access_token: string; expires_at: number } | null = null

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expires_at) {
    return tokenCache.access_token
  }

  const res = await fetch(
    `${TWITCH_AUTH_URL}?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST', cache: 'no-store' }
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
    next: { revalidate: 86400 },
  })

  if (!res.ok) throw new Error(`IGDB /${endpoint} failed: ${res.status}`)
  return res.json() as Promise<T>
}

// ─── Cover ────────────────────────────────────────────────────────────────────
// unstable_cache persiste entre les invocations serverless (Next.js data cache)
// revalidate: 86400 = 24h

async function _getGameCover(gameName: string): Promise<string | null> {
  try {
    type GameResult = { id: number; cover?: number; screenshots?: number[] }
    const games = await igdbPost<GameResult[]>(
      'games',
      `search "${gameName}"; fields cover, screenshots; limit 1;`
    )

    if (!games?.[0]) return null

    const game = games[0]

    if (game.screenshots?.length) {
      type ImgResult = { image_id: string }
      const shots = await igdbPost<ImgResult[]>(
        'screenshots',
        `fields image_id; where id = ${game.screenshots[0]};`
      )
      if (shots?.[0]?.image_id) {
        return `https://images.igdb.com/igdb/image/upload/t_1080p/${shots[0].image_id}.jpg`
      }
    }

    if (game.cover) {
      type ImgResult = { image_id: string }
      const covers = await igdbPost<ImgResult[]>(
        'covers',
        `fields image_id; where id = ${game.cover};`
      )
      if (covers?.[0]?.image_id) {
        return `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers[0].image_id}.jpg`
      }
    }

    return null
  } catch (err) {
    console.error(`[IGDB] Cover error for "${gameName}":`, err)
    return null
  }
}

export const getGameCover = unstable_cache(
  _getGameCover,
  ['igdb-cover'],
  { revalidate: 86400 }
)

// ─── Screenshots ──────────────────────────────────────────────────────────────

async function _getGameScreenshots(gameName: string, count: number): Promise<string[]> {
  try {
    type GameResult = { screenshots?: number[] }
    const games = await igdbPost<GameResult[]>(
      'games',
      `search "${gameName}"; fields screenshots; limit 1;`
    )

    const ids = games?.[0]?.screenshots?.slice(0, count)
    if (!ids?.length) return []

    type ImgResult = { image_id: string }
    const shots = await igdbPost<ImgResult[]>(
      'screenshots',
      `fields image_id; where id = (${ids.join(',')});`
    )

    return (shots ?? [])
      .filter((s) => s.image_id)
      .map((s) => `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${s.image_id}.jpg`)
  } catch (err) {
    console.error(`[IGDB] Screenshots error for "${gameName}":`, err)
    return []
  }
}

export const getGameScreenshots = unstable_cache(
  _getGameScreenshots,
  ['igdb-screenshots'],
  { revalidate: 86400 }
)

// ─── Multi-game screenshots ───────────────────────────────────────────────────

export async function getMultipleGameScreenshots(
  gameNames: string[],
  countPerGame = 3
): Promise<string[]> {
  const results = await Promise.all(
    gameNames.map((name) => getGameScreenshots(name, countPerGame))
  )
  const interleaved: string[] = []
  const maxLen = Math.max(0, ...results.map((r) => r.length))
  for (let i = 0; i < maxLen; i++) {
    for (const shots of results) {
      if (shots[i]) interleaved.push(shots[i])
    }
  }
  return interleaved
}

// ─── Article enrichment ───────────────────────────────────────────────────────

export async function enrichArticlesWithCovers(articles: Article[]): Promise<Article[]> {
  return Promise.all(articles.map(enrichArticleWithCover))
}

export async function enrichArticleWithCover(article: Article): Promise<Article> {
  if (article.coverImage) return article
  const name = article.gameName ?? article.gameNames?.[0]
  if (!name) return article
  const cover = await getGameCover(name)
  return cover ? { ...article, coverImage: cover } : article
}

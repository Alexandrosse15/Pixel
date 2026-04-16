import { Article } from './articles'

const TWITCH_AUTH_URL = 'https://id.twitch.tv/oauth2/token'
const IGDB_API_URL = 'https://api.igdb.com/v4'

// Module-level caches (persistent between requests in the same process)
let tokenCache: { access_token: string; expires_at: number } | null = null
const coverCache = new Map<string, string | null>()
const screenshotsCache = new Map<string, string[]>()

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

// Récupère N screenshots d'un jeu (format paysage, t_screenshot_big = 889×500)
export async function getGameScreenshots(gameName: string, count = 8): Promise<string[]> {
  if (screenshotsCache.has(gameName)) return screenshotsCache.get(gameName)!

  try {
    type GameResult = { screenshots?: number[] }
    const games = await igdbPost<GameResult[]>(
      'games',
      `search "${gameName}"; fields screenshots; limit 1;`
    )

    const ids = games?.[0]?.screenshots?.slice(0, count)
    if (!ids?.length) {
      screenshotsCache.set(gameName, [])
      return []
    }

    type ImgResult = { image_id: string }
    const shots = await igdbPost<ImgResult[]>(
      'screenshots',
      `fields image_id; where id = (${ids.join(',')});`
    )

    const urls = (shots ?? [])
      .filter((s) => s.image_id)
      .map((s) => `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${s.image_id}.jpg`)

    screenshotsCache.set(gameName, urls)
    return urls
  } catch (err) {
    console.error(`[IGDB] Screenshots error for "${gameName}":`, err)
    screenshotsCache.set(gameName, [])
    return []
  }
}

// Remplace les images locales (/images/...) du contenu Markdown par les screenshots IGDB
export async function resolveArticleImages(content: string, gameName: string): Promise<string> {
  const screenshots = await getGameScreenshots(gameName)
  if (!screenshots.length) return content

  let idx = 0
  return content.replace(/!\[([^\]]*)\]\(\/images\/[^)]+\)/g, (match, alt) => {
    const url = screenshots[idx]
    if (!url) return match // plus de screenshots dispo, on garde le placeholder
    idx++
    return `![${alt}](${url})`
  })
}

// Récupère des screenshots de plusieurs jeux (pour les dossiers multi-jeux)
export async function getMultipleGameScreenshots(
  gameNames: string[],
  countPerGame = 3
): Promise<string[]> {
  const results = await Promise.all(
    gameNames.map((name) => getGameScreenshots(name, countPerGame))
  )
  // Interleave les screenshots : 1 par jeu à la fois
  const interleaved: string[] = []
  const maxLen = Math.max(...results.map((r) => r.length))
  for (let i = 0; i < maxLen; i++) {
    for (const shots of results) {
      if (shots[i]) interleaved.push(shots[i])
    }
  }
  return interleaved
}

// Enrichit un tableau d'articles avec leurs covers IGDB en parallèle
export async function enrichArticlesWithCovers(articles: Article[]): Promise<Article[]> {
  return Promise.all(articles.map(enrichArticleWithCover))
}

// Enrichit un seul article
export async function enrichArticleWithCover(article: Article): Promise<Article> {
  if (article.coverImage) return article
  // gameName en priorité, sinon le premier de gameNames
  const name = article.gameName ?? article.gameNames?.[0]
  if (!name) return article
  const cover = await getGameCover(name)
  return cover ? { ...article, coverImage: cover } : article
}

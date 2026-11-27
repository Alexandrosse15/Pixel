import { Redis } from '@upstash/redis'

// Retourne null si les env vars ne sont pas configurées (dev sans Redis)
function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

export const redis = getRedis()

/**
 * Pendant `next build`, on ne lit pas Redis. Le prerendu des ~2 900 pages
 * faisait un appel par article et par projet Vercel a chaque deploiement, ce qui
 * a epuise le quota Upstash (500 000 requetes) et fait echouer le build
 * le 27 novembre 2026. Les notes reviennent a la revalidation horaire.
 */
const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build'

/** Lecture tolerante : une erreur Redis (quota, reseau) ne casse jamais une page. */
async function safeGet<T>(key: string): Promise<T | null> {
  if (!redis || IS_BUILD) return null
  try {
    return await redis.get<T>(key)
  } catch (err) {
    console.error(`[redis] lecture impossible pour ${key}:`, err)
    return null
  }
}

export interface RatingData {
  total: number
  count: number
}

export async function getRating(slug: string): Promise<{ average: number; count: number }> {
  const data = await safeGet<RatingData>(`rating:${slug}`)
  if (!data || data.count === 0) return { average: 0, count: 0 }
  return {
    average: Math.round(data.total / data.count),
    count: data.count,
  }
}

export async function addRating(slug: string, score: number): Promise<{ average: number; count: number }> {
  if (!redis) return { average: score, count: 1 }

  const key = `rating:${slug}`
  const existing = await redis.get<RatingData>(key) ?? { total: 0, count: 0 }
  const updated: RatingData = {
    total: existing.total + score,
    count: existing.count + 1,
  }
  await redis.set(key, updated)
  return {
    average: Math.round(updated.total / updated.count),
    count: updated.count,
  }
}

// ---------------------------------------------------------------------------
// Palmarès : un vote par catégorie, stocké en hash { slug -> nombre de voix }
// ---------------------------------------------------------------------------

export type PollResults = Record<string, number>

export async function getPoll(edition: string, category: string): Promise<PollResults> {
  const data = await safeGet<PollResults>(`poll:${edition}:${category}`)
  return data ?? {}
}

export async function addPollVote(
  edition: string,
  category: string,
  choice: string,
): Promise<PollResults> {
  if (!redis) return { [choice]: 1 }
  const key = `poll:${edition}:${category}`
  const existing = (await redis.get<PollResults>(key)) ?? {}
  const updated: PollResults = { ...existing, [choice]: (existing[choice] ?? 0) + 1 }
  await redis.set(key, updated)
  return updated
}

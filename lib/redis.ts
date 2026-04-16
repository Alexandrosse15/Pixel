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

export interface RatingData {
  total: number
  count: number
}

export async function getRating(slug: string): Promise<{ average: number; count: number }> {
  if (!redis) return { average: 0, count: 0 }
  const data = await redis.get<RatingData>(`rating:${slug}`)
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

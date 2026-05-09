import { NextRequest, NextResponse } from 'next/server'
import { getRating, addRating } from '@/lib/redis'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await getRating(params.slug)
  return NextResponse.json(data, {
    headers: {
      // Cache at CDN for 2 minutes — ratings don't need to be real-time
      'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=60',
    },
  })
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const body = await req.json() as { score: unknown }
  const score = Number(body.score)

  if (!Number.isInteger(score) || score < 0 || score > 100) {
    return NextResponse.json({ error: 'Score invalide (0-100)' }, { status: 400 })
  }

  const data = await addRating(params.slug, score)
  return NextResponse.json(data)
}

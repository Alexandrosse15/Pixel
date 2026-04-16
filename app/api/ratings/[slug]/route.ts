import { NextRequest, NextResponse } from 'next/server'
import { getRating, addRating } from '@/lib/redis'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await getRating(params.slug)
  return NextResponse.json(data)
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

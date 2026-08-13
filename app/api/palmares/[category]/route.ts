import { NextRequest, NextResponse } from 'next/server'
import { getPoll, addPollVote } from '@/lib/redis'
import { EDITION, isValidVote } from '@/lib/palmares'

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string } },
) {
  const results = await getPoll(EDITION, params.category)
  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=60',
    },
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { category: string } },
) {
  const body = (await req.json()) as { choice?: unknown }
  const choice = typeof body.choice === 'string' ? body.choice : ''

  // On n'accepte que les nominés réellement proposés dans cette catégorie
  if (!choice || !isValidVote(params.category, choice)) {
    return NextResponse.json({ error: 'Vote invalide' }, { status: 400 })
  }

  const results = await addPollVote(EDITION, params.category, choice)
  return NextResponse.json(results)
}

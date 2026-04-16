import { getGameCover, getGameScreenshots } from '@/lib/igdb'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.IGDB_CLIENT_ID
  const clientSecret = process.env.IGDB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      ok: false,
      error: 'ENV VARS MANQUANTES — ajoute IGDB_CLIENT_ID et IGDB_CLIENT_SECRET dans Vercel > Settings > Environment Variables',
    }, { status: 500 })
  }

  try {
    const [cover, screenshots] = await Promise.all([
      getGameCover('Pragmata'),
      getGameScreenshots('Pragmata', 8),
    ])

    return NextResponse.json({
      ok: true,
      env: { clientId: clientId.slice(0, 6) + '…', secret: '' },
      cover,
      screenshots,
      screenshotsCount: screenshots.length,
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: String(err),
    }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/en')) {
    const internalPath = pathname === '/en' ? '/' : pathname.slice(3) || '/'
    const url = request.nextUrl.clone()
    url.pathname = internalPath

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', 'en')

    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', 'fr')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|icon\\.svg|opengraph-image|sitemap\\.xml|robots\\.txt|feed\\.xml|api).*)',
  ],
}

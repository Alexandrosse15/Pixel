import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * La locale est portée par un segment d'URL interne, pas par un en-tête.
 *
 * Avant, ce middleware posait un en-tête x-locale que le layout racine lisait
 * via headers(). Conséquence : Next ne pouvait rendre aucune page statiquement,
 * toutes les réponses HTML sortaient en no-store, et chaque visite déclenchait
 * une invocation de fonction. Une simple réécriture de chemin n'a pas cet effet.
 *
 * Les URL publiques ne changent pas : le français reste sans préfixe, l'anglais
 * garde /en. Seul le chemin interne gagne un segment de locale.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // L'anglais porte déjà son segment : /en/articles/x correspond à [locale]=en.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next()
  }

  // Le français est servi sans préfixe : on lui ajoute le segment en interne.
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/fr' : `/fr${pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|icon\\.svg|opengraph-image|sitemap\\.xml|robots\\.txt|feed\\.xml|api).*)',
  ],
}

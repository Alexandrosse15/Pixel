export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://insertcoins.press'
export const SITE_NAME = 'InsertCoins.press'
export const SITE_DESCRIPTION =
  "Le média indépendant du jeu vidéo. Tests, previews, dossiers de fond et actualité de l'industrie."

// Affiliation Gamesplanet
export const GAMESPLANET_REF = 'insertcoins'

// Construit un lien d'affiliation Gamesplanet. Si une URL produit exacte est fournie,
// on lui ajoute le ref ; sinon on renvoie une recherche par nom de jeu.
export function gamesplanetLink(gameName?: string, buyUrl?: string): string {
  const ref = `ref=${GAMESPLANET_REF}`
  if (buyUrl) {
    if (buyUrl.includes('ref=')) return buyUrl
    const sep = buyUrl.includes('?') ? '&' : '?'
    return `${buyUrl}${sep}${ref}`
  }
  const q = encodeURIComponent(gameName || '')
  return `https://gamesplanet.com/search?query=${q}&${ref}`
}

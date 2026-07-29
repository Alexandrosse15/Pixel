export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://insertcoins.press'
export const SITE_NAME = 'InsertCoins.press'
export const SITE_DESCRIPTION =
  "Le média indépendant du jeu vidéo. Tests, previews, dossiers de fond et actualité de l'industrie."

// Publicité display (AdSense). Renseigner NEXT_PUBLIC_ADSENSE_CLIENT (ex. "ca-pub-XXXXXXXXXXXXXXXX")
// pour activer les vraies annonces. Tant que c'est vide, les emplacements s'affichent en mode
// maquette (placeholder "Publicité") pour tester le rendu sans compte actif.
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-2773089210749579'
export const ADS_ENABLED = ADSENSE_CLIENT.length > 0

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

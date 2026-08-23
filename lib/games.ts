import gameData from '@/data/games.json'
import { getAllGames, type Article, type GameGroup } from './articles'
import type { Locale } from './i18n'

// Les fiches factuelles des jeux couverts, constituées par
// scripts/fetch-game-data.mjs. Elles servent à donner aux hubs /jeu/[slug] un
// contenu qui leur appartient, au lieu de n'être qu'une redite des articles.

export interface SteamPrice {
  isFree: boolean
  formatted?: string
  cents?: number
  currency?: string
}

export interface SteamSheet {
  appId: number
  steamName: string
  confidence: 'exact' | 'prefixe'
  developers: string[]
  publishers: string[]
  releaseRaw: string | null
  releaseDate: string | null
  comingSoon: boolean
  price: SteamPrice | null
  platforms: { windows: boolean; mac: boolean; linux: boolean }
  genreIds: number[]
  featureIds: number[]
  earlyAccess: boolean
  metacritic: number | null
  reviews: {
    total: number
    positive: number
    percent: number
    label: { fr: string; en: string } | null
  } | null
  fetchedAt: string
}

interface Entry {
  slug: string
  name: string
  steam: SteamSheet | null
}

const SHEETS = gameData as unknown as Record<string, Entry>

export function getGameSheet(slug: string): SteamSheet | null {
  return SHEETS[slug]?.steam ?? null
}

// --- Étiquettes ----------------------------------------------------------
// Les identifiants Steam sont stables, leurs libellés non. On les traduit
// nous-mêmes, ce qui évite une requête par langue et garde la main sur le ton.

const GENRES: Record<number, { fr: string; en: string; weight: number }> = {
  1: { fr: 'Action', en: 'Action', weight: 0.6 },
  2: { fr: 'Stratégie', en: 'Strategy', weight: 1 },
  3: { fr: 'Aventure', en: 'Adventure', weight: 0.6 },
  4: { fr: 'Détente', en: 'Casual', weight: 0.3 },
  9: { fr: 'Course', en: 'Racing', weight: 1 },
  18: { fr: 'Sport', en: 'Sports', weight: 1 },
  23: { fr: 'Indépendant', en: 'Indie', weight: 0.15 },
  25: { fr: 'Action-RPG', en: 'Action RPG', weight: 1 },
  28: { fr: 'Simulation', en: 'Simulation', weight: 1 },
  29: { fr: 'Jeu de rôle', en: 'RPG', weight: 1 },
  37: { fr: 'Free to play', en: 'Free to Play', weight: 0 },
  50: { fr: 'Animation', en: 'Animation', weight: 0.3 },
  51: { fr: 'Création', en: 'Design', weight: 0.3 },
  53: { fr: 'Utilitaire', en: 'Utilities', weight: 0.3 },
  70: { fr: 'Accès anticipé', en: 'Early Access', weight: 0 },
  72: { fr: 'Multijoueur de masse', en: 'Massively Multiplayer', weight: 1 },
  73: { fr: 'Violent', en: 'Violent', weight: 0 },
  74: { fr: 'Cruel', en: 'Gore', weight: 0 },
  81: { fr: 'Documentaire', en: 'Documentary', weight: 0.3 },
  84: { fr: 'Contenu additionnel', en: 'Add-on', weight: 0 },
}

// Uniquement ce qui aide un lecteur à décider. Le reste (contrôles du volume,
// statistiques Steam) n'a rien à faire sur une fiche.
const FEATURES: Record<number, { fr: string; en: string }> = {
  2: { fr: 'Solo', en: 'Single-player' },
  1: { fr: 'Multijoueur', en: 'Multiplayer' },
  9: { fr: 'Coopération', en: 'Co-op' },
  38: { fr: 'Coop en ligne', en: 'Online co-op' },
  39: { fr: 'Coop en local', en: 'Local co-op' },
  49: { fr: 'PvP', en: 'PvP' },
  36: { fr: 'PvP en ligne', en: 'Online PvP' },
  37: { fr: 'PvP en local', en: 'Local PvP' },
  24: { fr: 'Écran partagé', en: 'Shared screen' },
  44: { fr: 'Jeu à distance ensemble', en: 'Remote Play Together' },
  28: { fr: 'Manette', en: 'Controller support' },
  18: { fr: 'Manette partielle', en: 'Partial controller support' },
  30: { fr: 'Steam Workshop', en: 'Steam Workshop' },
  35: { fr: 'Achats intégrés', en: 'In-app purchases' },
}

// Ce qu'on fait dans le jeu d'un côté, ce que la machine sait faire de l'autre :
// « Succès » n'a jamais été un mode de jeu.
const MODE_ORDER = [2, 1, 9, 38, 39, 49, 36, 37, 24, 44]
const EXTRA_ORDER = [28, 18, 30, 35]

export function genreLabels(sheet: SteamSheet, locale: Locale): string[] {
  return sheet.genreIds
    .map((id) => GENRES[id])
    .filter((g): g is (typeof GENRES)[number] => Boolean(g) && g.weight > 0)
    .map((g) => g[locale])
}

export function featureLabels(sheet: SteamSheet, locale: Locale): string[] {
  const owned = new Set(sheet.featureIds)
  return MODE_ORDER.filter((id) => owned.has(id)).map((id) => FEATURES[id][locale])
}

export function extraLabels(sheet: SteamSheet, locale: Locale): string[] {
  const owned = new Set(sheet.featureIds)
  return EXTRA_ORDER.filter((id) => owned.has(id)).map((id) => FEATURES[id][locale])
}

export function platformLabels(sheet: SteamSheet): string[] {
  const list: string[] = []
  if (sheet.platforms.windows) list.push('Windows')
  if (sheet.platforms.mac) list.push('macOS')
  if (sheet.platforms.linux) list.push('Linux')
  return list
}

export function priceLabel(sheet: SteamSheet, locale: Locale): string | null {
  if (!sheet.price) return null
  if (sheet.price.isFree) return locale === 'en' ? 'Free' : 'Gratuit'
  return sheet.price.formatted ?? null
}

const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function releaseLabel(sheet: SteamSheet, locale: Locale): string | null {
  const iso = sheet.releaseDate
  if (iso) {
    const [y, m, d] = iso.split('-')
    const months = locale === 'en' ? MONTHS_EN : MONTHS_FR
    const month = months[Number(m) - 1]
    if (!month) return sheet.releaseRaw
    if (!d) return locale === 'en' ? `${month} ${y}` : `${month} ${y}`
    return locale === 'en' ? `${month} ${Number(d)}, ${y}` : `${Number(d)} ${month} ${y}`
  }
  // "Q3 2026", "To be announced" : on rend tel quel plutôt que d'inventer
  return sheet.releaseRaw
}

/** Le studio, sans répéter l'éditeur quand c'est la même personne. */
export function studioLabel(sheet: SteamSheet): { developer: string | null; publisher: string | null } {
  const dev = sheet.developers.filter(Boolean).join(', ') || null
  const pub = sheet.publishers.filter(Boolean).join(', ') || null
  return { developer: dev, publisher: pub && pub !== dev ? pub : null }
}

/** Vrai dès que la fiche apporte de quoi remplir un tableau digne de ce nom. */
export function hasUsableSheet(sheet: SteamSheet | null): sheet is SteamSheet {
  if (!sheet) return false
  const facts = [
    sheet.developers.length > 0,
    Boolean(sheet.releaseRaw),
    Boolean(sheet.price),
    sheet.genreIds.length > 0,
  ].filter(Boolean).length
  return facts >= 3
}

// --- Jeux similaires -----------------------------------------------------

export interface SimilarGame {
  slug: string
  name: string
  coverImage?: string
  imageColor?: string
  score?: number
  articleCount: number
}

function bestArticle(group: GameGroup): Article | undefined {
  return group.articles.find((a) => a.category === 'tests') ?? group.articles[0]
}

/**
 * Rapproche deux jeux par genres partagés, en pondérant : « Indépendant » ne
 * dit rien de ce qu'on joue, « Stratégie » beaucoup. Un même studio pèse lourd,
 * parce que c'est le lien qu'un lecteur suit le plus volontiers.
 */
export function getSimilarGames(slug: string, locale: Locale, limit = 6): SimilarGame[] {
  const sheet = getGameSheet(slug)
  if (!sheet) return []

  const genres = new Set(sheet.genreIds.filter((id) => (GENRES[id]?.weight ?? 0) > 0))
  const devs = new Set(sheet.developers.map((d) => d.toLowerCase()))
  if (genres.size === 0 && devs.size === 0) return []

  const scored: { weight: number; game: SimilarGame }[] = []

  for (const group of getAllGames(locale)) {
    if (group.slug === slug) continue
    const other = getGameSheet(group.slug)
    if (!other) continue

    let weight = 0
    for (const id of other.genreIds) {
      if (genres.has(id)) weight += GENRES[id]?.weight ?? 0
    }
    if (other.developers.some((d) => devs.has(d.toLowerCase()))) weight += 3
    if (weight <= 0) continue

    const article = bestArticle(group)
    scored.push({
      weight,
      game: {
        slug: group.slug,
        name: group.name,
        coverImage: article?.coverImage,
        imageColor: article?.imageColor,
        score: group.articles.find((a) => typeof a.score === 'number')?.score,
        articleCount: group.articles.length,
      },
    })
  }

  // À poids égal, on met devant ce qu'on a réellement testé : un lecteur qui
  // clique sur une suggestion attend un avis, pas une preview de plus.
  scored.sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight
    const aScored = typeof a.game.score === 'number' ? 1 : 0
    const bScored = typeof b.game.score === 'number' ? 1 : 0
    if (bScored !== aScored) return bScored - aScored
    return b.game.articleCount - a.game.articleCount
  })

  return scored.slice(0, limit).map((x) => x.game)
}

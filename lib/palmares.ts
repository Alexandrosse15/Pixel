import { getAllArticles, type Article } from './articles'

/** Édition en cours. Changer cette valeur repart d'un scrutin vierge. */
export const EDITION = '2026-mi-parcours'

export interface Nominee {
  slug: string
  game: string
  score: number
  coverImage?: string
}

export interface PalmaresCategory {
  id: string
  /** Nombre de nominés retenus */
  size: number
  /** Sélection appliquée aux tests notés */
  pick: (tests: Article[]) => Article[]
}

const byScoreDesc = (a: Article, b: Article) => (b.score ?? 0) - (a.score ?? 0)
const byScoreAsc = (a: Article, b: Article) => (a.score ?? 0) - (b.score ?? 0)

export const CATEGORIES: PalmaresCategory[] = [
  {
    // Le sommet du classement : les notes les plus hautes de l'année
    id: 'jeu-de-lannee',
    size: 8,
    pick: (t) => [...t].sort(byScoreDesc),
  },
  {
    // Très bons sans être au sommet : les jeux qu'on n'attendait pas
    id: 'surprise',
    size: 6,
    pick: (t) =>
      [...t].filter((a) => (a.score ?? 0) >= 7.5 && (a.score ?? 0) < 8.5).sort(byScoreDesc),
  },
  {
    // Décevoir, ce n'est pas être mauvais : la zone tiède, entre 5 et 6.5
    id: 'deception',
    size: 6,
    pick: (t) =>
      [...t].filter((a) => (a.score ?? 0) >= 5 && (a.score ?? 0) <= 6.5).sort(byScoreAsc),
  },
  {
    // Le fond du classement, strictement sous la moyenne
    id: 'liste-de-la-honte',
    size: 6,
    pick: (t) => [...t].filter((a) => (a.score ?? 0) < 5).sort(byScoreAsc),
  },
]

/** Un seul test par jeu (le mieux noté), pour éviter les doublons FR/EN ou les rééditions. */
function dedupeByGame(articles: Article[]): Article[] {
  const best = new Map<string, Article>()
  for (const a of articles) {
    const key = (a.gameName ?? a.slug).toLowerCase()
    const current = best.get(key)
    if (!current || (a.score ?? 0) > (current.score ?? 0)) best.set(key, a)
  }
  return Array.from(best.values())
}

export function getNominees(categoryId: string, locale = 'fr'): Nominee[] {
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  if (!cat) return []

  const tests = dedupeByGame(
    getAllArticles(locale).filter((a) => a.category === 'tests' && typeof a.score === 'number'),
  )

  return cat.pick(tests)
    .slice(0, cat.size)
    .map((a) => ({
      slug: a.slug,
      game: a.gameName ?? a.title,
      score: a.score as number,
      coverImage: a.coverImage,
    }))
}

export function isValidVote(categoryId: string, slug: string, locale = 'fr'): boolean {
  return getNominees(categoryId, locale).some((n) => n.slug === slug)
}

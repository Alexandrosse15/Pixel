import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
export type { Category } from './categories'
export { categoryConfig } from './categories'
import type { Category } from './categories'

const FR_DIR = path.join(process.cwd(), 'content/articles')
const EN_DIR = path.join(process.cwd(), 'content/articles/en')

export interface Article {
  slug: string
  title: string
  category: Category
  excerpt: string
  date: string
  author: string
  readTime: string
  score?: number
  imageColor: string
  coverImage?: string
  seoTitle?: string
  gameName?: string
  gameNames?: string[]
  content: string
  featured?: boolean
}

function contentDir(locale = 'fr') {
  return locale === 'en' ? EN_DIR : FR_DIR
}

function parseFile(slug: string, locale = 'fr'): Article | null {
  try {
    const dir = contentDir(locale)
    const fullPath = path.join(dir, `${slug}.md`)

    // English fallback to French if translation doesn't exist
    if (locale === 'en' && !fs.existsSync(fullPath)) {
      return parseFile(slug, 'fr')
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title as string,
      category: data.category as Category,
      excerpt: data.excerpt as string,
      date: data.date as string,
      author: data.author as string,
      readTime: data.readTime as string,
      score: data.score as number | undefined,
      imageColor: (data.image_color as string) || 'from-zinc-900 to-zinc-800',
      coverImage: data.coverImage as string | undefined,
      seoTitle: data.seoTitle as string | undefined,
      gameName: data.gameName as string | undefined,
      gameNames: data.gameNames as string[] | undefined,
      content,
      featured: (data.featured as boolean) ?? false,
    }
  } catch {
    return null
  }
}

export function getAllArticles(locale = 'fr'): Article[] {
  if (!fs.existsSync(FR_DIR)) return []

  // Always enumerate slugs from the FR directory (source of truth)
  const slugs = fs
    .readdirSync(FR_DIR)
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .map((name) => name.replace(/\.md$/, ''))

  const articles = slugs
    .map((slug) => parseFile(slug, locale))
    .filter(Boolean) as Article[]

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticlesByCategory(category: Category, locale = 'fr'): Article[] {
  return getAllArticles(locale).filter((a) => a.category === category)
}

export function getFeaturedArticle(locale = 'fr'): Article | null {
  const all = getAllArticles(locale)
  return all.find((a) => a.featured) ?? all[0] ?? null
}

export function getArticleBySlug(slug: string, locale = 'fr'): Article | null {
  return parseFile(slug, locale)
}

export function getRelatedArticles(
  currentSlug: string,
  category: Category,
  locale = 'fr',
  limit = 3
): Article[] {
  return getAllArticles(locale)
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, limit)
}

export function getArticlesByGame(
  gameName: string,
  currentSlug: string,
  locale = 'fr',
  limit = 4
): Article[] {
  const lower = gameName.toLowerCase()
  return getAllArticles(locale)
    .filter(
      (a) =>
        a.slug !== currentSlug &&
        (a.gameName?.toLowerCase() === lower ||
          a.gameNames?.some((n) => n.toLowerCase() === lower))
    )
    .slice(0, limit)
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(FR_DIR)) return []
  return fs
    .readdirSync(FR_DIR)
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .map((name) => name.replace(/\.md$/, ''))
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// --- Pages par jeu (hub SEO ciblant le nom nu du jeu) ---

export interface GameGroup {
  name: string
  slug: string
  articles: Article[]
}

export function slugifyGame(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function collectGameNames(a: Article): string[] {
  const names = new Set<string>()
  if (a.gameName) names.add(a.gameName)
  a.gameNames?.forEach((n) => names.add(n))
  return Array.from(names)
}

// Regroupe les articles par jeu. On ne crée un hub que pour les jeux ayant
// au moins un test ou une preview (les rubriques réellement centrées sur un jeu).
export function getAllGames(locale = 'fr'): GameGroup[] {
  const articles = getAllArticles(locale) // déjà triés par date décroissante
  const map = new Map<string, GameGroup>()

  for (const a of articles) {
    for (const name of collectGameNames(a)) {
      const slug = slugifyGame(name)
      if (!slug) continue
      const existing = map.get(slug)
      if (existing) {
        existing.articles.push(a)
      } else {
        map.set(slug, { name, slug, articles: [a] })
      }
    }
  }

  return Array.from(map.values()).filter((g) =>
    g.articles.some((a) => a.category === 'tests' || a.category === 'previews')
  )
}

export function getGameBySlug(slug: string, locale = 'fr'): GameGroup | null {
  return getAllGames(locale).find((g) => g.slug === slug) ?? null
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/articles')

export type Category = 'tests' | 'previews' | 'dossiers' | 'industrie'

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
  content: string
  featured?: boolean
}

export const categoryConfig: Record<Category, { label: string; color: string; textColor: string }> = {
  tests: { label: 'Test', color: 'bg-brand', textColor: 'text-white' },
  previews: { label: 'Preview', color: 'bg-amber-500', textColor: 'text-black' },
  dossiers: { label: 'Dossier', color: 'bg-violet-600', textColor: 'text-white' },
  industrie: { label: 'Industrie', color: 'bg-emerald-600', textColor: 'text-white' },
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDirectory)) return []

  const fileNames = fs.readdirSync(contentDirectory)
  const articles = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getArticleBySlug(slug)
    })
    .filter(Boolean) as Article[]

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((article) => article.category === category)
}

export function getFeaturedArticle(): Article | null {
  const all = getAllArticles()
  return all.find((a) => a.featured) ?? all[0] ?? null
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
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
      content,
      featured: (data.featured as boolean) ?? false,
    }
  } catch {
    return null
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return []
  return fs
    .readdirSync(contentDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

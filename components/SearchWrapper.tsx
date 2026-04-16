import { getAllArticles } from '@/lib/articles'
import SearchModal from './SearchModal'
import type { SearchArticle } from './SearchModal'

export default function SearchWrapper() {
  const articles = getAllArticles()

  const searchArticles: SearchArticle[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    date: a.date,
  }))

  return <SearchModal articles={searchArticles} />
}

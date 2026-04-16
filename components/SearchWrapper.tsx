import { cookies } from 'next/headers'
import { getAllArticles } from '@/lib/articles'
import { type Locale } from '@/lib/i18n'
import SearchModal from './SearchModal'
import type { SearchArticle } from './SearchModal'

export default function SearchWrapper() {
  const locale = ((cookies().get('locale')?.value) ?? 'fr') as Locale
  const articles = getAllArticles(locale)

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

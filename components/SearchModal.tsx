'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import CategoryBadge from './CategoryBadge'
import type { Category } from '@/lib/categories'

export interface SearchArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
}

interface Props {
  articles: SearchArticle[]
}

export default function SearchModal({ articles }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchArticle[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const fuse = useRef(
    new Fuse(articles, {
      keys: ['title', 'excerpt', 'author', 'category'],
      threshold: 0.35,
      includeScore: true,
    })
  )

  useEffect(() => {
    fuse.current = new Fuse(articles, {
      keys: ['title', 'excerpt', 'author', 'category'],
      threshold: 0.35,
      includeScore: true,
    })
  }, [articles])

  const openModal = useCallback(() => {
    setOpen(true)
    setQuery('')
    setResults([])
    setSelected(0)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  // Listen for custom event from Header
  useEffect(() => {
    const handler = () => openModal()
    window.addEventListener('open-search', handler)
    return () => window.removeEventListener('open-search', handler)
  }, [openModal])

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) closeModal()
        else openModal()
      }
      if (e.key === 'Escape' && open) closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, openModal, closeModal])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Run search
  useEffect(() => {
    if (!query.trim()) {
      setResults(articles.slice(0, 6))
      setSelected(0)
      return
    }
    const hits = fuse.current.search(query).slice(0, 8).map((r: { item: SearchArticle }) => r.item)
    setResults(hits)
    setSelected(0)
  }, [query, articles])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && results[selected]) {
      closeModal()
      window.location.href = `/articles/${results[selected].slug}`
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-bg-base/80 backdrop-blur-sm pt-[10vh] px-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="w-full max-w-2xl rounded-sm border border-line bg-bg-surface shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 text-ink-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher un article..."
            className="flex-1 bg-transparent font-body text-sm text-white placeholder-ink-muted outline-none"
          />
          <kbd className="hidden rounded border border-line bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-ink-muted md:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 && query ? (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              Aucun résultat pour &quot;{query}&quot;
            </p>
          ) : (
            <ul>
              {!query && (
                <li className="px-4 pb-1 pt-3">
                  <span className="font-display text-xs uppercase tracking-widest text-ink-muted">
                    Articles récents
                  </span>
                </li>
              )}
              {results.map((article, i) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    onClick={closeModal}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-bg-elevated ${
                      i === selected ? 'bg-bg-elevated' : ''
                    }`}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <div className="mt-0.5 shrink-0">
                      <CategoryBadge category={article.category as Category} size="sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{article.title}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">{article.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-line px-4 py-2">
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-line bg-bg-elevated px-1 py-0.5 font-mono text-xs">↑↓</kbd>
              naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-line bg-bg-elevated px-1 py-0.5 font-mono text-xs">↵</kbd>
              ouvrir
            </span>
          </div>
          <span className="text-xs text-ink-muted">
            {results.length} résultat{results.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

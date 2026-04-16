import Link from 'next/link'

interface Props {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-16 flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink-muted transition-colors hover:border-brand hover:text-brand"
          aria-label="Page précédente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-sm border border-line text-ink-muted/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage
        const href = page === 1 ? basePath : `${basePath}?page=${page}`
        return (
          <Link
            key={page}
            href={href}
            className={`flex h-9 w-9 items-center justify-center rounded-sm border font-display text-sm font-bold transition-colors ${
              isActive
                ? 'border-brand bg-brand text-white'
                : 'border-line text-ink-muted hover:border-brand hover:text-brand'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink-muted transition-colors hover:border-brand hover:text-brand"
          aria-label="Page suivante"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-sm border border-line text-ink-muted/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  )
}

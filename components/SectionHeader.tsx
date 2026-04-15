import Link from 'next/link'

interface Props {
  title: string
  href?: string
  accent?: boolean
}

export default function SectionHeader({ title, href, accent = false }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {accent && <span className="block h-6 w-1 bg-brand" />}
        <h2 className="section-title">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-display uppercase tracking-widest text-ink-muted transition-colors hover:text-brand"
        >
          Tout voir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}

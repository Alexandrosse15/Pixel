import type { Locale } from '@/lib/i18n'

/**
 * Encart de telechargement pour les guides PDF de la rubrique Wargame.
 * Alimente par le frontmatter de l'article (pdfUrl, pdfTitle, pdfPages, pdfSize)
 * plutot que par du HTML brut, que react-markdown ne rend pas.
 */
export default function PdfDownload({
  url,
  title,
  pages,
  size,
  locale,
}: {
  url: string
  title: string
  pages?: number
  size?: string
  locale: Locale
}) {
  const en = locale === 'en'
  const meta = [
    pages ? `${pages} ${en ? 'pages' : 'pages'}` : null,
    size,
    'PDF',
  ].filter(Boolean)

  return (
    <aside className="not-prose my-12 overflow-hidden rounded-sm border border-orange-900/60 bg-gradient-to-br from-orange-950/50 via-bg-card to-bg-card">
      <div className="h-[3px] w-full bg-orange-700" />
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        {/* Vignette document */}
        <div
          aria-hidden="true"
          className="relative hidden h-28 w-[5.5rem] shrink-0 rotate-[-3deg] rounded-sm border border-orange-900/70 bg-bg-base shadow-lg sm:block"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-orange-700" />
          <div className="space-y-[5px] px-3 pt-6">
            <span className="block h-[3px] w-full rounded-full bg-ink-muted/50" />
            <span className="block h-[3px] w-10/12 rounded-full bg-ink-muted/35" />
            <span className="block h-[3px] w-full rounded-full bg-ink-muted/35" />
            <span className="block h-[3px] w-7/12 rounded-full bg-ink-muted/25" />
            <span className="block h-[3px] w-full rounded-full bg-ink-muted/25" />
            <span className="block h-[3px] w-9/12 rounded-full bg-ink-muted/20" />
          </div>
          <span className="absolute bottom-2 right-2 font-display text-[9px] font-black uppercase tracking-widest text-orange-500">
            PDF
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
            {en ? 'Free download' : 'Téléchargement gratuit'}
          </p>
          <p className="mt-2 font-display text-xl font-black leading-tight text-white sm:text-2xl">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            {en
              ? 'Everything on this page, laid out to keep beside the table: the phases, the stat line, the distances and the beginner mistakes.'
              : "Tout ce qui est sur cette page, mis en page pour être posé à côté de la table : les phases, la ligne de caractéristiques, les distances et les erreurs de débutant."}
          </p>
          <p className="mt-3 font-display text-[11px] uppercase tracking-widest text-ink-muted">
            {meta.join(' · ')}
          </p>
        </div>

        <a
          href={url}
          download
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-sm bg-orange-700 px-6 py-3.5 font-display text-sm font-black uppercase tracking-wider text-white no-underline transition-colors hover:bg-orange-600"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          {en ? 'Download' : 'Télécharger'}
        </a>
      </div>
    </aside>
  )
}

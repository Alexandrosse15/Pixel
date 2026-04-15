import Link from 'next/link'

const LINKS = [
  { href: '/tests', label: 'Tests' },
  { href: '/previews', label: 'Previews' },
  { href: '/dossiers', label: 'Dossiers' },
  { href: '/industrie', label: 'Industrie' },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-0.5 no-underline">
              <span className="font-display text-xl font-black uppercase tracking-tight text-white">
                INSERT
              </span>
              <span className="font-display text-xl font-black uppercase tracking-tight text-brand">
                COINS
              </span>
              <span className="font-display text-xs font-bold uppercase text-ink-muted">
                .press
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Le média indépendant du jeu vidéo. Tests, previews, dossiers de fond et actualité de l&apos;industrie.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="mb-4 font-display text-xs uppercase tracking-widest text-ink-muted">
              Rubriques
            </h3>
            <ul className="space-y-2">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-ink-secondary transition-colors hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-display text-xs uppercase tracking-widest text-ink-muted">
              Le média
            </h3>
            <ul className="space-y-2 text-sm">
              {['À propos', 'Équipe', 'Contact', 'Mentions légales'].map((item) => (
                <li key={item}>
                  <span className="cursor-pointer text-ink-secondary transition-colors hover:text-brand">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} InsertCoins.press · Tous droits réservés
          </p>
          <p className="text-xs text-ink-subtle">
            <span className="text-brand">▶</span> Fait avec passion pour les joueurs
          </p>
        </div>
      </div>
    </footer>
  )
}

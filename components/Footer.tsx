'use client'

import Link from 'next/link'
import { useLocale } from './LocaleProvider'

const NAV_LINKS = [
  { href: '/tests', label: 'Tests' },
  { href: '/previews', label: 'Previews' },
  { href: '/dossiers', label: 'Dossiers' },
  { href: '/industrie', label: 'Industrie' },
  { href: '/cinema', label: 'Cinéma' },
]

export default function Footer() {
  const { t } = useLocale()
  const f = t.footer

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
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{f.tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="mb-4 font-display text-xs uppercase tracking-widest text-ink-muted">
              {f.sections_title}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
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
              {f.about_title}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/a-propos"
                  className="text-ink-secondary transition-colors hover:text-brand"
                >
                  {f.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-ink-secondary transition-colors hover:text-brand"
                >
                  {f.legal}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:pressinsertcoins@gmail.com"
                  className="text-ink-secondary transition-colors hover:text-brand"
                >
                  {f.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} InsertCoins.press · {f.rights}
          </p>
          <p className="text-xs text-ink-subtle">
            <span className="text-brand"></span> {f.made_with}
          </p>
        </div>
      </div>
    </footer>
  )
}

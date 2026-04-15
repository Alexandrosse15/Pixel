'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/tests', label: 'Tests' },
  { href: '/previews', label: 'Previews' },
  { href: '/dossiers', label: 'Dossiers' },
  { href: '/industrie', label: 'Industrie' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-base/95 backdrop-blur-sm">
      {/* Top accent bar */}
      <div className="h-[3px] bg-brand w-full" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-0.5 no-underline">
          <span className="font-display text-2xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-brand">
            INSERT
          </span>
          <span className="font-display text-2xl font-black uppercase tracking-tight text-brand">
            COIN
          </span>
          <span className="font-display text-sm font-bold uppercase text-ink-muted transition-colors group-hover:text-ink-secondary">
            .press
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname.startsWith(href) ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: search icon */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            className="text-ink-muted transition-colors hover:text-brand"
            aria-label="Rechercher"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-bg-surface md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 font-display text-sm uppercase tracking-widest transition-colors hover:text-brand ${
                  pathname.startsWith(href)
                    ? 'text-brand'
                    : 'text-ink-secondary'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

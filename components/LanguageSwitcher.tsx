'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import { setLocaleAction } from '@/app/actions'

function FlagFR() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="15" aria-hidden="true">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  )
}

function FlagEN() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="22" height="15" aria-hidden="true">
      <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
      <clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
      <g clipPath="url(#a)">
        <path d="M0 0v30h60V0z" fill="#012169"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  )
}

const FLAGS = {
  fr: { Flag: FlagFR, label: 'Français' },
  en: { Flag: FlagEN, label: 'English' },
} as const

export default function LanguageSwitcher() {
  const { locale } = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1">
      {(['fr', 'en'] as const).map((l) => {
        const { Flag, label } = FLAGS[l]
        return (
          <button
            key={l}
            onClick={() => setLocaleAction(l, pathname)}
            title={label}
            aria-label={label}
            className={`flex h-7 w-8 items-center justify-center rounded-sm transition-all ${
              locale === l
                ? 'opacity-100 ring-1 ring-brand'
                : 'opacity-40 hover:opacity-80'
            }`}
          >
            <Flag />
          </button>
        )
      })}
    </div>
  )
}

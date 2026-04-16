'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from './LocaleProvider'
import { setLocaleAction } from '@/app/actions'

const FLAGS = {
  fr: { emoji: '🇫🇷', label: 'Français' },
  en: { emoji: '🇬🇧', label: 'English' },
} as const

export default function LanguageSwitcher() {
  const { locale } = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocaleAction(l, pathname)}
          title={FLAGS[l].label}
          aria-label={FLAGS[l].label}
          className={`flex h-7 w-8 items-center justify-center rounded-sm text-base transition-all ${
            locale === l
              ? 'opacity-100 ring-1 ring-brand'
              : 'opacity-40 hover:opacity-80'
          }`}
        >
          {FLAGS[l].emoji}
        </button>
      ))}
    </div>
  )
}

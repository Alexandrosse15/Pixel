'use client'

import { useLocale } from './LocaleProvider'

const FLAGS = {
  fr: {
    emoji: '🇫🇷',
    label: 'Français',
    ariaLabel: 'Passer en français',
  },
  en: {
    emoji: '🇬🇧',
    label: 'English',
    ariaLabel: 'Switch to English',
  },
} as const

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-label={FLAGS[l].ariaLabel}
          title={FLAGS[l].label}
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

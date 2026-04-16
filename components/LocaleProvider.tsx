'use client'

import { createContext, useContext } from 'react'
import { type Locale, getT, type Translations } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  t: getT('fr'),
  setLocale: () => {},
})

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const setLocale = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
    window.location.reload()
  }

  return (
    <LocaleContext.Provider value={{ locale: initialLocale, t: getT(initialLocale), setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

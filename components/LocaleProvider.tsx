'use client'

import { createContext, useContext } from 'react'
import { type Locale, getT, type Translations } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  t: Translations
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  t: getT('fr'),
})

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  return (
    <LocaleContext.Provider value={{ locale: initialLocale, t: getT(initialLocale) }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

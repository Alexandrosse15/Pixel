'use client'

import { createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : initialLocale

  return (
    <LocaleContext.Provider value={{ locale, t: getT(locale) }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

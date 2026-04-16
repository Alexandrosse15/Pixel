'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()

  const setLocale = useCallback(
    (l: Locale) => {
      document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
      setLocaleState(l)
      router.refresh()
    },
    [router]
  )

  return (
    <LocaleContext.Provider value={{ locale, t: getT(locale), setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

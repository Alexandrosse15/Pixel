import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import Game from './Game'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.creation
  const frBase = `${SITE_URL}/creation-equipe`
  const enBase = `${SITE_URL}/en/creation-equipe`
  const canonicalUrl = locale === 'en' ? enBase : frBase
  return {
    title: s.title,
    description: s.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: frBase, en: enBase, 'x-default': frBase },
    },
    openGraph: {
      title: `${s.title} | ${SITE_NAME}`,
      description: s.description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@insertcoinspress',
      title: `${s.title} | ${SITE_NAME}`,
      description: s.description,
    },
  }
}

export default function IndeDuMoisPage() {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.creation

  return (
    <div>
      <div className="border-b border-line bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="flex items-center gap-4">
            <span className="block h-8 w-1.5 bg-brand" />
            <p className="font-display text-xs uppercase tracking-ultra text-brand">{s.title}</p>
          </div>
          <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
            Mission Couches
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{s.description}</p>
        </div>
      </div>

      <div className="py-10 md:py-14">
        <Game />
      </div>
    </div>
  )
}

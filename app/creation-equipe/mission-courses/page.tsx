import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import Game from './Game'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const title = locale === 'en' ? 'Errand Run' : 'Mission Courses'
  const description =
    locale === 'en'
      ? 'A small procedural choice game built by the team. Play it right in your browser, free and with no install.'
      : "Un petit jeu de choix procédural fait par l'équipe. À jouer directement dans le navigateur, gratuit et sans installation."
  const frBase = `${SITE_URL}/creation-equipe/mission-courses`
  const enBase = `${SITE_URL}/en/creation-equipe/mission-courses`
  const canonicalUrl = locale === 'en' ? enBase : frBase
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: { fr: frBase, en: enBase, 'x-default': frBase },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@insertcoinspress',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  }
}

export default function MissionCoursesPage() {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const t = getT(locale)
  const s = t.sections.creation
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div>
      <div className="border-b border-line bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="flex items-center gap-4">
            <span className="block h-8 w-1.5 bg-brand" />
            <Link
              href={`${prefix}/creation-equipe`}
              className="font-display text-xs uppercase tracking-ultra text-brand no-underline transition-colors hover:text-brand-light"
            >
              {s.title}
            </Link>
          </div>
          <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
            {locale === 'en' ? 'Errand Run' : 'Mission Courses'}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {locale === 'en'
              ? 'A procedural choice game: manage your gauges, draw events, reach your objectives. Right in the browser.'
              : "Un jeu de choix procédural : gérez vos jauges, piochez des événements, atteignez vos objectifs. Directement dans le navigateur."}
          </p>
        </div>
      </div>

      <div className="py-10 md:py-14">
        <Game />
      </div>
    </div>
  )
}

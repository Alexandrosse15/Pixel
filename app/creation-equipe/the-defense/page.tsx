import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import TheDefenseGame from './TheDefenseGame'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const title = 'The Defense'
  const description =
    locale === 'en'
      ? "A courtroom game where you play the defense lawyer. Question your client, dig through the case file, unlock clues and sway the jury. Free, in your browser, no install."
      : "Un jeu de prétoire où vous êtes l'avocat de la défense. Interrogez votre client, fouillez le dossier, débloquez des indices et retournez le jury. Gratuit, dans le navigateur, sans installation."
  const frBase = `${SITE_URL}/creation-equipe/the-defense`
  const enBase = `${SITE_URL}/en/creation-equipe/the-defense`
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

export default function TheDefensePage() {
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
            The Defense
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {locale === 'en'
              ? "You play the defense lawyer. Question your client, dig through the case file, unlock clues, then face the prosecutor round by round to sway the jury."
              : "Vous êtes l'avocat de la défense. Interrogez votre client, fouillez le dossier, débloquez des indices, puis affrontez le procureur manche par manche pour retourner le jury."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <TheDefenseGame />
      </div>
    </div>
  )
}

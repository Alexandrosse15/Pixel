import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getT, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/config'

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

interface JeuVitrine {
  slug: string
  genre: { fr: string; en: string }
  titre: { fr: string; en: string }
  pitch: { fr: string; en: string }
}

const JEUX: JeuVitrine[] = [
  {
    slug: 'the-defense',
    genre: { fr: 'Jeu de prétoire', en: 'Courtroom game' },
    titre: { fr: 'The Defense', en: 'The Defense' },
    pitch: {
      fr: "Avocat de la défense, vous n'avez que cinq pistes pour enquêter : choisissez bien, méfiez-vous des fausses pistes. Démasquez le vrai coupable parmi cinq suspects, puis affrontez le procureur sans récolter trois avertissements du juge. Une seule erreur peut tout faire basculer.",
      en: "As the defense lawyer you get only five leads to investigate: choose wisely, beware the red herrings. Unmask the real culprit among five suspects, then face the prosecutor without drawing three warnings from the judge. One mistake can sink everything.",
    },
  },
  {
    slug: 'mission-courses',
    genre: { fr: 'Choix procédural', en: 'Procedural choices' },
    titre: { fr: 'Mission Courses', en: 'Errand Run' },
    pitch: {
      fr: "Un jeu de choix procédural multi-chapitres : gérez vos jauges, piochez des événements, atteignez vos objectifs et décrochez le meilleur rang. Simple à lancer, retors à maîtriser.",
      en: 'A multi-chapter procedural choice game: manage your gauges, draw events, hit your objectives and chase the best rank. Easy to start, tricky to master.',
    },
  },
]

export default function CreationsEquipePage() {
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
            <p className="font-display text-xs uppercase tracking-ultra text-brand">{s.title}</p>
          </div>
          <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
            {s.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{s.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {JEUX.map((jeu) => (
            <Link
              key={jeu.slug}
              href={`${prefix}/creation-equipe/${jeu.slug}`}
              className="group flex flex-col rounded-sm border border-line bg-bg-card p-6 no-underline transition-colors hover:border-brand md:p-8"
            >
              <span className="font-display text-xs uppercase tracking-ultra text-brand">
                {jeu.genre[locale]}
              </span>
              <h2 className="mt-3 font-display text-3xl font-black uppercase leading-none text-white transition-colors group-hover:text-brand md:text-4xl">
                {jeu.titre[locale]}
              </h2>
              <p className="mt-4 flex-1 leading-relaxed text-ink-secondary">{jeu.pitch[locale]}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-white transition-colors group-hover:text-brand">
                {locale === 'en' ? 'Play' : 'Jouer'}
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { CATEGORIES, getNominees, EDITION } from '@/lib/palmares'
import PalmaresCategory from '@/components/PalmaresCategory'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

const COPY = {
  fr: {
    title: 'Palmarès InsertCoins, édition de mi-parcours',
    intro:
      "Voici les jeux qui nous ont le plus marqués depuis le début de l'année, tirés de nos tests notés. À vous de trancher : un vote par catégorie, sans compte à créer. Les résultats s'affichent dès que vous avez voté.",
    note: "Les nominés sont extraits automatiquement de nos notes. Si un jeu vous manque, dites-le en commentaire, on ajustera l'édition de décembre.",
    cats: {
      'jeu-de-lannee': { t: 'Jeu de la mi-année', d: 'Nos meilleures notes depuis janvier. Un seul peut gagner.' },
      surprise: { t: 'La plus belle surprise', d: "Les jeux qu'on n'attendait pas et qui nous ont cueillis." },
      deception: { t: 'La plus grosse déception', d: "Ceux dont on espérait mieux, et qui nous ont laissés sur le carreau." },
      'liste-de-la-honte': { t: 'La liste de la honte', d: 'Nos notes les plus basses. Le classement dont personne ne veut.' },
    },
  },
  en: {
    title: 'InsertCoins Awards, mid-year edition',
    intro:
      'These are the games that marked us most since January, drawn from our scored reviews. Your turn to decide: one vote per category, no account needed. Results appear as soon as you vote.',
    note: 'Nominees are pulled automatically from our scores. If a game is missing, say so in the comments and we will adjust the December edition.',
    cats: {
      'jeu-de-lannee': { t: 'Game of the half-year', d: 'Our highest scores since January. Only one can win.' },
      surprise: { t: 'Best surprise', d: 'The games nobody saw coming that caught us off guard.' },
      deception: { t: 'Biggest disappointment', d: 'The ones we hoped more from, and that left us stranded.' },
      'liste-de-la-honte': { t: 'The hall of shame', d: 'Our lowest scores. The ranking nobody wants.' },
    },
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const c = COPY[locale]
  const frUrl = `${SITE_URL}/palmares`
  const enUrl = `${SITE_URL}/en/palmares`
  return {
    title: c.title,
    description: c.intro,
    alternates: {
      canonical: locale === 'en' ? enUrl : frUrl,
      languages: { fr: frUrl, en: enUrl, 'x-default': frUrl },
    },
    openGraph: {
      title: `${c.title} | ${SITE_NAME}`,
      description: c.intro,
      url: locale === 'en' ? enUrl : frUrl,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: SITE_NAME,
    },
  }
}

export default function PalmaresPage() {
  const locale = (headers().get('x-locale') ?? 'fr') as Locale
  const c = COPY[locale]

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">{EDITION}</p>
        <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-4 text-white/60">{c.intro}</p>
      </header>

      {CATEGORIES.map((cat) => {
        const copy = c.cats[cat.id as keyof typeof c.cats]
        if (!copy) return null
        return (
          <PalmaresCategory
            key={cat.id}
            categoryId={cat.id}
            title={copy.t}
            description={copy.d}
            nominees={getNominees(cat.id, locale)}
          />
        )
      })}

      <p className="mt-12 border-t border-line pt-6 text-sm text-white/40">{c.note}</p>
    </main>
  )
}

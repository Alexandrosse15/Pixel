import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'InsertCoins.press est un média jeux vidéo indépendant. Tests, previews, dossiers de fond et actualité industrie — sans compromis.',
  alternates: { canonical: `${SITE_URL}/a-propos` },
  openGraph: {
    title: `À propos | ${SITE_NAME}`,
    description: 'InsertCoins.press est un média jeux vidéo indépendant. Tests, previews, dossiers de fond et actualité industrie — sans compromis.',
    url: `${SITE_URL}/a-propos`,
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `À propos | ${SITE_NAME}` }],
  },
}

const content = {
  fr: {
    eyebrow: 'Le média',
    title: 'À propos',
    manifesto_label: 'Manifeste',
    manifesto: [
      "On a tous vécu le moment où un test de jeu vidéo nous a vendus quelque chose qu'il n'était pas. Un 9/10 pour un jeu bâclé. Un embargo qui s'est levé le jour de la sortie sur un désastre technique. Une review qui ressemble à un communiqué de presse légèrement reformulé.",
      "InsertCoins.press est né de ce ras-le-bol.",
      "Ce site défend une position simple : un media de jeux vidéo a un seul travail. Dire la vérité. Pas flatter les éditeurs, pas entretenir des relations presse, pas équilibrer les notes pour ne froisser personne. Dire ce qu'on a vu. Dire ce qu'on a ressenti. Dire ce qu'on pense.",
      "On a joué à tous les jeux qu'on couvre. On assume chaque mot qu'on écrit. On ne s'excuse pas d'avoir une opinion.",
    ],
    what_label: 'Ce qu\'on fait',
    what_items: [
      {
        title: 'Tests',
        body: 'Des critiques complètes, jouées jusqu\'au bout. Pas de première heure, pas de session de preview maquillée en test. On finit les jeux avant d\'écrire.',
        href: '/tests',
      },
      {
        title: 'Previews',
        body: 'Quand on a mis les mains dessus avant la sortie, on vous dit ce qu\'on a vu — et ce qui nous inquiète.',
        href: '/previews',
      },
      {
        title: 'Dossiers',
        body: 'Pour aller plus loin que l\'actu. Rétrospectives, analyses, enquêtes sur le jeu vidéo et sa culture.',
        href: '/dossiers',
      },
      {
        title: 'Industrie',
        body: 'Licenciements, acquisitions, prix, modèles économiques. Ce qui se passe derrière les jeux, ça compte aussi.',
        href: '/industrie',
      },
    ],
    team_label: 'La rédaction',
    team_intro: 'InsertCoins.press est un projet indépendant, fondé et tenu par un seul rédacteur.',
    team_member: {
      name: 'Alexandrosse',
      role: 'Fondateur, rédacteur en chef',
      bio: 'Joueur depuis toujours, journaliste par conviction. Spécialité : les jeux qui méritent mieux que leur note moyenne, et les tendances de l\'industrie que personne ne veut appeler par leur nom.',
    },
    contact_label: 'Contact',
    contact_body: 'Pour les propositions, les erreurs à corriger, les désaccords à argumenter ou simplement pour dire bonjour :',
    contact_email: 'pressinsertcoins@gmail.com',
    note_label: 'Indépendance',
    note_body: 'InsertCoins.press ne perçoit aucune rémunération de la part des éditeurs ou développeurs dont les jeux sont couverts. Les accès presse éventuels ne conditionnent en aucune façon les notes ou l\'angle éditorial. Ce site n\'a aucune régie publicitaire, aucun partenaire financier, aucune obligation vis-à-vis de qui que ce soit.',
  },
  en: {
    eyebrow: 'About',
    title: 'About us',
    manifesto_label: 'Manifesto',
    manifesto: [
      "We've all been there. A 9/10 for a broken game. An embargo that lifted on release day for a technical disaster. A review that reads like a lightly reworded press release.",
      "InsertCoins.press was born from that frustration.",
      "This site holds one position: a gaming media outlet has one job. Tell the truth. Not flatter publishers, not maintain press relationships, not balance scores to avoid offending anyone. Say what we saw. Say what we felt. Say what we think.",
      "We play every game we cover. We stand behind every word we write. We don't apologise for having an opinion.",
    ],
    what_label: 'What we do',
    what_items: [
      {
        title: 'Reviews',
        body: 'Complete reviews, played to completion. No first-hour pieces, no preview sessions dressed up as tests. We finish games before we write.',
        href: '/tests',
      },
      {
        title: 'Previews',
        body: 'When we got our hands on it before release, we tell you what we saw — and what concerns us.',
        href: '/previews',
      },
      {
        title: 'Features',
        body: 'Going further than the news cycle. Retrospectives, analysis, investigations into games and their culture.',
        href: '/dossiers',
      },
      {
        title: 'Industry',
        body: 'Layoffs, acquisitions, pricing, business models. What happens behind the games matters too.',
        href: '/industrie',
      },
    ],
    team_label: 'The team',
    team_intro: 'InsertCoins.press is an independent project, founded and run by a single editor.',
    team_member: {
      name: 'Alexandrosse',
      role: 'Founder, Editor-in-Chief',
      bio: 'A lifelong gamer, journalist by conviction. Speciality: games that deserve better than their average score, and industry trends no one wants to name plainly.',
    },
    contact_label: 'Contact',
    contact_body: 'For pitches, corrections, arguments or just to say hello:',
    contact_email: 'pressinsertcoins@gmail.com',
    note_label: 'Independence',
    note_body: 'InsertCoins.press receives no payment from publishers or developers whose games are covered. Any press access received does not influence scores or editorial angle in any way. This site has no ad network, no financial partners, no obligations to anyone.',
  },
}

export default async function AProposPage() {
  const locale = ((cookies().get('locale')?.value) ?? 'fr') as Locale
  const c = content[locale]

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">

      {/* Header */}
      <div className="mb-16 border-b border-line pb-12">
        <p className="mb-3 font-display text-xs uppercase tracking-widest text-brand">{c.eyebrow}</p>
        <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
          INSERT<span className="text-brand">COINS</span>
          <span className="text-ink-muted">.press</span>
        </h1>
      </div>

      {/* Manifesto */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xs uppercase tracking-widest text-ink-muted">
          {c.manifesto_label}
        </h2>
        <div className="space-y-5">
          {c.manifesto.map((para, i) => (
            <p
              key={i}
              className={
                i === 1
                  ? 'font-display text-xl font-black uppercase text-brand'
                  : 'text-base leading-relaxed text-ink-secondary'
              }
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xs uppercase tracking-widest text-ink-muted">
          {c.what_label}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {c.what_items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-sm border border-line bg-bg-elevated p-5 transition-colors hover:border-brand"
            >
              <p className="mb-2 font-display text-sm font-black uppercase text-white transition-colors group-hover:text-brand">
                {item.title}
              </p>
              <p className="text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xs uppercase tracking-widest text-ink-muted">
          {c.team_label}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-ink-secondary">{c.team_intro}</p>
        <div className="rounded-sm border border-line bg-bg-elevated p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-brand/10 font-display text-lg font-black text-brand">
              A
            </div>
            <div>
              <p className="font-display text-base font-black uppercase text-white">
                {c.team_member.name}
              </p>
              <p className="mb-3 font-display text-xs uppercase tracking-widest text-brand">
                {c.team_member.role}
              </p>
              <p className="text-sm leading-relaxed text-ink-secondary">{c.team_member.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xs uppercase tracking-widest text-ink-muted">
          {c.contact_label}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-ink-secondary">{c.contact_body}</p>
        <a
          href={`mailto:${c.contact_email}`}
          className="inline-block font-display text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-white"
        >
          {c.contact_email}
        </a>
      </section>

      {/* Independence note */}
      <section className="rounded-sm border border-line bg-bg-elevated p-6">
        <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-ink-muted">
          {c.note_label}
        </h2>
        <p className="text-sm leading-relaxed text-ink-secondary">{c.note_body}</p>
      </section>

    </div>
  )
}

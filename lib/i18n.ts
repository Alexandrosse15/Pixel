export type Locale = 'fr' | 'en'
export const DEFAULT_LOCALE: Locale = 'fr'
export const LOCALES: Locale[] = ['fr', 'en']

const translations = {
  fr: {
    nav: {
      search: 'Rechercher',
      menu: 'Menu',
    },
    home: {
      featured: 'À la une',
      intro: "Tests, previews, dossiers de fond et actualité de l'industrie. InsertCoins.press est un média gaming indépendant : pas de régie publicitaire, pas de partenariats éditoriaux, pas de scores gonflés. Juste des gens qui aiment les jeux vidéo et qui vous en parlent franchement.",
      cta_eyebrow: 'Presse gaming indépendante',
      cta_title: 'La critique sans compromis',
      cta_body:
        "InsertCoins.press défend une presse gaming libre, honnête et passionnée. Pas de scores gonflés, pas de preview sous embargo draconien.",
    },
    sections: {
      label: 'Rubrique',
      tests: {
        title: 'Tests',
        description:
          "Des critiques approfondies, honnêtes et sans compromis. On joue jusqu'au bout, on vous dit tout.",
        empty: 'Aucun test pour le moment.',
      },
      previews: {
        title: 'Previews',
        description:
          "On a mis les mains dessus avant vous. Découvrez nos premières impressions sur les jeux qui arrivent.",
        empty: 'Aucune preview pour le moment.',
      },
      dossiers: {
        title: 'Dossiers',
        description:
          "Quand on creuse plus loin. Analyses, enquêtes et rétrospectives sur le jeu vidéo et sa culture.",
        empty: 'Aucun dossier pour le moment.',
      },
      industrie: {
        title: 'Industrie',
        description:
          "Acquisitions, licenciements, tendances de marché. L'industrie du jeu vidéo vue de l'intérieur.",
        empty: 'Aucun article industrie pour le moment.',
      },
      cinema: {
        title: 'Cinéma',
        description:
          "Critiques, analyses et coups de coeur cinéma. Le regard d'une rédaction de joueurs sur le 7e art.",
        empty: 'Aucun article cinéma pour le moment.',
      },
    },
    article: {
      score_label: 'Note',
      score_site: 'Note InsertCoins.press',
      verdict: 'Verdict',
      verdict_labels: {
        must_have: 'Indispensable',
        recommended: 'Recommandé',
        mixed: 'Mitigé',
        disappointing: 'Décevant',
      },
      read_time: 'de lecture',
      back_to: 'Retour aux',
      related_title: 'Lire aussi',
    },
    categories: {
      tests: 'Test',
      previews: 'Preview',
      dossiers: 'Dossier',
      industrie: 'Industrie',
      cinema: 'Cinéma',
    },
    search: {
      placeholder: 'Rechercher un article...',
      recent: 'Articles récents',
      no_results: 'Aucun résultat pour',
      navigate: 'naviguer',
      open: 'ouvrir',
      results_one: 'résultat',
      results_many: 'résultats',
    },
    comments: {
      title: 'Commentaires',
    },
    footer: {
      tagline:
        "Le média indépendant du jeu vidéo. Tests, previews, dossiers de fond et actualité de l'industrie.",
      sections_title: 'Rubriques',
      about_title: 'Le média',
      about: 'À propos',
      team: 'Équipe',
      legal: 'Mentions légales',
      contact: 'Contact',
      rights: 'Tous droits réservés',
      made_with: 'Fait avec passion pour les joueurs',
    },
    legal: {
      title: 'Mentions légales',
    },
  },

  en: {
    nav: {
      search: 'Search',
      menu: 'Menu',
    },
    home: {
      featured: 'Featured',
      intro: "Reviews, previews, in-depth features and industry news. InsertCoins.press is an independent gaming media: no ad network, no editorial partnerships, no inflated scores. Just people who love video games and tell you about them straight.",
      cta_eyebrow: 'Independent gaming press',
      cta_title: 'Uncompromising reviews',
      cta_body:
        "InsertCoins.press stands for free, honest and passionate gaming journalism. No inflated scores, no embargo-driven previews.",
    },
    sections: {
      label: 'Section',
      tests: {
        title: 'Reviews',
        description:
          "In-depth, honest and uncompromising reviews. We play to the end and tell you everything.",
        empty: 'No reviews yet.',
      },
      previews: {
        title: 'Previews',
        description:
          "We got our hands on it before you. Discover our first impressions on upcoming games.",
        empty: 'No previews yet.',
      },
      dossiers: {
        title: 'Features',
        description:
          "When we dig deeper. Analysis, investigations and retrospectives on video games and their culture.",
        empty: 'No features yet.',
      },
      industrie: {
        title: 'Industry',
        description:
          "Acquisitions, layoffs, market trends. The video game industry from the inside.",
        empty: 'No industry articles yet.',
      },
      cinema: {
        title: 'Cinema',
        description:
          "Reviews, analysis and recommendations. A gaming team's take on cinema.",
        empty: 'No cinema articles yet.',
      },
    },
    article: {
      score_label: 'Score',
      score_site: 'InsertCoins.press Score',
      verdict: 'Verdict',
      verdict_labels: {
        must_have: 'Must-have',
        recommended: 'Recommended',
        mixed: 'Mixed',
        disappointing: 'Disappointing',
      },
      read_time: 'read',
      back_to: 'Back to',
      related_title: 'You might also like',
    },
    categories: {
      tests: 'Review',
      previews: 'Preview',
      dossiers: 'Feature',
      industrie: 'Industry',
      cinema: 'Cinema',
    },
    search: {
      placeholder: 'Search an article...',
      recent: 'Recent articles',
      no_results: 'No results for',
      navigate: 'navigate',
      open: 'open',
      results_one: 'result',
      results_many: 'results',
    },
    comments: {
      title: 'Comments',
    },
    footer: {
      tagline:
        "The independent gaming media. Reviews, previews, in-depth features and industry news.",
      sections_title: 'Sections',
      about_title: 'About',
      about: 'About us',
      team: 'Team',
      legal: 'Legal notice',
      contact: 'Contact',
      rights: 'All rights reserved',
      made_with: 'Made with passion for gamers',
    },
    legal: {
      title: 'Legal notice',
    },
  },
} as const

export type Translations = typeof translations.fr
export type TranslationKey = keyof Translations

export function getT(locale: Locale): Translations {
  return translations[locale] as unknown as Translations
}

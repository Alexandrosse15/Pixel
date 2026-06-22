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
          "Tests jeux vidéo PC, PS5 et Xbox en 2025-2026 : critiques complètes et honnêtes, sans scores gonflés. On joue jusqu'au bout, on vous dit tout.",
        empty: 'Aucun test pour le moment.',
      },
      previews: {
        title: 'Previews',
        description:
          "Previews et premières impressions sur les jeux à venir en 2025-2026. On a mis les mains dessus avant vous : découvrez ce qui nous a convaincus, et ce qui ne l'a pas fait.",
        empty: 'Aucune preview pour le moment.',
      },
      dossiers: {
        title: 'Dossiers',
        description:
          "Dossiers jeux vidéo : analyses de fond, rétrospectives et enquêtes sur l'industrie du gaming et sa culture. Quand on creuse plus loin que le test.",
        empty: 'Aucun dossier pour le moment.',
      },
      industrie: {
        title: 'Industrie',
        description:
          "Actualité de l'industrie du jeu vidéo : licenciements, acquisitions, Game Pass, tendances de marché. Un regard indépendant sur les coulisses du gaming.",
        empty: 'Aucun article industrie pour le moment.',
      },
      cinema: {
        title: 'Séries & Cinéma',
        description:
          "Critiques de séries et de films par une rédaction de joueurs : adaptations de jeux vidéo, pop culture gaming, analyses. Le 7e art et les séries vus depuis un fauteuil de gamer.",
        empty: 'Aucun article pour le moment.',
      },
      gratuit: {
        title: 'Gratuit',
        description: 'Les jeux gratuits de la semaine sur Epic Games Store et GOG.',
        empty: 'Aucun jeu gratuit en ce moment.',
      },
      creation: {
        title: "Les créations de l'équipe",
        description:
          "Les jeux maison faits par l'équipe. Des petits jeux à jouer directement dans le navigateur, gratuits et sans installation.",
        empty: 'Aucun jeu pour le moment.',
      },
    },
    gratuit: {
      epic_section: 'Epic Games Store',
      gog_section: 'GOG',
      claim: 'Récupérer gratuitement',
      upcoming: 'Bientôt gratuit',
      current: 'Gratuit maintenant',
      until: "Jusqu'au",
      from: 'À partir du',
      error_epic: 'Impossible de charger les offres Epic.',
      error_gog: 'Impossible de charger les offres GOG.',
      no_games: 'Aucun jeu gratuit en ce moment.',
      free_badge: 'GRATUIT',
      upcoming_badge: 'BIENTÔT',
      permanently_free: 'Gratuit en permanence',
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
      cinema: 'Séries & Cinéma',
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
          "PC, PS5 and Xbox game reviews in 2025-2026: complete and honest critiques, no inflated scores. We play to the end and tell you everything.",
        empty: 'No reviews yet.',
      },
      previews: {
        title: 'Previews',
        description:
          "Previews and first impressions on upcoming games in 2025-2026. We got our hands on it before you: find out what convinced us, and what didn't.",
        empty: 'No previews yet.',
      },
      dossiers: {
        title: 'Features',
        description:
          "Video game features: in-depth analysis, retrospectives and investigations on the gaming industry and its culture. When we dig deeper than the review.",
        empty: 'No features yet.',
      },
      industrie: {
        title: 'Industry',
        description:
          "Video game industry news: layoffs, acquisitions, Game Pass, market trends. An independent look behind the scenes of gaming.",
        empty: 'No industry articles yet.',
      },
      cinema: {
        title: 'Series & Cinema',
        description:
          "Series and film reviews by a team of gamers: video game adaptations, gaming pop culture, analysis. The 7th art and streaming series seen from a gamer's perspective.",
        empty: 'No articles yet.',
      },
      gratuit: {
        title: 'Free Games',
        description: 'This week\'s free games on Epic Games Store and GOG.',
        empty: 'No free games right now.',
      },
      creation: {
        title: "The Team's Creations",
        description:
          'The homemade games built by the team. Small games you can play right in your browser, free and with no install.',
        empty: 'No game yet.',
      },
    },
    gratuit: {
      epic_section: 'Epic Games Store',
      gog_section: 'GOG',
      claim: 'Claim for free',
      upcoming: 'Coming soon',
      current: 'Free now',
      until: 'Until',
      from: 'From',
      error_epic: 'Could not load Epic offers.',
      error_gog: 'Could not load GOG offers.',
      no_games: 'No free games right now.',
      free_badge: 'FREE',
      upcoming_badge: 'SOON',
      permanently_free: 'Permanently free',
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
      cinema: 'Series & Cinema',
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

import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

const SPECIFIC: GameEvent[] = [
  {
    id: 'vendeur_conseil',
    sprite: 'vendeur',
    decor: 'magasin_jouets',
    prop: 'robot',
    title: 'Le vendeur trop zélé',
    text: 'Un vendeur surexcité veut absolument te vendre le méga-coffret à piles, lumières et sons inclus.',
    choices: [
      { label: 'Écouter son boniment', effect: { temps: -10, moral: -3 }, result: 'Démonstration complète, sons stridents compris. Tu ressors les oreilles qui sifflent.' },
      { label: 'Couper court poliment', effect: { temps: -3, moral: 2 }, result: '"Je regarde, merci." Tu t’éclipses avant le deuxième argument.' },
    ],
  },
  {
    id: 'rupture_jouet',
    sprite: 'vendeur',
    decor: 'rayon_jouets',
    prop: 'croix',
    title: 'Le jouet à la mode',
    text: 'Le rayon de la peluche que tout le monde s’arrache est vide. Un carton traîne, peut-être un dernier au fond.',
    choices: [
      { label: 'Demander en réserve', effect: { temps: -10, energie: -4, moral: 4 }, result: 'Le vendeur fouille et déniche un exemplaire planqué. Tu respires.' },
      { label: 'Changer de rayon', effect: { temps: -4, moral: -3 }, result: 'Tu abandonnes cette idée. Il faudra trouver autre chose.' },
    ],
  },
  {
    id: 'emballage',
    sprite: 'caissier',
    decor: 'magasin_jouets',
    prop: 'sac',
    title: "Le stand d'emballage",
    text: 'Une file s’étire devant le comptoir cadeau. Papier brillant, ruban frisé, et une seule employée débordée.',
    choices: [
      { label: 'Faire emballer', effect: { temps: -11, argent: -3, moral: 5 }, result: 'Paquet impeccable avec un noeud parfait. Mais quelle attente.' },
      { label: 'Emballer toi-même en route', effect: { temps: -3, energie: -4, moral: -4 }, result: 'Papier froissé, scotch de travers. Ça passera dans la précipitation.' },
    ],
  },
  {
    id: 'gamin_caprice',
    sprite: 'enfant',
    decor: 'allee',
    prop: 'ballon',
    title: 'Le caprice du rayon',
    text: 'Un enfant en pleine crise se roule par terre au milieu de l’allée, jouets éparpillés tout autour.',
    choices: [
      { label: 'Enjamber prudemment', effect: { temps: -3, energie: -3 }, result: 'Tu franchis le champ de mines en évitant les Lego au sol.' },
      { label: 'Aider le parent dépassé', effect: { temps: -9, moral: 8 }, result: 'Tu ramasses, tu calmes le jeu. Karma positif, temps négatif.' },
    ],
  },
]

const GOAL: GameEvent = {
  id: 'le_jouet',
  sprite: 'vendeur',
  decor: 'rayon_jouets',
  prop: 'jouet',
  title: 'Le bon cadeau',
  text: 'Le voilà, le robot que le copain de ton fils réclame depuis des semaines. Dernier exemplaire, sous vitrine. La fête commence dans quelques minutes.',
  choices: [
    { label: 'Acheter le robot', effect: { temps: -7, argent: -18, give: ['jouet'] }, result: 'Tu rafles le dernier. Mission quasi bouclée.' },
    { label: 'Le modèle collector', effect: { temps: -9, argent: -26, moral: 3, give: ['jouet'] }, result: 'La version de luxe. Le gamin sera le roi de la fête.' },
    { label: 'Un jouet au rabais', effect: { temps: -4, argent: -7, moral: -5, give: ['jouet'] }, result: 'Tu prends un truc de seconde zone. Ça fera l’affaire, sans gloire.' },
  ],
}

export const CHAPTER_3: Chapter = {
  id: 3,
  kicker: 'Chapitre 3',
  title: "Le cadeau d'anniversaire",
  intro:
    "15h30. L'anniversaire du meilleur copain de ton fils est à 16h, et tu n'as toujours pas le cadeau. Le jouet précis qu'il réclame, le robot dernier cri, t'attend quelque part dans la galerie marchande bondée. Trente minutes, montre en main.",
  goal: "rapporter le cadeau à temps",
  items: [{ id: 'jouet', label: 'Le cadeau', prop: 'jouet' }],
  events: [...STREET, ...STORE, ...SPECIFIC, DISTRIBUTEUR, GOAL],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 2, desc: '+12 temps, -10 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 87, energie: 74, argent: 44, moral: 66 },
  drain: { temps: -3, energie: -2 },
  steps: 16,
  theme: {
    accent: '#9B59B6',
    winGradient: 'linear-gradient(135deg,#6C3A8E,#221433)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'enfant',
    introDecor: 'magasin_jouets',
    introSprite: 'vendeur',
  },
}

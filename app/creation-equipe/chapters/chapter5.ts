import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

const MAISON: GameEvent[] = [
  {
    id: 'sieste_fragile',
    sprite: 'femme',
    decor: 'cuisine',
    prop: 'doudou',
    title: 'La sieste fragile',
    text: 'Les enfants viennent de s’endormir. Ta femme te fixe : "Tu sors sans claquer la porte. Sans. Claquer.”',
    choices: [
      { label: 'Sortir sur la pointe des pieds', effect: { temps: -4, moral: 3 }, result: 'Mission infiltration réussie. Pas un grincement. Tu es dehors.' },
      { label: 'Chercher tes affaires en vitesse', effect: { temps: -7, energie: -3 }, result: 'Tu fouilles partout, un vase manque de tomber. Sueurs froides.' },
    ],
  },
  {
    id: 'belle_famille_appel',
    sprite: 'mamie',
    decor: 'cuisine',
    prop: 'liste',
    title: "L'appel de la belle-famille",
    text: 'Ta belle-soeur t’appelle pour "coordonner le cadeau commun" alors que tu as déjà un pied dehors.',
    choices: [
      { label: 'Trancher vite', effect: { temps: -6, moral: -2 }, result: '"On verra sur place." Tu raccroches avant la liste de suggestions.' },
      { label: 'Tout écouter', effect: { temps: -12, moral: -4 }, result: 'Débat interminable sur le budget. Tu pars enfin, la tête lourde.' },
    ],
  },
  {
    id: 'cle_perdue',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: 'Les clés de voiture',
    text: 'Plus de clés de voiture. Elles sont quelque part entre le canapé, la cuisine et la poche d’hier.',
    choices: [
      { label: 'Fouille méthodique', effect: { temps: -9 }, result: 'Retrouvées sous un coussin. Énervant, mais réglé.' },
      { label: 'Partir à pied, tant pis', effect: { temps: -3, energie: -6 }, result: 'Tu renonces à la voiture et files à pied. Les jambes vont chauffer.' },
    ],
  },
]

const CADEAUX: GameEvent[] = [
  {
    id: 'rayon_parfum',
    sprite: 'vendeur',
    decor: 'boutique',
    prop: 'eau',
    title: 'Le rayon parfum',
    text: 'Une vendeuse t’asperge d’un testeur : "Une idée de son parfum ?" Tu n’en as aucune.',
    choices: [
      { label: 'Te fier à son conseil', effect: { temps: -8, moral: 3 }, result: 'Tu suis sa reco les yeux fermés. Au moins ça sent bon.' },
      { label: 'Fuir le nuage olfactif', effect: { temps: -3, energie: -2, moral: -2 }, result: 'Tu t’éloignes en toussotant, parfumé malgré toi.' },
    ],
  },
  {
    id: 'foulard',
    sprite: 'caissiere',
    decor: 'boutique',
    prop: 'sac',
    title: 'Le rayon foulards',
    text: 'Un mur de foulards en soie, cent motifs, et toi incapable de te souvenir de ses couleurs préférées.',
    choices: [
      { label: 'Choisir au feeling', effect: { temps: -6, moral: 2 }, result: 'Un joli motif neutre. Valeur sûre, choix assumé.' },
      { label: 'Appeler pour demander', effect: { temps: -10, moral: -3 }, result: 'Tu téléphones discrètement à ta soeur. Indices flous, temps perdu.' },
    ],
  },
  {
    id: 'conseil_vendeuse',
    sprite: 'caissiere',
    decor: 'boutique',
    prop: 'coeur',
    title: 'La vendeuse inspirée',
    text: 'Une vendeuse passionnée veut absolument te raconter l’histoire de chaque article du rayon.',
    choices: [
      { label: 'Écouter, ça aide', effect: { temps: -9, moral: 4 }, result: 'Elle t’oriente finalement vers une vraie bonne idée.' },
      { label: 'Couper court', effect: { temps: -3, moral: -2 }, result: '"Merci, je vais réfléchir." Tu files vers un autre rayon.' },
    ],
  },
  {
    id: 'emballage_cadeau',
    sprite: 'caissier',
    decor: 'boutique',
    prop: 'sac',
    title: "L'emballage cadeau",
    text: 'Stand emballage : papier kraft chic ou papier brillant à paillettes, et une file qui s’allonge.',
    choices: [
      { label: 'Emballage soigné', effect: { temps: -10, argent: -2, moral: 5 }, result: 'Paquet élégant, ruban parfait. Effet garanti à l’ouverture.' },
      { label: 'Le sac cadeau express', effect: { temps: -3, argent: -2 }, result: 'Un sac cadeau tout prêt. Pratique, un peu fainéant.' },
    ],
  },
]

const CADEAU: GameEvent = {
  id: 'le_cadeau_mere',
  sprite: 'vendeur',
  decor: 'boutique',
  prop: 'cadeau',
  title: 'Le cadeau idéal',
  text: 'Tu le tiens enfin : le coffret qui lui ferait vraiment plaisir. Reste à choisir la formule, et l’addition qui va avec.',
  choices: [
    { label: 'Le coffret classique', effect: { temps: -6, argent: -18, give: ['cadeau'] }, result: 'Une valeur sûre, joliment présentée. Elle sera touchée.' },
    { label: 'Le grand jeu', effect: { temps: -8, argent: -28, moral: 4, give: ['cadeau'] }, result: 'Le coffret prestige. Ta mère va verser une petite larme.' },
    { label: 'La version éco', effect: { temps: -4, argent: -9, moral: -5, give: ['cadeau'] }, result: 'Un petit cadeau modeste. C’est l’intention qui compte, hein.' },
  ],
}

export const CHAPTER_5: Chapter = {
  id: 5,
  kicker: 'Chapitre 5',
  title: "L'anniversaire de ta mère",
  intro:
    "C'est l'anniversaire de ta mère et tu n'as toujours pas de cadeau. Les enfants font la sieste, et dès leur réveil vous filez tous chez elle. Tu as ce créneau, et lui seul, pour sortir sans bruit, foncer en boutique, trouver LE cadeau et rentrer avant que la maison ne se réveille.",
  goal: 'rapporter le cadeau à temps',
  items: [{ id: 'cadeau', label: 'Le cadeau', prop: 'cadeau' }],
  zones: [
    { label: 'À la maison', steps: 4, fillers: [...MAISON, DISTRIBUTEUR] },
    { label: 'En route', steps: 4, fillers: STREET },
    { label: 'Au centre commercial', steps: 4, fillers: STORE },
    { label: 'Trouver le cadeau', steps: 4, fillers: CADEAUX, goals: [CADEAU] },
    { label: 'Avant le réveil', steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 3, desc: '+12 temps, -10 énergie' },
    { key: 'sandwich', label: 'Sandwich', effect: { energie: 15, temps: -5 }, charges: 3, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 87, energie: 77, argent: 50, moral: 68 },
  drain: { temps: -2, energie: -2 },
  theme: {
    accent: '#F2C94C',
    winGradient: 'linear-gradient(135deg,#B08A20,#2c2410)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'mamie',
    introDecor: 'cuisine',
    introSprite: 'femme',
  },
}

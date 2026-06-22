import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

const MAISON: GameEvent[] = [
  {
    id: 'sieste_fragile',
    sprite: 'femme',
    decor: 'cuisine',
    prop: 'doudou',
    title: { fr: 'La sieste fragile', en: 'The fragile nap' },
    text: {
      fr: 'Les enfants viennent de s’endormir. Ta femme te fixe : "Tu sors sans claquer la porte. Sans. Claquer.”',
      en: 'The kids just fell asleep. Your wife stares you down: "You leave without slamming the door. Without. Slamming."',
    },
    choices: [
      { label: { fr: 'Sortir sur la pointe des pieds', en: 'Tiptoe out' }, effect: { temps: -4, moral: 3 }, result: { fr: 'Mission infiltration réussie. Pas un grincement. Tu es dehors.', en: 'Stealth mission successful. Not a creak. You are outside.' } },
      { label: { fr: 'Chercher tes affaires en vitesse', en: 'Grab your things fast' }, effect: { temps: -7, energie: -3 }, result: { fr: 'Tu fouilles partout, un vase manque de tomber. Sueurs froides.', en: 'You rummage everywhere, a vase nearly falls. Cold sweats.' } },
    ],
  },
  {
    id: 'belle_famille_appel',
    sprite: 'mamie',
    decor: 'cuisine',
    prop: 'liste',
    title: { fr: "L'appel de la belle-famille", en: "The in-laws' call" },
    text: {
      fr: 'Ta belle-soeur t’appelle pour "coordonner le cadeau commun" alors que tu as déjà un pied dehors.',
      en: 'Your sister-in-law calls to "coordinate the joint gift" just as you have one foot out the door.',
    },
    choices: [
      { label: { fr: 'Trancher vite', en: 'Decide fast' }, effect: { temps: -6, moral: -2 }, result: { fr: '"On verra sur place." Tu raccroches avant la liste de suggestions.', en: '"We will figure it out there." You hang up before the suggestion list.' } },
      { label: { fr: 'Tout écouter', en: 'Hear it all out' }, effect: { temps: -12, moral: -4 }, result: { fr: 'Débat interminable sur le budget. Tu pars enfin, la tête lourde.', en: 'An endless debate about the budget. You finally leave, head heavy.' } },
    ],
  },
  {
    id: 'cle_perdue',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: { fr: 'Les clés de voiture', en: 'The car keys' },
    text: {
      fr: 'Plus de clés de voiture. Elles sont quelque part entre le canapé, la cuisine et la poche d’hier.',
      en: "No more car keys. They are somewhere between the couch, the kitchen and yesterday's pocket.",
    },
    choices: [
      { label: { fr: 'Fouille méthodique', en: 'Methodical search' }, effect: { temps: -9 }, result: { fr: 'Retrouvées sous un coussin. Énervant, mais réglé.', en: 'Found under a cushion. Annoying, but sorted.' } },
      { label: { fr: 'Partir à pied, tant pis', en: 'Go on foot, never mind' }, effect: { temps: -3, energie: -6 }, result: { fr: 'Tu renonces à la voiture et files à pied. Les jambes vont chauffer.', en: 'You give up on the car and head off on foot. Your legs are about to burn.' } },
    ],
  },
]

const CADEAUX: GameEvent[] = [
  {
    id: 'rayon_parfum',
    sprite: 'vendeur',
    decor: 'boutique',
    prop: 'eau',
    title: { fr: 'Le rayon parfum', en: 'The perfume counter' },
    text: {
      fr: 'Une vendeuse t’asperge d’un testeur : "Une idée de son parfum ?" Tu n’en as aucune.',
      en: 'A clerk spritzes you with a tester: "Any idea of her scent?" You have none.',
    },
    choices: [
      { label: { fr: 'Te fier à son conseil', en: 'Trust her advice' }, effect: { temps: -8, moral: 3 }, result: { fr: 'Tu suis sa reco les yeux fermés. Au moins ça sent bon.', en: 'You follow her pick blindly. At least it smells nice.' } },
      { label: { fr: 'Fuir le nuage olfactif', en: 'Flee the scent cloud' }, effect: { temps: -3, energie: -2, moral: -2 }, result: { fr: 'Tu t’éloignes en toussotant, parfumé malgré toi.', en: 'You back away coughing, perfumed against your will.' } },
    ],
  },
  {
    id: 'foulard',
    sprite: 'caissiere',
    decor: 'boutique',
    prop: 'sac',
    title: { fr: 'Le rayon foulards', en: 'The scarf section' },
    text: {
      fr: 'Un mur de foulards en soie, cent motifs, et toi incapable de te souvenir de ses couleurs préférées.',
      en: 'A wall of silk scarves, a hundred patterns, and you unable to recall her favorite colors.',
    },
    choices: [
      { label: { fr: 'Choisir au feeling', en: 'Pick on a hunch' }, effect: { temps: -6, moral: 2 }, result: { fr: 'Un joli motif neutre. Valeur sûre, choix assumé.', en: 'A nice neutral pattern. Safe bet, owned choice.' } },
      { label: { fr: 'Appeler pour demander', en: 'Call to ask' }, effect: { temps: -10, moral: -3 }, result: { fr: 'Tu téléphones discrètement à ta soeur. Indices flous, temps perdu.', en: 'You quietly phone your sister. Vague hints, time lost.' } },
    ],
  },
  {
    id: 'conseil_vendeuse',
    sprite: 'caissiere',
    decor: 'boutique',
    prop: 'coeur',
    title: { fr: 'La vendeuse inspirée', en: 'The inspired clerk' },
    text: {
      fr: 'Une vendeuse passionnée veut absolument te raconter l’histoire de chaque article du rayon.',
      en: 'A passionate clerk absolutely must tell you the story behind every item on the shelf.',
    },
    choices: [
      { label: { fr: 'Écouter, ça aide', en: 'Listen, it helps' }, effect: { temps: -9, moral: 4 }, result: { fr: 'Elle t’oriente finalement vers une vraie bonne idée.', en: 'She eventually steers you to a genuinely good idea.' } },
      { label: { fr: 'Couper court', en: 'Cut it short' }, effect: { temps: -3, moral: -2 }, result: { fr: '"Merci, je vais réfléchir." Tu files vers un autre rayon.', en: '"Thanks, I will think about it." You drift to another section.' } },
    ],
  },
  {
    id: 'emballage_cadeau',
    sprite: 'caissier',
    decor: 'boutique',
    prop: 'sac',
    title: { fr: "L'emballage cadeau", en: 'The gift wrapping' },
    text: {
      fr: 'Stand emballage : papier kraft chic ou papier brillant à paillettes, et une file qui s’allonge.',
      en: 'Wrapping stand: chic kraft paper or glittery shiny paper, and a line that keeps growing.',
    },
    choices: [
      { label: { fr: 'Emballage soigné', en: 'Careful wrapping' }, effect: { temps: -10, argent: -2, moral: 5 }, result: { fr: 'Paquet élégant, ruban parfait. Effet garanti à l’ouverture.', en: 'Elegant package, perfect ribbon. Guaranteed effect on opening.' } },
      { label: { fr: 'Le sac cadeau express', en: 'The express gift bag' }, effect: { temps: -3, argent: -2 }, result: { fr: 'Un sac cadeau tout prêt. Pratique, un peu fainéant.', en: 'A ready-made gift bag. Handy, a little lazy.' } },
    ],
  },
]

const CADEAU: GameEvent = {
  id: 'le_cadeau_mere',
  sprite: 'vendeur',
  decor: 'boutique',
  prop: 'cadeau',
  title: { fr: 'Le cadeau idéal', en: 'The perfect gift' },
  text: {
    fr: 'Tu le tiens enfin : le coffret qui lui ferait vraiment plaisir. Reste à choisir la formule, et l’addition qui va avec.',
    en: 'You finally have it: the set she would truly love. Just pick the option, and the bill that comes with it.',
  },
  choices: [
    { label: { fr: 'Le coffret classique', en: 'The classic set' }, effect: { temps: -6, argent: -18, give: ['cadeau'] }, result: { fr: 'Une valeur sûre, joliment présentée. Elle sera touchée.', en: 'A safe bet, beautifully presented. She will be touched.' } },
    { label: { fr: 'Le grand jeu', en: 'Go all out' }, effect: { temps: -8, argent: -28, moral: 4, give: ['cadeau'] }, result: { fr: 'Le coffret prestige. Ta mère va verser une petite larme.', en: 'The prestige set. Your mom will shed a little tear.' } },
    { label: { fr: 'La version éco', en: 'The budget version' }, effect: { temps: -4, argent: -9, moral: -5, give: ['cadeau'] }, result: { fr: 'Un petit cadeau modeste. C’est l’intention qui compte, hein.', en: 'A small, modest gift. It is the thought that counts, right.' } },
  ],
}

export const CHAPTER_5: Chapter = {
  id: 5,
  kicker: { fr: 'Chapitre 5', en: 'Chapter 5' },
  title: { fr: "L'anniversaire de ta mère", en: "Your mom's birthday" },
  intro: {
    fr: "C'est l'anniversaire de ta mère et tu n'as toujours pas de cadeau. Les enfants font la sieste, et dès leur réveil vous filez tous chez elle. Tu as ce créneau, et lui seul, pour sortir sans bruit, foncer en boutique, trouver LE cadeau et rentrer avant que la maison ne se réveille.",
    en: "It is your mom's birthday and you still have no gift. The kids are napping, and the moment they wake up you all head to her place. You have this window, and only this one, to slip out quietly, dash to the shops, find THE gift and get back before the house wakes up.",
  },
  goal: { fr: 'rapporter le cadeau à temps', en: 'bring back the gift in time' },
  items: [{ id: 'cadeau', label: { fr: 'Le cadeau', en: 'The gift' }, prop: 'cadeau' }],
  zones: [
    { label: { fr: 'À la maison', en: 'At home' }, steps: 4, fillers: [...MAISON, DISTRIBUTEUR] },
    { label: { fr: 'En route', en: 'On the way' }, steps: 4, fillers: STREET },
    { label: { fr: 'Au centre commercial', en: 'At the mall' }, steps: 4, fillers: STORE },
    { label: { fr: 'Trouver le cadeau', en: 'Find the gift' }, steps: 4, fillers: CADEAUX, goals: [CADEAU] },
    { label: { fr: 'Avant le réveil', en: 'Before they wake' }, steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'skateboard', label: { fr: 'Skateboard', en: 'Skateboard' }, effect: { temps: 12, energie: -10 }, charges: 3, desc: { fr: '+12 temps, -10 énergie', en: '+12 time, -10 energy' } },
    { key: 'sandwich', label: { fr: 'Sandwich', en: 'Sandwich' }, effect: { energie: 15, temps: -5 }, charges: 3, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 89, energie: 79, argent: 50, moral: 68 },
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

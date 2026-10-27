import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : la première piste, qui capote.
const RATEE: GameEvent[] = [
  {
    id: 'patisserie_fermee',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'croix',
    title: { fr: 'Rideau baissé', en: 'Shutters down' },
    text: {
      fr: 'La pâtisserie où tu avais "presque" commandé est fermée. Un mot scotché : "De retour à 15h".',
      en: 'The bakery where you had "almost" ordered is closed. A taped note: "Back at 3pm".',
    },
    choices: [
      { label: { fr: "Attendre l'ouverture", en: 'Wait for it to open' }, effect: { temps: -14, moral: -3 }, result: { fr: 'Tu poireautes devant la vitrine vide. Pari coûteux sur un horaire flou.', en: 'You loiter at the empty window. A costly bet on a vague schedule.' } },
      { label: { fr: 'Filer voir ailleurs', en: 'Go try elsewhere' }, effect: { temps: -4, energie: -4 }, result: { fr: 'Pas le temps. Tu pars chercher une autre adresse.', en: 'No time. You head off to another address.' } },
    ],
  },
  {
    id: 'commande_perdue',
    sprite: 'mamie',
    decor: 'patisserie',
    prop: 'ticket',
    title: { fr: 'La commande introuvable', en: 'The missing order' },
    text: {
      fr: '"Au nom de... ? Je n’ai rien à ce nom." La vendeuse fouille un cahier gondolé sans conviction.',
      en: '"Under the name...? I have nothing under that name." The clerk leafs through a warped notebook half-heartedly.',
    },
    choices: [
      { label: { fr: 'Insister, montrer le SMS', en: 'Insist, show the text' }, effect: { temps: -9, moral: -2 }, result: { fr: 'Le SMS fait foi. Elle finit par retrouver une trace. Ouf, à moitié.', en: 'The text settles it. She eventually finds a trace. Half a relief.' } },
      { label: { fr: 'Laisser tomber cette piste', en: 'Drop this lead' }, effect: { temps: -3, moral: -3 }, result: { fr: 'Tu renonces à cette commande fantôme et changes de plan.', en: 'You give up on this ghost order and switch plans.' } },
    ],
  },
  {
    id: 'rupture_genoise',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'croix',
    title: { fr: 'Plus une part', en: 'Not a slice left' },
    text: {
      fr: 'Tout est parti. Il ne reste qu’un éclair solitaire et trois macarons tristes en vitrine.',
      en: 'It is all gone. Only a lonely eclair and three sad macarons remain in the window.',
    },
    choices: [
      { label: { fr: 'Demander en réserve', en: 'Ask the back room' }, effect: { temps: -8, moral: 2 }, result: { fr: 'Le boulanger déniche un fond de stock au congélateur. Espoir relancé.', en: 'The baker digs up some backstock from the freezer. Hope revived.' } },
      { label: { fr: 'Changer de quartier', en: 'Switch neighborhoods' }, effect: { temps: -6, energie: -5 }, result: { fr: 'Tu pars tenter ta chance plus loin. Le temps fond.', en: 'You go try your luck further out. Time is melting away.' } },
    ],
  },
  {
    id: 'file_boulangerie',
    sprite: 'mamie',
    decor: 'patisserie',
    prop: 'ticket',
    title: { fr: 'La file du dimanche', en: 'The Sunday line' },
    text: {
      fr: 'Vingt personnes, une seule vendeuse, et un client qui commande "une baguette, mais pas trop cuite, enfin si".',
      en: 'Twenty people, one clerk, and a customer ordering "a baguette, but not too baked, well, actually yes".',
    },
    choices: [
      { label: { fr: 'Faire la queue', en: 'Wait in line' }, effect: { temps: -13, moral: 2 }, result: { fr: 'Tu avances d’un pas toutes les trois minutes. Supplice lent.', en: 'You move one step every three minutes. Slow torture.' } },
      { label: { fr: 'Repérer une autre boutique', en: 'Scout another shop' }, effect: { temps: -5, energie: -3 }, result: { fr: 'Tu sors discrètement chercher plus rapide ailleurs.', en: 'You quietly slip out to find something faster elsewhere.' } },
    ],
  },
]

// Zone : la bonne pâtisserie + objectif.
const PATIS: GameEvent[] = [
  {
    id: 'choix_gateau',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'gateau',
    title: { fr: 'Le grand choix', en: 'The big choice' },
    text: {
      fr: 'Enfin une vraie pâtisserie achalandée. Fraisier, fondant, pièce montée : trop de bonnes options.',
      en: 'Finally a real, well-stocked bakery. Strawberry cake, fondant, tiered cake: too many good options.',
    },
    choices: [
      { label: { fr: 'Trancher vite', en: 'Decide fast' }, effect: { temps: -4, moral: 2 }, result: { fr: 'Tu pointes le fraisier sans trembler. Décision assumée.', en: 'You point at the strawberry cake without flinching. Owned decision.' } },
      { label: { fr: 'Tergiverser longuement', en: 'Dither at length' }, effect: { temps: -10, moral: -3 }, result: { fr: 'Tu changes d’avis quatre fois. La vendeuse s’impatiente.', en: 'You change your mind four times. The clerk grows impatient.' } },
    ],
  },
  {
    id: 'bougies',
    sprite: 'caissiere',
    decor: 'patisserie',
    prop: 'gateau',
    title: { fr: 'Les bougies oubliées', en: 'The forgotten candles' },
    text: {
      fr: '"Vous voulez des bougies ? Chiffres ou classiques ?" Détail crucial que tu avais zappé.',
      en: '"Want candles? Number-shaped or classic?" A crucial detail you had skipped.',
    },
    choices: [
      { label: { fr: 'Prendre le chiffre', en: 'Get the number candle' }, effect: { temps: -4, argent: -2, moral: 4 }, result: { fr: 'Une jolie bougie chiffrée. Le petit sera ravi.', en: 'A nice number candle. The kid will be thrilled.' } },
      { label: { fr: 'Tant pis, sans bougies', en: 'Skip the candles' }, effect: { temps: -1, moral: -2 }, result: { fr: 'Tu zappes. On trouvera bien des allumettes à la maison.', en: 'You skip it. We will find matches at home, surely.' } },
    ],
  },
  {
    id: 'inscription_gateau',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'journal',
    title: { fr: "L'inscription au chocolat", en: 'The chocolate message' },
    text: {
      fr: '"On vous écrit quoi dessus ?" Le glaçage attend, la poche à douille aussi.',
      en: '"What should we write on it?" The icing waits, so does the piping bag.',
    },
    choices: [
      { label: { fr: 'Un prénom simple', en: 'A simple name' }, effect: { temps: -5, moral: 3 }, result: { fr: 'Lettres nettes au chocolat. Effet garanti.', en: 'Crisp chocolate letters. Guaranteed effect.' } },
      { label: { fr: 'Un message trop long', en: 'An overlong message' }, effect: { temps: -9, moral: 2 }, result: { fr: 'La phrase déborde, le "s" final est tassé. Charmant quand même.', en: 'The sentence overflows, the last letter is squished. Charming anyway.' } },
    ],
  },
]

const GATEAU: GameEvent = {
  id: 'le_gateau',
  sprite: 'caissier',
  decor: 'patisserie',
  prop: 'gateau',
  title: { fr: 'Le gâteau parfait', en: 'The perfect cake' },
  text: {
    fr: 'Le voilà, sous sa cloche : le gâteau qui sauvera la fête. Reste à choisir la taille et à passer en caisse, vite.',
    en: 'There it is, under its dome: the cake that will save the party. Just pick the size and pay, quickly.',
  },
  choices: [
    { label: { fr: 'Le format familial', en: 'The family size' }, effect: { temps: -6, argent: -17, give: ['gateau'] }, result: { fr: 'De quoi régaler toute la marmaille. Boîte ficelée, mission lancée.', en: 'Enough to delight the whole gang of kids. Box tied, mission launched.' } },
    { label: { fr: 'La pièce montée de luxe', en: 'The deluxe tiered cake' }, effect: { temps: -9, argent: -26, moral: 4, give: ['gateau'] }, result: { fr: 'Spectaculaire. Les parents vont halluciner, ton compte aussi.', en: 'Spectacular. The parents will be stunned, so will your bank account.' } },
    { label: { fr: 'Le petit gâteau éco', en: 'The budget mini cake' }, effect: { temps: -4, argent: -8, moral: -5, give: ['gateau'] }, result: { fr: 'Un modèle minimaliste. Ça fera un gâteau, disons-le ainsi.', en: 'A minimalist model. It will count as a cake, let us put it that way.' } },
  ],
}

export const CHAPTER_8: Chapter = {
  id: 8,
  kicker: { fr: 'Chapitre 8', en: 'Chapter 8' },
  title: { fr: "Le gâteau d'anniversaire", en: 'The birthday cake' },
  intro: {
    fr: "Quinze enfants surexcités débarquent dans une heure pour l'anniversaire de ton fils, et le gâteau commandé n'existe nulle part : mauvaise boutique, commande perdue, peu importe. Il te faut LE gâteau, des bougies, une inscription, et tout ça avant le premier coup de sonnette.",
    en: "Fifteen hyped-up kids show up in an hour for your son's birthday, and the cake you ordered exists nowhere: wrong shop, lost order, whatever. You need THE cake, candles, a message, and all of it before the first doorbell.",
  },
  goal: { fr: 'rapporter le gâteau à temps', en: 'bring back the cake in time' },
  items: [{ id: 'gateau', label: { fr: 'Le gâteau', en: 'The cake' }, prop: 'gateau' }],
  zones: [
    { label: { fr: 'En ville', en: 'In town' }, steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'La piste qui capote', en: 'The lead that falls through' }, steps: 4, fillers: RATEE },
    { label: { fr: 'La bonne pâtisserie', en: 'The right bakery' }, steps: 4, fillers: PATIS, goals: [GATEAU] },
    { label: { fr: 'Rentrer à temps', en: 'Get home in time' }, steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'skateboard', label: { fr: 'Skateboard', en: 'Skateboard' }, effect: { temps: 12, energie: -10 }, charges: 2, desc: { fr: '+12 temps, -10 énergie', en: '+12 time, -10 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 84, energie: 74, argent: 44, moral: 64 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#E7748A',
    winGradient: 'linear-gradient(135deg,#A8466A,#2c1019)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'enfant',
    introDecor: 'patisserie',
    introSprite: 'caissier',
  },
}

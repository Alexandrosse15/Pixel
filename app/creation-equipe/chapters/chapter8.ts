import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : la première piste, qui capote.
const RATEE: GameEvent[] = [
  {
    id: 'patisserie_fermee',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'croix',
    title: 'Rideau baissé',
    text: 'La pâtisserie où tu avais "presque" commandé est fermée. Un mot scotché : "De retour à 15h".',
    choices: [
      { label: 'Attendre l’ouverture', effect: { temps: -14, moral: -3 }, result: 'Tu poireautes devant la vitrine vide. Pari coûteux sur un horaire flou.' },
      { label: 'Filer voir ailleurs', effect: { temps: -4, energie: -4 }, result: 'Pas le temps. Tu pars chercher une autre adresse.' },
    ],
  },
  {
    id: 'commande_perdue',
    sprite: 'mamie',
    decor: 'patisserie',
    prop: 'ticket',
    title: 'La commande introuvable',
    text: '"Au nom de... ? Je n’ai rien à ce nom." La vendeuse fouille un cahier gondolé sans conviction.',
    choices: [
      { label: 'Insister, montrer le SMS', effect: { temps: -9, moral: -2 }, result: 'Le SMS fait foi. Elle finit par retrouver une trace. Ouf, à moitié.' },
      { label: 'Laisser tomber cette piste', effect: { temps: -3, moral: -3 }, result: 'Tu renonces à cette commande fantôme et changes de plan.' },
    ],
  },
  {
    id: 'rupture_genoise',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'croix',
    title: 'Plus une part',
    text: 'Tout est parti. Il ne reste qu’un éclair solitaire et trois macarons tristes en vitrine.',
    choices: [
      { label: 'Demander en réserve', effect: { temps: -8, moral: 2 }, result: 'Le boulanger déniche un fond de stock au congélateur. Espoir relancé.' },
      { label: 'Changer de quartier', effect: { temps: -6, energie: -5 }, result: 'Tu pars tenter ta chance plus loin. Le temps fond.' },
    ],
  },
  {
    id: 'file_boulangerie',
    sprite: 'mamie',
    decor: 'patisserie',
    prop: 'ticket',
    title: 'La file du dimanche',
    text: 'Vingt personnes, une seule vendeuse, et un client qui commande "une baguette, mais pas trop cuite, enfin si".',
    choices: [
      { label: 'Faire la queue', effect: { temps: -13, moral: 2 }, result: 'Tu avances d’un pas toutes les trois minutes. Supplice lent.' },
      { label: 'Repérer une autre boutique', effect: { temps: -5, energie: -3 }, result: 'Tu sors discrètement chercher plus rapide ailleurs.' },
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
    title: 'Le grand choix',
    text: 'Enfin une vraie pâtisserie achalandée. Fraisier, fondant, pièce montée : trop de bonnes options.',
    choices: [
      { label: 'Trancher vite', effect: { temps: -4, moral: 2 }, result: 'Tu pointes le fraisier sans trembler. Décision assumée.' },
      { label: 'Tergiverser longuement', effect: { temps: -10, moral: -3 }, result: 'Tu changes d’avis quatre fois. La vendeuse s’impatiente.' },
    ],
  },
  {
    id: 'bougies',
    sprite: 'caissiere',
    decor: 'patisserie',
    prop: 'gateau',
    title: 'Les bougies oubliées',
    text: '"Vous voulez des bougies ? Chiffres ou classiques ?" Détail crucial que tu avais zappé.',
    choices: [
      { label: 'Prendre le chiffre', effect: { temps: -4, argent: -2, moral: 4 }, result: 'Une jolie bougie chiffrée. Le petit sera ravi.' },
      { label: 'Tant pis, sans bougies', effect: { temps: -1, moral: -2 }, result: 'Tu zappes. On trouvera bien des allumettes à la maison.' },
    ],
  },
  {
    id: 'inscription_gateau',
    sprite: 'caissier',
    decor: 'patisserie',
    prop: 'journal',
    title: "L'inscription au chocolat",
    text: '"On vous écrit quoi dessus ?" Le glaçage attend, la poche à douille aussi.',
    choices: [
      { label: 'Un prénom simple', effect: { temps: -5, moral: 3 }, result: 'Lettres nettes au chocolat. Effet garanti.' },
      { label: 'Un message trop long', effect: { temps: -9, moral: 2 }, result: 'La phrase déborde, le "s" final est tassé. Charmant quand même.' },
    ],
  },
]

const GATEAU: GameEvent = {
  id: 'le_gateau',
  sprite: 'caissier',
  decor: 'patisserie',
  prop: 'gateau',
  title: 'Le gâteau parfait',
  text: 'Le voilà, sous sa cloche : le gâteau qui sauvera la fête. Reste à choisir la taille et à passer en caisse, vite.',
  choices: [
    { label: 'Le format familial', effect: { temps: -6, argent: -17, give: ['gateau'] }, result: 'De quoi régaler toute la marmaille. Boîte ficelée, mission lancée.' },
    { label: 'La pièce montée de luxe', effect: { temps: -9, argent: -26, moral: 4, give: ['gateau'] }, result: 'Spectaculaire. Les parents vont halluciner, ton compte aussi.' },
    { label: 'Le petit gâteau éco', effect: { temps: -4, argent: -8, moral: -5, give: ['gateau'] }, result: 'Un modèle minimaliste. Ça fera un gâteau, disons-le ainsi.' },
  ],
}

export const CHAPTER_8: Chapter = {
  id: 8,
  kicker: 'Chapitre 8',
  title: "Le gâteau d'anniversaire",
  intro:
    "Quinze enfants surexcités débarquent dans une heure pour l'anniversaire de ton fils, et le gâteau commandé n'existe nulle part : mauvaise boutique, commande perdue, peu importe. Il te faut LE gâteau, des bougies, une inscription, et tout ça avant le premier coup de sonnette.",
  goal: 'rapporter le gâteau à temps',
  items: [{ id: 'gateau', label: 'Le gâteau', prop: 'gateau' }],
  zones: [
    { label: 'En ville', steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: 'La piste qui capote', steps: 4, fillers: RATEE },
    { label: 'La bonne pâtisserie', steps: 4, fillers: PATIS, goals: [GATEAU] },
    { label: 'Rentrer à temps', steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 2, desc: '+12 temps, -10 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 82, energie: 73, argent: 44, moral: 64 },
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

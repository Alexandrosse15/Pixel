import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone photomaton : la photo d'identité conforme, ce calvaire.
const PHOTO: GameEvent[] = [
  {
    id: 'photomaton_pose',
    sprite: 'papa',
    decor: 'photomaton',
    prop: 'photo',
    title: 'La photo conforme',
    text: '"Ni sourire, ni frange, ni reflet." La machine recale ta troisième tentative avec un bip méprisant.',
    choices: [
      { label: 'Reprendre, très sérieux', effect: { temps: -8, argent: -5, moral: -3 }, result: 'Visage de marbre, oreilles dégagées. Validée à la quatrième.' },
      { label: 'Garder une photo limite', effect: { temps: -3, argent: -5, moral: -2 }, result: 'Tu gardes la moins pire. Croisons les doigts pour le guichet.' },
    ],
  },
  {
    id: 'photomaton_panne',
    sprite: 'vigile',
    decor: 'photomaton',
    prop: 'feu',
    title: 'La cabine récalcitrante',
    text: 'Le rideau coince, l’écran clignote "ERREUR 7". Un autre client tape sur la vitre, impatient.',
    choices: [
      { label: 'Relancer la machine', effect: { temps: -9, moral: -2 }, result: 'Tu coupes, rallumes. Elle redémarre en grommelant.' },
      { label: 'Chercher une autre cabine', effect: { temps: -6, energie: -5 }, result: 'Tu files vers la gare, où il y en a une autre. Peut-être.' },
    ],
  },
  {
    id: 'photomaton_coiffure',
    sprite: 'papa',
    decor: 'photomaton',
    prop: 'eau',
    title: 'La mèche rebelle',
    text: 'Une mèche se dresse, increvable, et ruine chaque cliché. Tu n’as ni gel ni miroir.',
    choices: [
      { label: 'La plaquer à la salive', effect: { temps: -4, moral: -4 }, result: 'Méthode d’urgence peu glorieuse, mais efficace.' },
      { label: 'L’ignorer dignement', effect: { temps: -2, moral: -2 }, result: 'Tu poses tel quel. Tu seras "l’homme à la mèche" sur ton passeport.' },
    ],
  },
  {
    id: 'photomaton_monnaie',
    sprite: 'mamie',
    decor: 'photomaton',
    prop: 'piece',
    title: "L'appoint pour la cabine",
    text: 'La machine n’avale que des pièces, et tu n’as que des billets. Une dame fait peut-être de la monnaie.',
    choices: [
      { label: 'Demander gentiment', effect: { temps: -5, moral: 3 }, result: 'Elle te dépanne avec le sourire. Petite chaîne de solidarité.' },
      { label: 'Acheter un truc pour la monnaie', effect: { temps: -6, argent: -3 }, result: 'Un chewing-gum plus tard, te voilà avec des pièces.' },
    ],
  },
]

// Zone préfecture + objectif.
const ADMIN: GameEvent[] = [
  {
    id: 'ticket_attente',
    sprite: 'vigile',
    decor: 'prefecture',
    prop: 'ticket',
    title: 'Le ticket numéro 247',
    text: 'L’écran affiche "63". Tu tiens le 247. La salle entière soupire à l’unisson.',
    choices: [
      { label: 'Prendre son mal en patience', effect: { temps: -16, moral: -4 }, result: 'Les numéros défilent au ralenti. Une éternité administrative.' },
      { label: 'Tenter le guichet prioritaire', effect: { temps: -6, moral: -5 }, result: 'Tu plaides l’urgence départ. L’agent te toise, puis cède à moitié.' },
    ],
  },
  {
    id: 'formulaire',
    sprite: 'patron',
    decor: 'prefecture',
    prop: 'journal',
    title: 'Le formulaire incompréhensible',
    text: 'Cerfa, cases grisées, timbre fiscal dématérialisé : le formulaire est un piège à lui tout seul.',
    choices: [
      { label: 'Le remplir avec soin', effect: { temps: -10, moral: 3 }, result: 'Chaque case à sa place. L’agent ne pourra rien te reprocher.' },
      { label: 'Bâcler et espérer', effect: { temps: -4, moral: -4 }, result: 'Tu coches au feeling. Risque de retour à la case départ.' },
    ],
  },
  {
    id: 'timbre_fiscal',
    sprite: 'mamie',
    decor: 'prefecture',
    prop: 'carte',
    title: 'Le timbre fiscal',
    text: 'Il faut un timbre fiscal, achetable uniquement en ligne, sur un site qui rame depuis un Nokia.',
    choices: [
      { label: 'Payer le timbre en ligne', effect: { temps: -7, argent: -9 }, result: 'Après trois pages d’erreur, le timbre s’affiche enfin.' },
      { label: 'Demander de l’aide au guichet', effect: { temps: -9, moral: 2 }, result: 'Un agent te génère le timbre. Plus lent, mais sans bug.' },
    ],
  },
]

const PASSEPORT: GameEvent = {
  id: 'le_passeport',
  sprite: 'patron',
  decor: 'prefecture',
  prop: 'passeport',
  title: 'Le guichet, enfin',
  text: 'Ton numéro s’affiche. L’agent tend la main vers ton dossier. Tout se joue maintenant.',
  choices: [
    { label: 'Dossier complet, paiement express', effect: { temps: -6, argent: -16, give: ['passeport'] }, result: 'Tout est en règle. Passeport délivré en urgence. Sauvé.' },
    { label: 'Payer la procédure accélérée', effect: { temps: -8, argent: -24, moral: 3, give: ['passeport'] }, result: 'L’option turbo. Cher, mais le précieux document est à toi.' },
    { label: 'Plaider, sans payer le surcoût', effect: { temps: -11, moral: -6, give: ['passeport'] }, result: 'Tu négocies âprement la gratuité. Long et humiliant, mais ça passe.' },
  ],
}

export const CHAPTER_7: Chapter = {
  id: 7,
  kicker: 'Chapitre 7',
  title: 'Le passeport périmé',
  intro:
    "Départ en voyage demain à l'aube, et tu découvres que ton passeport a expiré le mois dernier. La préfecture ferme dans l'après-midi. Entre la photo d'identité réglementaire et le parcours du combattant administratif, il va falloir être chirurgical.",
  goal: 'obtenir le passeport en urgence',
  items: [{ id: 'passeport', label: 'Le passeport', prop: 'passeport' }],
  zones: [
    { label: 'En ville', steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: 'Le photomaton', steps: 4, fillers: PHOTO },
    { label: 'La préfecture', steps: 4, fillers: ADMIN, goals: [PASSEPORT] },
    { label: 'Rentrer avant la nuit', steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 2, desc: '+13 temps, -11 énergie' },
    { key: 'sandwich', label: 'Sandwich', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 95, energie: 73, argent: 44, moral: 66 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#3DDC97',
    winGradient: 'linear-gradient(135deg,#2E8B57,#15302a)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'patron',
    introDecor: 'prefecture',
    introSprite: 'patron',
  },
}

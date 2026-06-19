import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone photomaton : la photo d'identité conforme, ce calvaire.
const PHOTO: GameEvent[] = [
  {
    id: 'photomaton_pose',
    sprite: 'papa',
    decor: 'photomaton',
    prop: 'photo',
    title: { fr: 'La photo conforme', en: 'The compliant photo' },
    text: {
      fr: '"Ni sourire, ni frange, ni reflet." La machine recale ta troisième tentative avec un bip méprisant.',
      en: '"No smile, no bangs, no glare." The booth rejects your third attempt with a contemptuous beep.',
    },
    choices: [
      { label: { fr: 'Reprendre, très sérieux', en: 'Retake, dead serious' }, effect: { temps: -8, argent: -5, moral: -3 }, result: { fr: 'Visage de marbre, oreilles dégagées. Validée à la quatrième.', en: 'Stone face, ears showing. Approved on the fourth try.' } },
      { label: { fr: 'Garder une photo limite', en: 'Keep a borderline one' }, effect: { temps: -3, argent: -5, moral: -2 }, result: { fr: 'Tu gardes la moins pire. Croisons les doigts pour le guichet.', en: 'You keep the least-bad one. Fingers crossed for the counter.' } },
    ],
  },
  {
    id: 'photomaton_panne',
    sprite: 'vigile',
    decor: 'photomaton',
    prop: 'feu',
    title: { fr: 'La cabine récalcitrante', en: 'The stubborn booth' },
    text: {
      fr: 'Le rideau coince, l’écran clignote "ERREUR 7". Un autre client tape sur la vitre, impatient.',
      en: 'The curtain jams, the screen flashes "ERROR 7". Another customer taps the glass, impatient.',
    },
    choices: [
      { label: { fr: 'Relancer la machine', en: 'Reboot the machine' }, effect: { temps: -9, moral: -2 }, result: { fr: 'Tu coupes, rallumes. Elle redémarre en grommelant.', en: 'You switch it off and on. It reboots, grumbling.' } },
      { label: { fr: 'Chercher une autre cabine', en: 'Find another booth' }, effect: { temps: -6, energie: -5 }, result: { fr: 'Tu files vers la gare, où il y en a une autre. Peut-être.', en: 'You head to the station, where there is another one. Maybe.' } },
    ],
  },
  {
    id: 'photomaton_coiffure',
    sprite: 'papa',
    decor: 'photomaton',
    prop: 'eau',
    title: { fr: 'La mèche rebelle', en: 'The rebel cowlick' },
    text: {
      fr: 'Une mèche se dresse, increvable, et ruine chaque cliché. Tu n’as ni gel ni miroir.',
      en: 'A lock of hair stands up, unkillable, ruining every shot. You have no gel and no mirror.',
    },
    choices: [
      { label: { fr: 'La plaquer à la salive', en: 'Slick it with spit' }, effect: { temps: -4, moral: -4 }, result: { fr: 'Méthode d’urgence peu glorieuse, mais efficace.', en: 'An inglorious emergency method, but it works.' } },
      { label: { fr: "L'ignorer dignement", en: 'Ignore it with dignity' }, effect: { temps: -2, moral: -2 }, result: { fr: 'Tu poses tel quel. Tu seras "l’homme à la mèche" sur ton passeport.', en: 'You pose as is. You will be "the cowlick guy" on your passport.' } },
    ],
  },
  {
    id: 'photomaton_monnaie',
    sprite: 'mamie',
    decor: 'photomaton',
    prop: 'piece',
    title: { fr: "L'appoint pour la cabine", en: 'Exact change for the booth' },
    text: {
      fr: 'La machine n’avale que des pièces, et tu n’as que des billets. Une dame fait peut-être de la monnaie.',
      en: 'The machine only takes coins, and you only have notes. A lady might be able to make change.',
    },
    choices: [
      { label: { fr: 'Demander gentiment', en: 'Ask nicely' }, effect: { temps: -5, moral: 3 }, result: { fr: 'Elle te dépanne avec le sourire. Petite chaîne de solidarité.', en: 'She helps you out with a smile. A little chain of solidarity.' } },
      { label: { fr: 'Acheter un truc pour la monnaie', en: 'Buy something for change' }, effect: { temps: -6, argent: -3 }, result: { fr: 'Un chewing-gum plus tard, te voilà avec des pièces.', en: 'One pack of gum later, you have your coins.' } },
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
    title: { fr: 'Le ticket numéro 247', en: 'Ticket number 247' },
    text: {
      fr: 'L’écran affiche "63". Tu tiens le 247. La salle entière soupire à l’unisson.',
      en: 'The screen shows "63". You are holding 247. The whole room sighs in unison.',
    },
    choices: [
      { label: { fr: 'Prendre son mal en patience', en: 'Grin and bear it' }, effect: { temps: -16, moral: -4 }, result: { fr: 'Les numéros défilent au ralenti. Une éternité administrative.', en: 'The numbers crawl by. An administrative eternity.' } },
      { label: { fr: 'Tenter le guichet prioritaire', en: 'Try the priority desk' }, effect: { temps: -6, moral: -5 }, result: { fr: 'Tu plaides l’urgence départ. L’agent te toise, puis cède à moitié.', en: 'You plead a travel emergency. The clerk eyes you, then half-relents.' } },
    ],
  },
  {
    id: 'formulaire',
    sprite: 'patron',
    decor: 'prefecture',
    prop: 'journal',
    title: { fr: 'Le formulaire incompréhensible', en: 'The baffling form' },
    text: {
      fr: 'Cerfa, cases grisées, timbre fiscal dématérialisé : le formulaire est un piège à lui tout seul.',
      en: 'Official form, greyed-out boxes, digital tax stamp: the paperwork is a trap all on its own.',
    },
    choices: [
      { label: { fr: 'Le remplir avec soin', en: 'Fill it out carefully' }, effect: { temps: -10, moral: 3 }, result: { fr: 'Chaque case à sa place. L’agent ne pourra rien te reprocher.', en: 'Every box in its place. The clerk will have nothing on you.' } },
      { label: { fr: 'Bâcler et espérer', en: 'Botch it and hope' }, effect: { temps: -4, moral: -4 }, result: { fr: 'Tu coches au feeling. Risque de retour à la case départ.', en: 'You tick boxes on instinct. Risk of back to square one.' } },
    ],
  },
  {
    id: 'timbre_fiscal',
    sprite: 'mamie',
    decor: 'prefecture',
    prop: 'carte',
    title: { fr: 'Le timbre fiscal', en: 'The tax stamp' },
    text: {
      fr: 'Il faut un timbre fiscal, achetable uniquement en ligne, sur un site qui rame depuis un Nokia.',
      en: 'You need a tax stamp, only buyable online, on a site that crawls like it is on a Nokia.',
    },
    choices: [
      { label: { fr: 'Payer le timbre en ligne', en: 'Pay for the stamp online' }, effect: { temps: -7, argent: -9 }, result: { fr: 'Après trois pages d’erreur, le timbre s’affiche enfin.', en: 'After three error pages, the stamp finally appears.' } },
      { label: { fr: "Demander de l'aide au guichet", en: 'Ask the desk for help' }, effect: { temps: -9, moral: 2 }, result: { fr: 'Un agent te génère le timbre. Plus lent, mais sans bug.', en: 'A clerk generates the stamp for you. Slower, but bug-free.' } },
    ],
  },
]

const PASSEPORT: GameEvent = {
  id: 'le_passeport',
  sprite: 'patron',
  decor: 'prefecture',
  prop: 'passeport',
  title: { fr: 'Le guichet, enfin', en: 'The counter, at last' },
  text: {
    fr: 'Ton numéro s’affiche. L’agent tend la main vers ton dossier. Tout se joue maintenant.',
    en: 'Your number comes up. The clerk reaches for your file. It all comes down to this.',
  },
  choices: [
    { label: { fr: 'Dossier complet, paiement express', en: 'Complete file, express pay' }, effect: { temps: -6, argent: -16, give: ['passeport'] }, result: { fr: 'Tout est en règle. Passeport délivré en urgence. Sauvé.', en: 'Everything in order. Passport issued on the spot. Saved.' } },
    { label: { fr: 'Payer la procédure accélérée', en: 'Pay for fast-track' }, effect: { temps: -8, argent: -24, moral: 3, give: ['passeport'] }, result: { fr: 'L’option turbo. Cher, mais le précieux document est à toi.', en: 'The turbo option. Pricey, but the precious document is yours.' } },
    { label: { fr: 'Plaider, sans payer le surcoût', en: 'Plead, skip the surcharge' }, effect: { temps: -11, moral: -6, give: ['passeport'] }, result: { fr: 'Tu négocies âprement la gratuité. Long et humiliant, mais ça passe.', en: 'You bitterly argue for it free. Long and humiliating, but it works.' } },
  ],
}

export const CHAPTER_7: Chapter = {
  id: 7,
  kicker: { fr: 'Chapitre 7', en: 'Chapter 7' },
  title: { fr: 'Le passeport périmé', en: 'The expired passport' },
  intro: {
    fr: "Départ en voyage demain à l'aube, et tu découvres que ton passeport a expiré le mois dernier. La préfecture ferme dans l'après-midi. Entre la photo d'identité réglementaire et le parcours du combattant administratif, il va falloir être chirurgical.",
    en: 'You fly out at dawn tomorrow, and you discover your passport expired last month. The prefecture closes this afternoon. Between the regulation ID photo and the bureaucratic obstacle course, you will have to be surgical.',
  },
  goal: { fr: 'obtenir le passeport en urgence', en: 'get the passport in a rush' },
  items: [{ id: 'passeport', label: { fr: 'Le passeport', en: 'The passport' }, prop: 'passeport' }],
  zones: [
    { label: { fr: 'En ville', en: 'In town' }, steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'Le photomaton', en: 'The photo booth' }, steps: 4, fillers: PHOTO },
    { label: { fr: 'La préfecture', en: 'The prefecture' }, steps: 4, fillers: ADMIN, goals: [PASSEPORT] },
    { label: { fr: 'Rentrer avant la nuit', en: 'Home before nightfall' }, steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'trottinette', label: { fr: 'Trottinette', en: 'Scooter' }, effect: { temps: 13, energie: -11 }, charges: 2, desc: { fr: '+13 temps, -11 énergie', en: '+13 time, -11 energy' } },
    { key: 'sandwich', label: { fr: 'Sandwich', en: 'Sandwich' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 97, energie: 74, argent: 44, moral: 66 },
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

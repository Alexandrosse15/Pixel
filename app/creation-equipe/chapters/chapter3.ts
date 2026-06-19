import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

// Zone rayon jouets.
const JOUETS: GameEvent[] = [
  {
    id: 'vendeur_conseil',
    sprite: 'vendeur',
    decor: 'magasin_jouets',
    prop: 'robot',
    title: { fr: 'Le vendeur trop zélé', en: 'The over-eager salesman' },
    text: {
      fr: 'Un vendeur surexcité veut absolument te vendre le méga-coffret à piles, lumières et sons inclus.',
      en: 'An over-excited salesman absolutely must sell you the mega-set, batteries, lights and sounds included.',
    },
    choices: [
      { label: { fr: 'Écouter son boniment', en: 'Listen to his pitch' }, effect: { temps: -10, moral: -3 }, result: { fr: 'Démonstration complète, sons stridents compris. Oreilles qui sifflent.', en: 'Full demo, shrill sound effects included. Your ears are ringing.' } },
      { label: { fr: 'Couper court poliment', en: 'Cut it short politely' }, effect: { temps: -3, moral: 2 }, result: { fr: '"Je regarde, merci." Tu t’éclipses avant le deuxième argument.', en: '"Just browsing, thanks." You slip away before the second pitch.' } },
    ],
  },
  {
    id: 'rupture_jouet',
    sprite: 'vendeur',
    decor: 'rayon_jouets',
    prop: 'croix',
    title: { fr: 'Le jouet à la mode', en: 'The must-have toy' },
    text: {
      fr: 'Le rayon de la peluche que tout le monde s’arrache est vide. Un carton traîne au fond.',
      en: 'The shelf for the plush everyone is fighting over is empty. A box sits in the back.',
    },
    choices: [
      { label: { fr: 'Demander en réserve', en: 'Ask the stockroom' }, effect: { temps: -10, energie: -4, moral: 4 }, result: { fr: 'Le vendeur déniche un exemplaire planqué. Tu respires.', en: 'The clerk digs up a stashed one. You breathe again.' } },
      { label: { fr: "Changer d'idée", en: 'Change your mind' }, effect: { temps: -4, moral: -3 }, result: { fr: 'Tu abandonnes cette piste. Il faudra trouver autre chose.', en: 'You drop this lead. You will have to find something else.' } },
    ],
  },
  {
    id: 'gamin_caprice',
    sprite: 'enfant',
    decor: 'allee',
    prop: 'ballon',
    title: { fr: 'Le caprice du rayon', en: 'The aisle tantrum' },
    text: {
      fr: 'Un enfant en pleine crise se roule par terre au milieu de l’allée, jouets éparpillés.',
      en: 'A kid mid-meltdown rolls on the floor in the middle of the aisle, toys scattered everywhere.',
    },
    choices: [
      { label: { fr: 'Enjamber prudemment', en: 'Step over carefully' }, effect: { temps: -3, energie: -3 }, result: { fr: 'Tu franchis le champ de mines en évitant les Lego.', en: 'You cross the minefield, dodging the Lego.' } },
      { label: { fr: 'Aider le parent dépassé', en: 'Help the overwhelmed parent' }, effect: { temps: -9, moral: 8 }, result: { fr: 'Tu ramasses, tu calmes le jeu. Karma positif, temps négatif.', en: 'You pick up, you calm things down. Positive karma, negative time.' } },
    ],
  },
  {
    id: 'vitrine_jouets',
    sprite: 'papa',
    decor: 'rayon_jouets',
    prop: 'robot',
    title: { fr: 'La vitrine hypnotique', en: 'The hypnotic display' },
    text: {
      fr: 'Un circuit de petites voitures tourne dans la vitrine. Tu te surprends à le fixer comme un gamin.',
      en: 'A toy car track loops in the window. You catch yourself staring like a kid.',
    },
    choices: [
      { label: { fr: 'Te ressaisir vite', en: 'Snap out of it' }, effect: { temps: -2, moral: 2 }, result: { fr: 'Tu secoues la tête et reprends la mission. Joli, cela dit.', en: 'You shake your head and get back to it. Pretty cool, though.' } },
      { label: { fr: 'Rester admirer', en: 'Stay and admire' }, effect: { temps: -8, moral: 6 }, result: { fr: 'Deux minutes de pure nostalgie. Coûteux, mais ça fait du bien.', en: 'Two minutes of pure nostalgia. Costly, but it feels good.' } },
    ],
  },
  {
    id: 'demo_jeu',
    sprite: 'vendeur',
    decor: 'rayon_jouets',
    prop: 'ballon',
    title: { fr: 'La borne de démo', en: 'The demo station' },
    text: {
      fr: 'Une borne propose d’essayer le jeu phare de Noël. Une grappe d’enfants s’impatiente.',
      en: 'A kiosk lets you try the flagship Christmas game. A cluster of kids grows impatient.',
    },
    choices: [
      { label: { fr: 'Tester deux minutes', en: 'Try it for two minutes' }, effect: { temps: -7, energie: 4, moral: 5 }, result: { fr: 'Tu bats le high-score d’un gamin de huit ans. Petite fierté coupable.', en: 'You beat an eight-year-old high score. A small guilty pride.' } },
      { label: { fr: 'Laisser la place', en: 'Give up your spot' }, effect: { temps: -2 }, result: { fr: 'Tu cèdes la borne et poursuis ta quête.', en: 'You hand over the kiosk and resume your quest.' } },
    ],
  },
]

// Zone caisse / emballage.
const CAISSE: GameEvent[] = [
  {
    id: 'emballage',
    sprite: 'caissier',
    decor: 'magasin_jouets',
    prop: 'sac',
    title: { fr: "Le stand d'emballage", en: 'The gift-wrap stand' },
    text: {
      fr: 'Une file s’étire devant le comptoir cadeau. Papier brillant, ruban frisé, employée débordée.',
      en: 'A line stretches at the gift counter. Shiny paper, curled ribbon, one swamped clerk.',
    },
    choices: [
      { label: { fr: 'Faire emballer', en: 'Have it wrapped' }, effect: { temps: -11, argent: -3, moral: 5 }, result: { fr: 'Paquet impeccable avec un noeud parfait. Mais quelle attente.', en: 'A flawless package with a perfect bow. But what a wait.' } },
      { label: { fr: 'Emballer toi-même', en: 'Wrap it yourself' }, effect: { temps: -3, energie: -4, moral: -4 }, result: { fr: 'Papier froissé, scotch de travers. Ça passera dans la précipitation.', en: 'Crumpled paper, crooked tape. It will do in a pinch.' } },
    ],
  },
  {
    id: 'file_cadeau',
    sprite: 'mamie',
    decor: 'caisse',
    prop: 'ticket',
    title: { fr: 'La caisse engorgée', en: 'The clogged checkout' },
    text: {
      fr: 'Une seule caisse, et devant toi une grand-mère qui paie trois jouets en chèque.',
      en: 'One till open, and ahead of you a grandma paying for three toys by check.',
    },
    choices: [
      { label: { fr: 'Patienter sagement', en: 'Wait patiently' }, effect: { temps: -12, moral: 2 }, result: { fr: 'Tu attends, le pied qui tape. Interminable.', en: 'You wait, foot tapping. Endless.' } },
      { label: { fr: 'Tenter la borne', en: 'Try the self-checkout' }, effect: { temps: -7, energie: -3, moral: -3 }, result: { fr: 'La borne refuse les cartes cadeaux, évidemment. Tu reviens en caisse.', en: 'The machine refuses gift cards, of course. You go back to the till.' } },
    ],
  },
  {
    id: 'carte_fidelite',
    sprite: 'caissier',
    decor: 'caisse',
    prop: 'carte',
    title: { fr: 'La carte de fidélité', en: 'The loyalty card' },
    text: {
      fr: 'Le caissier déroule le speech : "Vous avez la carte ? Sinon, dix pour cent aujourd’hui..."',
      en: 'The cashier runs the spiel: "Got the card? If not, ten percent off today..."',
    },
    choices: [
      { label: { fr: 'Souscrire vite', en: 'Sign up fast' }, effect: { temps: -7, argent: 4, moral: -2 }, result: { fr: 'Formulaire rempli en vitesse, mais dix pour cent de remise empochés.', en: 'Form filled in a rush, but ten percent off pocketed.' } },
      { label: { fr: 'Refuser net', en: 'Flatly refuse' }, effect: { temps: -2 }, result: { fr: '"Non merci." Tu coupes court et tu passes.', en: '"No thanks." You cut it off and move on.' } },
    ],
  },
]

const GOAL: GameEvent = {
  id: 'le_jouet',
  sprite: 'vendeur',
  decor: 'rayon_jouets',
  prop: 'jouet',
  title: { fr: 'Le bon cadeau', en: 'The right gift' },
  text: {
    fr: 'Le voilà, le robot que le copain de ton fils réclame depuis des semaines. Dernier exemplaire, sous vitrine. La fête commence dans quelques minutes.',
    en: "There it is, the robot your son's friend has been begging for for weeks. Last one, under glass. The party starts in a few minutes.",
  },
  choices: [
    { label: { fr: 'Acheter le robot', en: 'Buy the robot' }, effect: { temps: -7, argent: -18, give: ['jouet'] }, result: { fr: 'Tu rafles le dernier. Mission quasi bouclée.', en: 'You snag the last one. Mission nearly done.' } },
    { label: { fr: 'Le modèle collector', en: 'The collector model' }, effect: { temps: -9, argent: -26, moral: 3, give: ['jouet'] }, result: { fr: 'La version de luxe. Le gamin sera le roi de la fête.', en: 'The deluxe version. The kid will be king of the party.' } },
    { label: { fr: 'Un jouet au rabais', en: 'A cut-price toy' }, effect: { temps: -4, argent: -7, moral: -5, give: ['jouet'] }, result: { fr: 'Tu prends un truc de seconde zone. Ça fera l’affaire, sans gloire.', en: 'You grab some second-rate thing. It will do, without glory.' } },
  ],
}

export const CHAPTER_3: Chapter = {
  id: 3,
  kicker: { fr: 'Chapitre 3', en: 'Chapter 3' },
  title: { fr: "Le cadeau d'anniversaire", en: 'The birthday gift' },
  intro: {
    fr: "15h30. L'anniversaire du meilleur copain de ton fils est à 16h, et tu n'as toujours pas le cadeau. Direction la galerie marchande bondée : il te faut traverser la foule, écumer le rayon jouets et passer en caisse avant le top départ.",
    en: "3:30pm. Your son's best friend's birthday party is at 4, and you still have no gift. Off to the packed shopping mall: you have to cut through the crowd, comb the toy aisle and reach the till before the starting gun.",
  },
  goal: { fr: 'rapporter le cadeau à temps', en: 'bring back the gift in time' },
  items: [{ id: 'jouet', label: { fr: 'Le cadeau', en: 'The gift' }, prop: 'jouet' }],
  zones: [
    { label: { fr: 'En ville', en: 'In town' }, steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'La galerie marchande', en: 'The shopping mall' }, steps: 4, fillers: STORE },
    { label: { fr: 'Au rayon jouets', en: 'In the toy aisle' }, steps: 4, fillers: JOUETS },
    { label: { fr: 'Le bon cadeau', en: 'The right gift' }, steps: 4, fillers: CAISSE, goals: [GOAL] },
  ],
  bonuses: [
    { key: 'skateboard', label: { fr: 'Skateboard', en: 'Skateboard' }, effect: { temps: 12, energie: -10 }, charges: 2, desc: { fr: '+12 temps, -10 énergie', en: '+12 time, -10 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 110, energie: 76, argent: 44, moral: 66 },
  drain: { temps: -3, energie: -2 },
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

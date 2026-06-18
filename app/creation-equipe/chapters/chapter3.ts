import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

// Zone rayon jouets.
const JOUETS: GameEvent[] = [
  {
    id: 'vendeur_conseil',
    sprite: 'vendeur',
    decor: 'magasin_jouets',
    prop: 'robot',
    title: 'Le vendeur trop zélé',
    text: 'Un vendeur surexcité veut absolument te vendre le méga-coffret à piles, lumières et sons inclus.',
    choices: [
      { label: 'Écouter son boniment', effect: { temps: -10, moral: -3 }, result: 'Démonstration complète, sons stridents compris. Oreilles qui sifflent.' },
      { label: 'Couper court poliment', effect: { temps: -3, moral: 2 }, result: '"Je regarde, merci." Tu t’éclipses avant le deuxième argument.' },
    ],
  },
  {
    id: 'rupture_jouet',
    sprite: 'vendeur',
    decor: 'rayon_jouets',
    prop: 'croix',
    title: 'Le jouet à la mode',
    text: 'Le rayon de la peluche que tout le monde s’arrache est vide. Un carton traîne au fond.',
    choices: [
      { label: 'Demander en réserve', effect: { temps: -10, energie: -4, moral: 4 }, result: 'Le vendeur déniche un exemplaire planqué. Tu respires.' },
      { label: 'Changer d’idée', effect: { temps: -4, moral: -3 }, result: 'Tu abandonnes cette piste. Il faudra trouver autre chose.' },
    ],
  },
  {
    id: 'gamin_caprice',
    sprite: 'enfant',
    decor: 'allee',
    prop: 'ballon',
    title: 'Le caprice du rayon',
    text: 'Un enfant en pleine crise se roule par terre au milieu de l’allée, jouets éparpillés.',
    choices: [
      { label: 'Enjamber prudemment', effect: { temps: -3, energie: -3 }, result: 'Tu franchis le champ de mines en évitant les Lego.' },
      { label: 'Aider le parent dépassé', effect: { temps: -9, moral: 8 }, result: 'Tu ramasses, tu calmes le jeu. Karma positif, temps négatif.' },
    ],
  },
  {
    id: 'vitrine_jouets',
    sprite: 'papa',
    decor: 'rayon_jouets',
    prop: 'robot',
    title: 'La vitrine hypnotique',
    text: 'Un circuit de petites voitures tourne dans la vitrine. Tu te surprends à le fixer comme un gamin.',
    choices: [
      { label: 'Te ressaisir vite', effect: { temps: -2, moral: 2 }, result: 'Tu secoues la tête et reprends la mission. Joli, cela dit.' },
      { label: 'Rester admirer', effect: { temps: -8, moral: 6 }, result: 'Deux minutes de pure nostalgie. Coûteux, mais ça fait du bien.' },
    ],
  },
  {
    id: 'demo_jeu',
    sprite: 'vendeur',
    decor: 'rayon_jouets',
    prop: 'ballon',
    title: 'La borne de démo',
    text: 'Une borne propose d’essayer le jeu phare de Noël. Une grappe d’enfants s’impatiente.',
    choices: [
      { label: 'Tester deux minutes', effect: { temps: -7, energie: 4, moral: 5 }, result: 'Tu bats le high-score d’un gamin de huit ans. Petite fierté coupable.' },
      { label: 'Laisser la place', effect: { temps: -2 }, result: 'Tu cèdes la borne et poursuis ta quête.' },
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
    title: "Le stand d'emballage",
    text: 'Une file s’étire devant le comptoir cadeau. Papier brillant, ruban frisé, employée débordée.',
    choices: [
      { label: 'Faire emballer', effect: { temps: -11, argent: -3, moral: 5 }, result: 'Paquet impeccable avec un noeud parfait. Mais quelle attente.' },
      { label: 'Emballer toi-même', effect: { temps: -3, energie: -4, moral: -4 }, result: 'Papier froissé, scotch de travers. Ça passera dans la précipitation.' },
    ],
  },
  {
    id: 'file_cadeau',
    sprite: 'mamie',
    decor: 'caisse',
    prop: 'ticket',
    title: 'La caisse engorgée',
    text: 'Une seule caisse, et devant toi une grand-mère qui paie trois jouets en chèque.',
    choices: [
      { label: 'Patienter sagement', effect: { temps: -12, moral: 2 }, result: 'Tu attends, le pied qui tape. Interminable.' },
      { label: 'Tenter la borne', effect: { temps: -7, energie: -3, moral: -3 }, result: 'La borne refuse les cartes cadeaux, évidemment. Tu reviens en caisse.' },
    ],
  },
  {
    id: 'carte_fidelite',
    sprite: 'caissier',
    decor: 'caisse',
    prop: 'carte',
    title: 'La carte de fidélité',
    text: 'Le caissier déroule le speech : "Vous avez la carte ? Sinon, dix pour cent aujourd’hui..."',
    choices: [
      { label: 'Souscrire vite', effect: { temps: -7, argent: 4, moral: -2 }, result: 'Formulaire rempli en vitesse, mais dix pour cent de remise empochés.' },
      { label: 'Refuser net', effect: { temps: -2 }, result: '"Non merci." Tu coupes court et tu passes.' },
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
    "15h30. L'anniversaire du meilleur copain de ton fils est à 16h, et tu n'as toujours pas le cadeau. Direction la galerie marchande bondée : il te faut traverser la foule, écumer le rayon jouets et passer en caisse avant le top départ.",
  goal: 'rapporter le cadeau à temps',
  items: [{ id: 'jouet', label: 'Le cadeau', prop: 'jouet' }],
  zones: [
    { label: 'En ville', steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: 'La galerie marchande', steps: 4, fillers: STORE },
    { label: 'Au rayon jouets', steps: 4, fillers: JOUETS },
    { label: 'Le bon cadeau', steps: 4, fillers: CAISSE, goals: [GOAL] },
  ],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 2, desc: '+12 temps, -10 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
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

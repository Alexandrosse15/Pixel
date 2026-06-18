import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : la voiture qui lâche.
const PANNE: GameEvent[] = [
  {
    id: 'demarre_pas',
    sprite: 'papa',
    decor: 'parking',
    prop: 'cles',
    title: 'La voiture qui toussote',
    text: 'Tu tournes la clé. Rien. Un clic pathétique, puis le silence. Le jour de tous les jours.',
    choices: [
      { label: 'Insister, prier', effect: { temps: -8, moral: -4 }, result: 'Au sixième essai, le moteur consent à démarrer. Miracle laborieux.' },
      { label: 'Abandonner la voiture', effect: { temps: -4, energie: -5 }, result: 'Tu claques la portière et pars à pied. Tant pis pour les quatre roues.' },
    ],
  },
  {
    id: 'depanneur',
    sprite: 'vigile',
    decor: 'rue',
    prop: 'carte',
    title: 'Le dépanneur au téléphone',
    text: 'Un dépanneur peut venir... dans quarante minutes. Ou tu tentes autre chose.',
    choices: [
      { label: 'Attendre la dépanneuse', effect: { temps: -15, energie: 5 }, result: 'Tu patientes, assis sur le trottoir. Rassurant mais interminable.' },
      { label: 'Payer pour une intervention express', effect: { temps: -5, argent: -14 }, result: 'Un supplément et il arrive en dix minutes. Le portefeuille pleure.' },
    ],
  },
  {
    id: 'covoiturage',
    sprite: 'collegue',
    decor: 'rue',
    prop: 'velo',
    title: 'Le covoiturage improvisé',
    text: 'Un voisin part justement en ville. "Je te dépose ?" Sa conduite est... particulière.',
    choices: [
      { label: 'Monter avec lui', effect: { temps: 6, energie: -4, moral: -3 }, result: 'Conduite sportive et virages serrés. Rapide, mais tu as eu peur.' },
      { label: 'Décliner poliment', effect: { temps: -6 }, result: 'Tu préfères tes deux jambes. Plus lent, plus sûr.' },
    ],
  },
  {
    id: 'pneu_creve',
    sprite: 'papa',
    decor: 'rue',
    prop: 'feu',
    title: 'Le pneu à plat',
    text: 'En plus du reste, un pneu siffle doucement. La roue de secours est sous une montagne de bazar.',
    choices: [
      { label: 'Changer la roue', effect: { temps: -12, energie: -9, moral: 4 }, result: 'Cric, clés, jurons. Roue changée, mains noires, fierté intacte.' },
      { label: 'Rouler doucement quand même', effect: { temps: -3, moral: -5 }, result: 'Tu continues sur la jante du destin. Risqué, mais tu avances.' },
    ],
  },
]

// Zone bijouterie + objectif.
const BIJOU: GameEvent[] = [
  {
    id: 'file_bijouterie',
    sprite: 'vendeur',
    decor: 'bijouterie',
    prop: 'alliances',
    title: 'La file feutrée',
    text: 'La bijouterie est chic et lente. Un couple devant toi hésite depuis vingt minutes sur une bague.',
    choices: [
      { label: 'Patienter en silence', effect: { temps: -11, moral: 2 }, result: 'Tu attends sur la moquette épaisse. Le temps s’étire comme un élastique.' },
      { label: 'Signaler poliment l’urgence', effect: { temps: -5, moral: -2 }, result: 'Le vendeur t’avance discrètement. Regards noirs du couple.' },
    ],
  },
  {
    id: 'gravure',
    sprite: 'vendeur',
    decor: 'bijouterie',
    prop: 'alliances',
    title: 'La gravure de dernière minute',
    text: 'Le bijoutier a oublié de graver la date à l’intérieur. "Deux minutes", dit-il. On y croit.',
    choices: [
      { label: 'Attendre la gravure', effect: { temps: -9, moral: 5 }, result: 'La date apparaît, fine et nette. Ça valait le coup.' },
      { label: 'Tant pis, sans gravure', effect: { temps: -2, moral: -4 }, result: 'Tu pars sans. Personne ne regarde dedans le jour J, hein ?' },
    ],
  },
  {
    id: 'ecrin',
    sprite: 'caissiere',
    decor: 'bijouterie',
    prop: 'cadeau',
    title: "Le choix de l'écrin",
    text: 'La vendeuse déploie quinze écrins de velours. "Lequel met le mieux en valeur les anneaux ?"',
    choices: [
      { label: 'Le premier qui vient', effect: { temps: -3 }, result: 'Tu pointes un écrin au hasard. Très bien, le bleu nuit.' },
      { label: 'Choisir avec soin', effect: { temps: -8, argent: -4, moral: 4 }, result: 'Un écrin parfait, satiné. Le détail qui fait la classe.' },
    ],
  },
]

const ALLIANCES: GameEvent = {
  id: 'les_alliances',
  sprite: 'vendeur',
  decor: 'bijouterie',
  prop: 'alliances',
  title: 'Les alliances',
  text: 'Elles sont là, sur le coussinet : les deux anneaux que tout le mariage attend. Le bijoutier prépare la facture.',
  choices: [
    { label: 'Régler et filer', effect: { temps: -6, argent: -18, give: ['alliances'] }, result: 'Anneaux en poche, écrin fermé. Le plus dur est fait. En théorie.' },
    { label: 'Vérifier la taille d’abord', effect: { temps: -9, argent: -18, moral: 4, give: ['alliances'] }, result: 'Tu contrôles tout deux fois. Aucune mauvaise surprise à l’autel.' },
    { label: 'Demander un rabais, sans un sou', effect: { temps: -10, moral: -6, give: ['alliances'] }, result: 'Tu négocies à l’arrache faute de liquide. Gênant, mais tu as les anneaux.' },
  ],
}

// Zone mairie : tenir jusqu'à l'échange des consentements.
const MAIRIE: GameEvent[] = [
  {
    id: 'tapis_rouge',
    sprite: 'maire',
    decor: 'mairie',
    prop: 'coeur',
    title: 'Le parvis bondé',
    text: 'Tout le monde est déjà là, endimanché. Le marié, livide, te cherche du regard.',
    choices: [
      { label: 'Foncer vers lui', effect: { temps: -3, energie: -4, moral: 6 }, result: 'Tu brandis l’écrin de loin. Il respire enfin.' },
      { label: 'Saluer la galerie', effect: { temps: -9, moral: 4 }, result: 'Bises, poignées de main, "tu as bonne mine". Mondanités chronophages.' },
    ],
  },
  {
    id: 'belle_mere_mariage',
    sprite: 'mamie',
    decor: 'mairie',
    prop: 'journal',
    title: 'La tante envahissante',
    text: 'Une tante t’agrippe pour te montrer 200 photos de son chat sur son téléphone.',
    choices: [
      { label: 'Compatir trente secondes', effect: { temps: -6, moral: 2 }, result: 'Tu hoches la tête devant le matou. Évasion réussie.' },
      { label: 'Prétexter un devoir de témoin', effect: { temps: -2, moral: -2 }, result: '"On m’attend !" Tu t’éclipses, vaguement coupable.' },
    ],
  },
  {
    id: 'discours_mairie',
    sprite: 'maire',
    decor: 'mairie',
    prop: 'journal',
    title: 'Le maire bavard',
    text: 'Le maire, lyrique, fait durer son préambule sur l’amour et la République. Les anneaux pèsent dans ta poche.',
    choices: [
      { label: 'Écouter, ému', effect: { temps: -10, moral: 6 }, result: 'Tu essuies une larme. C’est beau, malgré le timing.' },
      { label: 'Lui souffler d’accélérer', effect: { temps: -4, moral: -3 }, result: 'Un signe discret. Il abrège, vexé mais efficace.' },
    ],
  },
  {
    id: 'photographe_mariage',
    sprite: 'papa',
    decor: 'mairie',
    prop: 'soleil',
    title: 'La photo de groupe',
    text: 'Le photographe veut "le témoin avec les anneaux" au centre. Tout le monde se replace en soupirant.',
    choices: [
      { label: 'Poser fièrement', effect: { temps: -6, moral: 6 }, result: 'Sourire franc, écrin en main. Le cliché immortalise ton exploit.' },
      { label: 'Bâcler la pose', effect: { temps: -2, moral: -2 }, result: 'Tu poses vite fait, l’oeil sur la montre. Photo correcte, sans plus.' },
    ],
  },
]

export const CHAPTER_6: Chapter = {
  id: 6,
  kicker: 'Chapitre 6',
  title: 'Le témoin du mariage',
  intro:
    "Tu es le témoin, et c'est toi qui as les alliances... oubliées chez le bijoutier où on les redimensionnait. Le mariage est dans une heure, ta voiture refuse de démarrer, et la mairie est à l'autre bout de la ville. Récupère les anneaux et arrive avant le oui.",
  goal: 'rapporter les alliances à la mairie',
  items: [{ id: 'alliances', label: 'Les alliances', prop: 'alliances' }],
  zones: [
    { label: 'En route', steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: 'La voiture en panne', steps: 4, fillers: PANNE },
    { label: 'Chez le bijoutier', steps: 4, fillers: BIJOU, goals: [ALLIANCES] },
    { label: 'À la mairie', steps: 4, fillers: MAIRIE },
  ],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 2, desc: '+12 temps, -10 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 91, energie: 75, argent: 44, moral: 66 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#F2C94C',
    winGradient: 'linear-gradient(135deg,#A8862E,#2c2410)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'maire',
    introDecor: 'mairie',
    introSprite: 'maire',
  },
}

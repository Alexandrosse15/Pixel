import type { Chapter, GameEvent } from '../engine'
import { STREET, TRANSPORT, DISTRIBUTEUR } from './shared'

const MARCHE: GameEvent[] = [
  {
    id: 'amis_marche',
    sprite: 'collegue',
    decor: 'marche',
    prop: 'coeur',
    title: 'Les amis au marché',
    text: 'En plein marché, un couple d’amis t’attrape : "Ça fait une éternité ! On prend un verre ?"',
    choices: [
      { label: 'Papoter cinq minutes', effect: { temps: -11, moral: 6 }, result: 'Nouvelles échangées, promesses de dîner. Sympa, mais le temps file.' },
      { label: 'Promettre de rappeler', effect: { temps: -3, moral: -3 }, result: '"Je t’appelle, juré !" Tu t’éclipses, vaguement coupable.' },
    ],
  },
  {
    id: 'maire_campagne',
    sprite: 'maire',
    decor: 'marche',
    prop: 'journal',
    title: 'Le maire en campagne',
    text: 'Écharpe tricolore et sourire commercial, le maire fait du porte-à-porte sur le marché et fonce sur toi.',
    choices: [
      { label: 'Serrer la main et filer', effect: { temps: -5, moral: 2 }, result: 'Poignée de main, photo volée pour son tract, et tu t’échappes.' },
      { label: 'Écouter son programme', effect: { temps: -12, moral: -4 }, result: 'Cinq minutes sur les pistes cyclables. Tu hoches la tête, l’esprit ailleurs.' },
    ],
  },
  {
    id: 'degustation_marche',
    sprite: 'primeur',
    decor: 'marche',
    prop: 'tomates',
    title: 'Le primeur généreux',
    text: 'Un primeur te tend une tranche de melon : "Goûtez-moi ça, c’est de la saison !"',
    choices: [
      { label: 'Goûter et complimenter', effect: { temps: -4, energie: 7, moral: 4 }, result: 'Sucré, juteux, revigorant. Tu repars rechargé.' },
      { label: 'Refuser, pressé', effect: { temps: -1, moral: -2 }, result: 'Tu déclines d’un geste et poursuis dans la foule.' },
    ],
  },
  {
    id: 'photographe_marche',
    sprite: 'papa',
    decor: 'marche',
    prop: 'soleil',
    title: 'La photo de presse',
    text: 'Un photographe du journal local veut "une photo d’ambiance" et te demande de poser près des étals.',
    choices: [
      { label: 'Poser deux secondes', effect: { temps: -5, moral: 5 }, result: 'Sourire forcé, clic, c’est fait. Tu seras peut-être en page 4.' },
      { label: 'Décliner et avancer', effect: { temps: -2 }, result: 'Tu refuses poliment et continues à fendre la foule.' },
    ],
  },
]

const FLEUR: GameEvent[] = [
  {
    id: 'file_fleuriste',
    sprite: 'caissiere',
    decor: 'fleuriste',
    prop: 'roses',
    title: 'La queue chez le fleuriste',
    text: 'Évidemment, tout le monde a eu la même idée aujourd’hui. La boutique déborde de pères en sueur.',
    choices: [
      { label: 'Faire la queue', effect: { temps: -12, moral: 2 }, result: 'Tu patientes parmi tes semblables. Solidarité des retardataires.' },
      { label: 'Tenter un autre fleuriste', effect: { temps: -7, energie: -4 }, result: 'Tu cours à la boutique d’à côté, un peu moins bondée.' },
    ],
  },
  {
    id: 'bouquet_compose',
    sprite: 'primeur',
    decor: 'fleuriste',
    prop: 'roses',
    title: 'Le bouquet sur mesure',
    text: 'La fleuriste propose de composer un bouquet : "Roses simples, ou avec un peu de verdure et un noeud ?"',
    choices: [
      { label: 'Version simple, rapide', effect: { temps: -4, moral: 2 }, result: 'Un beau bouquet sans chichis, vite emballé.' },
      { label: 'Composition soignée', effect: { temps: -9, argent: -4, moral: 6 }, result: 'Un arrangement somptueux. Ta mère va adorer, ton agenda moins.' },
    ],
  },
  {
    id: 'carte_message',
    sprite: 'caissier',
    decor: 'fleuriste',
    prop: 'journal',
    title: 'La carte à écrire',
    text: 'On te tend une petite carte : "Un mot pour accompagner les fleurs ?" Le stylo bave un peu.',
    choices: [
      { label: 'Trois mots du coeur', effect: { temps: -4, moral: 5 }, result: 'Court mais sincère. L’essentiel est dit.' },
      { label: 'Sécher devant la carte', effect: { temps: -8, moral: -3 }, result: 'Panne d’inspiration totale. Tu finis par recopier un classique.' },
    ],
  },
]

const ROSES: GameEvent = {
  id: 'les_roses',
  sprite: 'caissiere',
  decor: 'fleuriste',
  prop: 'roses',
  title: 'Les roses parfaites',
  text: 'Le dernier beau bouquet de roses rouges est là, sur le comptoir. La fleuriste attend, sécateur en main.',
  choices: [
    { label: 'Le bouquet classique', effect: { temps: -6, argent: -16, give: ['roses'] }, result: 'Douze roses rouges, valeur sûre. Mission presque accomplie.' },
    { label: 'Le grand bouquet de luxe', effect: { temps: -8, argent: -24, moral: 4, give: ['roses'] }, result: 'Vingt-cinq roses, un écrin. Ta mère va fondre.' },
    { label: 'Quelques roses au rabais', effect: { temps: -4, argent: -8, moral: -4, give: ['roses'] }, result: 'Un petit bouquet un peu chiche. Ça compte, l’intention, non ?' },
  ],
}

export const CHAPTER_4: Chapter = {
  id: 4,
  kicker: 'Chapitre 4',
  title: 'La fête des mères',
  intro:
    "C'est la fête des mères et tu n'as rien prévu. Ta femme lave les enfants et te laisse trente minutes, montre en main, pour filer chercher des roses au marché. Encore faut-il traverser la ville, survivre aux transports, fendre le marché, dénicher le bon bouquet et rentrer avant qu'elle ne remarque ton absence.",
  goal: 'rapporter les roses à temps',
  items: [{ id: 'roses', label: 'Les roses', prop: 'roses' }],
  zones: [
    { label: 'Vers le centre', steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: 'Dans les transports', steps: 4, fillers: TRANSPORT },
    { label: 'Au marché', steps: 4, fillers: MARCHE },
    { label: 'Chez le fleuriste', steps: 4, fillers: FLEUR, goals: [ROSES] },
    { label: 'Rentrer à temps', steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 3, desc: '+13 temps, -11 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 3, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 86, energie: 78, argent: 46, moral: 70 },
  drain: { temps: -2, energie: -2 },
  theme: {
    accent: '#E74C6C',
    winGradient: 'linear-gradient(135deg,#A83357,#2c1019)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'femme',
    introDecor: 'cuisine',
    introSprite: 'femme',
  },
}

import type { Chapter, GameEvent } from '../engine'
import { STREET, TRANSPORT, DISTRIBUTEUR } from './shared'

const MARCHE: GameEvent[] = [
  {
    id: 'amis_marche',
    sprite: 'collegue',
    decor: 'marche',
    prop: 'coeur',
    title: { fr: 'Les amis au marché', en: 'Friends at the market' },
    text: {
      fr: 'En plein marché, un couple d’amis t’attrape : "Ça fait une éternité ! On prend un verre ?"',
      en: 'In the middle of the market, a couple of friends grab you: "It has been ages! Grab a drink?"',
    },
    choices: [
      { label: { fr: 'Papoter cinq minutes', en: 'Chat for five minutes' }, effect: { temps: -11, moral: 6 }, result: { fr: 'Nouvelles échangées, promesses de dîner. Sympa, mais le temps file.', en: 'News swapped, dinner promised. Nice, but time slips away.' } },
      { label: { fr: 'Promettre de rappeler', en: 'Promise to call back' }, effect: { temps: -3, moral: -3 }, result: { fr: '"Je t’appelle, juré !" Tu t’éclipses, vaguement coupable.', en: '"I will call, promise!" You slip off, vaguely guilty.' } },
    ],
  },
  {
    id: 'maire_campagne',
    sprite: 'maire',
    decor: 'marche',
    prop: 'journal',
    title: { fr: 'Le maire en campagne', en: 'The campaigning mayor' },
    text: {
      fr: 'Écharpe tricolore et sourire commercial, le maire fait du porte-à-porte sur le marché et fonce sur toi.',
      en: 'Tricolor sash and a salesman smile, the mayor works the market crowd and makes a beeline for you.',
    },
    choices: [
      { label: { fr: 'Serrer la main et filer', en: 'Shake hands and go' }, effect: { temps: -5, moral: 2 }, result: { fr: 'Poignée de main, photo volée pour son tract, et tu t’échappes.', en: 'A handshake, a stolen photo for his flyer, and you escape.' } },
      { label: { fr: 'Écouter son programme', en: 'Hear out his platform' }, effect: { temps: -12, moral: -4 }, result: { fr: 'Cinq minutes sur les pistes cyclables. Tu hoches la tête, l’esprit ailleurs.', en: 'Five minutes on bike lanes. You nod along, mind elsewhere.' } },
    ],
  },
  {
    id: 'degustation_marche',
    sprite: 'primeur',
    decor: 'marche',
    prop: 'tomates',
    title: { fr: 'Le primeur généreux', en: 'The generous greengrocer' },
    text: {
      fr: 'Un primeur te tend une tranche de melon : "Goûtez-moi ça, c’est de la saison !"',
      en: 'A greengrocer holds out a slice of melon: "Taste this, it is in season!"',
    },
    choices: [
      { label: { fr: 'Goûter et complimenter', en: 'Taste and compliment' }, effect: { temps: -4, energie: 7, moral: 4 }, result: { fr: 'Sucré, juteux, revigorant. Tu repars rechargé.', en: 'Sweet, juicy, reviving. You set off recharged.' } },
      { label: { fr: 'Refuser, pressé', en: 'Decline, in a hurry' }, effect: { temps: -1, moral: -2 }, result: { fr: 'Tu déclines d’un geste et poursuis dans la foule.', en: 'You wave it off and push on through the crowd.' } },
    ],
  },
  {
    id: 'photographe_marche',
    sprite: 'papa',
    decor: 'marche',
    prop: 'soleil',
    title: { fr: 'La photo de presse', en: 'The press photo' },
    text: {
      fr: 'Un photographe du journal local veut "une photo d’ambiance" et te demande de poser près des étals.',
      en: 'A local paper photographer wants "an atmosphere shot" and asks you to pose by the stalls.',
    },
    choices: [
      { label: { fr: 'Poser deux secondes', en: 'Pose for two seconds' }, effect: { temps: -5, moral: 5 }, result: { fr: 'Sourire forcé, clic, c’est fait. Tu seras peut-être en page 4.', en: 'Forced smile, click, done. You might be on page 4.' } },
      { label: { fr: 'Décliner et avancer', en: 'Decline and move on' }, effect: { temps: -2 }, result: { fr: 'Tu refuses poliment et continues à fendre la foule.', en: 'You politely refuse and keep cutting through the crowd.' } },
    ],
  },
]

const FLEUR: GameEvent[] = [
  {
    id: 'file_fleuriste',
    sprite: 'caissiere',
    decor: 'fleuriste',
    prop: 'roses',
    title: { fr: 'La queue chez le fleuriste', en: 'The line at the florist' },
    text: {
      fr: 'Évidemment, tout le monde a eu la même idée aujourd’hui. La boutique déborde de pères en sueur.',
      en: 'Of course, everyone had the same idea today. The shop is overflowing with sweaty dads.',
    },
    choices: [
      { label: { fr: 'Faire la queue', en: 'Wait in line' }, effect: { temps: -12, moral: 2 }, result: { fr: 'Tu patientes parmi tes semblables. Solidarité des retardataires.', en: 'You wait among your peers. Solidarity of the latecomers.' } },
      { label: { fr: 'Tenter un autre fleuriste', en: 'Try another florist' }, effect: { temps: -7, energie: -4 }, result: { fr: 'Tu cours à la boutique d’à côté, un peu moins bondée.', en: 'You run to the shop next door, a little less packed.' } },
    ],
  },
  {
    id: 'bouquet_compose',
    sprite: 'primeur',
    decor: 'fleuriste',
    prop: 'roses',
    title: { fr: 'Le bouquet sur mesure', en: 'The custom bouquet' },
    text: {
      fr: 'La fleuriste propose de composer un bouquet : "Roses simples, ou avec un peu de verdure et un noeud ?"',
      en: 'The florist offers to build a bouquet: "Plain roses, or with some greenery and a bow?"',
    },
    choices: [
      { label: { fr: 'Version simple, rapide', en: 'Simple, quick version' }, effect: { temps: -4, moral: 2 }, result: { fr: 'Un beau bouquet sans chichis, vite emballé.', en: 'A lovely no-frills bouquet, wrapped fast.' } },
      { label: { fr: 'Composition soignée', en: 'Elaborate arrangement' }, effect: { temps: -9, argent: -4, moral: 6 }, result: { fr: 'Un arrangement somptueux. Ta mère va adorer, ton agenda moins.', en: 'A sumptuous arrangement. Your mom will love it, your schedule less so.' } },
    ],
  },
  {
    id: 'carte_message',
    sprite: 'caissier',
    decor: 'fleuriste',
    prop: 'journal',
    title: { fr: 'La carte à écrire', en: 'The card to write' },
    text: {
      fr: 'On te tend une petite carte : "Un mot pour accompagner les fleurs ?" Le stylo bave un peu.',
      en: 'They hand you a small card: "A note to go with the flowers?" The pen leaks a little.',
    },
    choices: [
      { label: { fr: 'Trois mots du coeur', en: 'A few heartfelt words' }, effect: { temps: -4, moral: 5 }, result: { fr: 'Court mais sincère. L’essentiel est dit.', en: 'Short but sincere. The essentials are said.' } },
      { label: { fr: 'Sécher devant la carte', en: 'Blank out on the card' }, effect: { temps: -8, moral: -3 }, result: { fr: 'Panne d’inspiration totale. Tu finis par recopier un classique.', en: 'A total blank. You end up copying a classic line.' } },
    ],
  },
]

const ROSES: GameEvent = {
  id: 'les_roses',
  sprite: 'caissiere',
  decor: 'fleuriste',
  prop: 'roses',
  title: { fr: 'Les roses parfaites', en: 'The perfect roses' },
  text: {
    fr: 'Le dernier beau bouquet de roses rouges est là, sur le comptoir. La fleuriste attend, sécateur en main.',
    en: 'The last beautiful bunch of red roses is right there on the counter. The florist waits, shears in hand.',
  },
  choices: [
    { label: { fr: 'Le bouquet classique', en: 'The classic bouquet' }, effect: { temps: -6, argent: -16, give: ['roses'] }, result: { fr: 'Douze roses rouges, valeur sûre. Mission presque accomplie.', en: 'Twelve red roses, a safe bet. Mission nearly accomplished.' } },
    { label: { fr: 'Le grand bouquet de luxe', en: 'The grand luxury bouquet' }, effect: { temps: -8, argent: -24, moral: 4, give: ['roses'] }, result: { fr: 'Vingt-cinq roses, un écrin. Ta mère va fondre.', en: 'Twenty-five roses, beautifully boxed. Your mom will melt.' } },
    { label: { fr: 'Quelques roses au rabais', en: 'A few cut-price roses' }, effect: { temps: -4, argent: -8, moral: -4, give: ['roses'] }, result: { fr: 'Un petit bouquet un peu chiche. Ça compte, l’intention, non ?', en: 'A small, slightly stingy bunch. It is the thought that counts, right?' } },
  ],
}

export const CHAPTER_4: Chapter = {
  id: 4,
  kicker: { fr: 'Chapitre 4', en: 'Chapter 4' },
  title: { fr: 'La fête des mères', en: "Mother's Day" },
  intro: {
    fr: "C'est la fête des mères et tu n'as rien prévu. Pendant que ta femme est occupée à laver les enfants dans la salle de bain, tu saisis ta fenêtre : t'éclipser en douce pour filer chercher des roses au marché et lui faire croire que tu y pensais depuis des jours. Traverser la ville, survivre aux transports, fendre le marché, dénicher le bon bouquet et être rentré avant qu'elle ne remarque ton absence.",
    en: "It is Mother's Day and you planned nothing. While your wife is busy bathing the kids, you seize your window: slip out quietly to grab roses at the market and make her believe you had been planning it for days. Cross the city, survive the transit, push through the market, hunt down the right bouquet and be home before she notices you are gone.",
  },
  goal: { fr: 'rapporter les roses à temps', en: 'bring back the roses in time' },
  items: [{ id: 'roses', label: { fr: 'Les roses', en: 'The roses' }, prop: 'roses' }],
  zones: [
    { label: { fr: 'Vers le centre', en: 'Toward downtown' }, steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'Dans les transports', en: 'On transit' }, steps: 4, fillers: TRANSPORT },
    { label: { fr: 'Au marché', en: 'At the market' }, steps: 4, fillers: MARCHE },
    { label: { fr: 'Chez le fleuriste', en: 'At the florist' }, steps: 4, fillers: FLEUR, goals: [ROSES] },
    { label: { fr: 'Rentrer à temps', en: 'Get home in time' }, steps: 4, fillers: STREET },
  ],
  bonuses: [
    { key: 'trottinette', label: { fr: 'Trottinette', en: 'Scooter' }, effect: { temps: 13, energie: -11 }, charges: 3, desc: { fr: '+13 temps, -11 énergie', en: '+13 time, -11 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 3, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 91, energie: 80, argent: 46, moral: 70 },
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

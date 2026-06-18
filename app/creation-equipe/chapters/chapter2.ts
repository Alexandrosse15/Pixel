import type { Chapter, GameEvent } from '../engine'
import { STREET, TRANSPORT, DISTRIBUTEUR } from './shared'

// Zone bureau : se soustraire au travail.
const BUREAU: GameEvent[] = [
  {
    id: 'patron_retard',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'journal',
    title: 'Le patron qui retient',
    text: 'Tu enfiles ton manteau quand le patron débarque : "Deux minutes, ce dossier ne peut pas attendre lundi."',
    choices: [
      { label: 'Subir le brief', effect: { temps: -14, moral: -6 }, result: 'Dix minutes sur un tableau Excel. Tu pars enfin, déjà en retard.' },
      { label: 'Filer en s’excusant', effect: { temps: -3, moral: -4 }, result: '"Urgence familiale !" Tu cours vers l’ascenseur, son regard dans le dos.' },
    ],
  },
  {
    id: 'imprimante',
    sprite: 'papa',
    decor: 'bureau',
    prop: 'journal',
    title: "L'imprimante capricieuse",
    text: 'Un collègue te supplie de l’aider : l’imprimante a avalé son rapport, juste avant que tu partes.',
    choices: [
      { label: 'Débloquer le bourrage', effect: { temps: -8, moral: 4 }, result: 'Mains pleines d’encre, mais sauvé. Il te devra une fière chandelle.' },
      { label: 'Faire l’innocent', effect: { temps: -2, moral: -4 }, result: '"Désolé, je file." Tu l’abandonnes face à la machine récalcitrante.' },
    ],
  },
  {
    id: 'cafe_collegue',
    sprite: 'collegue',
    decor: 'bureau',
    prop: 'cafe',
    title: 'Le café de trop',
    text: 'Près de la sortie, un collègue te tend un café et lance "Alors, ce week-end ?"',
    choices: [
      { label: 'Trinquer trente secondes', effect: { temps: -6, energie: 6, moral: 4 }, result: 'Petit boost caféine et bonne humeur, vite avalé.' },
      { label: 'Décliner et filer', effect: { temps: -1, moral: -2 }, result: 'Tu refuses poliment et files vers l’ascenseur.' },
    ],
  },
  {
    id: 'ascenseur',
    sprite: 'papa',
    decor: 'bureau',
    prop: 'horloge',
    title: "L'ascenseur en rade",
    text: 'L’ascenseur reste bloqué au 6e. Les escaliers, eux, sont juste là, interminables.',
    choices: [
      { label: 'Dévaler les escaliers', effect: { temps: -3, energie: -8 }, result: 'Six étages au sprint. Rapide, mais les cuisses crient.' },
      { label: 'Attendre l’ascenseur', effect: { temps: -10, energie: 3 }, result: 'Il finit par arriver, plein. Reposant mais lent.' },
    ],
  },
  {
    id: 'badge_oublie',
    sprite: 'vigile',
    decor: 'bureau',
    prop: 'etoile',
    title: 'Le badge oublié',
    text: 'Portique de sortie bloqué : ton badge est resté sur le bureau, à l’étage.',
    choices: [
      { label: 'Remonter le chercher', effect: { temps: -9, energie: -4 }, result: 'Aller-retour express. Badge récupéré, temps envolé.' },
      { label: 'Convaincre le gardien', effect: { temps: -5, moral: -3 }, result: 'Tu négocies un passage manuel. Soupçonné, mais dehors.' },
    ],
  },
]

// Zone école : on est enfin sur place.
const ECOLE: GameEvent[] = [
  {
    id: 'parents_grille',
    sprite: 'collegue',
    decor: 'ecole',
    prop: 'cloche',
    title: 'Les parents bavards',
    text: 'Devant l’école, un groupe de parents refait le monde et bloque le passage du portail.',
    choices: [
      { label: 'Fendre poliment', effect: { temps: -4, moral: 2 }, result: '"Pardon, pardon." Tu te faufiles avec un sourire crispé.' },
      { label: 'Causer un instant', effect: { temps: -10, moral: 5 }, result: 'Tu te fais happer par la conversation. Sympa, mais coûteux.' },
    ],
  },
  {
    id: 'doudou_oublie',
    sprite: 'enfant',
    decor: 'ecole',
    prop: 'doudou',
    title: 'Le doudou oublié',
    text: 'Dans la cour, un petit pleure : son doudou est resté dans la classe, à l’étage, et la maîtresse ferme.',
    choices: [
      { label: 'Remonter le chercher', effect: { temps: -9, energie: -5, moral: 10 }, result: 'Doudou retrouvé sous une table. Larmes de joie, héros de la cour.' },
      { label: 'Promettre pour demain', effect: { temps: -2, moral: -5 }, result: 'Tu promets de le récupérer demain. Le petit n’est pas convaincu.' },
    ],
  },
  {
    id: 'maitresse_pressee',
    sprite: 'maitresse',
    decor: 'ecole',
    prop: 'horloge',
    title: 'La maîtresse pressée',
    text: 'La maîtresse tapote sa montre depuis le préau. Elle a un train à prendre, elle aussi.',
    choices: [
      { label: 'T’excuser platement', effect: { temps: -4, moral: -3 }, result: 'Tu enchaînes les excuses. Elle soupire mais patiente encore un peu.' },
      { label: 'Promettre des chocolats', effect: { temps: -5, argent: -4, moral: 4 }, result: 'La promesse d’une boîte de chocolats détend l’ambiance.' },
    ],
  },
]

const GOAL: GameEvent = {
  id: 'grilles_ecole',
  sprite: 'maitresse',
  decor: 'ecole',
  prop: 'enfants',
  title: "Le portail de l'école",
  text: 'Tu y es enfin. La maîtresse attend devant les grilles avec tes deux enfants. La garderie facture chaque minute de retard.',
  choices: [
    { label: 'Payer le retard, t’excuser', effect: { temps: -6, argent: -12, give: ['enfants'] }, result: 'Tu règles la pénalité et embarques les petits. Sauvé, le portefeuille en deuil.' },
    { label: 'Négocier avec un grand sourire', effect: { temps: -9, argent: -5, moral: 3, give: ['enfants'] }, result: 'Charme offensif. Elle lève les yeux au ciel mais réduit la note.' },
    { label: 'Supplier, sans un sou', effect: { temps: -10, moral: -9, give: ['enfants'] }, result: 'Tu n’as rien sur toi. Tu promets de régler lundi. Humiliant, mais les enfants sont là.' },
  ],
}

export const CHAPTER_2: Chapter = {
  id: 2,
  kicker: 'Chapitre 2',
  title: "La sortie d'école",
  intro:
    "16h05. Tu sors à peine du bureau et tu l'as complètement oublié : c'est toi qui récupères les enfants aujourd'hui. Du bureau aux transports, puis dans la rue jusqu'au portail, chaque minute compte. La maîtresse ne garde pas les retardataires bien longtemps.",
  goal: 'récupérer les enfants à temps',
  items: [{ id: 'enfants', label: 'Les enfants', prop: 'enfants' }],
  zones: [
    { label: 'Au bureau', steps: 4, fillers: [...BUREAU, DISTRIBUTEUR] },
    { label: 'Dans les transports', steps: 4, fillers: TRANSPORT },
    { label: 'Dans la rue', steps: 4, fillers: STREET },
    { label: "À l'école", steps: 4, fillers: ECOLE, goals: [GOAL] },
  ],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 2, desc: '+13 temps, -11 énergie' },
    { key: 'sandwich', label: 'Sandwich', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 101, energie: 78, argent: 36, moral: 68 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#56A8FF',
    winGradient: 'linear-gradient(135deg,#2E6FB0,#142436)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'enfant',
    introDecor: 'bureau',
    introSprite: 'patron',
  },
}

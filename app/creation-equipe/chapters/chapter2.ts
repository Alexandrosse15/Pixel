import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Spécifiques au sprint bureau -> école.
const SPECIFIC: GameEvent[] = [
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
    id: 'embouteillage',
    sprite: 'papa',
    decor: 'rue',
    prop: 'feu',
    title: 'Le bouchon de 16h',
    text: 'Pare-chocs contre pare-chocs. La file ne bouge plus depuis trois feux. L’horloge, elle, avance.',
    choices: [
      { label: 'Patienter, fataliste', effect: { temps: -13, energie: 3 }, result: 'Tu ronges ton frein au point mort. Le temps fond.' },
      { label: 'Couper par les petites rues', effect: { temps: -5, energie: -5, moral: -3 }, result: 'Slalom nerveux entre les sens uniques. Plus rapide, plus stressant.' },
    ],
  },
  {
    id: 'metro_panne',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: 'Le métro à quai',
    text: 'Annonce grésillante : "Trafic interrompu sur la ligne." Une foule compacte hésite sur le quai.',
    choices: [
      { label: 'Attendre la reprise', effect: { temps: -12, energie: 5 }, result: 'Le trafic reprend, mais tu as perdu un temps fou.' },
      { label: 'Remonter et courir', effect: { temps: -6, energie: -9 }, result: 'Tu remontes à la surface au pas de course. Les mollets chauffent.' },
    ],
  },
  {
    id: 'parents_grille',
    sprite: 'collegue',
    decor: 'ecole',
    prop: 'cloche',
    title: 'Les parents bavards',
    text: 'Devant l’école, un groupe de parents refait le monde et bloque tout le passage du portail.',
    choices: [
      { label: 'Fendre poliment', effect: { temps: -4, moral: 2 }, result: '"Pardon, pardon." Tu te faufiles avec un sourire crispé.' },
      { label: 'Faire un brin de causette', effect: { temps: -11, moral: 5 }, result: 'Tu te fais happer par la conversation. Sympa, mais coûteux.' },
    ],
  },
  {
    id: 'doudou_oublie',
    sprite: 'enfant',
    decor: 'ecole',
    prop: 'doudou',
    title: 'Le doudou oublié',
    text: 'Un petit pleure : il a oublié son doudou dans la classe, à l’étage, et la maîtresse ferme.',
    choices: [
      { label: 'Remonter le chercher', effect: { temps: -9, energie: -5, moral: 10 }, result: 'Doudou retrouvé sous une table. Larmes de joie, héros de la cour.' },
      { label: 'Promettre pour demain', effect: { temps: -2, moral: -5 }, result: 'Tu promets de le récupérer demain. Le petit n’est pas convaincu.' },
    ],
  },
]

// Objectif final : récupérer les enfants au portail (mission 16).
const GOAL: GameEvent = {
  id: 'grilles_ecole',
  sprite: 'maitresse',
  decor: 'ecole',
  prop: 'enfants',
  title: "Le portail de l'école",
  text: 'Tu y es. La maîtresse poireaute devant les grilles avec tes deux enfants, le regard chargé de reproches. La garderie facture chaque minute de retard.',
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
    "16h05. Tu sors à peine du bureau et tu as complètement oublié : c'est toi qui récupères les enfants à l'école aujourd'hui. La maîtresse ne garde pas les retardataires bien longtemps. Cours.",
  goal: 'récupérer les enfants à temps',
  items: [{ id: 'enfants', label: 'Les enfants', prop: 'enfants' }],
  events: [...STREET, ...SPECIFIC, DISTRIBUTEUR, GOAL],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 2, desc: '+13 temps, -11 énergie' },
    { key: 'sandwich', label: 'Sandwich', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 97, energie: 76, argent: 36, moral: 68 },
  drain: { temps: -3, energie: -2 },
  steps: 16,
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

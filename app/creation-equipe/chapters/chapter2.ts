import type { Chapter, GameEvent } from '../engine'
import { STREET, TRANSPORT, DISTRIBUTEUR } from './shared'

// Zone bureau : se soustraire au travail.
const BUREAU: GameEvent[] = [
  {
    id: 'patron_retard',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'journal',
    title: { fr: 'Le patron qui retient', en: 'The boss who holds you back' },
    text: {
      fr: 'Tu enfiles ton manteau quand le patron débarque : "Deux minutes, ce dossier ne peut pas attendre lundi."',
      en: 'You are pulling on your coat when the boss barges in: "Two minutes, this file cannot wait until Monday."',
    },
    choices: [
      { label: { fr: 'Subir le brief', en: 'Endure the briefing' }, effect: { temps: -14, moral: -6 }, result: { fr: 'Dix minutes sur un tableau Excel. Tu pars enfin, déjà en retard.', en: 'Ten minutes on a spreadsheet. You finally leave, already late.' } },
      { label: { fr: "Filer en s'excusant", en: 'Slip away with apologies' }, effect: { temps: -3, moral: -4 }, result: { fr: '"Urgence familiale !" Tu cours vers l’ascenseur, son regard dans le dos.', en: '"Family emergency!" You bolt for the elevator, his stare on your back.' } },
    ],
  },
  {
    id: 'imprimante',
    sprite: 'papa',
    decor: 'bureau',
    prop: 'journal',
    title: { fr: "L'imprimante capricieuse", en: 'The temperamental printer' },
    text: {
      fr: 'Un collègue te supplie de l’aider : l’imprimante a avalé son rapport, juste avant que tu partes.',
      en: 'A coworker begs for help: the printer just ate his report, right as you were leaving.',
    },
    choices: [
      { label: { fr: 'Débloquer le bourrage', en: 'Clear the paper jam' }, effect: { temps: -8, moral: 4 }, result: { fr: 'Mains pleines d’encre, mais sauvé. Il te devra une fière chandelle.', en: 'Ink all over your hands, but saved. He owes you big.' } },
      { label: { fr: "Faire l'innocent", en: 'Play dumb' }, effect: { temps: -2, moral: -4 }, result: { fr: '"Désolé, je file." Tu l’abandonnes face à la machine récalcitrante.', en: '"Sorry, gotta run." You leave him to the stubborn machine.' } },
    ],
  },
  {
    id: 'cafe_collegue',
    sprite: 'collegue',
    decor: 'bureau',
    prop: 'cafe',
    title: { fr: 'Le café de trop', en: 'One coffee too many' },
    text: {
      fr: 'Près de la sortie, un collègue te tend un café et lance "Alors, ce week-end ?"',
      en: 'By the exit, a coworker hands you a coffee and goes "So, big weekend?"',
    },
    choices: [
      { label: { fr: 'Trinquer trente secondes', en: 'Chat for thirty seconds' }, effect: { temps: -6, energie: 6, moral: 4 }, result: { fr: 'Petit boost caféine et bonne humeur, vite avalé.', en: 'A little caffeine boost and good cheer, gulped down fast.' } },
      { label: { fr: 'Décliner et filer', en: 'Decline and dash' }, effect: { temps: -1, moral: -2 }, result: { fr: 'Tu refuses poliment et files vers l’ascenseur.', en: 'You politely refuse and head for the elevator.' } },
    ],
  },
  {
    id: 'ascenseur',
    sprite: 'papa',
    decor: 'bureau',
    prop: 'horloge',
    title: { fr: "L'ascenseur en rade", en: 'The dead elevator' },
    text: {
      fr: 'L’ascenseur reste bloqué au 6e. Les escaliers, eux, sont juste là, interminables.',
      en: 'The elevator is stuck on the 6th floor. The stairs, meanwhile, are right there, endless.',
    },
    choices: [
      { label: { fr: 'Dévaler les escaliers', en: 'Charge down the stairs' }, effect: { temps: -3, energie: -8 }, result: { fr: 'Six étages au sprint. Rapide, mais les cuisses crient.', en: 'Six floors at a sprint. Fast, but your thighs scream.' } },
      { label: { fr: "Attendre l'ascenseur", en: 'Wait for the elevator' }, effect: { temps: -10, energie: 3 }, result: { fr: 'Il finit par arriver, plein. Reposant mais lent.', en: 'It eventually arrives, full. Restful but slow.' } },
    ],
  },
  {
    id: 'badge_oublie',
    sprite: 'vigile',
    decor: 'bureau',
    prop: 'etoile',
    title: { fr: 'Le badge oublié', en: 'The forgotten badge' },
    text: {
      fr: 'Portique de sortie bloqué : ton badge est resté sur le bureau, à l’étage.',
      en: 'Exit turnstile locked: your badge is still on your desk, upstairs.',
    },
    choices: [
      { label: { fr: 'Remonter le chercher', en: 'Go back up for it' }, effect: { temps: -9, energie: -4 }, result: { fr: 'Aller-retour express. Badge récupéré, temps envolé.', en: 'A quick round trip. Badge recovered, time gone.' } },
      { label: { fr: 'Convaincre le gardien', en: 'Convince the guard' }, effect: { temps: -5, moral: -3 }, result: { fr: 'Tu négocies un passage manuel. Soupçonné, mais dehors.', en: 'You talk your way through manually. Suspected, but outside.' } },
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
    title: { fr: 'Les parents bavards', en: 'The chatty parents' },
    text: {
      fr: 'Devant l’école, un groupe de parents refait le monde et bloque le passage du portail.',
      en: 'Outside the school, a group of parents are putting the world to rights and blocking the gate.',
    },
    choices: [
      { label: { fr: 'Fendre poliment', en: 'Politely push through' }, effect: { temps: -4, moral: 2 }, result: { fr: '"Pardon, pardon." Tu te faufiles avec un sourire crispé.', en: '"Excuse me, excuse me." You squeeze through with a tight smile.' } },
      { label: { fr: 'Causer un instant', en: 'Chat a moment' }, effect: { temps: -10, moral: 5 }, result: { fr: 'Tu te fais happer par la conversation. Sympa, mais coûteux.', en: 'You get sucked into the conversation. Nice, but costly.' } },
    ],
  },
  {
    id: 'doudou_oublie',
    sprite: 'enfant',
    decor: 'ecole',
    prop: 'doudou',
    title: { fr: 'Le doudou oublié', en: 'The forgotten stuffie' },
    text: {
      fr: 'Dans la cour, un petit pleure : son doudou est resté dans la classe, à l’étage, et la maîtresse ferme.',
      en: 'In the yard, a little one cries: their stuffie is still in the classroom upstairs, and the teacher is locking up.',
    },
    choices: [
      { label: { fr: 'Remonter le chercher', en: 'Go up and fetch it' }, effect: { temps: -9, energie: -5, moral: 10 }, result: { fr: 'Doudou retrouvé sous une table. Larmes de joie, héros de la cour.', en: 'Stuffie found under a desk. Tears of joy, hero of the yard.' } },
      { label: { fr: 'Promettre pour demain', en: 'Promise for tomorrow' }, effect: { temps: -2, moral: -5 }, result: { fr: 'Tu promets de le récupérer demain. Le petit n’est pas convaincu.', en: 'You promise to get it tomorrow. The kid is not convinced.' } },
    ],
  },
  {
    id: 'maitresse_pressee',
    sprite: 'maitresse',
    decor: 'ecole',
    prop: 'horloge',
    title: { fr: 'La maîtresse pressée', en: 'The teacher in a hurry' },
    text: {
      fr: 'La maîtresse tapote sa montre depuis le préau. Elle a un train à prendre, elle aussi.',
      en: 'The teacher taps her watch from the covered yard. She has a train to catch too.',
    },
    choices: [
      { label: { fr: "T'excuser platement", en: 'Grovel an apology' }, effect: { temps: -4, moral: -3 }, result: { fr: 'Tu enchaînes les excuses. Elle soupire mais patiente encore un peu.', en: 'You string together apologies. She sighs but waits a bit longer.' } },
      { label: { fr: 'Promettre des chocolats', en: 'Promise chocolates' }, effect: { temps: -5, argent: -4, moral: 4 }, result: { fr: 'La promesse d’une boîte de chocolats détend l’ambiance.', en: 'The promise of a box of chocolates eases the mood.' } },
    ],
  },
]

const GOAL: GameEvent = {
  id: 'grilles_ecole',
  sprite: 'maitresse',
  decor: 'ecole',
  prop: 'enfants',
  title: { fr: "Le portail de l'école", en: 'The school gate' },
  text: {
    fr: 'Tu y es enfin. La maîtresse attend devant les grilles avec tes deux enfants. La garderie facture chaque minute de retard.',
    en: 'You finally make it. The teacher waits at the gate with your two kids. After-care charges for every late minute.',
  },
  choices: [
    { label: { fr: "Payer le retard, t'excuser", en: 'Pay the late fee, apologize' }, effect: { temps: -6, argent: -12, give: ['enfants'] }, result: { fr: 'Tu règles la pénalité et embarques les petits. Sauvé, le portefeuille en deuil.', en: 'You pay the penalty and grab the kids. Saved, wallet in mourning.' } },
    { label: { fr: 'Négocier avec un grand sourire', en: 'Negotiate with a big smile' }, effect: { temps: -9, argent: -5, moral: 3, give: ['enfants'] }, result: { fr: 'Charme offensif. Elle lève les yeux au ciel mais réduit la note.', en: 'Charm offensive. She rolls her eyes but trims the bill.' } },
    { label: { fr: 'Supplier, sans un sou', en: 'Beg, penniless' }, effect: { temps: -10, moral: -9, give: ['enfants'] }, result: { fr: 'Tu n’as rien sur toi. Tu promets de régler lundi. Humiliant, mais les enfants sont là.', en: 'You have nothing on you. You promise to pay Monday. Humiliating, but the kids are here.' } },
  ],
}

export const CHAPTER_2: Chapter = {
  id: 2,
  kicker: { fr: 'Chapitre 2', en: 'Chapter 2' },
  title: { fr: "La sortie d'école", en: 'The school pickup' },
  intro: {
    fr: "16h05. Tu sors à peine du bureau et tu l'as complètement oublié : c'est toi qui récupères les enfants aujourd'hui. Du bureau aux transports, puis dans la rue jusqu'au portail, chaque minute compte. La maîtresse ne garde pas les retardataires bien longtemps.",
    en: "4:05pm. You have barely left the office and you completely forgot: it is your turn to pick up the kids today. From the office to public transit, then through the streets to the gate, every minute counts. The teacher does not keep latecomers for long.",
  },
  goal: { fr: 'récupérer les enfants à temps', en: 'pick up the kids in time' },
  items: [{ id: 'enfants', label: { fr: 'Les enfants', en: 'The kids' }, prop: 'enfants' }],
  zones: [
    { label: { fr: 'Au bureau', en: 'At the office' }, steps: 4, fillers: [...BUREAU, DISTRIBUTEUR] },
    { label: { fr: 'Dans les transports', en: 'On transit' }, steps: 4, fillers: TRANSPORT },
    { label: { fr: 'Dans la rue', en: 'In the street' }, steps: 4, fillers: STREET },
    { label: { fr: "À l'école", en: 'At the school' }, steps: 4, fillers: ECOLE, goals: [GOAL] },
  ],
  bonuses: [
    { key: 'trottinette', label: { fr: 'Trottinette', en: 'Scooter' }, effect: { temps: 13, energie: -11 }, charges: 2, desc: { fr: '+13 temps, -11 énergie', en: '+13 time, -11 energy' } },
    { key: 'sandwich', label: { fr: 'Sandwich', en: 'Sandwich' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
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

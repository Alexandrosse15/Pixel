import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : le réveil catastrophe.
const REVEIL: GameEvent[] = [
  {
    id: 'reveil_panne',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'horloge',
    title: { fr: 'Le réveil traître', en: 'The treacherous alarm' },
    text: {
      fr: 'Tu ouvres un oeil : le réveil n’a pas sonné. Il te reste un quart du temps que tu croyais avoir.',
      en: 'You open one eye: the alarm never rang. You have a quarter of the time you thought you had.',
    },
    choices: [
      { label: { fr: 'Te préparer en mode commando', en: 'Get ready commando-style' }, effect: { temps: -3, energie: -8 }, result: { fr: 'Douche éclair, dents brossées en marchant. Opérationnel, à bout de souffle.', en: 'Lightning shower, teeth brushed on the move. Operational, out of breath.' } },
      { label: { fr: 'Soigner ta présentation', en: 'Polish your look' }, effect: { temps: -9, moral: 5 }, result: { fr: 'Rasé de près, coiffé. Impeccable, mais le chrono tourne.', en: 'Close shave, hair done. Flawless, but the clock is ticking.' } },
    ],
  },
  {
    id: 'cafe_renverse',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cafe',
    title: { fr: 'Le café sur la chemise', en: 'Coffee on the shirt' },
    text: {
      fr: 'Geste malheureux : le café se renverse pile sur ta chemise blanche du jour J.',
      en: 'One clumsy move: the coffee spills right onto your white big-day shirt.',
    },
    choices: [
      { label: { fr: 'Changer de chemise', en: 'Change shirts' }, effect: { temps: -6, moral: -2 }, result: { fr: 'Tu enfiles la chemise de secours. Un peu froissée, mais propre.', en: 'You throw on the backup shirt. A bit creased, but clean.' } },
      { label: { fr: 'Tamponner et espérer', en: 'Dab and hope' }, effect: { temps: -3, moral: -5 }, result: { fr: 'Une auréole pâle subsiste. Tu mettras la veste fermée.', en: 'A faint ring remains. You will keep the jacket buttoned.' } },
    ],
  },
  {
    id: 'cravate',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: { fr: 'Le noeud de cravate', en: 'The tie knot' },
    text: {
      fr: 'Tes doigts ont oublié comment on fait un noeud de cravate. Tutoriel ou instinct ?',
      en: 'Your fingers have forgotten how to tie a tie. Tutorial or instinct?',
    },
    choices: [
      { label: { fr: 'Suivre un tuto en vitesse', en: 'Follow a quick tutorial' }, effect: { temps: -7, moral: 3 }, result: { fr: 'Noeud Windsor parfait au troisième essai. Classe restaurée.', en: 'Perfect Windsor knot on the third try. Class restored.' } },
      { label: { fr: 'Improviser un noeud bancal', en: 'Wing a lopsided knot' }, effect: { temps: -2, moral: -3 }, result: { fr: 'Un noeud asymétrique, façon ado au mariage. Bon, ça tient.', en: 'A lopsided knot, like a teen at a wedding. Well, it holds.' } },
    ],
  },
  {
    id: 'cles_maison',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: { fr: 'Les clés disparues', en: 'The vanished keys' },
    text: {
      fr: 'Impossible de remettre la main sur tes clés. La porte ne se fermera pas toute seule.',
      en: 'You cannot find your keys anywhere. The door will not lock itself.',
    },
    choices: [
      { label: { fr: 'Fouille express', en: 'Quick search' }, effect: { temps: -7 }, result: { fr: 'Retrouvées dans la poche de la veste d’hier. Évidemment.', en: "Found in yesterday's jacket pocket. Of course." } },
      { label: { fr: 'Cacher la clé sous le pot', en: 'Hide a key under the pot' }, effect: { temps: -2, moral: -2 }, result: { fr: 'Tu pars sans, en planquant le double. Risqué mais rapide.', en: 'You leave without, stashing the spare. Risky but fast.' } },
    ],
  },
]

// Zone pressing + objectif.
const PRESSING: GameEvent[] = [
  {
    id: 'ticket_pressing',
    sprite: 'caissier',
    decor: 'pressing',
    prop: 'ticket',
    title: { fr: 'Le ticket égaré', en: 'The lost ticket' },
    text: {
      fr: '"Sans le ticket, je ne peux rien vous rendre, monsieur." Tu retournes tes poches, fébrile.',
      en: '"Without the ticket, I cannot return anything, sir." You turn out your pockets, frantic.',
    },
    choices: [
      { label: { fr: 'Décrire le costume en détail', en: 'Describe the suit in detail' }, effect: { temps: -8, moral: 2 }, result: { fr: 'À force de précisions, il retrouve ta housse. Soulagement.', en: 'With enough detail, he finds your garment bag. Relief.' } },
      { label: { fr: 'Retrouver le ticket froissé', en: 'Find the crumpled ticket' }, effect: { temps: -5 }, result: { fr: 'Le voilà, en boule au fond de la poche. Sauvé.', en: 'There it is, balled up at the bottom of your pocket. Saved.' } },
    ],
  },
  {
    id: 'tache_costume',
    sprite: 'caissier',
    decor: 'pressing',
    prop: 'croix',
    title: { fr: 'La tache fantôme', en: 'The ghost stain' },
    text: {
      fr: '"On a fait au mieux, mais il reste une petite marque sur le revers..." Le pressing s’excuse à moitié.',
      en: '"We did our best, but there is still a small mark on the lapel..." The cleaner half-apologizes.',
    },
    choices: [
      { label: { fr: 'Exiger un repassage express', en: 'Demand an express press' }, effect: { temps: -9, moral: 3 }, result: { fr: 'Un coup de vapeur supplémentaire et la marque s’estompe.', en: 'One more burst of steam and the mark fades.' } },
      { label: { fr: 'Tant pis, la veste fermée', en: 'Never mind, jacket closed' }, effect: { temps: -2, moral: -3 }, result: { fr: 'Tu prends tel quel. Personne ne verra le revers, espérons.', en: 'You take it as is. Nobody will see the lapel, hopefully.' } },
    ],
  },
  {
    id: 'file_pressing',
    sprite: 'mamie',
    decor: 'pressing',
    prop: 'ticket',
    title: { fr: 'La cliente interminable', en: 'The endless customer' },
    text: {
      fr: 'Devant toi, une dame conteste une note de nettoyage de rideaux, point par point.',
      en: 'Ahead of you, a lady disputes a curtain-cleaning bill, point by point.',
    },
    choices: [
      { label: { fr: 'Patienter poliment', en: 'Wait politely' }, effect: { temps: -11, moral: -2 }, result: { fr: 'Le débat sur les rideaux n’en finit pas. Tu bous intérieurement.', en: 'The curtain debate never ends. You boil inside.' } },
      { label: { fr: 'Demander à passer, urgence', en: 'Ask to skip ahead, urgent' }, effect: { temps: -4, moral: -3 }, result: { fr: 'Tu invoques l’entretien. La dame râle, l’employé t’avance.', en: 'You invoke the interview. The lady grumbles, the clerk bumps you up.' } },
    ],
  },
]

const COSTUME: GameEvent = {
  id: 'le_costume',
  sprite: 'caissier',
  decor: 'pressing',
  prop: 'costume',
  title: { fr: 'Le costume', en: 'The suit' },
  text: {
    fr: 'Sous la housse plastique, ton costume impeccable, fraîchement pressé. Reste à régler et à l’enfiler.',
    en: 'Under the plastic cover, your flawless suit, freshly pressed. Just pay and put it on.',
  },
  choices: [
    { label: { fr: "Régler et l'enfiler ici", en: 'Pay and change here' }, effect: { temps: -6, argent: -14, give: ['costume'] }, result: { fr: 'Tu te changes dans la cabine. Te voilà transformé en candidat sérieux.', en: 'You change in the booth. Now you look like a serious candidate.' } },
    { label: { fr: 'Option pressage minute', en: 'One-minute press option' }, effect: { temps: -9, argent: -20, moral: 4, give: ['costume'] }, result: { fr: 'Un dernier coup de fer parfait. Aucun pli ne résiste. Impeccable.', en: 'One last perfect press. No crease survives. Immaculate.' } },
    { label: { fr: 'Récupérer sans payer le surplus', en: 'Take it, skip the surcharge' }, effect: { temps: -10, moral: -6, give: ['costume'] }, result: { fr: 'Tu contestes un supplément, faute de budget. Pénible, mais costume en main.', en: 'You dispute a surcharge, short on budget. Painful, but suit in hand.' } },
  ],
}

// Zone : la salle d'attente du recruteur.
const ENTRETIEN: GameEvent[] = [
  {
    id: 'salle_attente',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'horloge',
    title: { fr: "La salle d'attente", en: 'The waiting room' },
    text: {
      fr: 'L’assistante t’annonce "Il finit un appel, ce ne sera pas long." Long est un mot relatif.',
      en: 'The assistant tells you "He is finishing a call, it will not be long." Long is a relative word.',
    },
    choices: [
      { label: { fr: 'Réviser tes arguments', en: 'Rehearse your points' }, effect: { temps: -8, moral: 6 }, result: { fr: 'Tu repasses ton pitch en silence. Prêt à dégainer.', en: 'You run your pitch in silence. Ready to fire.' } },
      { label: { fr: "Stresser en regardant l'heure", en: 'Stress at the clock' }, effect: { temps: -5, moral: -5 }, result: { fr: 'Tu fixes la pendule, paume moite. Le doute s’installe.', en: 'You stare at the clock, palms sweaty. Doubt creeps in.' } },
    ],
  },
  {
    id: 'concurrent',
    sprite: 'collegue',
    decor: 'bureau',
    prop: 'costume',
    title: { fr: "Le candidat d'avant", en: 'The previous candidate' },
    text: {
      fr: 'Le candidat précédent ressort tout sourire, costume trois pièces et poignée de main ferme.',
      en: 'The previous candidate walks out all smiles, three-piece suit and a firm handshake.',
    },
    choices: [
      { label: { fr: 'Te recentrer sur toi', en: 'Refocus on yourself' }, effect: { temps: -4, moral: 4 }, result: { fr: 'Tu chasses la comparaison. Ta valeur ne dépend pas de la sienne.', en: 'You banish the comparison. Your worth does not depend on his.' } },
      { label: { fr: 'Te laisser déstabiliser', en: 'Let it rattle you' }, effect: { temps: -3, moral: -6 }, result: { fr: 'Le doute te ronge. Pas l’idéal juste avant d’entrer.', en: 'Doubt gnaws at you. Not ideal right before going in.' } },
    ],
  },
  {
    id: 'cafe_machine_rh',
    sprite: 'vigile',
    decor: 'bureau',
    prop: 'cafe',
    title: { fr: 'Le café de courtoisie', en: 'The courtesy coffee' },
    text: {
      fr: 'On te propose un café. La machine, capricieuse, menace ta belle chemise une seconde fois.',
      en: 'You are offered a coffee. The temperamental machine threatens your nice shirt a second time.',
    },
    choices: [
      { label: { fr: 'Accepter prudemment', en: 'Accept carefully' }, effect: { temps: -4, energie: 7 }, result: { fr: 'Gobelet maîtrisé, gorgée revigorante. Aucune tache, cette fois.', en: 'Cup under control, a reviving sip. No stain this time.' } },
      { label: { fr: 'Refuser pour ne rien risquer', en: 'Refuse to be safe' }, effect: { temps: -2, moral: 2 }, result: { fr: 'Tu déclines poliment. Zéro risque, mains libres.', en: 'You politely decline. Zero risk, hands free.' } },
    ],
  },
  {
    id: 'formulaire_rh',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'journal',
    title: { fr: 'Le questionnaire surprise', en: 'The surprise questionnaire' },
    text: {
      fr: 'On te tend un formulaire à remplir "pour le dossier" pendant que tu patientes. Trois pages, stylo qui bave.',
      en: 'They hand you a form to fill out "for the file" while you wait. Three pages, a leaky pen.',
    },
    choices: [
      { label: { fr: 'Remplir soigneusement', en: 'Fill it in carefully' }, effect: { temps: -7, moral: 4 }, result: { fr: 'Dossier nickel, écriture lisible. Bonne première impression.', en: 'Spotless file, legible writing. Good first impression.' } },
      { label: { fr: 'Cocher au plus vite', en: 'Tick boxes fast' }, effect: { temps: -3, moral: -2 }, result: { fr: 'Tu bâcles deux cases. On verra bien.', en: 'You botch a couple of boxes. We will see.' } },
    ],
  },
]

export const CHAPTER_9: Chapter = {
  id: 9,
  kicker: { fr: 'Chapitre 9', en: 'Chapter 9' },
  title: { fr: "L'entretien d'embauche", en: 'The job interview' },
  intro: {
    fr: "L'entretien de ta vie est dans une heure, ton costume dort au pressing, et ton réveil t'a lâché. Il faut sortir nickel, récupérer le costume, traverser la ville et arriver pile à l'heure, frais et sûr de toi. Aucune place pour l'erreur.",
    en: 'The interview of your life is in an hour, your suit is sleeping at the dry cleaner, and your alarm let you down. You have to step out spotless, pick up the suit, cross the city and arrive right on time, fresh and confident. No room for error.',
  },
  goal: { fr: "arriver à l'entretien en costume", en: 'reach the interview in your suit' },
  items: [{ id: 'costume', label: { fr: 'Le costume', en: 'The suit' }, prop: 'costume' }],
  zones: [
    { label: { fr: 'Réveil en retard', en: 'Late wake-up' }, steps: 4, fillers: [...REVEIL, DISTRIBUTEUR] },
    { label: { fr: 'Au pressing', en: 'At the dry cleaner' }, steps: 4, fillers: PRESSING, goals: [COSTUME] },
    { label: { fr: 'En route', en: 'On the way' }, steps: 4, fillers: STREET },
    { label: { fr: 'Devant le recruteur', en: 'Before the recruiter' }, steps: 4, fillers: ENTRETIEN },
  ],
  bonuses: [
    { key: 'trottinette', label: { fr: 'Trottinette', en: 'Scooter' }, effect: { temps: 13, energie: -11 }, charges: 2, desc: { fr: '+13 temps, -11 énergie', en: '+13 time, -11 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 88, energie: 74, argent: 42, moral: 64 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#5A7AA0',
    winGradient: 'linear-gradient(135deg,#34557A,#141d28)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'patron',
    introDecor: 'bureau',
    introSprite: 'patron',
  },
}

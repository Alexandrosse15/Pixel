import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : le réveil catastrophe.
const REVEIL: GameEvent[] = [
  {
    id: 'reveil_panne',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'horloge',
    title: 'Le réveil traître',
    text: 'Tu ouvres un oeil : le réveil n’a pas sonné. Il te reste un quart du temps que tu croyais avoir.',
    choices: [
      { label: 'Te préparer en mode commando', effect: { temps: -3, energie: -8 }, result: 'Douche éclair, dents brossées en marchant. Opérationnel, à bout de souffle.' },
      { label: 'Soigner ta présentation', effect: { temps: -9, moral: 5 }, result: 'Rasé de près, coiffé. Impeccable, mais le chrono tourne.' },
    ],
  },
  {
    id: 'cafe_renverse',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cafe',
    title: 'Le café sur la chemise',
    text: 'Geste malheureux : le café se renverse pile sur ta chemise blanche du jour J.',
    choices: [
      { label: 'Changer de chemise', effect: { temps: -6, moral: -2 }, result: 'Tu enfiles la chemise de secours. Un peu froissée, mais propre.' },
      { label: 'Tamponner et espérer', effect: { temps: -3, moral: -5 }, result: 'Une auréole pâle subsiste. Tu mettras la veste fermée.' },
    ],
  },
  {
    id: 'cravate',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: 'Le noeud de cravate',
    text: 'Tes doigts ont oublié comment on fait un noeud de cravate. Tutoriel ou instinct ?',
    choices: [
      { label: 'Suivre un tuto en vitesse', effect: { temps: -7, moral: 3 }, result: 'Noeud Windsor parfait au troisième essai. Classe restaurée.' },
      { label: 'Improviser un noeud bancal', effect: { temps: -2, moral: -3 }, result: 'Un noeud asymétrique, façon ado au mariage. Bon, ça tient.' },
    ],
  },
  {
    id: 'cles_maison',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'cles',
    title: 'Les clés disparues',
    text: 'Impossible de remettre la main sur tes clés. La porte ne se fermera pas toute seule.',
    choices: [
      { label: 'Fouille express', effect: { temps: -7 }, result: 'Retrouvées dans la poche de la veste d’hier. Évidemment.' },
      { label: 'Cacher la clé sous le pot', effect: { temps: -2, moral: -2 }, result: 'Tu pars sans, en planquant le double. Risqué mais rapide.' },
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
    title: 'Le ticket égaré',
    text: '"Sans le ticket, je ne peux rien vous rendre, monsieur." Tu retournes tes poches, fébrile.',
    choices: [
      { label: 'Décrire le costume en détail', effect: { temps: -8, moral: 2 }, result: 'À force de précisions, il retrouve ta housse. Soulagement.' },
      { label: 'Retrouver le ticket froissé', effect: { temps: -5 }, result: 'Le voilà, en boule au fond de la poche. Sauvé.' },
    ],
  },
  {
    id: 'tache_costume',
    sprite: 'caissier',
    decor: 'pressing',
    prop: 'croix',
    title: 'La tache fantôme',
    text: '"On a fait au mieux, mais il reste une petite marque sur le revers..." Le pressing s’excuse à moitié.',
    choices: [
      { label: 'Exiger un repassage express', effect: { temps: -9, moral: 3 }, result: 'Un coup de vapeur supplémentaire et la marque s’estompe.' },
      { label: 'Tant pis, la veste fermée', effect: { temps: -2, moral: -3 }, result: 'Tu prends tel quel. Personne ne verra le revers, espérons.' },
    ],
  },
  {
    id: 'file_pressing',
    sprite: 'mamie',
    decor: 'pressing',
    prop: 'ticket',
    title: 'La cliente interminable',
    text: 'Devant toi, une dame conteste une note de nettoyage de rideaux, point par point.',
    choices: [
      { label: 'Patienter poliment', effect: { temps: -11, moral: -2 }, result: 'Le débat sur les rideaux n’en finit pas. Tu bous intérieurement.' },
      { label: 'Demander à passer, urgence', effect: { temps: -4, moral: -3 }, result: 'Tu invoques l’entretien. La dame râle, l’employé t’avance.' },
    ],
  },
]

const COSTUME: GameEvent = {
  id: 'le_costume',
  sprite: 'caissier',
  decor: 'pressing',
  prop: 'costume',
  title: 'Le costume',
  text: 'Sous la housse plastique, ton costume impeccable, fraîchement pressé. Reste à régler et à l’enfiler.',
  choices: [
    { label: 'Régler et l’enfiler ici', effect: { temps: -6, argent: -14, give: ['costume'] }, result: 'Tu te changes dans la cabine. Te voilà transformé en candidat sérieux.' },
    { label: 'Option pressage minute', effect: { temps: -9, argent: -20, moral: 4, give: ['costume'] }, result: 'Un dernier coup de fer parfait. Aucun pli ne résiste. Impeccable.' },
    { label: 'Récupérer sans payer le surplus', effect: { temps: -10, moral: -6, give: ['costume'] }, result: 'Tu contestes un supplément, faute de budget. Pénible, mais costume en main.' },
  ],
}

// Zone : la salle d'attente du recruteur.
const ENTRETIEN: GameEvent[] = [
  {
    id: 'salle_attente',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'horloge',
    title: "La salle d'attente",
    text: 'L’assistante t’annonce "Il finit un appel, ce ne sera pas long." Long est un mot relatif.',
    choices: [
      { label: 'Réviser tes arguments', effect: { temps: -8, moral: 6 }, result: 'Tu repasses ton pitch en silence. Prêt à dégainer.' },
      { label: 'Stresser en regardant l’heure', effect: { temps: -5, moral: -5 }, result: 'Tu fixes la pendule, paume moite. Le doute s’installe.' },
    ],
  },
  {
    id: 'concurrent',
    sprite: 'collegue',
    decor: 'bureau',
    prop: 'costume',
    title: 'Le candidat d’avant',
    text: 'Le candidat précédent ressort tout sourire, costume trois pièces et poignée de main ferme.',
    choices: [
      { label: 'Te recentrer sur toi', effect: { temps: -4, moral: 4 }, result: 'Tu chasses la comparaison. Ta valeur ne dépend pas de la sienne.' },
      { label: 'Te laisser déstabiliser', effect: { temps: -3, moral: -6 }, result: 'Le doute te ronge. Pas l’idéal juste avant d’entrer.' },
    ],
  },
  {
    id: 'cafe_machine_rh',
    sprite: 'vigile',
    decor: 'bureau',
    prop: 'cafe',
    title: 'Le café de courtoisie',
    text: 'On te propose un café. La machine, capricieuse, menace ta belle chemise une seconde fois.',
    choices: [
      { label: 'Accepter prudemment', effect: { temps: -4, energie: 7 }, result: 'Gobelet maîtrisé, gorgée revigorante. Aucune tache, cette fois.' },
      { label: 'Refuser pour ne rien risquer', effect: { temps: -2, moral: 2 }, result: 'Tu déclines poliment. Zéro risque, mains libres.' },
    ],
  },
  {
    id: 'formulaire_rh',
    sprite: 'patron',
    decor: 'bureau',
    prop: 'journal',
    title: 'Le questionnaire surprise',
    text: 'On te tend un formulaire à remplir "pour le dossier" pendant que tu patientes. Trois pages, stylo qui bave.',
    choices: [
      { label: 'Remplir soigneusement', effect: { temps: -7, moral: 4 }, result: 'Dossier nickel, écriture lisible. Bonne première impression.' },
      { label: 'Cocher au plus vite', effect: { temps: -3, moral: -2 }, result: 'Tu bâcles deux cases. On verra bien.' },
    ],
  },
]

export const CHAPTER_9: Chapter = {
  id: 9,
  kicker: 'Chapitre 9',
  title: "L'entretien d'embauche",
  intro:
    "L'entretien de ta vie est dans une heure, ton costume dort au pressing, et ton réveil t'a lâché. Il faut sortir nickel, récupérer le costume, traverser la ville et arriver pile à l'heure, frais et sûr de toi. Aucune place pour l'erreur.",
  goal: "arriver à l'entretien en costume",
  items: [{ id: 'costume', label: 'Le costume', prop: 'costume' }],
  zones: [
    { label: 'Réveil en retard', steps: 4, fillers: [...REVEIL, DISTRIBUTEUR] },
    { label: 'Au pressing', steps: 4, fillers: PRESSING, goals: [COSTUME] },
    { label: 'En route', steps: 4, fillers: STREET },
    { label: 'Devant le recruteur', steps: 4, fillers: ENTRETIEN },
  ],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 2, desc: '+13 temps, -11 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 2, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 86, energie: 73, argent: 42, moral: 64 },
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

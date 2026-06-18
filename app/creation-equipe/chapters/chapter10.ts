import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

const PACK: GameEvent[] = [
  {
    id: 'valise_bouclee',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'valise',
    title: 'La valise qui ne ferme pas',
    text: 'Tu as trop pris, comme toujours. La fermeture éclair refuse de se rejoindre.',
    choices: [
      { label: 'T’asseoir dessus de tout ton poids', effect: { temps: -5, energie: -6 }, result: 'Au prix d’un effort indigne, la valise capitule. Fermée.' },
      { label: 'Sortir deux trucs inutiles', effect: { temps: -7, moral: 2 }, result: 'Tu sacrifies le troisième chargeur et le guide papier. Plus léger.' },
    ],
  },
  {
    id: 'liquides',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'eau',
    title: 'La règle des 100 ml',
    text: 'Trousse de toilette : ton dentifrice fait 125 ml. La sécurité ne pardonne pas ce genre d’affront.',
    choices: [
      { label: 'Tout reconditionner', effect: { temps: -8, moral: 3 }, result: 'Mini-flacons, sachet zippé transparent. Conforme au millilitre.' },
      { label: 'Parier que ça passe', effect: { temps: -2, moral: -3 }, result: 'Tu laisses le tube format géant. Roulette russe au portique.' },
    ],
  },
  {
    id: 'taxi_attend',
    sprite: 'vigile',
    decor: 'rue',
    prop: 'carte',
    title: 'Le taxi qui klaxonne',
    text: 'Le taxi est en bas, compteur tournant, et tu cherches encore ton deuxième mocassin.',
    choices: [
      { label: 'Descendre en sautillant', effect: { temps: -3, energie: -4 }, result: 'Une chaussure au pied, l’autre à la main. Dans le taxi, enfin.' },
      { label: 'Tout reprendre calmement', effect: { temps: -8, moral: 4 }, result: 'Tu vérifies billets, passeport, clés. Méthodique, mais lent.' },
    ],
  },
  {
    id: 'embouteillage_aero',
    sprite: 'papa',
    decor: 'rue',
    prop: 'feu',
    title: "L'autoroute figée",
    text: 'Bouchon monstre sur la voie de l’aéroport. Le chauffeur tente une sortie hasardeuse.',
    choices: [
      { label: 'Faire confiance au raccourci', effect: { temps: 5, energie: -3, moral: -3 }, result: 'Petites routes, virages secs, mais tu regagnes du temps.' },
      { label: 'Rester sur l’autoroute', effect: { temps: -12 }, result: 'Tu avances au pas, klaxons en fond. Le temps s’effrite.' },
    ],
  },
]

const CHECKIN: GameEvent[] = [
  {
    id: 'file_enregistrement',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'ticket',
    title: "Le comptoir d'enregistrement",
    text: 'Une file serpente jusqu’aux portes. Au comptoir, un voyageur conteste son surclassement.',
    choices: [
      { label: 'Patienter dans la file', effect: { temps: -12, moral: -2 }, result: 'Tu avances centimètre par centimètre. Patience à toute épreuve.' },
      { label: 'Tenter la borne automatique', effect: { temps: -5, energie: -3 }, result: 'La borne imprime ta carte d’embarquement. Gain de temps net.' },
    ],
  },
  {
    id: 'bagage_surpoids',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'valise',
    title: 'Le bagage trop lourd',
    text: 'La balance affiche 24 kg. "Limite 23, monsieur. Supplément ou vous retirez des affaires."',
    choices: [
      { label: 'Payer le surpoids', effect: { temps: -5, argent: -16 }, result: 'Tu règles le supplément en grinçant des dents. Bagage accepté.' },
      { label: 'Redistribuer dans le sac cabine', effect: { temps: -9, energie: -4, moral: 2 }, result: 'Tu transvases en pleine zone d’embarquement. Acrobatique mais gratuit.' },
    ],
  },
  {
    id: 'siege_hublot',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'billet',
    title: 'La place attribuée',
    text: '"Il ne reste qu’un siège au milieu, dernière rangée, près des toilettes." Le sort s’acharne.',
    choices: [
      { label: 'Accepter sans broncher', effect: { temps: -2, moral: -3 }, result: 'Tu prends ce qu’on te donne. L’essentiel est d’embarquer.' },
      { label: 'Négocier un meilleur siège', effect: { temps: -7, moral: 3 }, result: 'À force de sourire, tu décroches un couloir. Petite victoire.' },
    ],
  },
  {
    id: 'borne_enregistrement',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'billet',
    title: 'La borne récalcitrante',
    text: 'La borne automatique scanne ton passeport, réfléchit longuement, puis affiche "Voir un agent".',
    choices: [
      { label: 'Réessayer calmement', effect: { temps: -6, moral: -2 }, result: 'Au troisième scan, la carte d’embarquement sort enfin.' },
      { label: 'Filer voir un agent', effect: { temps: -8, energie: -2 }, result: 'L’agent règle ça en deux clics. Plus sûr, plus lent.' },
    ],
  },
]

const SECURITE: GameEvent[] = [
  {
    id: 'file_securite',
    sprite: 'mamie',
    decor: 'aeroport',
    prop: 'ticket',
    title: 'Le contrôle bondé',
    text: 'Le poste de sécurité est saturé. Une seule file ouverte, et un groupe scolaire devant toi.',
    choices: [
      { label: 'Suivre le flux', effect: { temps: -13, moral: -2 }, result: 'Tu avances dans la cohue des cartables. Lent mais sûr.' },
      { label: 'Repérer la file rapide', effect: { temps: -6, energie: -3 }, result: 'Tu déniches une file business presque vide. Coup d’oeil payant.' },
    ],
  },
  {
    id: 'portique',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'croix',
    title: 'Le portique qui sonne',
    text: 'Bip. Tu avais oublié la ceinture, les clés, la monnaie et la boucle de sac. Demi-tour.',
    choices: [
      { label: 'Tout vider, méthodique', effect: { temps: -8, moral: 2 }, result: 'Bac après bac, tu passes au deuxième essai. Net.' },
      { label: 'Repasser en vitesse', effect: { temps: -4, energie: -4, moral: -3 }, result: 'Tu bipes encore une fois. L’agent soupire et te palpe.' },
    ],
  },
  {
    id: 'liquide_confisque',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'eau',
    title: 'La fouille du sac',
    text: 'L’agent extrait de ton sac la bouteille d’eau que tu venais d’acheter. "Interdite au-delà du portique."',
    choices: [
      { label: 'La boire d’un trait', effect: { temps: -4, energie: 4 }, result: 'Cul sec héroïque. Hydraté et réglementaire.' },
      { label: 'L’abandonner sans discuter', effect: { temps: -2, moral: -2 }, result: 'Tu sacrifies la bouteille. Quatre euros aux oubliettes.' },
    ],
  },
  {
    id: 'bac_plateau',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'valise',
    title: 'Les bacs à plateaux',
    text: 'Ordinateur à sortir, manteau, ceinture, sac... et plus un seul bac libre sur le tapis.',
    choices: [
      { label: 'Tout organiser vite', effect: { temps: -6, energie: -3 }, result: 'Trois bacs bien rangés. Tu passes sans encombre.' },
      { label: 'Empiler en vrac', effect: { temps: -3, moral: -3 }, result: 'Le scanner bloque sur ton sac mal rangé. Re-contrôle.' },
    ],
  },
]

const PORTE: GameEvent[] = [
  {
    id: 'porte_changee',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'croix',
    title: 'Le changement de porte',
    text: 'L’écran clignote : embarquement déplacé porte B47. Tu es porte A12. À l’autre bout du terminal.',
    choices: [
      { label: 'Sprinter jusqu’à B47', effect: { temps: -4, energie: -11 }, result: 'Course folle entre les boutiques duty-free. Poumons en feu.' },
      { label: 'Prendre le tapis roulant', effect: { temps: -8, energie: -3 }, result: 'Le tapis t’avance, lentement mais sûrement. Repos forcé.' },
    ],
  },
  {
    id: 'tapis_roulant',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'horloge',
    title: 'Le couloir interminable',
    text: 'Le terminal s’étire sur un kilomètre de moquette et d’annonces multilingues anxiogènes.',
    choices: [
      { label: 'Marcher d’un pas vif', effect: { temps: -6, energie: -5 }, result: 'Tu allonges la foulée, valise cabine bringuebalante.' },
      { label: 'Souffler trente secondes', effect: { temps: -9, energie: 6 }, result: 'Une courte pause pour reprendre ton souffle. Coûteux en temps.' },
    ],
  },
  {
    id: 'dernier_cafe',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'cafe',
    title: 'La tentation duty-free',
    text: 'Un stand de café embaume, juste avant la porte. Ton estomac vide proteste bruyamment.',
    choices: [
      { label: 'Résister et avancer', effect: { temps: -1, energie: -4, moral: -2 }, result: 'Tu passes sans t’arrêter. L’embarquement avant le plaisir.' },
      { label: 'Avaler un expresso debout', effect: { temps: -6, energie: 9 }, result: 'Shot de caféine salvateur. Tu repars regonflé.' },
    ],
  },
]

const AVION: GameEvent = {
  id: 'embarquement',
  sprite: 'caissiere',
  decor: 'aeroport',
  prop: 'avion',
  title: "L'embarquement",
  text: '"Dernier appel pour le vol..." L’hôtesse a la main sur le comptoir, prête à fermer la porte. Ta carte d’embarquement tremble entre tes doigts.',
  choices: [
    { label: 'Tendre la carte, à bout de souffle', effect: { temps: -4, give: ['avion'] }, result: 'Bip vert. "Bon vol, monsieur." Tu passes la passerelle in extremis. Sauvé !' },
    { label: 'Demander un coup de tampon prioritaire', effect: { temps: -6, argent: -6, give: ['avion'] }, result: 'Un agent t’escorte au pas de course jusqu’au siège. Service VIP de la dernière chance.' },
    { label: 'Foncer en doublant la file', effect: { temps: -2, moral: -5, give: ['avion'] }, result: 'Tu grilles les derniers passagers sous les regards noirs. Mais tu es à bord.' },
  ],
}

export const CHAPTER_10: Chapter = {
  id: 10,
  kicker: 'Chapitre 10',
  title: "L'avion à ne pas rater",
  intro:
    "Le vol des vacances décolle dans une heure et tout va de travers : valise qui déborde, autoroute saturée, comptoir bondé, sécurité interminable, porte d'embarquement changée à la dernière seconde. Ici, plus aucune marge : il faut optimiser chaque choix au pixel près pour franchir la passerelle avant qu'elle ne se referme.",
  goal: 'embarquer avant la fermeture des portes',
  items: [{ id: 'avion', label: 'Embarquement', prop: 'avion' }],
  zones: [
    { label: 'Départ en catastrophe', steps: 4, fillers: [...PACK, DISTRIBUTEUR] },
    { label: 'Sur la route', steps: 4, fillers: STREET },
    { label: "L'enregistrement", steps: 4, fillers: CHECKIN },
    { label: 'La sécurité', steps: 4, fillers: SECURITE },
    { label: "La porte d'embarquement", steps: 4, fillers: PORTE, goals: [AVION] },
  ],
  bonuses: [
    { key: 'trottinette', label: 'Trottinette', effect: { temps: 13, energie: -11 }, charges: 3, desc: '+13 temps, -11 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 15, temps: -5 }, charges: 3, desc: '+15 énergie, -5 temps' },
  ],
  start: { temps: 97, energie: 82, argent: 46, moral: 64 },
  drain: { temps: -2, energie: -2 },
  theme: {
    accent: '#56A8FF',
    winGradient: 'linear-gradient(135deg,#2E6FB0,#142436)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'vigile',
    introDecor: 'aeroport',
    introSprite: 'caissiere',
  },
}

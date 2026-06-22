import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

const PACK: GameEvent[] = [
  {
    id: 'valise_bouclee',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'valise',
    title: { fr: 'La valise qui ne ferme pas', en: 'The suitcase that will not close' },
    text: {
      fr: 'Tu as trop pris, comme toujours. La fermeture éclair refuse de se rejoindre.',
      en: 'You packed too much, as always. The zipper refuses to meet in the middle.',
    },
    choices: [
      { label: { fr: "T'asseoir dessus de tout ton poids", en: 'Sit on it with all your weight' }, effect: { temps: -5, energie: -6 }, result: { fr: 'Au prix d’un effort indigne, la valise capitule. Fermée.', en: 'At the cost of an undignified effort, the suitcase surrenders. Closed.' } },
      { label: { fr: 'Sortir deux trucs inutiles', en: 'Pull out two useless things' }, effect: { temps: -7, moral: 2 }, result: { fr: 'Tu sacrifies le troisième chargeur et le guide papier. Plus léger.', en: 'You sacrifice the third charger and the paper guidebook. Lighter.' } },
    ],
  },
  {
    id: 'liquides',
    sprite: 'papa',
    decor: 'cuisine',
    prop: 'eau',
    title: { fr: 'La règle des 100 ml', en: 'The 100ml rule' },
    text: {
      fr: 'Trousse de toilette : ton dentifrice fait 125 ml. La sécurité ne pardonne pas ce genre d’affront.',
      en: 'Toiletry bag: your toothpaste is 125ml. Security does not forgive that kind of offense.',
    },
    choices: [
      { label: { fr: 'Tout reconditionner', en: 'Repack everything' }, effect: { temps: -8, moral: 3 }, result: { fr: 'Mini-flacons, sachet zippé transparent. Conforme au millilitre.', en: 'Mini bottles, clear zip bag. Compliant to the milliliter.' } },
      { label: { fr: 'Parier que ça passe', en: 'Bet it gets through' }, effect: { temps: -2, moral: -3 }, result: { fr: 'Tu laisses le tube format géant. Roulette russe au portique.', en: 'You leave the giant tube. Russian roulette at the checkpoint.' } },
    ],
  },
  {
    id: 'taxi_attend',
    sprite: 'vigile',
    decor: 'rue',
    prop: 'carte',
    title: { fr: 'Le taxi qui klaxonne', en: 'The honking taxi' },
    text: {
      fr: 'Le taxi est en bas, compteur tournant, et tu cherches encore ton deuxième mocassin.',
      en: 'The taxi is downstairs, meter running, and you are still hunting for your second loafer.',
    },
    choices: [
      { label: { fr: 'Descendre en sautillant', en: 'Hop down half-shod' }, effect: { temps: -3, energie: -4 }, result: { fr: 'Une chaussure au pied, l’autre à la main. Dans le taxi, enfin.', en: 'One shoe on, the other in hand. In the taxi, finally.' } },
      { label: { fr: 'Tout reprendre calmement', en: 'Calmly check it all' }, effect: { temps: -8, moral: 4 }, result: { fr: 'Tu vérifies billets, passeport, clés. Méthodique, mais lent.', en: 'You check tickets, passport, keys. Methodical, but slow.' } },
    ],
  },
  {
    id: 'embouteillage_aero',
    sprite: 'papa',
    decor: 'rue',
    prop: 'feu',
    title: { fr: "L'autoroute figée", en: 'The frozen highway' },
    text: {
      fr: 'Bouchon monstre sur la voie de l’aéroport. Le chauffeur tente une sortie hasardeuse.',
      en: 'A monster jam on the airport road. The driver attempts a risky exit.',
    },
    choices: [
      { label: { fr: 'Faire confiance au raccourci', en: 'Trust the shortcut' }, effect: { temps: 5, energie: -3, moral: -3 }, result: { fr: 'Petites routes, virages secs, mais tu regagnes du temps.', en: 'Back roads, sharp turns, but you claw back some time.' } },
      { label: { fr: "Rester sur l'autoroute", en: 'Stay on the highway' }, effect: { temps: -12 }, result: { fr: 'Tu avances au pas, klaxons en fond. Le temps s’effrite.', en: 'You crawl along, horns in the background. Time crumbles.' } },
    ],
  },
]

const CHECKIN: GameEvent[] = [
  {
    id: 'file_enregistrement',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'ticket',
    title: { fr: "Le comptoir d'enregistrement", en: 'The check-in desk' },
    text: {
      fr: 'Une file serpente jusqu’aux portes. Au comptoir, un voyageur conteste son surclassement.',
      en: 'A line snakes all the way to the doors. At the desk, a traveler disputes his upgrade.',
    },
    choices: [
      { label: { fr: 'Patienter dans la file', en: 'Wait in line' }, effect: { temps: -12, moral: -2 }, result: { fr: 'Tu avances centimètre par centimètre. Patience à toute épreuve.', en: 'You inch forward centimeter by centimeter. Iron patience.' } },
      { label: { fr: 'Tenter la borne automatique', en: 'Try the self-service kiosk' }, effect: { temps: -5, energie: -3 }, result: { fr: 'La borne imprime ta carte d’embarquement. Gain de temps net.', en: 'The kiosk prints your boarding pass. A clean time gain.' } },
    ],
  },
  {
    id: 'bagage_surpoids',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'valise',
    title: { fr: 'Le bagage trop lourd', en: 'The overweight bag' },
    text: {
      fr: 'La balance affiche 24 kg. "Limite 23, monsieur. Supplément ou vous retirez des affaires."',
      en: 'The scale reads 24 kg. "Limit is 23, sir. Surcharge, or take some things out."',
    },
    choices: [
      { label: { fr: 'Payer le surpoids', en: 'Pay the overweight fee' }, effect: { temps: -5, argent: -16 }, result: { fr: 'Tu règles le supplément en grinçant des dents. Bagage accepté.', en: 'You pay the surcharge through gritted teeth. Bag accepted.' } },
      { label: { fr: 'Redistribuer dans le sac cabine', en: 'Shift it to your carry-on' }, effect: { temps: -9, energie: -4, moral: 2 }, result: { fr: 'Tu transvases en pleine zone d’embarquement. Acrobatique mais gratuit.', en: 'You shuffle things right there in the hall. Acrobatic but free.' } },
    ],
  },
  {
    id: 'siege_hublot',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'billet',
    title: { fr: 'La place attribuée', en: 'The assigned seat' },
    text: {
      fr: '"Il ne reste qu’un siège au milieu, dernière rangée, près des toilettes." Le sort s’acharne.',
      en: '"Only a middle seat left, last row, by the toilets." Fate piles on.',
    },
    choices: [
      { label: { fr: 'Accepter sans broncher', en: 'Accept without a word' }, effect: { temps: -2, moral: -3 }, result: { fr: 'Tu prends ce qu’on te donne. L’essentiel est d’embarquer.', en: 'You take what you are given. The point is to board.' } },
      { label: { fr: 'Négocier un meilleur siège', en: 'Negotiate a better seat' }, effect: { temps: -7, moral: 3 }, result: { fr: 'À force de sourire, tu décroches un couloir. Petite victoire.', en: 'With enough smiling, you land an aisle. Small victory.' } },
    ],
  },
  {
    id: 'borne_enregistrement',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'billet',
    title: { fr: 'La borne récalcitrante', en: 'The stubborn kiosk' },
    text: {
      fr: 'La borne automatique scanne ton passeport, réfléchit longuement, puis affiche "Voir un agent".',
      en: 'The self-service kiosk scans your passport, thinks hard, then displays "See an agent".',
    },
    choices: [
      { label: { fr: 'Réessayer calmement', en: 'Calmly try again' }, effect: { temps: -6, moral: -2 }, result: { fr: 'Au troisième scan, la carte d’embarquement sort enfin.', en: 'On the third scan, the boarding pass finally prints.' } },
      { label: { fr: 'Filer voir un agent', en: 'Go see an agent' }, effect: { temps: -8, energie: -2 }, result: { fr: 'L’agent règle ça en deux clics. Plus sûr, plus lent.', en: 'The agent sorts it in two clicks. Safer, slower.' } },
    ],
  },
]

const SECURITE: GameEvent[] = [
  {
    id: 'file_securite',
    sprite: 'mamie',
    decor: 'aeroport',
    prop: 'ticket',
    title: { fr: 'Le contrôle bondé', en: 'The packed checkpoint' },
    text: {
      fr: 'Le poste de sécurité est saturé. Une seule file ouverte, et un groupe scolaire devant toi.',
      en: 'The security checkpoint is jammed. Only one lane open, and a school group ahead of you.',
    },
    choices: [
      { label: { fr: 'Suivre le flux', en: 'Go with the flow' }, effect: { temps: -13, moral: -2 }, result: { fr: 'Tu avances dans la cohue des cartables. Lent mais sûr.', en: 'You shuffle through the crush of backpacks. Slow but sure.' } },
      { label: { fr: 'Repérer la file rapide', en: 'Spot the fast lane' }, effect: { temps: -6, energie: -3 }, result: { fr: 'Tu déniches une file business presque vide. Coup d’oeil payant.', en: 'You find a nearly empty business lane. A keen eye pays off.' } },
    ],
  },
  {
    id: 'portique',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'croix',
    title: { fr: 'Le portique qui sonne', en: 'The beeping scanner' },
    text: {
      fr: 'Bip. Tu avais oublié la ceinture, les clés, la monnaie et la boucle de sac. Demi-tour.',
      en: 'Beep. You forgot the belt, the keys, the coins and the bag buckle. Turn back.',
    },
    choices: [
      { label: { fr: 'Tout vider, méthodique', en: 'Empty everything, methodical' }, effect: { temps: -8, moral: 2 }, result: { fr: 'Bac après bac, tu passes au deuxième essai. Net.', en: 'Tray after tray, you clear it on the second try. Clean.' } },
      { label: { fr: 'Repasser en vitesse', en: 'Rush back through' }, effect: { temps: -4, energie: -4, moral: -3 }, result: { fr: 'Tu bipes encore une fois. L’agent soupire et te palpe.', en: 'You beep again. The agent sighs and pats you down.' } },
    ],
  },
  {
    id: 'liquide_confisque',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'eau',
    title: { fr: 'La fouille du sac', en: 'The bag search' },
    text: {
      fr: 'L’agent extrait de ton sac la bouteille d’eau que tu venais d’acheter. "Interdite au-delà du portique."',
      en: 'The agent pulls the water bottle you just bought from your bag. "Not allowed past the checkpoint."',
    },
    choices: [
      { label: { fr: "La boire d'un trait", en: 'Down it in one go' }, effect: { temps: -4, energie: 4 }, result: { fr: 'Cul sec héroïque. Hydraté et réglementaire.', en: 'Heroic chug. Hydrated and compliant.' } },
      { label: { fr: "L'abandonner sans discuter", en: 'Ditch it without arguing' }, effect: { temps: -2, moral: -2 }, result: { fr: 'Tu sacrifies la bouteille. Quatre euros aux oubliettes.', en: 'You sacrifice the bottle. Four euros down the drain.' } },
    ],
  },
  {
    id: 'bac_plateau',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'valise',
    title: { fr: 'Les bacs à plateaux', en: 'The bin pileup' },
    text: {
      fr: 'Ordinateur à sortir, manteau, ceinture, sac... et plus un seul bac libre sur le tapis.',
      en: 'Laptop out, coat, belt, bag... and not a single free bin on the belt.',
    },
    choices: [
      { label: { fr: 'Tout organiser vite', en: 'Organize it all fast' }, effect: { temps: -6, energie: -3 }, result: { fr: 'Trois bacs bien rangés. Tu passes sans encombre.', en: 'Three neatly arranged bins. You clear it without a hitch.' } },
      { label: { fr: 'Empiler en vrac', en: 'Pile it in a heap' }, effect: { temps: -3, moral: -3 }, result: { fr: 'Le scanner bloque sur ton sac mal rangé. Re-contrôle.', en: 'The scanner snags on your messy bag. Re-check.' } },
    ],
  },
]

const PORTE: GameEvent[] = [
  {
    id: 'porte_changee',
    sprite: 'vigile',
    decor: 'aeroport',
    prop: 'croix',
    title: { fr: 'Le changement de porte', en: 'The gate change' },
    text: {
      fr: 'L’écran clignote : embarquement déplacé porte B47. Tu es porte A12. À l’autre bout du terminal.',
      en: 'The screen flashes: boarding moved to gate B47. You are at gate A12. The far end of the terminal.',
    },
    choices: [
      { label: { fr: "Sprinter jusqu'à B47", en: 'Sprint to B47' }, effect: { temps: -4, energie: -11 }, result: { fr: 'Course folle entre les boutiques duty-free. Poumons en feu.', en: 'A mad dash between the duty-free shops. Lungs on fire.' } },
      { label: { fr: 'Prendre le tapis roulant', en: 'Take the moving walkway' }, effect: { temps: -8, energie: -3 }, result: { fr: 'Le tapis t’avance, lentement mais sûrement. Repos forcé.', en: 'The walkway carries you, slowly but surely. Forced rest.' } },
    ],
  },
  {
    id: 'tapis_roulant',
    sprite: 'papa',
    decor: 'aeroport',
    prop: 'horloge',
    title: { fr: 'Le couloir interminable', en: 'The endless corridor' },
    text: {
      fr: 'Le terminal s’étire sur un kilomètre de moquette et d’annonces multilingues anxiogènes.',
      en: 'The terminal stretches a kilometer of carpet and anxiety-inducing multilingual announcements.',
    },
    choices: [
      { label: { fr: "Marcher d'un pas vif", en: 'Walk briskly' }, effect: { temps: -6, energie: -5 }, result: { fr: 'Tu allonges la foulée, valise cabine bringuebalante.', en: 'You lengthen your stride, carry-on rattling along.' } },
      { label: { fr: 'Souffler trente secondes', en: 'Catch your breath' }, effect: { temps: -9, energie: 6 }, result: { fr: 'Une courte pause pour reprendre ton souffle. Coûteux en temps.', en: 'A short pause to get your breath back. Costly in time.' } },
    ],
  },
  {
    id: 'dernier_cafe',
    sprite: 'caissiere',
    decor: 'aeroport',
    prop: 'cafe',
    title: { fr: 'La tentation duty-free', en: 'The duty-free temptation' },
    text: {
      fr: 'Un stand de café embaume, juste avant la porte. Ton estomac vide proteste bruyamment.',
      en: 'A coffee stand smells amazing, just before the gate. Your empty stomach protests loudly.',
    },
    choices: [
      { label: { fr: 'Résister et avancer', en: 'Resist and move on' }, effect: { temps: -1, energie: -4, moral: -2 }, result: { fr: 'Tu passes sans t’arrêter. L’embarquement avant le plaisir.', en: 'You walk past without stopping. Boarding before pleasure.' } },
      { label: { fr: 'Avaler un expresso debout', en: 'Down an espresso standing' }, effect: { temps: -6, energie: 9 }, result: { fr: 'Shot de caféine salvateur. Tu repars regonflé.', en: 'A life-saving caffeine shot. You set off re-energized.' } },
    ],
  },
]

const AVION: GameEvent = {
  id: 'embarquement',
  sprite: 'caissiere',
  decor: 'aeroport',
  prop: 'avion',
  title: { fr: "L'embarquement", en: 'Boarding' },
  text: {
    fr: '"Dernier appel pour le vol..." L’hôtesse a la main sur le comptoir, prête à fermer la porte. Ta carte d’embarquement tremble entre tes doigts.',
    en: '"Final call for flight..." The attendant has a hand on the counter, ready to close the door. Your boarding pass trembles between your fingers.',
  },
  choices: [
    { label: { fr: 'Tendre la carte, à bout de souffle', en: 'Hold out the pass, breathless' }, effect: { temps: -4, give: ['avion'] }, result: { fr: 'Bip vert. "Bon vol, monsieur." Tu passes la passerelle in extremis. Sauvé !', en: 'Green beep. "Have a good flight, sir." You make the jet bridge at the last second. Saved!' } },
    { label: { fr: 'Demander un coup de tampon prioritaire', en: 'Ask for a priority stamp' }, effect: { temps: -6, argent: -6, give: ['avion'] }, result: { fr: 'Un agent t’escorte au pas de course jusqu’au siège. Service VIP de la dernière chance.', en: 'An agent jogs you all the way to your seat. Last-chance VIP service.' } },
    { label: { fr: 'Foncer en doublant la file', en: 'Charge ahead, cut the line' }, effect: { temps: -2, moral: -5, give: ['avion'] }, result: { fr: 'Tu grilles les derniers passagers sous les regards noirs. Mais tu es à bord.', en: 'You cut past the last passengers under angry glares. But you are aboard.' } },
  ],
}

export const CHAPTER_10: Chapter = {
  id: 10,
  kicker: { fr: 'Chapitre 10', en: 'Chapter 10' },
  title: { fr: "L'avion à ne pas rater", en: 'The flight you cannot miss' },
  intro: {
    fr: "Le vol des vacances décolle dans une heure et tout va de travers : valise qui déborde, autoroute saturée, comptoir bondé, sécurité interminable, porte d'embarquement changée à la dernière seconde. Ici, plus aucune marge : il faut optimiser chaque choix au pixel près pour franchir la passerelle avant qu'elle ne se referme.",
    en: 'The vacation flight takes off in an hour and everything goes wrong: an overflowing suitcase, a gridlocked highway, a packed desk, endless security, a gate changed at the last second. Here, no margin left: you must optimize every choice to the pixel to cross the jet bridge before it closes.',
  },
  goal: { fr: 'embarquer avant la fermeture des portes', en: 'board before the doors close' },
  items: [{ id: 'avion', label: { fr: 'Embarquement', en: 'Boarding' }, prop: 'avion' }],
  zones: [
    { label: { fr: 'Départ en catastrophe', en: 'A frantic departure' }, steps: 4, fillers: [...PACK, DISTRIBUTEUR] },
    { label: { fr: 'Sur la route', en: 'On the road' }, steps: 4, fillers: STREET },
    { label: { fr: "L'enregistrement", en: 'Check-in' }, steps: 4, fillers: CHECKIN },
    { label: { fr: 'La sécurité', en: 'Security' }, steps: 4, fillers: SECURITE },
    { label: { fr: "La porte d'embarquement", en: 'The boarding gate' }, steps: 4, fillers: PORTE, goals: [AVION] },
  ],
  bonuses: [
    { key: 'trottinette', label: { fr: 'Trottinette', en: 'Scooter' }, effect: { temps: 13, energie: -11 }, charges: 3, desc: { fr: '+13 temps, -11 énergie', en: '+13 time, -11 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 3, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 99, energie: 83, argent: 46, moral: 64 },
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

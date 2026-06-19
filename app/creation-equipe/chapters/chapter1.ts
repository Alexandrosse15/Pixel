import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

// Objectif intermédiaire : les couches (zone supermarché).
const COUCHES: GameEvent[] = [
  {
    id: 'rayon_couches',
    sprite: 'caissiere',
    decor: 'rayon',
    prop: 'couches',
    title: { fr: 'Le rayon des couches', en: 'The diaper aisle' },
    text: {
      fr: 'Un mur de paquets, douze marques, trois tailles. Le bon modèle est tout en haut.',
      en: 'A wall of packs, twelve brands, three sizes. The right one is on the very top shelf.',
    },
    choices: [
      { label: { fr: 'Attraper le bon paquet', en: 'Grab the right pack' }, effect: { temps: -8, energie: -6, argent: -11, give: ['couches'] }, result: { fr: 'Tu te hisses sur la pointe des pieds. Couches sécurisées.', en: 'You stretch up on tiptoe. Diapers secured.' } },
      { label: { fr: 'Prendre le premier venu', en: 'Grab whatever' }, effect: { temps: -3, argent: -9, moral: -5, give: ['couches'] }, result: { fr: 'Taille 5, tant pis. Mais tu as des couches.', en: 'Size 5, oh well. But you have diapers.' } },
      { label: { fr: 'Comparer les prix au gramme', en: 'Compare price per gram' }, effect: { temps: -12, moral: -4 }, result: { fr: 'Tu hésites trop, un autre rafle le dernier paquet correct. Rien dans les mains.', en: 'You dither too long, someone grabs the last decent pack. Empty-handed.' } },
    ],
  },
  {
    id: 'rupture',
    sprite: 'vigile',
    decor: 'rayon',
    prop: 'carton',
    title: { fr: 'Rupture de stock', en: 'Out of stock' },
    text: {
      fr: 'Le rayon bébé est dévalisé. Un employé range les cartons vides en haussant les épaules.',
      en: 'The baby aisle is cleaned out. A clerk stacks empty boxes with a shrug.',
    },
    choices: [
      { label: { fr: 'Demander en réserve', en: 'Ask the stockroom' }, effect: { temps: -11, energie: -3, argent: -10, give: ['couches'] }, result: { fr: 'Il revient avec un dernier paquet oublié. Sauvé in extremis.', en: 'He comes back with one forgotten pack. Saved at the last second.' } },
      { label: { fr: 'Râler au rayon', en: 'Grumble at the shelves' }, effect: { temps: -4, moral: -7 }, result: { fr: 'Tu pestes devant les étagères vides. Ça ne remplit pas le panier.', en: 'You fume at the empty shelves. It does not fill the basket.' } },
      { label: { fr: 'Aller voir ailleurs', en: 'Try elsewhere' }, effect: { temps: -3, energie: -4 }, result: { fr: 'Tu abandonnes ce rayon. La ville est grande.', en: 'You give up on this aisle. The city is big.' } },
    ],
  },
  {
    id: 'grande_surface',
    sprite: 'caissier',
    decor: 'allee',
    prop: 'panier',
    title: { fr: 'Le bon rayon', en: 'The right aisle' },
    text: {
      fr: 'Le rayon bébé est immense. Tu repères enfin les couches, entre deux promos clignotantes.',
      en: 'The baby aisle is enormous. You finally spot the diapers, between two blinking sale signs.',
    },
    choices: [
      { label: { fr: 'Foncer sur le paquet', en: 'Dash for the pack' }, effect: { temps: -8, argent: -11, give: ['couches'] }, result: { fr: 'Tu connais le chemin par coeur. Paquet attrapé.', en: 'You know the way by heart. Pack grabbed.' } },
      { label: { fr: 'Couches premium en promo', en: 'Premium diapers on sale' }, effect: { temps: -11, argent: -14, moral: 4, give: ['couches'] }, result: { fr: 'Promo sur le haut de gamme. Content de ton coup.', en: 'A deal on the high-end stuff. Pleased with yourself.' } },
      { label: { fr: 'Te perdre dans les allées', en: 'Get lost in the aisles' }, effect: { temps: -12, energie: -7, moral: -6 }, result: { fr: 'Tu tournes en rond. Du temps et de l’énergie gaspillés.', en: 'You go in circles. Time and energy wasted.' } },
    ],
  },
]

// Objectif final : le lait en poudre (zone pharmacie).
const LAIT: GameEvent[] = [
  {
    id: 'pharmacie_lait',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'lait',
    title: { fr: 'La pharmacie de garde', en: 'The on-call pharmacy' },
    text: {
      fr: 'Seule ouverte un dimanche. La pharmacienne te toise. Le lait infantile est derrière elle.',
      en: 'The only one open on a Sunday. The pharmacist sizes you up. The baby formula is behind her.',
    },
    choices: [
      { label: { fr: 'Lait 2e âge', en: 'Stage 2 formula' }, effect: { temps: -7, argent: -15, give: ['lait'] }, result: { fr: 'Elle pose la boîte sur le comptoir. Cher, mais tu as le lait.', en: 'She sets the tin on the counter. Pricey, but you have the formula.' } },
      { label: { fr: 'Marque premium', en: 'Premium brand' }, effect: { temps: -9, argent: -20, moral: 3, give: ['lait'] }, result: { fr: 'Haut de gamme, recommandé. Rassurant.', en: 'High-end, doctor recommended. Reassuring.' } },
      { label: { fr: 'Hésiter et ressortir', en: 'Hesitate and walk out' }, effect: { temps: -4, moral: -6 }, result: { fr: 'Trop cher, tu paniques, tu ressors. La clochette te juge.', en: 'Too pricey, you panic, you leave. The door chime judges you.' } },
    ],
  },
  {
    id: 'epicier_nuit',
    sprite: 'caissiere',
    decor: 'epicerie',
    prop: 'lait',
    title: { fr: "L'épicier du soir", en: 'The late-night grocer' },
    text: {
      fr: 'Une épicerie qui ne ferme jamais. L’épicier connaît tous les parents en détresse.',
      en: 'A grocery that never closes. The grocer knows every parent in distress.',
    },
    choices: [
      { label: { fr: 'Acheter le lait', en: 'Buy the formula' }, effect: { temps: -5, argent: -16, give: ['lait'] }, result: { fr: 'Il sort une boîte de derrière le comptoir. Sauveur.', en: 'He pulls a tin from behind the counter. A lifesaver.' } },
      { label: { fr: 'Négocier le prix', en: 'Haggle the price' }, effect: { temps: -8, argent: -12, moral: 4, give: ['lait'] }, result: { fr: 'Deux blagues et il baisse un peu. Le lait et la cote.', en: 'Two jokes and he drops it a little. The formula and the rapport.' } },
      { label: { fr: 'Trop cher, partir', en: 'Too pricey, leave' }, effect: { temps: -3, moral: -4 }, result: { fr: 'Tu ressors sans rien. Le quartier se vide d’options.', en: 'You leave with nothing. The neighborhood runs out of options.' } },
    ],
  },
  {
    id: 'pharmacien_conseil',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'sacpharma',
    title: { fr: 'Le conseil du pharmacien', en: "The pharmacist's advice" },
    text: {
      fr: 'Un pharmacien bavard veut absolument te conseiller le meilleur lait pour bébé.',
      en: 'A chatty pharmacist absolutely must advise you on the best baby formula.',
    },
    choices: [
      { label: { fr: 'Écouter et acheter', en: 'Listen and buy' }, effect: { temps: -10, argent: -15, moral: 3, give: ['lait'] }, result: { fr: 'Cours magistral, mais tu repars avec le bon lait.', en: 'A full lecture, but you leave with the right formula.' } },
      { label: { fr: 'Couper court et prendre', en: 'Cut him off and grab it' }, effect: { temps: -5, argent: -17, moral: -3, give: ['lait'] }, result: { fr: 'Tu prends la boîte et files avant la deuxième leçon.', en: 'You grab the tin and bolt before the second lesson.' } },
    ],
  },
]

export const CHAPTER_1: Chapter = {
  id: 1,
  kicker: { fr: 'Chapitre 1', en: 'Chapter 1' },
  title: { fr: 'Les couches et le lait', en: 'The diapers and the formula' },
  intro: {
    fr: "Dimanche, 10h. Plus de couches, plus de lait en poudre. Ta femme te confie une mission sacrée : rapporter les deux avant la sieste du petit. Les couches se trouvent au supermarché, mais le lait, lui, ne se déniche qu'à la pharmacie de garde, au bout du parcours.",
    en: "Sunday, 10am. No more diapers, no more formula. Your wife hands you a sacred mission: bring back both before the little one's nap. The diapers are at the supermarket, but the formula only turns up at the on-call pharmacy, at the very end of the run.",
  },
  goal: { fr: 'rapporter les couches et le lait', en: 'bring back the diapers and the formula' },
  items: [
    { id: 'couches', label: { fr: 'Couches', en: 'Diapers' }, prop: 'couches' },
    { id: 'lait', label: { fr: 'Lait en poudre', en: 'Formula' }, prop: 'lait' },
  ],
  zones: [
    { label: { fr: 'En chemin', en: 'On the way' }, steps: 5, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'Au supermarché', en: 'At the supermarket' }, steps: 6, fillers: STORE, goals: COUCHES },
    { label: { fr: 'La pharmacie de garde', en: 'The on-call pharmacy' }, steps: 5, fillers: STREET, goals: LAIT },
  ],
  bonuses: [
    { key: 'skateboard', label: { fr: 'Skateboard', en: 'Skateboard' }, effect: { temps: 12, energie: -10 }, charges: 2, desc: { fr: '+12 temps, -10 énergie', en: '+12 time, -10 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 16, temps: -4 }, charges: 2, desc: { fr: '+16 énergie, -4 temps', en: '+16 energy, -4 time' } },
  ],
  start: { temps: 100, energie: 78, argent: 42, moral: 70 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#FF4500',
    winGradient: 'linear-gradient(135deg,#2E8B57,#15302a)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'femme',
    introDecor: 'maison',
    introSprite: 'femme',
  },
}

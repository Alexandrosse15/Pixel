import type { Chapter, GameEvent } from '../engine'
import { STREET, STORE, DISTRIBUTEUR } from './shared'

// Objectifs : couches (milieu) puis lait en poudre (mission finale).
const GOALS: GameEvent[] = [
  {
    id: 'rayon_couches',
    sprite: 'caissiere',
    decor: 'rayon',
    prop: 'couches',
    title: 'Le rayon des couches',
    text: 'Un mur de paquets, douze marques, trois tailles. Le bon modèle est tout en haut.',
    choices: [
      { label: 'Attraper le bon paquet', effect: { temps: -8, energie: -6, argent: -11, give: ['couches'] }, result: 'Tu te hisses sur la pointe des pieds. Couches sécurisées.' },
      { label: 'Prendre le premier venu', effect: { temps: -3, argent: -9, moral: -5, give: ['couches'] }, result: 'Taille 5, tant pis, ça fera flotteur. Mais tu as des couches.' },
      { label: 'Comparer les prix au gramme', effect: { temps: -12, moral: -4 }, result: 'Tu hésites trop, un autre rafle le dernier paquet correct. Rien dans les mains.' },
    ],
  },
  {
    id: 'superette',
    sprite: 'caissier',
    decor: 'epicerie',
    prop: 'couches',
    title: 'La supérette ouverte',
    text: 'Une supérette de quartier a gardé le rideau levé. Côté bébé, il reste des couches.',
    choices: [
      { label: 'Pack de couches', effect: { temps: -6, argent: -12, give: ['couches'] }, result: 'Une seule marque, mais la bonne taille. Dans le sac.' },
      { label: 'Pack maxi format', effect: { temps: -8, argent: -16, moral: 3, give: ['couches'] }, result: 'Le gros pack, de quoi tenir des semaines. Tranquille pour un moment.' },
      { label: 'Repartir, trop petit', effect: { temps: -2 }, result: 'Tu juges le choix trop limité et ressors. Pari risqué.' },
    ],
  },
  {
    id: 'rupture',
    sprite: 'vigile',
    decor: 'rayon',
    prop: 'carton',
    title: 'Rupture de stock',
    text: 'Le rayon bébé est dévalisé. Un employé range les cartons vides en haussant les épaules.',
    choices: [
      { label: 'Demander en réserve', effect: { temps: -11, energie: -3, argent: -10, give: ['couches'] }, result: 'Il revient avec un dernier paquet oublié. Sauvé in extremis.' },
      { label: 'Râler au rayon', effect: { temps: -4, moral: -7 }, result: 'Tu pestes devant les étagères vides. Ça ne remplit pas le panier.' },
      { label: 'Aller voir ailleurs', effect: { temps: -3, energie: -4 }, result: 'Tu abandonnes ce magasin. La ville est grande.' },
    ],
  },
  {
    id: 'grande_surface',
    sprite: 'caissier',
    decor: 'allee',
    prop: 'panier',
    title: 'La grande surface',
    text: 'Un vrai supermarché ouvert. Le rayon bébé est immense, mais le lait est en rupture partout.',
    choices: [
      { label: 'Foncer au rayon couches', effect: { temps: -8, argent: -11, give: ['couches'] }, result: 'Tu connais le chemin par coeur. Paquet attrapé.' },
      { label: 'Couches premium en promo', effect: { temps: -11, argent: -14, moral: 4, give: ['couches'] }, result: 'Promo sur le haut de gamme. Content de ton coup.' },
      { label: 'Chercher le lait en vain', effect: { temps: -12, energie: -7, moral: -6 }, result: 'Tu arpentes toutes les allées. Rien. Temps et énergie gaspillés.' },
    ],
  },
  {
    id: 'pharmacie_lait',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'lait',
    title: 'La pharmacie de garde',
    text: 'Seule ouverte un dimanche. La pharmacienne te toise. Le lait infantile est derrière elle.',
    choices: [
      { label: 'Lait 2e âge', effect: { temps: -7, argent: -15, give: ['lait'] }, result: "Elle pose la boîte sur le comptoir. Cher, mais tu as le lait." },
      { label: 'Marque premium', effect: { temps: -9, argent: -20, moral: 3, give: ['lait'] }, result: 'Haut de gamme, recommandé pour les petits estomacs. Rassurant.' },
      { label: 'Hésiter et ressortir', effect: { temps: -4, moral: -6 }, result: 'Trop cher, tu paniques, tu ressors. La clochette te juge.' },
    ],
  },
  {
    id: 'epicier_nuit',
    sprite: 'caissiere',
    decor: 'epicerie',
    prop: 'lait',
    title: "L'épicier du soir",
    text: 'Une épicerie qui ne ferme jamais. L’épicier connaît tous les parents en détresse.',
    choices: [
      { label: 'Acheter le lait', effect: { temps: -5, argent: -16, give: ['lait'] }, result: 'Il sort une boîte de derrière le comptoir. Sauveur.' },
      { label: 'Négocier le prix', effect: { temps: -8, argent: -12, moral: 4, give: ['lait'] }, result: 'Deux blagues et il baisse un peu. Le lait et la cote.' },
      { label: 'Trop cher, partir', effect: { temps: -3, moral: -4 }, result: 'Tu ressors sans rien. Le quartier se vide d’options.' },
    ],
  },
  {
    id: 'pharmacien_conseil',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'sacpharma',
    title: 'Le conseil du pharmacien',
    text: 'Un autre pharmacien, bavard, veut absolument te conseiller le meilleur lait pour bébé.',
    choices: [
      { label: 'Écouter et acheter', effect: { temps: -10, argent: -15, moral: 3, give: ['lait'] }, result: 'Cours magistral, mais tu repars avec le bon lait.' },
      { label: 'Couper court et prendre', effect: { temps: -5, argent: -17, moral: -3, give: ['lait'] }, result: 'Tu prends la boîte et files avant la deuxième leçon.' },
    ],
  },
  {
    id: 'drive',
    sprite: 'caissier',
    decor: 'parking',
    prop: 'lait',
    title: 'Le drive du dimanche',
    text: 'Un drive ouvert ! Il leur reste du lait infantile, avec le supplément week-end.',
    choices: [
      { label: 'Commander le lait', effect: { temps: -9, argent: -17, give: ['lait'] }, result: 'Coffre chargé sans descendre de voiture. Efficace.' },
      { label: 'Lot de deux boîtes', effect: { temps: -11, argent: -22, moral: 3, give: ['lait'] }, result: 'Deux boîtes d’avance. Te revoilà serein côté lait.' },
    ],
  },
]

export const CHAPTER_1: Chapter = {
  id: 1,
  kicker: 'Chapitre 1',
  title: 'Les couches et le lait',
  intro:
    "Dimanche, 10h. Plus de couches, plus de lait en poudre. Ta femme te confie une mission sacrée : rapporter les deux avant la sieste du petit. Les couches se trouvent en chemin, mais le lait, lui, ne se déniche qu'au tout dernier moment.",
  goal: 'rapporter les couches et le lait',
  items: [
    { id: 'couches', label: 'Couches', prop: 'couches' },
    { id: 'lait', label: 'Lait en poudre', prop: 'lait' },
  ],
  events: [...STREET, ...STORE, DISTRIBUTEUR, ...GOALS],
  bonuses: [
    { key: 'skateboard', label: 'Skateboard', effect: { temps: 12, energie: -10 }, charges: 2, desc: '+12 temps, -10 énergie' },
    { key: 'canette', label: 'Canette', effect: { energie: 16, temps: -4 }, charges: 2, desc: '+16 énergie, -4 temps' },
  ],
  start: { temps: 98, energie: 78, argent: 42, moral: 70 },
  drain: { temps: -3, energie: -2 },
  steps: 16,
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

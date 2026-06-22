// Moteur de "The Defense" : présomption des suspects, Effet de manche (combo),
// avertissements du juge, et résolution du verdict (procès + accusation).

import type { Affaire, IssueCle, Piste, Replique, Suspect } from './types';

export const FAVEUR_MIN = 0;
export const FAVEUR_MAX = 100;
export const SUSPICION_MIN = 0;
export const SUSPICION_MAX = 12;

export function clampFaveur(valeur: number): number {
  return Math.max(FAVEUR_MIN, Math.min(FAVEUR_MAX, Math.round(valeur)));
}

export function clampSuspicion(valeur: number): number {
  return Math.max(SUSPICION_MIN, Math.min(SUSPICION_MAX, valeur));
}

/** Présomption de départ de chaque suspect. */
export function suspicionInitiale(suspects: Suspect[]): Record<string, number> {
  const base: Record<string, number> = {};
  for (const s of suspects) base[s.id] = clampSuspicion(s.suspicionInitiale);
  return base;
}

/** Applique les effets d'une piste explorée sur le faisceau de présomptions. */
export function appliquerEffets(
  suspicion: Record<string, number>,
  piste: Piste,
): Record<string, number> {
  if (!piste.indice) return suspicion;
  const next = { ...suspicion };
  for (const e of piste.indice.effets) {
    next[e.suspect] = clampSuspicion((next[e.suspect] ?? 0) + e.valeur);
  }
  return next;
}

/** Une piste est-elle accessible ? (prérequis débloqué et action disponible) */
export function pisteAccessible(
  piste: Piste,
  indices: string[],
  actionsRestantes: number,
): boolean {
  if (actionsRestantes < piste.cout) return false;
  if (piste.requiert && !indices.includes(piste.requiert)) return false;
  return true;
}

/** Multiplicateur de l'Effet de manche selon le nombre de répliques étayées enchaînées. */
export function comboMultiplicateur(combo: number): number {
  if (combo <= 1) return 1;
  if (combo === 2) return 1.3;
  if (combo === 3) return 1.6;
  return 2;
}

export function repliqueDebloquee(replique: Replique, indices: string[]): boolean {
  if (!replique.indiceRequis) return true;
  return indices.includes(replique.indiceRequis);
}

export interface ResultatReplique {
  pointsBruts: number;
  pointsEffectifs: number;
  faveurApres: number;
  comboApres: number;
  strikesApres: number;
  multiplicateur: number;
  estStrike: boolean;
  reaction: string;
}

/**
 * Résout une réplique : applique l'Effet de manche aux répliques étayées,
 * casse le combo et inflige un avertissement sur une objection à tort.
 */
export function appliquerReplique(
  replique: Replique,
  faveur: number,
  combo: number,
  strikes: number,
): ResultatReplique {
  const etayee = !!replique.combo && replique.points > 0;
  const comboApres = etayee ? combo + 1 : 0;
  const mult = etayee ? comboMultiplicateur(comboApres) : 1;
  const pointsEffectifs = Math.round(replique.points * mult);
  const estStrike = !!replique.strike;
  return {
    pointsBruts: replique.points,
    pointsEffectifs,
    faveurApres: clampFaveur(faveur + pointsEffectifs),
    comboApres,
    strikesApres: estStrike ? strikes + 1 : strikes,
    multiplicateur: mult,
    estStrike,
    reaction: replique.reaction,
  };
}

export interface EtatVerdict {
  faveur: number;
  strikes: number;
  accuse: string | null;
}

/** Détermine l'issue finale à partir du procès et de l'accusation. */
export function resoudreVerdict(etat: EtatVerdict, affaire: Affaire): IssueCle {
  const { proces, accusation } = affaire;
  if (etat.strikes >= proces.strikesMax) return 'radiation';

  const acquitte = etat.faveur >= proces.seuilAcquittement;
  if (!acquitte) return 'condamnation';

  if (etat.accuse === accusation.bonSuspect) {
    return etat.faveur >= proces.seuilTriomphe ? 'triomphe' : 'acquittement';
  }
  if (etat.accuse === accusation.complice) return 'demi';
  return 'acquittement_faux_coupable';
}

/** Le verdict est-il une victoire pour le client (acquittement) ? */
export function estVictoire(issue: IssueCle): boolean {
  return issue !== 'radiation' && issue !== 'condamnation';
}

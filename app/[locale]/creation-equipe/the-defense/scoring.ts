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

/** Pénalité quand on invoque une preuve qu'on n'a jamais récoltée. */
export const PENALITE_NON_ETAYEE = -14;

export type TypeResultat = 'succes' | 'hors_sujet' | 'non_etayee' | 'bluff';

export interface ResultatReplique {
  type: TypeResultat;
  pointsEffectifs: number;
  faveurApres: number;
  comboApres: number;
  strikesApres: number;
  multiplicateur: number;
  estStrike: boolean;
  reaction: string;
}

/**
 * Résout une réplique. Aucune réplique n'est verrouillée : c'est au joueur
 * de juger ce qu'il peut étayer.
 * - Preuve absente du dossier -> objection rejetée (grosse perte + avertissement).
 * - Preuve hors sujet -> pénalité, combo cassé.
 * - Preuve pertinente -> succès, Effet de manche (combo).
 * - Ligne sans preuve -> selon ce qui est écrit (bluff sanctionné, etc.).
 */
export function appliquerReplique(
  replique: Replique,
  indices: string[],
  faveur: number,
  combo: number,
  strikes: number,
  objectionRejetee: string,
): ResultatReplique {
  const finir = (
    type: TypeResultat,
    points: number,
    comboApres: number,
    strike: boolean,
    reaction: string,
    mult = 1,
  ): ResultatReplique => ({
    type,
    pointsEffectifs: points,
    faveurApres: clampFaveur(faveur + points),
    comboApres,
    strikesApres: strike ? strikes + 1 : strikes,
    multiplicateur: mult,
    estStrike: strike,
    reaction,
  });

  // Le joueur invoque une preuve qu'il n'a pas : sanction maximale.
  if (replique.indiceRequis && !indices.includes(replique.indiceRequis)) {
    return finir('non_etayee', PENALITE_NON_ETAYEE, 0, true, objectionRejetee);
  }

  // Preuve réelle mais qui ne répond pas à l'attaque : hors sujet.
  if (replique.indiceRequis && replique.pertinent === false) {
    return finir('hors_sujet', replique.points, 0, !!replique.strike, replique.reaction);
  }

  // Réplique réussie (preuve pertinente) ou ligne sans preuve assumée.
  const etayee = !!replique.combo && replique.points > 0;
  const comboApres = etayee ? combo + 1 : 0;
  const mult = etayee ? comboMultiplicateur(comboApres) : 1;
  const points = Math.round(replique.points * mult);
  const type: TypeResultat = replique.points > 0 ? 'succes' : 'bluff';
  return finir(type, points, comboApres, !!replique.strike, replique.reaction, mult);
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

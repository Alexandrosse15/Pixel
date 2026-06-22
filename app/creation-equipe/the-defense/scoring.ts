// Moteur de scoring : faveur du jury (0-100), déblocage de répliques selon
// les indices trouvés en phase d'enquête, et résolution du verdict final.

import type { Replique, Seuil } from './types';

export const FAVEUR_MIN = 0;
export const FAVEUR_MAX = 100;

/** Borne une valeur de faveur dans l'intervalle [0, 100]. */
export function clampFaveur(valeur: number): number {
  return Math.max(FAVEUR_MIN, Math.min(FAVEUR_MAX, Math.round(valeur)));
}

/**
 * Une réplique est sélectionnable si elle n'exige aucun indice,
 * ou si l'indice requis a bien été débloqué pendant l'enquête.
 * Les bluffs (indice_requis null, souvent à points négatifs) sont
 * toujours sélectionnables : libre à vous de vous y risquer.
 */
export function repliqueDebloquee(replique: Replique, indices: string[]): boolean {
  if (!replique.indice_requis) return true;
  return indices.includes(replique.indice_requis);
}

export interface ResultatReplique {
  points: number;
  faveurAvant: number;
  faveurApres: number;
  reaction: string;
  /** Vrai si la réplique fait perdre des points (bluff / objection à tort). */
  bluffRate: boolean;
}

/**
 * Applique une réplique à la faveur courante.
 * Une réplique appuyée sur preuve rapporte ses points pleins ; un bluff
 * à tort en retire et provoque une remontrance du juge (cf. reaction).
 */
export function appliquerReplique(replique: Replique, faveurActuelle: number): ResultatReplique {
  const faveurApres = clampFaveur(faveurActuelle + replique.points);
  return {
    points: replique.points,
    faveurAvant: faveurActuelle,
    faveurApres,
    reaction: replique.reaction,
    bluffRate: replique.points < 0,
  };
}

/**
 * Détermine l'issue du procès selon la faveur finale du jury.
 * Renvoie le premier seuil (du plus haut au plus bas) dont `min` est atteint.
 */
export function getVerdict(faveur: number, seuils: Seuil[]): Seuil {
  const tries = [...seuils].sort((a, b) => b.min - a.min);
  return tries.find((s) => faveur >= s.min) ?? tries[tries.length - 1];
}

/** Le client est-il acquitté ? (tout sauf le seuil le plus bas = condamnation). */
export function estAcquitte(faveur: number, seuils: Seuil[]): boolean {
  const minSeuil = Math.min(...seuils.map((s) => s.min));
  const verdict = getVerdict(faveur, seuils);
  return verdict.min > minSeuil;
}

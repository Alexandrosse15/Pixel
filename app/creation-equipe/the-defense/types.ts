// Types décrivant une affaire de "The Defense" (cf. data.json).
// Boucle : enquête à budget limité -> procès (faveur + avertissements + combo)
// -> accusation du vrai coupable -> verdict.

export type PortraitId = 'client' | 'voisin' | 'patissiere' | 'rival' | 'chat';
export type SourcePiste = 'client' | 'police' | 'dossier' | 'scene';

export interface Suspect {
  id: string;
  nom: string;
  role: string;
  portrait: PortraitId;
  /** Le véritable coupable (celui qu'il faut désigner). */
  coupable: boolean;
  /** Responsable partiel / complice (désignation incomplète). */
  complice?: boolean;
  /** Niveau de présomption de départ (0-10). */
  suspicionInitiale: number;
}

export interface EffetSuspicion {
  suspect: string;
  /** Positif = charge, négatif = décharge. */
  valeur: number;
}

export interface Indice {
  id: string;
  /** Résumé court pour le carnet. */
  resume: string;
  effets: EffetSuspicion[];
}

export interface Piste {
  id: string;
  source: SourcePiste;
  label: string;
  /** Coût en actions d'enquête. */
  cout: number;
  /** Indice prérequis pour débloquer cette piste (dépendance). */
  requiert: string | null;
  reponse: string;
  indice: Indice | null;
  /** Fausse piste : charge un innocent, gaspille une action. */
  leurre?: boolean;
}

export interface Replique {
  texte: string;
  /** Indice nécessaire pour pouvoir choisir cette réplique. */
  indiceRequis: string | null;
  points: number;
  /** Réplique étayée : alimente l'Effet de manche (combo). */
  combo?: boolean;
  /** Objection à tort : déclenche un avertissement du juge. */
  strike?: boolean;
  reaction: string;
}

export interface Manche {
  id: string;
  procureur: string;
  repliques: Replique[];
}

export interface IssueVerdict {
  issue: string;
  texte: string;
}

export interface Affaire {
  id: string;
  titre: string;
  resume: string;
  instruction: {
    actionsMax: number;
    intro: string;
  };
  suspects: Suspect[];
  pistes: Piste[];
  proces: {
    faveurInitiale: number;
    /** Seuil de faveur au-dessus duquel le client est acquitté. */
    seuilAcquittement: number;
    /** Seuil de faveur pour un acquittement triomphal. */
    seuilTriomphe: number;
    strikesMax: number;
    manches: Manche[];
  };
  accusation: {
    question: string;
    bonSuspect: string;
    complice: string;
    indiceDecisif: string;
  };
  verdict: {
    radiation: IssueVerdict;
    condamnation: IssueVerdict;
    acquittement_faux_coupable: IssueVerdict;
    demi: IssueVerdict;
    acquittement: IssueVerdict;
    triomphe: IssueVerdict;
    revelation: string;
  };
}

export type IssueCle =
  | 'radiation'
  | 'condamnation'
  | 'acquittement_faux_coupable'
  | 'demi'
  | 'acquittement'
  | 'triomphe';

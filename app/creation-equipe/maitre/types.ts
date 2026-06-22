// Types décrivant la structure d'une affaire (cf. src/data/affaire1.json).

export interface Question {
  id: string;
  texte: string;
  reponse: string;
  debloque_indice: string | null;
}

export interface Personnage {
  nom: string;
  portrait_svg_hint: string;
  profil_cache?: string;
  questions: Question[];
}

export interface PieceDossier {
  id: string;
  titre: string;
  contenu: string;
  debloque_indice: string | null;
}

export interface Replique {
  texte: string;
  indice_requis: string | null;
  points: number;
  reaction: string;
}

export interface Manche {
  id: string;
  procureur: string;
  repliques: Replique[];
}

export interface Seuil {
  min: number;
  issue: string;
  texte: string;
}

export interface VeriteCachee {
  client_coupable: boolean;
  vrai_coupable: string;
  explication: string;
}

export interface Affaire {
  id: string;
  titre: string;
  ton: string;
  resume: string;
  verite_cachee: VeriteCachee;
  client: Personnage;
  enqueteur: Personnage;
  dossier: { pieces: PieceDossier[] };
  tribunal: {
    faveur_initiale: number;
    manches: Manche[];
  };
  verdict: {
    seuils: Seuil[];
    revelation: string;
  };
}

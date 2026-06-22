import { create } from 'zustand';
import affaireData from './data.json';
import type { Affaire, PieceDossier, Question, Replique } from './types';
import { appliquerReplique, clampFaveur } from './scoring';

export const affaire = affaireData as Affaire;

export type Phase = 'cabinet' | 'dossier' | 'tribunal' | 'verdict';

export interface EntreeJournal {
  manche: string;
  replique: string;
  points: number;
  reaction: string;
}

interface GameState {
  phase: Phase;
  faveurJury: number;
  /** Ids des indices débloqués pendant l'enquête. */
  indicesDebloques: string[];
  /** Notes prises par le joueur (réponses lues, pièces consultées). */
  notes: string[];
  /** Ids des questions posées et pièces consultées (pour l'UI). */
  elementsConsultes: string[];
  mancheIndex: number;
  /** Manches déjà jouées (par id) pour éviter de rejouer. */
  manchesJouees: string[];
  journal: EntreeJournal[];
  derniereReaction: string | null;

  setPhase: (phase: Phase) => void;
  poserQuestion: (q: Question, source: string) => void;
  consulterPiece: (p: PieceDossier) => void;
  choisirReplique: (replique: Replique) => void;
  reset: () => void;
}

function etatInitial() {
  return {
    phase: 'cabinet' as Phase,
    faveurJury: affaire.tribunal.faveur_initiale,
    indicesDebloques: [] as string[],
    notes: [] as string[],
    elementsConsultes: [] as string[],
    mancheIndex: 0,
    manchesJouees: [] as string[],
    journal: [] as EntreeJournal[],
    derniereReaction: null as string | null,
  };
}

export const useGame = create<GameState>((set) => ({
  ...etatInitial(),

  setPhase: (phase) => set({ phase, derniereReaction: null }),

  poserQuestion: (q, source) =>
    set((state) => {
      if (state.elementsConsultes.includes(q.id)) return state;
      const indices = q.debloque_indice && !state.indicesDebloques.includes(q.debloque_indice)
        ? [...state.indicesDebloques, q.debloque_indice]
        : state.indicesDebloques;
      return {
        elementsConsultes: [...state.elementsConsultes, q.id],
        indicesDebloques: indices,
        notes: [...state.notes, `${source} - ${q.texte} : ${q.reponse}`],
      };
    }),

  consulterPiece: (p) =>
    set((state) => {
      if (state.elementsConsultes.includes(p.id)) return state;
      const indices = p.debloque_indice && !state.indicesDebloques.includes(p.debloque_indice)
        ? [...state.indicesDebloques, p.debloque_indice]
        : state.indicesDebloques;
      return {
        elementsConsultes: [...state.elementsConsultes, p.id],
        indicesDebloques: indices,
        notes: [...state.notes, `Dossier - ${p.titre} : ${p.contenu}`],
      };
    }),

  choisirReplique: (replique) =>
    set((state) => {
      const manche = affaire.tribunal.manches[state.mancheIndex];
      if (!manche || state.manchesJouees.includes(manche.id)) return state;

      const resultat = appliquerReplique(replique, state.faveurJury);
      const estDerniere = state.mancheIndex >= affaire.tribunal.manches.length - 1;

      return {
        faveurJury: clampFaveur(resultat.faveurApres),
        derniereReaction: resultat.reaction,
        manchesJouees: [...state.manchesJouees, manche.id],
        journal: [
          ...state.journal,
          {
            manche: manche.id,
            replique: replique.texte,
            points: replique.points,
            reaction: replique.reaction,
          },
        ],
        mancheIndex: estDerniere ? state.mancheIndex : state.mancheIndex + 1,
        phase: estDerniere ? ('verdict' as Phase) : state.phase,
      };
    }),

  reset: () => set(etatInitial()),
}));

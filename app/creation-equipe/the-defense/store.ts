import { create } from 'zustand';
import affaireData from './data.json';
import type { Affaire, Piste, Replique } from './types';
import {
  appliquerEffets,
  appliquerReplique,
  suspicionInitiale,
} from './scoring';

export const affaire = affaireData as Affaire;

export type Phase = 'enquete' | 'proces' | 'accusation' | 'verdict';

export interface NoteCarnet {
  id: string;
  resume: string;
}

export interface EntreeJournal {
  manche: string;
  replique: string;
  points: number;
  reaction: string;
}

/** Effet visible de la dernière réplique, pour le retour à l'écran. */
export interface DernierEffet {
  points: number;
  combo: number;
  multiplicateur: number;
  strike: boolean;
  reaction: string;
}

interface GameState {
  phase: Phase;

  // Enquête
  actionsRestantes: number;
  pistesExplorees: string[];
  indices: string[];
  suspicion: Record<string, number>;
  carnet: NoteCarnet[];
  derniereReponse: { pisteId: string; texte: string; leurre: boolean } | null;

  // Procès
  faveurJury: number;
  strikes: number;
  combo: number;
  comboMax: number;
  mancheIndex: number;
  manchesJouees: string[];
  journal: EntreeJournal[];
  dernierEffet: DernierEffet | null;

  // Accusation
  accuse: string | null;

  setPhase: (phase: Phase) => void;
  explorerPiste: (piste: Piste) => void;
  fermerReponse: () => void;
  choisirReplique: (replique: Replique) => void;
  accuser: (suspectId: string) => void;
  reset: () => void;
}

function etatInitial() {
  return {
    phase: 'enquete' as Phase,

    actionsRestantes: affaire.instruction.actionsMax,
    pistesExplorees: [] as string[],
    indices: [] as string[],
    suspicion: suspicionInitiale(affaire.suspects),
    carnet: [] as NoteCarnet[],
    derniereReponse: null as GameState['derniereReponse'],

    faveurJury: affaire.proces.faveurInitiale,
    strikes: 0,
    combo: 0,
    comboMax: 0,
    mancheIndex: 0,
    manchesJouees: [] as string[],
    journal: [] as EntreeJournal[],
    dernierEffet: null as DernierEffet | null,

    accuse: null as string | null,
  };
}

export const useGame = create<GameState>((set) => ({
  ...etatInitial(),

  setPhase: (phase) => set({ phase, dernierEffet: null, derniereReponse: null }),

  explorerPiste: (piste) =>
    set((state) => {
      if (state.pistesExplorees.includes(piste.id)) return state;
      if (state.actionsRestantes < piste.cout) return state;
      if (piste.requiert && !state.indices.includes(piste.requiert)) return state;

      const indices =
        piste.indice && !state.indices.includes(piste.indice.id)
          ? [...state.indices, piste.indice.id]
          : state.indices;
      const carnet = piste.indice
        ? [...state.carnet, { id: piste.indice.id, resume: piste.indice.resume }]
        : state.carnet;

      return {
        actionsRestantes: state.actionsRestantes - piste.cout,
        pistesExplorees: [...state.pistesExplorees, piste.id],
        indices,
        carnet,
        suspicion: appliquerEffets(state.suspicion, piste),
        derniereReponse: {
          pisteId: piste.id,
          texte: piste.reponse,
          leurre: !!piste.leurre,
        },
      };
    }),

  fermerReponse: () => set({ derniereReponse: null }),

  choisirReplique: (replique) =>
    set((state) => {
      const manche = affaire.proces.manches[state.mancheIndex];
      if (!manche || state.manchesJouees.includes(manche.id)) return state;

      const r = appliquerReplique(replique, state.faveurJury, state.combo, state.strikes);
      const disqualifie = r.strikesApres >= affaire.proces.strikesMax;
      const estDerniere = state.mancheIndex >= affaire.proces.manches.length - 1;

      return {
        faveurJury: r.faveurApres,
        strikes: r.strikesApres,
        combo: r.comboApres,
        comboMax: Math.max(state.comboMax, r.comboApres),
        dernierEffet: {
          points: r.pointsEffectifs,
          combo: r.comboApres,
          multiplicateur: r.multiplicateur,
          strike: r.estStrike,
          reaction: r.reaction,
        },
        manchesJouees: [...state.manchesJouees, manche.id],
        journal: [
          ...state.journal,
          {
            manche: manche.id,
            replique: replique.texte,
            points: r.pointsEffectifs,
            reaction: r.reaction,
          },
        ],
        // Trois avertissements : radiation immédiate -> verdict.
        // Sinon on enchaîne, et après la dernière manche on passe à l'accusation.
        mancheIndex: estDerniere ? state.mancheIndex : state.mancheIndex + 1,
        phase: disqualifie ? 'verdict' : estDerniere ? 'accusation' : state.phase,
      };
    }),

  accuser: (suspectId) => set({ accuse: suspectId, phase: 'verdict', dernierEffet: null }),

  reset: () => set(etatInitial()),
}));

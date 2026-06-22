'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { affaire, useGame } from './store';
import type { PieceDossier } from './types';
import { IconeDossier } from './Visuels';

/** Phase intermédiaire : consulter le dossier (rapport, preuves, expertises). */
export function Dossier() {
  const setPhase = useGame((s) => s.setPhase);
  const consulterPiece = useGame((s) => s.consulterPiece);
  const elementsConsultes = useGame((s) => s.elementsConsultes);
  const indicesDebloques = useGame((s) => s.indicesDebloques);
  const [active, setActive] = useState<PieceDossier | null>(null);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-5 text-center">
        <div className="mx-auto mb-2 flex items-center justify-center gap-3">
          <IconeDossier className="h-10 w-10" />
          <h1 className="font-prose text-3xl font-bold text-bois-50">Le Dossier</h1>
        </div>
        <p className="mx-auto max-w-2xl text-sm text-bois-200">
          Épluchez chaque pièce. Certaines cachent un détail que le procureur a préféré ignorer.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        {/* liste des pièces */}
        <div className="space-y-2">
          {affaire.dossier.pieces.map((p) => {
            const lue = elementsConsultes.includes(p.id);
            const estActive = active?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  consulterPiece(p);
                  setActive(p);
                }}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  estActive
                    ? 'border-laiton bg-bois-600/70'
                    : lue
                      ? 'border-bois-600 bg-bois-900/60'
                      : 'border-laiton/50 bg-bois-700/60 hover:bg-bois-600/60'
                }`}
              >
                <IconeDossier className="h-8 w-8 shrink-0" />
                <span className="text-sm text-bois-50">{p.titre}</span>
                {lue && <span className="ml-auto text-xs text-bois-300">lu</span>}
              </button>
            );
          })}
        </div>

        {/* contenu de la pièce */}
        <div className="min-h-[12rem] rounded-2xl border-2 border-bois-700 bg-bois-50 p-5 text-encre shadow-pretoire">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <h3 className="mb-2 border-b border-bois-300 pb-1 font-prose text-xl font-bold">
                  {active.titre}
                </h3>
                <p className="text-sm leading-relaxed">{active.contenu}</p>
                {active.debloque_indice && (
                  <div className="mt-3 inline-block rounded bg-green-700/15 px-2 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
                    Indice retenu pour le procès
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="vide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full items-center justify-center text-center text-sm italic text-bois-400"
              >
                Sélectionnez une pièce à gauche pour la lire.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setPhase('cabinet')}
          className="rounded-lg border border-bois-600 bg-bois-800 px-4 py-2 text-sm text-bois-200 transition hover:bg-bois-700"
        >
          ← Retour au cabinet
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-bois-300">
            Indices : <strong className="text-laiton">{indicesDebloques.length}</strong>
          </span>
          <button
            onClick={() => setPhase('tribunal')}
            className="rounded-lg border-2 border-laiton bg-bois-700 px-5 py-2 font-prose text-lg text-bois-50 shadow transition hover:bg-bois-600"
          >
            Entrer au tribunal →
          </button>
        </div>
      </div>
    </div>
  );
}

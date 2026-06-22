'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { affaire, useGame } from './store';
import type { Replique } from './types';
import { repliqueDebloquee } from './scoring';
import { JaugeJury } from './JaugeJury';
import {
  BadgeBalance,
  BadgeEclair,
  BadgeVerrou,
  PortraitProcureur,
  PortraitJuge,
  SalleAudience,
} from './Visuels';

/** Phase 2 : le procès. Manche par manche, on répond au procureur. */
export function Tribunal() {
  const faveurJury = useGame((s) => s.faveurJury);
  const mancheIndex = useGame((s) => s.mancheIndex);
  const indicesDebloques = useGame((s) => s.indicesDebloques);
  const choisirReplique = useGame((s) => s.choisirReplique);

  const [enTransition, setEnTransition] = useState(false);
  const [variation, setVariation] = useState<number | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);

  const manche = affaire.tribunal.manches[mancheIndex];
  const totalManches = affaire.tribunal.manches.length;

  function jouer(replique: Replique) {
    if (enTransition) return;
    setVariation(replique.points);
    setReaction(replique.reaction);
    setEnTransition(true);
    // petit délai pour laisser voir la réaction avant de passer à la manche suivante
    window.setTimeout(() => {
      choisirReplique(replique);
      setEnTransition(false);
      setReaction(null);
    }, 1800);
  }

  if (!manche) return null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* décor de salle */}
      <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-bois-700 shadow-pretoire">
        <SalleAudience className="h-40 w-full" />
        <div className="absolute inset-0 flex items-end justify-between px-6 pb-2">
          <div className="flex flex-col items-center">
            <PortraitJuge className="h-20 w-20 drop-shadow-lg" />
            <span className="mt-1 rounded bg-bois-900/80 px-2 text-xs text-bois-100">Le Juge</span>
          </div>
          <div className="mb-2 rounded-lg bg-bois-900/80 px-3 py-1 text-center">
            <span className="font-prose text-lg text-laiton">Manche {mancheIndex + 1} / {totalManches}</span>
          </div>
          <div className="flex flex-col items-center">
            <PortraitProcureur className="h-20 w-20 drop-shadow-lg" />
            <span className="mt-1 rounded bg-bois-900/80 px-2 text-xs text-bois-100">Procureur</span>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border-2 border-bois-700 bg-bois-800/80 p-4 shadow">
        <JaugeJury faveur={faveurJury} variation={enTransition ? variation : null} />
      </div>

      {/* attaque du procureur */}
      <AnimatePresence mode="wait">
        <motion.div
          key={manche.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 rounded-xl border-l-4 border-red-700/70 bg-bois-900/70 p-4"
        >
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-red-400">
            Le procureur attaque
          </div>
          <p className="font-prose text-lg italic text-bois-50">« {manche.procureur} »</p>
        </motion.div>
      </AnimatePresence>

      {/* répliques */}
      <div className="space-y-2">
        {manche.repliques.map((replique, i) => {
          const debloquee = repliqueDebloquee(replique, indicesDebloques);
          const estBluff = replique.indice_requis === null;
          return (
            <button
              key={i}
              disabled={!debloquee || enTransition}
              onClick={() => jouer(replique)}
              className={`group flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
                !debloquee
                  ? 'cursor-not-allowed border-bois-700 bg-bois-900/40 text-bois-400'
                  : estBluff
                    ? 'border-red-800/50 bg-bois-800/70 text-bois-100 hover:border-red-600 hover:bg-bois-700/70'
                    : 'border-laiton/60 bg-bois-700/70 text-bois-50 hover:border-laiton hover:bg-bois-600/70'
              } ${enTransition ? 'opacity-60' : ''}`}
            >
              <span className="mt-0.5 shrink-0">
                {!debloquee ? (
                  <BadgeVerrou className="h-5 w-5" />
                ) : estBluff ? (
                  <BadgeEclair className="h-5 w-5" />
                ) : (
                  <BadgeBalance className="h-5 w-5" />
                )}
              </span>
              <span className="flex-1">
                <span className="text-sm">{replique.texte}</span>
                {!debloquee && (
                  <span className="mt-1 block text-xs italic text-bois-400">
                    Indice manquant : vous n'avez pas de quoi étayer cette objection.
                  </span>
                )}
                {debloquee && estBluff && (
                  <span className="mt-1 block text-xs italic text-red-400/80">
                    Aucune preuve derrière. À vos risques et périls.
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* réaction de la salle */}
      <AnimatePresence>
        {enTransition && reaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border-2 border-laiton bg-bois-900/90 p-4 text-center"
          >
            <p className="font-prose text-lg text-laiton">{reaction}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

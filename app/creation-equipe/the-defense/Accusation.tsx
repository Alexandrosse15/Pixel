'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { affaire, useGame } from './store';
import { SuspectBoard } from './SuspectBoard';

/** Phase 3 : désigner au jury le véritable coupable. */
export function Accusation() {
  const suspicion = useGame((s) => s.suspicion);
  const indices = useGame((s) => s.indices);
  const accuser = useGame((s) => s.accuser);
  const [choix, setChoix] = useState<string | null>(null);

  const aPreuveDecisive = indices.includes(affaire.accusation.indiceDecisif);

  return (
    <div className="mx-auto max-w-4xl">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-bois-300">Réquisitoire final</p>
        <h1 className="mt-2 font-prose text-3xl font-bold text-bois-50">Qui est le vrai coupable ?</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-bois-200">
          {affaire.accusation.question}
        </p>
      </motion.header>

      <div
        className={`mx-auto mb-5 max-w-xl rounded-lg border px-4 py-2 text-center text-sm ${
          aPreuveDecisive
            ? 'border-green-600/50 bg-green-900/20 text-green-200'
            : 'border-red-700/40 bg-red-950/30 text-red-200'
        }`}
      >
        {aPreuveDecisive
          ? 'Vous tenez la preuve décisive. Votre carnet désigne un coupable sans appel.'
          : "Attention : il vous manque la preuve décisive. Sans elle, vous accusez à l'aveugle."}
      </div>

      <div className="rounded-2xl border-2 border-bois-700 bg-bois-900/40 p-3">
        <SuspectBoard suspicion={suspicion} selectable selected={choix} onSelect={setChoix} />
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button
          disabled={!choix}
          onClick={() => choix && accuser(choix)}
          className={`rounded-lg border-2 px-6 py-3 font-prose text-xl shadow transition ${
            choix
              ? 'border-laiton bg-bois-700 text-bois-50 hover:bg-bois-600'
              : 'cursor-not-allowed border-bois-700 bg-bois-900/50 text-bois-500'
          }`}
        >
          {choix
            ? `J'accuse ${affaire.suspects.find((s) => s.id === choix)?.nom} !`
            : 'Désignez un suspect'}
        </button>
      </div>
    </div>
  );
}

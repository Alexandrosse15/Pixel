'use client'

import { motion } from 'framer-motion';
import { affaire, useGame } from './store';
import { estAcquitte, getVerdict } from './scoring';
import { ChatMarquise, PortraitClient, SceauJustice } from './Visuels';

/** Phase 3 : le verdict, puis la révélation de la vérité. */
export function Verdict() {
  const faveurJury = useGame((s) => s.faveurJury);
  const journal = useGame((s) => s.journal);
  const reset = useGame((s) => s.reset);

  const seuil = getVerdict(faveurJury, affaire.verdict.seuils);
  const acquitte = estAcquitte(faveurJury, affaire.verdict.seuils);

  return (
    <div className="mx-auto max-w-3xl">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <SceauJustice className="mx-auto mb-3 h-14 w-14" />
        <p className="text-sm uppercase tracking-[0.3em] text-bois-300">Le verdict tombe</p>
        <h1
          className={`font-prose text-4xl font-bold ${acquitte ? 'text-green-400' : 'text-red-400'}`}
        >
          {seuil.issue}
        </h1>
        <p className="mt-1 text-sm text-bois-300">
          Faveur finale du jury : <strong className="text-laiton">{faveurJury}/100</strong>
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-5 flex items-center gap-4 rounded-2xl border-2 border-bois-700 bg-bois-800/80 p-5 shadow-pretoire"
      >
        <PortraitClient className="h-20 w-20 shrink-0" />
        <p className="font-prose text-lg leading-relaxed text-bois-50">{seuil.texte}</p>
      </motion.div>

      {/* révélation de la vérité */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-5 flex items-start gap-4 rounded-2xl border-2 border-laiton bg-bois-900/80 p-5"
      >
        <ChatMarquise className="h-20 w-20 shrink-0" />
        <div>
          <h2 className="mb-1 font-prose text-xl font-bold text-laiton">La vérité</h2>
          <p className="text-sm leading-relaxed text-bois-100">{affaire.verdict.revelation}</p>
          <p className="mt-2 text-xs italic text-bois-300">{affaire.verite_cachee.vrai_coupable}</p>
        </div>
      </motion.div>

      {/* récapitulatif des plaidoiries */}
      <details className="mb-6 rounded-xl border border-bois-700 bg-bois-800/60 p-4 text-sm text-bois-200">
        <summary className="cursor-pointer font-bold text-bois-100">
          Récapitulatif de votre plaidoirie
        </summary>
        <ul className="mt-3 space-y-2">
          {journal.map((e, i) => (
            <li key={i} className="flex items-start justify-between gap-3 border-b border-bois-700/50 pb-2">
              <span className="italic">« {e.replique} »</span>
              <span className={`shrink-0 font-bold ${e.points > 0 ? 'text-green-400' : e.points < 0 ? 'text-red-400' : 'text-bois-300'}`}>
                {e.points > 0 ? `+${e.points}` : e.points}
              </span>
            </li>
          ))}
        </ul>
      </details>

      <div className="text-center">
        <button
          onClick={reset}
          className="rounded-lg border-2 border-laiton bg-bois-700 px-6 py-3 font-prose text-xl text-bois-50 shadow transition hover:bg-bois-600"
        >
          Rejouer l'affaire
        </button>
      </div>
    </div>
  );
}

'use client'

import { motion } from 'framer-motion';
import { affaire, useGame } from './store';
import { estVictoire, resoudreVerdict } from './scoring';
import { ChatMarquise, PortraitClient, PortraitSuspect, SceauJustice } from './Visuels';

/** Phase finale : le verdict (procès + accusation), puis la vérité. */
export function Verdict() {
  const faveurJury = useGame((s) => s.faveurJury);
  const strikes = useGame((s) => s.strikes);
  const comboMax = useGame((s) => s.comboMax);
  const accuse = useGame((s) => s.accuse);
  const journal = useGame((s) => s.journal);
  const reset = useGame((s) => s.reset);

  const issueCle = resoudreVerdict({ faveur: faveurJury, strikes, accuse }, affaire);
  const issue = affaire.verdict[issueCle];
  const victoire = estVictoire(issueCle);
  const suspectAccuse = affaire.suspects.find((s) => s.id === accuse);

  return (
    <div className="mx-auto max-w-3xl">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <SceauJustice className="mx-auto mb-3 h-14 w-14" />
        <p className="text-sm uppercase tracking-[0.3em] text-bois-300">Le verdict tombe</p>
        <h1 className={`font-prose text-4xl font-bold ${victoire ? 'text-green-400' : 'text-red-400'}`}>
          {issue.issue}
        </h1>
        <div className="mt-2 flex items-center justify-center gap-4 text-xs text-bois-300">
          <span>
            Faveur : <strong className="text-laiton">{faveurJury}/100</strong>
          </span>
          <span>
            Avertissements : <strong className="text-laiton">{strikes}/{affaire.proces.strikesMax}</strong>
          </span>
          <span>
            Meilleur combo : <strong className="text-laiton">×{comboMax}</strong>
          </span>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 flex items-center gap-4 rounded-2xl border-2 border-bois-700 bg-bois-800/80 p-5 shadow-pretoire"
      >
        <PortraitClient className="h-20 w-20 shrink-0" />
        <p className="font-prose text-lg leading-relaxed text-bois-50">{issue.texte}</p>
      </motion.div>

      {/* qui vous avez accusé */}
      {suspectAccuse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 flex items-center gap-3 rounded-xl border border-bois-700 bg-bois-900/50 p-3"
        >
          <PortraitSuspect id={suspectAccuse.portrait} className="h-12 w-12 shrink-0" />
          <p className="text-sm text-bois-200">
            Vous avez désigné <strong className="text-bois-50">{suspectAccuse.nom}</strong>.{' '}
            {accuse === affaire.accusation.bonSuspect
              ? 'La bonne réponse.'
              : accuse === affaire.accusation.complice
                ? 'Un complice, mais pas le vrai responsable.'
                : 'Une erreur judiciaire de plus.'}
          </p>
        </motion.div>
      )}

      {/* révélation de la vérité */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-5 flex items-start gap-4 rounded-2xl border-2 border-laiton bg-bois-900/80 p-5"
      >
        <ChatMarquise className="h-20 w-20 shrink-0" />
        <div>
          <h2 className="mb-1 font-prose text-xl font-bold text-laiton">La vérité</h2>
          <p className="text-sm leading-relaxed text-bois-100">{affaire.verdict.revelation}</p>
        </div>
      </motion.div>

      <details className="mb-6 rounded-xl border border-bois-700 bg-bois-800/60 p-4 text-sm text-bois-200">
        <summary className="cursor-pointer font-bold text-bois-100">
          Récapitulatif de votre plaidoirie
        </summary>
        <ul className="mt-3 space-y-2">
          {journal.map((e, i) => (
            <li key={i} className="flex items-start justify-between gap-3 border-b border-bois-700/50 pb-2">
              <span className="italic">« {e.replique} »</span>
              <span
                className={`shrink-0 font-bold ${
                  e.points > 0 ? 'text-green-400' : e.points < 0 ? 'text-red-400' : 'text-bois-300'
                }`}
              >
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

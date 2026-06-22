'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './store';
import type { Phase } from './store';
import { Cabinet } from './Cabinet';
import { Dossier } from './Dossier';
import { Tribunal } from './Tribunal';
import { Verdict } from './Verdict';

const PHASES: { id: Phase; label: string }[] = [
  { id: 'cabinet', label: 'Cabinet' },
  { id: 'dossier', label: 'Dossier' },
  { id: 'tribunal', label: 'Tribunal' },
  { id: 'verdict', label: 'Verdict' },
];

/** Machine à états : cabinet -> dossier -> tribunal -> verdict. */
export default function MaitreGame() {
  const phase = useGame((s) => s.phase);
  const indexCourant = PHASES.findIndex((p) => p.id === phase);

  return (
    <div
      className="overflow-hidden rounded-sm border border-bois-700 font-prose text-bois-100 shadow-pretoire"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, #3c2611, #2a1a0c 60%, #1c150d 100%)',
      }}
    >
      <div className="min-h-[36rem] px-4 py-6">
        {/* fil d'Ariane des phases */}
        <nav className="mx-auto mb-6 flex max-w-4xl items-center justify-center gap-2 text-xs uppercase tracking-widest">
          {PHASES.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 ${
                  i === indexCourant
                    ? 'bg-laiton font-bold text-encre'
                    : i < indexCourant
                      ? 'bg-bois-700 text-bois-200'
                      : 'bg-bois-900 text-bois-400'
                }`}
              >
                {p.label}
              </span>
              {i < PHASES.length - 1 && <span className="text-bois-600">&rsaquo;</span>}
            </div>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.main
            key={phase}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            {phase === 'cabinet' && <Cabinet />}
            {phase === 'dossier' && <Dossier />}
            {phase === 'tribunal' && <Tribunal />}
            {phase === 'verdict' && <Verdict />}
          </motion.main>
        </AnimatePresence>

        <footer className="mx-auto mt-10 max-w-4xl text-center text-xs text-bois-500">
          Maître — fiction judiciaire. Toute ressemblance avec un chat existant serait fortuite.
        </footer>
      </div>
    </div>
  );
}

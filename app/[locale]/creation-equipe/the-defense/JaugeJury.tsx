'use client'

import { motion } from 'framer-motion';
import { FAVEUR_MAX } from './scoring';

interface JaugeJuryProps {
  faveur: number;
  /** Variation lors de la dernière réplique, pour l'afficher (+15 / -10). */
  variation?: number | null;
}

function couleurFaveur(faveur: number): string {
  if (faveur >= 70) return '#5fae4f';
  if (faveur >= 45) return '#caa05a';
  if (faveur >= 25) return '#d08a3a';
  return '#b94a3a';
}

/** Barre animée représentant la faveur du jury (0-100). */
export function JaugeJury({ faveur, variation }: JaugeJuryProps) {
  const pct = Math.max(0, Math.min(100, (faveur / FAVEUR_MAX) * 100));

  return (
    <div className="w-full select-none">
      <div className="mb-1 flex items-end justify-between">
        <span className="text-sm uppercase tracking-widest text-bois-200">Faveur du jury</span>
        <div className="flex items-baseline gap-2">
          {variation != null && variation !== 0 && (
            <motion.span
              key={`${faveur}-${variation}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-bold ${variation > 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {variation > 0 ? `+${variation}` : variation}
            </motion.span>
          )}
          <motion.span
            key={faveur}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="font-prose text-2xl font-bold text-bois-50"
          >
            {faveur}
          </motion.span>
        </div>
      </div>

      <div className="relative h-6 overflow-hidden rounded-full border-2 border-bois-700 bg-bois-900 shadow-inner">
        {/* graduations */}
        <div className="pointer-events-none absolute inset-0 flex justify-between px-[1px]">
          {[25, 35, 60, 85].map((seuil) => (
            <div
              key={seuil}
              className="absolute top-0 h-full w-px bg-bois-50/20"
              style={{ left: `${seuil}%` }}
            />
          ))}
        </div>
        <motion.div
          className="h-full rounded-full"
          initial={false}
          animate={{ width: `${pct}%`, backgroundColor: couleurFaveur(faveur) }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-bois-300">
        <span>Condamnation</span>
        <span>Acquittement</span>
      </div>
    </div>
  );
}

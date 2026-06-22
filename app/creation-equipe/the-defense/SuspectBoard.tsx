'use client'

import { motion } from 'framer-motion';
import { affaire } from './store';
import { SUSPICION_MAX } from './scoring';
import { PortraitSuspect } from './Visuels';

function couleurSuspicion(v: number): string {
  if (v >= 8) return '#b94a3a';
  if (v >= 5) return '#d08a3a';
  if (v >= 3) return '#caa05a';
  return '#5f7a4a';
}

interface SuspectBoardProps {
  suspicion: Record<string, number>;
  /** Mode accusation : cartes cliquables. */
  selectable?: boolean;
  selected?: string | null;
  onSelect?: (id: string) => void;
}

/** Le faisceau de présomptions : barre de soupçon par suspect. */
export function SuspectBoard({ suspicion, selectable, selected, onSelect }: SuspectBoardProps) {
  const valeurs = affaire.suspects.map((s) => suspicion[s.id] ?? 0);
  const maxVal = Math.max(1, ...valeurs);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {affaire.suspects.map((s) => {
        const v = suspicion[s.id] ?? 0;
        const pct = (v / SUSPICION_MAX) * 100;
        const enTete = v === maxVal && v > 0;
        const estSel = selected === s.id;
        const Wrapper = selectable ? 'button' : 'div';
        return (
          <Wrapper
            key={s.id}
            type={selectable ? 'button' : undefined}
            onClick={selectable ? () => onSelect?.(s.id) : undefined}
            className={`flex flex-col items-center rounded-lg border p-2 text-center transition ${
              estSel
                ? 'border-laiton bg-bois-600/70 ring-2 ring-laiton'
                : selectable
                  ? 'border-bois-600 bg-bois-800/70 hover:border-laiton hover:bg-bois-700/70'
                  : 'border-bois-700 bg-bois-800/50'
            }`}
          >
            <div className="relative">
              <PortraitSuspect id={s.portrait} className="h-12 w-12" />
              {enTete && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-700 px-1 text-[9px] font-bold text-white">
                  !
                </span>
              )}
            </div>
            <span className="mt-1 text-xs font-bold leading-tight text-bois-50">{s.nom}</span>
            <span className="text-[10px] leading-tight text-bois-300">{s.role}</span>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bois-900">
              <motion.div
                className="h-full rounded-full"
                initial={false}
                animate={{ width: `${pct}%`, backgroundColor: couleurSuspicion(v) }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              />
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}

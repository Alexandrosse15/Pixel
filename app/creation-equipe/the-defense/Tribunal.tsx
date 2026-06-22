'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { affaire, useGame } from './store';
import type { Replique } from './types';
import { appliquerReplique } from './scoring';
import { JaugeJury } from './JaugeJury';
import {
  BadgeBalance,
  BadgeCoche,
  BadgeEclair,
  IconeDossier,
  PortraitProcureur,
  PortraitJuge,
  SalleAudience,
} from './Visuels';

/** Bandeau des avertissements du juge (3 = radiation). */
function Avertissements({ strikes, max }: { strikes: number; max: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-bois-300">Juge</span>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`h-3.5 w-3.5 rounded-sm border ${
            i < strikes ? 'border-red-500 bg-red-600' : 'border-bois-600 bg-bois-900'
          }`}
          title="Avertissement"
        />
      ))}
    </div>
  );
}

interface EffetAffiche {
  reaction: string;
  mult: number;
  strike: boolean;
  rate: boolean;
}

/** Phase 2 : le procès. Aucune réplique n'est verrouillée : à vous de juger. */
export function Tribunal() {
  const faveurJury = useGame((s) => s.faveurJury);
  const mancheIndex = useGame((s) => s.mancheIndex);
  const indices = useGame((s) => s.indices);
  const carnet = useGame((s) => s.carnet);
  const strikes = useGame((s) => s.strikes);
  const combo = useGame((s) => s.combo);
  const choisirReplique = useGame((s) => s.choisirReplique);

  const [enTransition, setEnTransition] = useState(false);
  const [variation, setVariation] = useState<number | null>(null);
  const [effet, setEffet] = useState<EffetAffiche | null>(null);
  const [carnetOuvert, setCarnetOuvert] = useState(false);

  const manche = affaire.proces.manches[mancheIndex];
  const totalManches = affaire.proces.manches.length;
  const strikesMax = affaire.proces.strikesMax;

  function jouer(replique: Replique) {
    if (enTransition) return;
    const r = appliquerReplique(
      replique,
      indices,
      faveurJury,
      combo,
      strikes,
      affaire.proces.objectionRejetee,
    );
    setVariation(r.pointsEffectifs);
    setEffet({
      reaction: r.reaction,
      mult: r.multiplicateur,
      strike: r.estStrike,
      rate: r.type !== 'succes',
    });
    setEnTransition(true);
    window.setTimeout(() => {
      choisirReplique(replique);
      setEnTransition(false);
      setEffet(null);
    }, 2000);
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
            <span className="font-prose text-lg text-laiton">
              Manche {mancheIndex + 1} / {totalManches}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <PortraitProcureur className="h-20 w-20 drop-shadow-lg" />
            <span className="mt-1 rounded bg-bois-900/80 px-2 text-xs text-bois-100">Procureur</span>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border-2 border-bois-700 bg-bois-800/80 p-4 shadow">
        <JaugeJury faveur={faveurJury} variation={enTransition ? variation : null} />
        <div className="mt-3 flex items-center justify-between">
          <Avertissements strikes={strikes} max={strikesMax} />
          <AnimatePresence>
            {combo >= 2 && (
              <motion.span
                key={combo}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full border border-laiton bg-laiton/20 px-3 py-0.5 text-sm font-bold text-laiton"
              >
                Effet de manche ×{combo >= 4 ? 2 : combo === 3 ? 1.6 : 1.3}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Carnet d'indices (aide à la décision) */}
      <div className="mb-4 rounded-xl border border-laiton/40 bg-bois-900/50">
        <button
          onClick={() => setCarnetOuvert((v) => !v)}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-laiton"
        >
          <IconeDossier className="h-4 w-4" />
          Votre carnet ({carnet.length}) {carnetOuvert ? '−' : '+'}
          <span className="ml-auto text-[11px] italic text-bois-400">
            n'invoquez que ce que vous tenez
          </span>
        </button>
        <AnimatePresence>
          {carnetOuvert && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-3 pb-3"
            >
              {carnet.length === 0 ? (
                <li className="text-xs italic text-bois-400">
                  Carnet vide : vous plaidez sans la moindre preuve. Bon courage.
                </li>
              ) : (
                carnet.map((n) => (
                  <li key={n.id} className="flex items-start gap-2 py-0.5 text-xs text-bois-100">
                    <BadgeCoche className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{n.resume}</span>
                  </li>
                ))
              )}
            </motion.ul>
          )}
        </AnimatePresence>
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

      {/* répliques : toutes choisissables, à vous de juger */}
      <div className="space-y-2">
        {manche.repliques.map((replique, i) => {
          const sansPreuve = replique.indiceRequis === null;
          return (
            <button
              key={i}
              disabled={enTransition}
              onClick={() => jouer(replique)}
              className={`group flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
                sansPreuve
                  ? 'border-red-800/50 bg-bois-800/70 text-bois-100 hover:border-red-600 hover:bg-bois-700/70'
                  : 'border-laiton/60 bg-bois-700/70 text-bois-50 hover:border-laiton hover:bg-bois-600/70'
              } ${enTransition ? 'opacity-60' : ''}`}
            >
              <span className="mt-0.5 shrink-0">
                {sansPreuve ? <BadgeEclair className="h-5 w-5" /> : <BadgeBalance className="h-5 w-5" />}
              </span>
              <span className="flex-1 text-sm">
                {replique.texte}
                {sansPreuve && (
                  <span className="mt-1 block text-xs italic text-red-400/80">
                    Sans preuve : risque d'avertissement.
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* réaction de la salle */}
      <AnimatePresence>
        {enTransition && effet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-4 rounded-xl border-2 p-4 text-center ${
              effet.strike
                ? 'border-red-600 bg-red-950/60'
                : effet.rate
                  ? 'border-orange-700/70 bg-bois-900/90'
                  : 'border-laiton bg-bois-900/90'
            }`}
          >
            <p
              className={`font-prose text-lg ${
                effet.strike ? 'text-red-300' : effet.rate ? 'text-orange-300' : 'text-laiton'
              }`}
            >
              {effet.reaction}
            </p>
            {effet.mult > 1 && (
              <p className="mt-1 text-sm font-bold text-green-400">Effet de manche ×{effet.mult} !</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

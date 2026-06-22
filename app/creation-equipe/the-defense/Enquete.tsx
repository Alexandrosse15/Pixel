'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { affaire, useGame } from './store';
import type { Piste, SourcePiste } from './types';
import { pisteAccessible } from './scoring';
import {
  BadgeCoche,
  BadgeQuestion,
  BadgeVerrou,
  IconeDossier,
  SceauJustice,
} from './Visuels';
import { SuspectBoard } from './SuspectBoard';

const SOURCES: { id: SourcePiste; titre: string }[] = [
  { id: 'client', titre: 'Votre client — Gérard Pluvier' },
  { id: 'police', titre: 'Inspecteur Lebrun' },
  { id: 'dossier', titre: 'Le dossier d\'instruction' },
  { id: 'scene', titre: 'Sur le terrain' },
];

export function Enquete() {
  const setPhase = useGame((s) => s.setPhase);
  const explorerPiste = useGame((s) => s.explorerPiste);
  const fermerReponse = useGame((s) => s.fermerReponse);
  const actionsRestantes = useGame((s) => s.actionsRestantes);
  const pistesExplorees = useGame((s) => s.pistesExplorees);
  const indices = useGame((s) => s.indices);
  const suspicion = useGame((s) => s.suspicion);
  const carnet = useGame((s) => s.carnet);
  const derniereReponse = useGame((s) => s.derniereReponse);

  const actionsMax = affaire.instruction.actionsMax;
  const reponsePiste = derniereReponse
    ? affaire.pistes.find((p) => p.id === derniereReponse.pisteId)
    : null;

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-5 text-center">
        <div className="mx-auto mb-2 flex items-center justify-center gap-3">
          <SceauJustice className="h-9 w-9" />
          <h1 className="font-prose text-2xl font-bold text-bois-50 md:text-3xl">{affaire.titre}</h1>
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-bois-200">{affaire.instruction.intro}</p>
      </header>

      {/* Compteur d'actions */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="text-xs uppercase tracking-widest text-bois-300">Temps d'enquête</span>
        <div className="flex gap-1.5">
          {Array.from({ length: actionsMax }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full border ${
                i < actionsRestantes
                  ? 'border-laiton bg-laiton'
                  : 'border-bois-600 bg-bois-900'
              }`}
            />
          ))}
        </div>
        <span className="font-prose text-lg font-bold text-laiton">
          {actionsRestantes}/{actionsMax}
        </span>
      </div>

      {/* Faisceau de présomptions */}
      <div className="mb-5 rounded-2xl border-2 border-bois-700 bg-bois-900/40 p-3">
        <p className="mb-2 text-center text-xs uppercase tracking-widest text-bois-300">
          Faisceau de présomptions
        </p>
        <SuspectBoard suspicion={suspicion} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Pistes */}
        <div className="space-y-4">
          {SOURCES.map((src) => {
            const pistes = affaire.pistes.filter((p) => p.source === src.id);
            if (pistes.length === 0) return null;
            return (
              <div key={src.id} className="rounded-xl border border-bois-700 bg-bois-800/60 p-3 veine-bois">
                <h3 className="mb-2 font-prose text-base text-bois-50">{src.titre}</h3>
                <div className="space-y-2">
                  {pistes.map((piste) => (
                    <PisteBouton
                      key={piste.id}
                      piste={piste}
                      explore={pistesExplorees.includes(piste.id)}
                      accessible={pisteAccessible(piste, indices, actionsRestantes)}
                      verrou={!!piste.requiert && !indices.includes(piste.requiert)}
                      onClick={() => explorerPiste(piste)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carnet d'indices */}
        <div className="rounded-xl border-2 border-laiton/40 bg-bois-900/60 p-3">
          <h3 className="mb-2 flex items-center gap-2 font-prose text-base text-laiton">
            <IconeDossier className="h-5 w-5" /> Carnet d'indices
          </h3>
          {carnet.length === 0 ? (
            <p className="text-xs italic text-bois-400">
              Aucun indice pour l'instant. Chaque piste solide enrichit votre dossier.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {carnet.map((n) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2 text-xs text-bois-100"
                >
                  <BadgeCoche className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{n.resume}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-xs text-bois-400">
          {actionsRestantes === 0
            ? "Plus de temps : l'audience commence."
            : 'Vous pouvez plaider quand vous voulez, mais sans indices vous serez à découvert.'}
        </span>
        <button
          onClick={() => setPhase('proces')}
          className={`rounded-lg border-2 px-5 py-2 font-prose text-lg text-bois-50 shadow transition ${
            actionsRestantes === 0
              ? 'animate-pulse border-laiton bg-bois-600 hover:bg-bois-500'
              : 'border-laiton bg-bois-700 hover:bg-bois-600'
          }`}
        >
          Au tribunal →
        </button>
      </div>

      {/* Réponse de la piste */}
      <AnimatePresence>
        {derniereReponse && reponsePiste && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fermerReponse}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg rounded-2xl border-2 border-laiton bg-bois-800 p-5 shadow-pretoire"
            >
              <p className="font-prose text-base italic leading-relaxed text-bois-50">
                « {reponsePiste.reponse} »
              </p>
              {reponsePiste.indice && (
                <div
                  className={`mt-3 rounded-lg border-l-4 p-2 text-sm ${
                    derniereReponse.leurre
                      ? 'border-red-600 bg-red-900/20 text-red-200'
                      : 'border-green-500 bg-green-900/20 text-green-200'
                  }`}
                >
                  {derniereReponse.leurre ? (
                    <>
                      <strong>Fausse piste.</strong> Du temps perdu, un soupçon mal placé, et le
                      procureur en profite : −4 de faveur au procès.
                    </>
                  ) : (
                    <>
                      <strong>Indice au carnet :</strong> {reponsePiste.indice.resume}
                    </>
                  )}
                </div>
              )}
              <button
                onClick={fermerReponse}
                className="mt-4 w-full rounded-lg border border-laiton bg-bois-700 py-2 text-sm text-bois-50 transition hover:bg-bois-600"
              >
                Continuer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PisteBouton({
  piste,
  explore,
  accessible,
  verrou,
  onClick,
}: {
  piste: Piste;
  explore: boolean;
  accessible: boolean;
  verrou: boolean;
  onClick: () => void;
}) {
  const disabled = explore || !accessible;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
        explore
          ? 'border-bois-600 bg-bois-900/60 text-bois-400'
          : !accessible
            ? 'cursor-not-allowed border-bois-700 bg-bois-900/40 text-bois-500'
            : 'border-laiton/60 bg-bois-700/60 text-bois-50 hover:bg-bois-600/70'
      }`}
    >
      {explore ? (
        <BadgeCoche className="h-4 w-4 shrink-0" />
      ) : verrou ? (
        <BadgeVerrou className="h-4 w-4 shrink-0" />
      ) : (
        <BadgeQuestion className="h-4 w-4 shrink-0" />
      )}
      <span className="flex-1">
        {piste.label}
        {verrou && !explore && (
          <span className="mt-0.5 block text-[11px] italic text-bois-500">
            Piste verrouillée : un indice préalable vous manque.
          </span>
        )}
        {explore && piste.leurre && (
          <span className="mt-0.5 block text-[11px] italic text-red-400/80">Fausse piste.</span>
        )}
      </span>
      {!explore && (
        <span
          className={`ml-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
            piste.cout > 1 ? 'bg-red-900/50 text-red-200' : 'bg-bois-900/60 text-bois-300'
          }`}
          title="Coût en temps d'enquête"
        >
          {piste.cout} action{piste.cout > 1 ? 's' : ''}
        </span>
      )}
    </button>
  );
}

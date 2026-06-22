'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { affaire, useGame } from './store';
import type { Personnage, Question } from './types';
import { BadgeCoche, BadgeQuestion, PortraitClient, PortraitEnqueteur, SceauJustice } from './Visuels';

/** Bloc d'interrogatoire d'un personnage (client ou enquêteur). */
function Interrogatoire({
  personnage,
  Portrait,
  source,
}: {
  personnage: Personnage;
  Portrait: (props: { className?: string }) => JSX.Element;
  source: string;
}) {
  const poserQuestion = useGame((s) => s.poserQuestion);
  const elementsConsultes = useGame((s) => s.elementsConsultes);
  const [active, setActive] = useState<Question | null>(null);

  return (
    <div className="rounded-2xl border-2 border-bois-700 bg-bois-800/70 p-4 veine-bois shadow-pretoire">
      <div className="flex items-center gap-3">
        <Portrait className="h-16 w-16 shrink-0 drop-shadow" />
        <div>
          <h3 className="font-prose text-xl text-bois-50">{personnage.nom}</h3>
          <p className="text-xs italic text-bois-300">{personnage.portrait_svg_hint}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {personnage.questions.map((q) => {
          const dejaPose = elementsConsultes.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => {
                poserQuestion(q, source);
                setActive(q);
              }}
              className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                dejaPose
                  ? 'border-bois-600 bg-bois-900/60 text-bois-300'
                  : 'border-laiton/60 bg-bois-700/60 text-bois-50 hover:bg-bois-600/70'
              }`}
            >
              {dejaPose ? (
                <BadgeCoche className="h-4 w-4 shrink-0" />
              ) : (
                <BadgeQuestion className="h-4 w-4 shrink-0" />
              )}
              <span>{q.texte}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="rounded-lg border-l-4 border-laiton bg-bois-900/70 p-3 text-sm italic text-bois-100">
              « {active.reponse} »
              {active.debloque_indice && (
                <div className="mt-2 text-xs font-bold uppercase not-italic tracking-wide text-green-400">
                  Indice noté au dossier
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Phase 1 : le cabinet. On interroge le client et l'enquêtrice. */
export function Cabinet() {
  const setPhase = useGame((s) => s.setPhase);
  const indicesDebloques = useGame((s) => s.indicesDebloques);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6 text-center">
        <div className="mx-auto mb-2 flex items-center justify-center gap-3">
          <SceauJustice className="h-10 w-10" />
          <h1 className="font-prose text-3xl font-bold text-bois-50">{affaire.titre}</h1>
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-bois-200">{affaire.resume}</p>
      </header>

      <div className="mb-4 rounded-xl border border-bois-700 bg-bois-900/50 px-4 py-3 text-center text-sm text-bois-200">
        <span className="font-bold text-laiton">Cabinet de la défense.</span> Interrogez votre client et
        l'enquêtrice. Chaque bonne question peut révéler un indice à utiliser au procès.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Interrogatoire personnage={affaire.client} Portrait={PortraitClient} source="Client" />
        <Interrogatoire personnage={affaire.enqueteur} Portrait={PortraitEnqueteur} source="Enquêtrice" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-bois-300">
          Indices débloqués : <strong className="text-laiton">{indicesDebloques.length}</strong>
        </span>
        <button
          onClick={() => setPhase('dossier')}
          className="rounded-lg border-2 border-laiton bg-bois-700 px-5 py-2 font-prose text-lg text-bois-50 shadow transition hover:bg-bois-600"
        >
          Consulter le dossier →
        </button>
      </div>
    </div>
  );
}

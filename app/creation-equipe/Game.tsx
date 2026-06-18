'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SITE_URL } from '@/lib/config'
import {
  BONUSES,
  INITIAL_STATE,
  MAX_STEPS,
  STAT_META,
  applyChoice,
  applyEffect,
  bonusUsable,
  buildDeck,
  choiceLockReason,
  computeEnding,
  computeRank,
  isDead,
  type Bonus,
  type Choice,
  type Ending,
  type GameEvent,
  type GameState,
  type StatKey,
} from './engine'
import { EVENTS } from './events'
import { Decor, Prop, Sprite } from './sprites'

interface Stats {
  played: number
  wins: number
  best: string
}

const STATS_KEY = 'cdle-stats'
const GRADE_ORDER = ['D', 'C', 'B', 'A', 'S']
const bestGrade = (a: string, b: string | null) => {
  if (!b) return a
  return GRADE_ORDER.indexOf(b) > GRADE_ORDER.indexOf(a) ? b : a
}

type Phase = 'intro' | 'playing' | 'result' | 'ending'

interface LastResult {
  text: string
  deltas: Partial<Record<StatKey, number>>
  gotCouches: boolean
  gotLait: boolean
}

const STAT_ORDER: StatKey[] = ['temps', 'energie', 'argent', 'moral']

function StatBar({ stat, value }: { stat: StatKey; value: number }) {
  const meta = STAT_META[stat]
  const pct = stat === 'argent' ? Math.min(100, (value / 60) * 100) : value
  const low = stat !== 'argent' && value <= 25
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
          {meta.label}
        </span>
        <span
          className="font-mono text-xs font-bold tabular-nums"
          style={{ color: low ? '#FF4500' : meta.color }}
        >
          {Math.round(value)}
          {meta.unit}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-base">
        <div
          className={`h-full rounded-full transition-all duration-500 ${low ? 'animate-pulse' : ''}`}
          style={{ width: `${pct}%`, backgroundColor: low ? '#FF4500' : meta.color }}
        />
      </div>
    </div>
  )
}

function ItemBadge({ label, got }: { label: string; got: boolean }) {
  return (
    <span
      className={`rounded-sm border px-2 py-1 font-display text-[10px] uppercase tracking-widest transition-colors ${
        got
          ? 'border-brand bg-brand/15 text-brand'
          : 'border-line bg-bg-base text-ink-muted line-through opacity-60'
      }`}
    >
      {label}
    </span>
  )
}

export default function Game() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const [event, setEvent] = useState<GameEvent | null>(null)
  const [last, setLast] = useState<LastResult | null>(null)
  const [ending, setEnding] = useState<Ending | null>(null)
  const [runs, setRuns] = useState(0)
  const [charges, setCharges] = useState<Record<string, number>>(() =>
    Object.fromEntries(BONUSES.map((b) => [b.key, b.charges]))
  )
  const [stats, setStats] = useState<Stats>({ played: 0, wins: 0, best: '-' })
  const [copied, setCopied] = useState(false)
  const deck = useRef<GameEvent[]>([])
  const recorded = useRef(0)

  const rank = useMemo(
    () => (ending?.tone === 'win' ? computeRank(state) : null),
    [ending, state]
  )

  // Charge les stats persistées au montage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATS_KEY)
      if (raw) setStats(JSON.parse(raw))
    } catch {
      /* localStorage indisponible : on garde les stats par défaut */
    }
  }, [])

  // Enregistre le résultat une seule fois par partie.
  useEffect(() => {
    if (phase !== 'ending' || !ending || recorded.current === runs) return
    recorded.current = runs
    setStats((prev) => {
      const won = ending.tone === 'win'
      const next: Stats = {
        played: prev.played + 1,
        wins: prev.wins + (won ? 1 : 0),
        best: won ? bestGrade(prev.best === '-' ? 'D' : prev.best, computeRank(state).grade) : prev.best,
      }
      try {
        localStorage.setItem(STATS_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [phase, ending, runs, state])

  const share = useCallback(async () => {
    const url = `${SITE_URL}/creation-equipe`
    const text = rank
      ? `J'ai bouclé Mission Couches avec le rang ${rank.grade} (${rank.label}) sur InsertCoins.press. Tu fais mieux ?`
      : "J'ai tenté Mission Couches sur InsertCoins.press. À toi de jouer."
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'Mission Couches', text, url })
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* partage annulé */
    }
  }, [rank])

  // Construit un nouveau deck à chaque partie : 1re moitié sans items, 2e garantie.
  const start = useCallback(() => {
    const d = buildDeck(EVENTS)
    deck.current = d
    setState({ ...INITIAL_STATE, seen: [] })
    setCharges(Object.fromEntries(BONUSES.map((b) => [b.key, b.charges])))
    setEvent(d[0] ?? null)
    setLast(null)
    setEnding(null)
    setPhase('playing')
    setRuns((r) => r + 1)
  }, [])

  const playBonus = useCallback(
    (b: Bonus) => {
      const left = charges[b.key] ?? 0
      if (left <= 0 || !bonusUsable(state, b, left)) return
      setState(applyEffect(state, b.effect))
      setCharges({ ...charges, [b.key]: left - 1 })
    },
    [charges, state]
  )

  const choose = useCallback(
    (choice: Choice) => {
      if (!event) return
      const upd = applyChoice(state, choice)

      setState(upd)
      setLast({
        text: choice.result,
        deltas: {
          temps: choice.effect.temps,
          energie: choice.effect.energie,
          argent: choice.effect.argent,
          moral: choice.effect.moral,
        },
        gotCouches: !state.couches && upd.couches,
        gotLait: !state.lait && upd.lait,
      })

      const dead = isDead(upd)
      const won = upd.couches && upd.lait
      const over = upd.step >= MAX_STEPS

      if (dead || won || over) {
        setEnding(computeEnding(upd))
        setPhase('ending')
      } else {
        setPhase('result')
      }
    },
    [event, state]
  )

  const next = useCallback(() => {
    const d = deck.current
    if (state.step >= d.length) {
      setEnding(computeEnding(state))
      setPhase('ending')
      return
    }
    setEvent(d[state.step])
    setPhase('playing')
  }, [state])

  const progress = useMemo(() => Math.min(100, (state.step / MAX_STEPS) * 100), [state.step])

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-0">
      <div className="overflow-hidden rounded-lg border border-line bg-bg-card shadow-2xl">
        {phase === 'intro' && (
          <div className="relative">
            <div className="relative h-48 w-full overflow-hidden md:h-56">
              <Decor name="maison" className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
              <div className="absolute bottom-0 right-6 h-44 w-44 md:h-52 md:w-52">
                <Sprite name="femme" className="h-full w-full drop-shadow-2xl" />
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="mb-2 font-display text-[11px] uppercase tracking-ultra text-brand">
                La création de l&apos;équipe
              </p>
              <h2 className="mb-4 font-display text-3xl font-black uppercase leading-none text-white md:text-4xl">
                Mission Couches
              </h2>
              <p className="mb-6 leading-relaxed text-ink-secondary">
                Dimanche, 10h. Plus de couches, plus de lait en poudre. Ta femme te confie une
                mission sacrée : rapporter les deux avant la sieste du petit. Seize étapes te
                séparent du Graal, et le dernier ingrédient ne se trouve qu'au bout du chemin.
                Surveille tes jauges, dépense tes bonus au bon moment. Chaque partie est
                différente. Bonne chance.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <ItemBadge label="Couches" got={false} />
                <ItemBadge label="Lait en poudre" got={false} />
              </div>
              <button
                onClick={start}
                className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
              >
                Partir en courses
              </button>
            </div>
          </div>
        )}

        {(phase === 'playing' || phase === 'result') && event && (
          <div>
            {/* HUD */}
            <div className="border-b border-line bg-bg-surface p-4">
              <div className="mb-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                {STAT_ORDER.map((s) => (
                  <StatBar key={s} stat={s} value={state[s]} />
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <ItemBadge label="Couches" got={state.couches} />
                  <ItemBadge label="Lait" got={state.lait} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {state.step}/{MAX_STEPS}
                </span>
              </div>

              {/* Bonus cliquables */}
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                <span className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
                  Bonus
                </span>
                {BONUSES.map((b) => {
                  const left = charges[b.key] ?? 0
                  const ok = left > 0 && bonusUsable(state, b, left)
                  return (
                    <button
                      key={b.key}
                      disabled={!ok}
                      onClick={() => playBonus(b)}
                      title={b.desc}
                      className="group flex items-center gap-2 rounded-sm border border-line bg-bg-elevated px-2 py-1 transition-all hover:border-brand disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
                    >
                      <span className="h-7 w-7 shrink-0">
                        <Prop name={b.key} className="h-full w-full" />
                      </span>
                      <span className="text-left leading-tight">
                        <span className="block font-body text-xs text-ink-primary group-hover:text-white">
                          {b.label} <span className="font-mono text-ink-muted">x{left}</span>
                        </span>
                        <span className="block font-mono text-[9px] text-ink-muted">{b.desc}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scène */}
            <div className="relative h-52 w-full overflow-hidden md:h-60">
              <Decor name={event.decor} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
              <div
                key={`${event.id}-${runs}`}
                className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 md:h-56 md:w-56"
                style={{ animation: 'ic-pop 0.4s ease-out' }}
              >
                <div
                  className="h-full w-full"
                  style={{ animation: 'ic-bob 3.2s ease-in-out 0.4s infinite' }}
                >
                  <Sprite name={event.sprite} className="h-full w-full drop-shadow-2xl" />
                </div>
              </div>
              {event.prop && (
                <div
                  key={`prop-${event.id}-${runs}`}
                  className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-lg border border-line bg-bg-base/80 p-1.5 shadow-xl backdrop-blur-sm md:h-20 md:w-20"
                  style={{ animation: 'ic-fade 0.5s ease-out 0.1s both' }}
                >
                  <Prop name={event.prop} className="h-full w-full" />
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-6 md:p-8">
              <h3 className="mb-3 font-display text-xl font-black uppercase leading-tight text-white md:text-2xl">
                {event.title}
              </h3>

              {phase === 'playing' && (
                <>
                  <p className="mb-6 leading-relaxed text-ink-secondary">{event.text}</p>
                  {event.choices.every((c) => choiceLockReason(state, c)) ? (
                    // Aucun choix jouable (plus assez d'argent) : défaite, pas de blocage.
                    <div
                      className="rounded-sm border border-brand/40 bg-brand/10 p-5 text-center"
                      style={{ animation: 'ic-fade 0.35s ease-out' }}
                    >
                      <p className="mb-1 font-display text-xs uppercase tracking-widest text-brand">
                        Défaite
                      </p>
                      <p className="mb-5 leading-relaxed text-ink-secondary">
                        Le portefeuille vide. Plus un sou pour payer quoi que ce soit, et le panier
                        à moitié plein. La mission s&apos;arrête ici : tu rentres bredouille.
                      </p>
                      <button
                        onClick={start}
                        className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                      >
                        Recommencer
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {event.choices.map((c, i) => {
                        const reason = choiceLockReason(state, c)
                        return (
                          <button
                            key={i}
                            disabled={!!reason}
                            onClick={() => choose(c)}
                            className="group flex items-center justify-between gap-3 rounded-sm border border-line bg-bg-elevated px-4 py-3 text-left transition-all hover:border-brand hover:bg-bg-base disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line"
                          >
                            <span className="font-body text-sm text-ink-primary group-hover:text-white">
                              {c.label}
                            </span>
                            {reason ? (
                              <span className="shrink-0 font-mono text-[10px] uppercase text-ink-muted">
                                {reason}
                              </span>
                            ) : (
                              <span className="font-display text-brand opacity-0 transition-opacity group-hover:opacity-100">
                                &rarr;
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              {phase === 'result' && last && (
                <div style={{ animation: 'ic-fade 0.35s ease-out' }}>
                  <p className="mb-5 leading-relaxed text-ink-secondary">{last.text}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {STAT_ORDER.map((s) => {
                      const d = last.deltas[s]
                      if (!d) return null
                      const good = d > 0
                      return (
                        <span
                          key={s}
                          className="rounded-sm border px-2 py-1 font-mono text-xs font-bold tabular-nums"
                          style={{
                            borderColor: good ? '#3DDC9755' : '#FF450055',
                            color: good ? '#3DDC97' : '#FF6A33',
                          }}
                        >
                          {STAT_META[s].label} {good ? '+' : ''}
                          {d}
                        </span>
                      )
                    })}
                    {last.gotCouches && (
                      <span className="rounded-sm border border-brand bg-brand/15 px-2 py-1 font-display text-[10px] uppercase tracking-widest text-brand">
                        + Couches
                      </span>
                    )}
                    {last.gotLait && (
                      <span className="rounded-sm border border-brand bg-brand/15 px-2 py-1 font-display text-[10px] uppercase tracking-widest text-brand">
                        + Lait
                      </span>
                    )}
                  </div>
                  <button
                    onClick={next}
                    className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                  >
                    Continuer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'ending' && ending && (
          <div style={{ animation: 'ic-fade 0.4s ease-out' }}>
            <div
              className="relative h-48 w-full overflow-hidden md:h-56"
              style={{
                background:
                  ending.tone === 'win'
                    ? 'linear-gradient(135deg,#2E8B57,#15302a)'
                    : ending.tone === 'partial'
                    ? 'linear-gradient(135deg,#C98D2E,#2a2010)'
                    : 'linear-gradient(135deg,#7a2018,#1f0d0a)',
                animation: ending.tone === 'lose' ? 'ic-shake 0.5s ease-in-out 0.1s' : undefined,
              }}
            >
              <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 md:h-52 md:w-52">
                <Sprite
                  name={ending.tone === 'win' ? 'papa' : 'femme'}
                  className="h-full w-full drop-shadow-2xl"
                />
              </div>
              {rank && (
                <div
                  className="absolute right-5 top-4 flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-white/80 bg-bg-base/70 backdrop-blur-sm md:right-8 md:h-24 md:w-24"
                  style={{ animation: 'ic-stamp 0.5s cubic-bezier(0.2,0.9,0.3,1.4) 0.2s both' }}
                >
                  <span className="font-display text-[9px] uppercase tracking-widest text-white/70">
                    Rang
                  </span>
                  <span className="font-display text-4xl font-black leading-none text-white md:text-5xl">
                    {rank.grade}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
            </div>
            <div className="p-6 text-center md:p-8">
              <p
                className="mb-2 font-display text-[11px] uppercase tracking-ultra"
                style={{
                  color:
                    ending.tone === 'win'
                      ? '#3DDC97'
                      : ending.tone === 'partial'
                      ? '#F2C94C'
                      : '#FF4500',
                }}
              >
                {ending.tone === 'win'
                  ? 'Victoire'
                  : ending.tone === 'partial'
                  ? 'À moitié'
                  : 'Échec'}
              </p>
              <h2 className="mb-2 font-display text-3xl font-black uppercase leading-none text-white md:text-4xl">
                {ending.title}
              </h2>
              {rank && (
                <p className="mb-4 font-display text-xs uppercase tracking-widest text-brand">
                  Rang {rank.grade} · {rank.label}
                </p>
              )}
              <p className="mx-auto mb-5 max-w-md leading-relaxed text-ink-secondary">
                {ending.text}
              </p>
              {ending.cause && (
                <p className="mx-auto mb-5 max-w-md rounded-sm border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                  Pourquoi : {ending.cause}
                </p>
              )}
              {/* Récap des jauges au moment de la fin */}
              <div className="mx-auto mb-6 grid max-w-sm grid-cols-4 gap-2">
                {STAT_ORDER.map((s) => {
                  const v = Math.round(state[s])
                  const empty = s !== 'argent' && v <= 0
                  return (
                    <div key={s} className="rounded-sm border border-line bg-bg-base px-1 py-2 text-center">
                      <div
                        className="font-mono text-base font-bold tabular-nums"
                        style={{ color: empty ? '#FF4500' : STAT_META[s].color }}
                      >
                        {v}
                        {STAT_META[s].unit}
                      </div>
                      <div className="font-display text-[9px] uppercase tracking-widest text-ink-muted">
                        {STAT_META[s].label}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                <ItemBadge label="Couches" got={state.couches} />
                <ItemBadge label="Lait en poudre" got={state.lait} />
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={start}
                  className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                >
                  Rejouer
                </button>
                <button
                  onClick={share}
                  className="w-full rounded-sm border border-line bg-bg-elevated px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white"
                >
                  {copied ? 'Lien copié' : 'Partager'}
                </button>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {stats.played} partie{stats.played > 1 ? 's' : ''} · {stats.wins} victoire
                {stats.wins > 1 ? 's' : ''}
                {stats.best !== '-' ? ` · meilleur rang ${stats.best}` : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        Jeu procédural : chaque partie tire ses événements au hasard
      </p>
    </div>
  )
}

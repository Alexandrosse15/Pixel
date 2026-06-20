'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SITE_URL } from '@/lib/config'
import { useLocale } from '@/components/LocaleProvider'
import {
  L,
  RANK_POINTS,
  STAT_META,
  applyChoice,
  applyEffect,
  bonusUsable,
  buildDeck,
  chapterSteps,
  choiceLockReason,
  computeEnding,
  computeRank,
  initialState,
  isDead,
  zoneLabelAt,
  type Bonus,
  type Chapter,
  type Choice,
  type Ending,
  type GameEvent,
  type GameState,
  type Lang,
  type Loc,
  type StatKey,
} from './engine'
import { CHAPTERS } from './chapters'
import { Decor, Prop, Sprite } from './sprites'

type Screen = 'select' | 'intro' | 'playing' | 'result' | 'ending'

interface LastResult {
  text: Loc
  deltas: Partial<Record<StatKey, number>>
  gained: string[]
}

interface Progress {
  unlocked: number
  ranks: Record<string, string>
}

const PROGRESS_KEY = 'cdle-progress-v2'
const STAT_ORDER: StatKey[] = ['temps', 'energie', 'argent', 'moral']
const GRADE_RANK = ['D', 'C', 'B', 'A', 'S']

// Chaînes d'interface fixes, par langue.
const UI = {
  fr: {
    eyebrow: 'Mission Courses',
    chooseChapter: 'Choisis ton chapitre',
    totalScore: 'Score total',
    locked: 'Verrouillé',
    finishPrev: 'Termine le chapitre précédent',
    rank: 'Rang',
    cleared: (n: number, t: number) => `${n}/${t} chapitres réussis`,
    shareScore: 'Partager mon score',
    linkCopied: 'Lien copié',
    start: 'Commencer',
    chapters: 'Chapitres',
    bonus: 'Bonus',
    defeat: 'Défaite',
    softlock:
      "Le portefeuille vide. Plus un sou pour payer quoi que ce soit, et la mission inachevée. Elle s'arrête ici.",
    restart: 'Recommencer',
    cont: 'Continuer',
    victory: 'Victoire',
    halfway: 'À moitié',
    fail: 'Échec',
    why: 'Pourquoi',
    pts: (n: number) => `+${n} pts`,
    unlocked: (n: number) => `Chapitre ${n} débloqué`,
    allDone: 'Tous les chapitres terminés !',
    replay: 'Rejouer',
    share: 'Partager',
    shareTitle: 'Partager ton score',
    copy: 'Copier',
    copied: 'Copié !',
    instaCopied: 'Texte copié, colle-le sur Instagram',
    totalPts: (n: number) => `Score total ${n} pts`,
    procedural: 'Jeu procédural : chaque partie tire ses événements au hasard',
    shareChapter: (title: string, kicker: string, grade: string) =>
      `J'ai bouclé "${title}" (${kicker}) avec le rang ${grade} sur InsertCoins.press. Tu fais mieux ?`,
    shareTotal: (score: number) =>
      `Score total ${score} pts sur les chapitres de Mission Courses (InsertCoins.press). À toi de jouer.`,
  },
  en: {
    eyebrow: 'Errand Run',
    chooseChapter: 'Choose your chapter',
    totalScore: 'Total score',
    locked: 'Locked',
    finishPrev: 'Finish the previous chapter',
    rank: 'Rank',
    cleared: (n: number, t: number) => `${n}/${t} chapters cleared`,
    shareScore: 'Share my score',
    linkCopied: 'Link copied',
    start: 'Start',
    chapters: 'Chapters',
    bonus: 'Bonus',
    defeat: 'Defeat',
    softlock:
      'Wallet empty. Not a penny left to pay for anything, and the mission unfinished. It ends right here.',
    restart: 'Restart',
    cont: 'Continue',
    victory: 'Victory',
    halfway: 'Halfway',
    fail: 'Failure',
    why: 'Why',
    pts: (n: number) => `+${n} pts`,
    unlocked: (n: number) => `Chapter ${n} unlocked`,
    allDone: 'All chapters completed!',
    replay: 'Replay',
    share: 'Share',
    shareTitle: 'Share your score',
    copy: 'Copy',
    copied: 'Copied!',
    instaCopied: 'Text copied, paste it on Instagram',
    totalPts: (n: number) => `Total score ${n} pts`,
    procedural: 'Procedural game: every run draws its events at random',
    shareChapter: (title: string, kicker: string, grade: string) =>
      `I cleared "${title}" (${kicker}) with rank ${grade} on InsertCoins.press. Beat that.`,
    shareTotal: (score: number) =>
      `Total score ${score} pts on the Errand Run chapters (InsertCoins.press). Your turn.`,
  },
} as const

function StatBar({ stat, value, lang }: { stat: StatKey; value: number; lang: Lang }) {
  const meta = STAT_META[stat]
  const pct = stat === 'argent' ? Math.min(100, (value / 60) * 100) : value
  const low = stat !== 'argent' && value <= 25
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
          {L(lang, meta.label)}
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
  const [screen, setScreen] = useState<Screen>('select')
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [state, setState] = useState<GameState>(() => initialState(CHAPTERS[0]))
  const [event, setEvent] = useState<GameEvent | null>(null)
  const [last, setLast] = useState<LastResult | null>(null)
  const [ending, setEnding] = useState<Ending | null>(null)
  const [runs, setRuns] = useState(0)
  const [charges, setCharges] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState<Progress>({ unlocked: 1, ranks: {} })
  const [shareNote, setShareNote] = useState('')
  const deck = useRef<GameEvent[]>([])
  const recorded = useRef(0)

  const { locale } = useLocale()
  const lang: Lang = locale === 'en' ? 'en' : 'fr'
  const tr = useCallback((v: Loc) => L(lang, v), [lang])
  const ui = UI[lang]

  const rank = useMemo(
    () => (ending?.tone === 'win' ? computeRank(state, lang) : null),
    [ending, state, lang]
  )
  const totalScore = useMemo(
    () =>
      Object.values(progress.ranks).reduce(
        (sum, g) => sum + (RANK_POINTS[g as keyof typeof RANK_POINTS] ?? 0),
        0
      ),
    [progress]
  )

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY)
      if (raw) setProgress(JSON.parse(raw))
    } catch {
      /* localStorage indisponible */
    }
  }, [])

  // Enregistre le résultat une seule fois par partie : débloque la suite et garde le meilleur rang.
  useEffect(() => {
    if (screen !== 'ending' || !ending || !chapter || recorded.current === runs) return
    recorded.current = runs
    if (ending.tone !== 'win') return
    const g = computeRank(state).grade
    setProgress((prev) => {
      const ranks = { ...prev.ranks }
      const prevG = ranks[chapter.id]
      if (!prevG || GRADE_RANK.indexOf(g) > GRADE_RANK.indexOf(prevG)) ranks[chapter.id] = g
      const unlocked =
        chapter.id === prev.unlocked && prev.unlocked < CHAPTERS.length
          ? prev.unlocked + 1
          : prev.unlocked
      const next = { unlocked, ranks }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [screen, ending, chapter, runs, state])

  const openChapter = useCallback((c: Chapter) => {
    setChapter(c)
    setScreen('intro')
  }, [])

  const start = useCallback(() => {
    if (!chapter) return
    const d = buildDeck(chapter)
    deck.current = d
    setState(initialState(chapter))
    setCharges(Object.fromEntries(chapter.bonuses.map((b) => [b.key, b.charges])))
    setEvent(d[0] ?? null)
    setLast(null)
    setEnding(null)
    setScreen('playing')
    setRuns((r) => r + 1)
  }, [chapter])

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
      if (!event || !chapter) return
      const before = state
      const upd = applyChoice(state, choice, chapter.drain)
      setState(upd)
      setLast({
        text: choice.result,
        deltas: {
          temps: choice.effect.temps,
          energie: choice.effect.energie,
          argent: choice.effect.argent,
          moral: choice.effect.moral,
        },
        gained: (choice.effect.give ?? []).filter((id) => !before.items[id]),
      })

      if (isDead(upd) || upd.step >= chapterSteps(chapter)) {
        setEnding(computeEnding(upd, chapter, lang))
        setScreen('ending')
      } else {
        setScreen('result')
      }
    },
    [event, state, chapter, lang]
  )

  const next = useCallback(() => {
    if (!chapter) return
    const d = deck.current
    if (state.step >= d.length) {
      setEnding(computeEnding(state, chapter, lang))
      setScreen('ending')
      return
    }
    setEvent(d[state.step])
    setScreen('playing')
  }, [state, chapter, lang])

  const share = useCallback(
    async (mode: 'chapter' | 'total', platform: 'facebook' | 'instagram' | 'copy' | 'native') => {
      const url = `${SITE_URL}/creation-equipe`
      const text =
        mode === 'chapter' && rank && chapter
          ? ui.shareChapter(tr(chapter.title), tr(chapter.kicker), rank.grade)
          : ui.shareTotal(totalScore)
      const toast = (m: string) => {
        setShareNote(m)
        setTimeout(() => setShareNote(''), 2400)
      }
      const copy = async () => {
        try {
          await navigator.clipboard.writeText(`${text} ${url}`)
          return true
        } catch {
          return false
        }
      }
      const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share

      if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
          '_blank',
          'noopener,noreferrer,width=620,height=540'
        )
        return
      }
      if (platform === 'instagram') {
        // Instagram n'a pas de partage web : on passe par le partage natif (mobile),
        // sinon on copie le texte pour le coller dans une story.
        if (canNativeShare) {
          try {
            await navigator.share({ title: ui.eyebrow, text, url })
          } catch {
            /* annulé */
          }
        } else if (await copy()) {
          toast(ui.instaCopied)
        }
        return
      }
      if (platform === 'native' && canNativeShare) {
        try {
          await navigator.share({ title: ui.eyebrow, text, url })
        } catch {
          /* annulé */
        }
        return
      }
      if (await copy()) toast(ui.copied)
    },
    [rank, chapter, totalScore, ui, tr]
  )

  const accent = chapter?.theme.accent ?? '#FF4500'

  // Barre de partage réutilisable (sélection + écran de fin).
  const shareBar = (mode: 'chapter' | 'total') => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => share(mode, 'facebook')}
          aria-label="Facebook"
          className="flex items-center gap-2 rounded-sm border border-line bg-bg-elevated px-3 py-2 font-display text-[11px] font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white"
          style={{ borderColor: '#1877F2aa' }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
          </svg>
          Facebook
        </button>
        <button
          onClick={() => share(mode, 'instagram')}
          aria-label="Instagram"
          className="flex items-center gap-2 rounded-sm border border-line bg-bg-elevated px-3 py-2 font-display text-[11px] font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white"
          style={{ borderColor: '#E1306Caa' }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#E1306C" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C" stroke="none" />
          </svg>
          Instagram
        </button>
        <button
          onClick={() => share(mode, 'copy')}
          className="flex items-center gap-2 rounded-sm border border-line bg-bg-elevated px-3 py-2 font-display text-[11px] font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h8" />
          </svg>
          {ui.copy}
        </button>
      </div>
      {shareNote && (
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand" aria-live="polite">
          {shareNote}
        </p>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-0">
      <div className="overflow-hidden rounded-lg border border-line bg-bg-card shadow-2xl">
        {/* ── Sélection des chapitres ── */}
        {screen === 'select' && (
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-[11px] uppercase tracking-ultra text-brand">
                  {ui.eyebrow}
                </p>
                <h2 className="font-display text-2xl font-black uppercase leading-none text-white md:text-3xl">
                  {ui.chooseChapter}
                </h2>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-black leading-none text-brand">
                  {totalScore}
                </div>
                <div className="font-display text-[9px] uppercase tracking-widest text-ink-muted">
                  {ui.totalScore}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {CHAPTERS.map((c) => {
                const locked = c.id > progress.unlocked
                const best = progress.ranks[c.id]
                return (
                  <button
                    key={c.id}
                    disabled={locked}
                    onClick={() => openChapter(c)}
                    className="group flex items-center gap-4 rounded-sm border border-line bg-bg-elevated p-4 text-left transition-all hover:border-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm font-display text-lg font-black text-white"
                      style={{ backgroundColor: locked ? '#242424' : c.theme.accent }}
                    >
                      {locked ? '?' : c.id}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
                        {tr(c.kicker)}
                      </p>
                      <p className="truncate font-display text-base font-bold uppercase text-white">
                        {locked ? ui.locked : tr(c.title)}
                      </p>
                      <p className="truncate text-xs text-ink-secondary">
                        {locked ? ui.finishPrev : tr(c.goal)}
                      </p>
                    </div>
                    {best && (
                      <div className="shrink-0 text-center">
                        <div className="font-display text-xl font-black text-brand">{best}</div>
                        <div className="font-display text-[8px] uppercase tracking-widest text-ink-muted">
                          {ui.rank}
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {ui.cleared(Object.keys(progress.ranks).length, CHAPTERS.length)}
                </p>
                <p className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
                  {ui.shareTitle}
                </p>
              </div>
              {shareBar('total')}
            </div>
          </div>
        )}

        {/* ── Intro d'un chapitre ── */}
        {screen === 'intro' && chapter && (
          <div className="relative">
            <div className="relative h-48 w-full overflow-hidden md:h-56">
              <Decor name={chapter.theme.introDecor} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
              <div className="absolute bottom-0 right-6 h-44 w-44 md:h-52 md:w-52">
                <Sprite name={chapter.theme.introSprite} className="h-full w-full drop-shadow-2xl" />
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p
                className="mb-2 font-display text-[11px] uppercase tracking-ultra"
                style={{ color: accent }}
              >
                {tr(chapter.kicker)}
              </p>
              <h2 className="mb-4 font-display text-3xl font-black uppercase leading-none text-white md:text-4xl">
                {tr(chapter.title)}
              </h2>
              <p className="mb-6 leading-relaxed text-ink-secondary">{tr(chapter.intro)}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {chapter.items.map((it) => (
                  <ItemBadge key={it.id} label={tr(it.label)} got={false} />
                ))}
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={start}
                  className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                >
                  {ui.start}
                </button>
                <button
                  onClick={() => setScreen('select')}
                  className="w-full rounded-sm border border-line bg-bg-elevated px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white sm:w-auto"
                >
                  {ui.chapters}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Jeu ── */}
        {(screen === 'playing' || screen === 'result') && event && chapter && (
          <div>
            <div className="border-b border-line bg-bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {chapter.items.map((it) => (
                    <ItemBadge key={it.id} label={tr(it.label)} got={!!state.items[it.id]} />
                  ))}
                </div>
                <span className="shrink-0 text-right font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  <span className="text-ink-secondary">{tr(zoneLabelAt(chapter, state.step))}</span> ·{' '}
                  {state.step}/{chapterSteps(chapter)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                <span className="font-display text-[10px] uppercase tracking-widest text-ink-muted">
                  {ui.bonus}
                </span>
                {chapter.bonuses.map((b) => {
                  const left = charges[b.key] ?? 0
                  const ok = left > 0 && bonusUsable(state, b, left)
                  return (
                    <button
                      key={b.key}
                      disabled={!ok}
                      onClick={() => playBonus(b)}
                      title={tr(b.desc)}
                      className="group flex items-center gap-2 rounded-sm border border-line bg-bg-elevated px-2 py-1 transition-all hover:border-brand disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
                    >
                      <span className="h-7 w-7 shrink-0">
                        <Prop name={b.key} className="h-full w-full" />
                      </span>
                      <span className="text-left leading-tight">
                        <span className="block font-body text-xs text-ink-primary group-hover:text-white">
                          {tr(b.label)} <span className="font-mono text-ink-muted">x{left}</span>
                        </span>
                        <span className="block font-mono text-[9px] text-ink-muted">{tr(b.desc)}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

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

            <div className="flex gap-5 p-6 md:gap-6 md:p-8">
              <div className="flex w-24 shrink-0 flex-col gap-3 sm:w-32">
                {STAT_ORDER.map((s) => (
                  <StatBar key={s} stat={s} value={state[s]} lang={lang} />
                ))}
              </div>

              <div className="min-w-0 flex-1">
              <h3 className="mb-3 font-display text-xl font-black uppercase leading-tight text-white md:text-2xl">
                {tr(event.title)}
              </h3>

              {screen === 'playing' && (
                <>
                  <p className="mb-6 leading-relaxed text-ink-secondary">{tr(event.text)}</p>
                  {event.choices.every((c) => choiceLockReason(state, c)) ? (
                    <div
                      className="rounded-sm border border-brand/40 bg-brand/10 p-5 text-center"
                      style={{ animation: 'ic-fade 0.35s ease-out' }}
                    >
                      <p className="mb-1 font-display text-xs uppercase tracking-widest text-brand">
                        {ui.defeat}
                      </p>
                      <p className="mb-5 leading-relaxed text-ink-secondary">{ui.softlock}</p>
                      <button
                        onClick={() => setScreen('select')}
                        className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                      >
                        {ui.restart}
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
                              {tr(c.label)}
                            </span>
                            {reason ? (
                              <span className="shrink-0 font-mono text-[10px] uppercase text-ink-muted">
                                {tr(reason)}
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

              {screen === 'result' && last && (
                <div style={{ animation: 'ic-fade 0.35s ease-out' }}>
                  <p className="mb-5 leading-relaxed text-ink-secondary">{tr(last.text)}</p>
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
                          {L(lang, STAT_META[s].label)} {good ? '+' : ''}
                          {d}
                        </span>
                      )
                    })}
                    {last.gained.map((id) => {
                      const it = chapter.items.find((x) => x.id === id)
                      return (
                        <span
                          key={id}
                          className="rounded-sm border border-brand bg-brand/15 px-2 py-1 font-display text-[10px] uppercase tracking-widest text-brand"
                        >
                          + {it ? tr(it.label) : id}
                        </span>
                      )
                    })}
                  </div>
                  <button
                    onClick={next}
                    className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                  >
                    {ui.cont}
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        )}

        {/* ── Fin ── */}
        {screen === 'ending' && ending && chapter && (
          <div style={{ animation: 'ic-fade 0.4s ease-out' }}>
            <div
              className="relative h-48 w-full overflow-hidden md:h-56"
              style={{
                background:
                  ending.tone === 'win'
                    ? chapter.theme.winGradient
                    : ending.tone === 'partial'
                    ? chapter.theme.partialGradient
                    : chapter.theme.loseGradient,
                animation: ending.tone === 'lose' ? 'ic-shake 0.5s ease-in-out 0.1s' : undefined,
              }}
            >
              <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 md:h-52 md:w-52">
                <Sprite
                  name={ending.tone === 'win' ? chapter.theme.heroSprite : chapter.theme.loseSprite}
                  className="h-full w-full drop-shadow-2xl"
                />
              </div>
              {rank && (
                <div
                  className="absolute right-5 top-4 flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-white/80 bg-bg-base/70 backdrop-blur-sm md:right-8 md:h-24 md:w-24"
                  style={{ animation: 'ic-stamp 0.5s cubic-bezier(0.2,0.9,0.3,1.4) 0.2s both' }}
                >
                  <span className="font-display text-[9px] uppercase tracking-widest text-white/70">
                    {ui.rank}
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
                    ending.tone === 'win' ? '#3DDC97' : ending.tone === 'partial' ? '#F2C94C' : '#FF4500',
                }}
              >
                {ending.tone === 'win' ? ui.victory : ending.tone === 'partial' ? ui.halfway : ui.fail}
                <span className="text-ink-muted"> · {tr(chapter.kicker)}</span>
              </p>
              <h2 className="mb-2 font-display text-3xl font-black uppercase leading-none text-white md:text-4xl">
                {ending.title}
              </h2>
              {rank && (
                <p className="mb-4 font-display text-xs uppercase tracking-widest text-brand">
                  {ui.rank} {rank.grade} · {rank.label} · {ui.pts(RANK_POINTS[rank.grade])}
                </p>
              )}
              <p className="mx-auto mb-5 max-w-md leading-relaxed text-ink-secondary">
                {ending.text}
              </p>
              {ending.cause && (
                <p className="mx-auto mb-5 max-w-md rounded-sm border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                  {ui.why} : {ending.cause}
                </p>
              )}
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
                        {L(lang, STAT_META[s].label)}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {chapter.items.map((it) => (
                  <ItemBadge key={it.id} label={tr(it.label)} got={!!state.items[it.id]} />
                ))}
              </div>

              {ending.tone === 'win' && chapter.id === progress.unlocked - 1 && progress.unlocked <= CHAPTERS.length && (
                <p className="mb-5 font-display text-xs uppercase tracking-widest text-brand">
                  {progress.unlocked > CHAPTERS.length ? ui.allDone : ui.unlocked(progress.unlocked)}
                </p>
              )}

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={start}
                  className="w-full rounded-sm bg-brand px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-light"
                >
                  {ui.replay}
                </button>
                <button
                  onClick={() => setScreen('select')}
                  className="w-full rounded-sm border border-line bg-bg-elevated px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink-primary transition-colors hover:border-brand hover:text-white"
                >
                  {ui.chapters}
                </button>
              </div>
              <p className="mt-6 mb-2 font-display text-[10px] uppercase tracking-widest text-ink-muted">
                {ui.shareTitle}
              </p>
              {shareBar('chapter')}
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {ui.totalPts(totalScore)}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {ui.procedural}
      </p>
    </div>
  )
}

/* Simulation d'équilibrage multi-chapitres. Lancer : npx tsx scripts/sim.ts */
import {
  buildDeck,
  chapterSteps,
  applyChoice,
  applyEffect,
  isDead,
  gotCount,
  choiceLockReason,
  bonusUsable,
  computeRank,
  initialState,
  type Chapter,
  type GameState,
  type GameEvent,
  type Choice,
} from '../app/creation-equipe/mission-courses/engine'
import { CHAPTERS } from '../app/creation-equipe/mission-courses/chapters'

const N = 30000

function smart(state: GameState, ev: GameEvent, ch: Chapter): Choice {
  const usable = ev.choices.filter((c) => !choiceLockReason(state, c))
  if (!usable.length) return ev.choices[0]
  const items = usable.filter((c) => c.effect.give?.some((id) => !state.items[id]))
  if (items.length) {
    items.sort((a, b) => (b.effect.argent ?? 0) - (a.effect.argent ?? 0))
    return items[0]
  }
  let best = usable[0]
  let bs = -1e9
  for (const c of usable) {
    const a = applyEffect(applyEffect(state, c.effect), ch.drain)
    const dead = a.temps <= 0 || a.energie <= 0 || a.moral <= 0
    const s = a.temps + a.energie + 0.6 * a.moral + 0.45 * a.argent + (dead ? -1000 : 0)
    if (s > bs) {
      bs = s
      best = c
    }
  }
  return best
}

function maybeBonus(s: GameState, ch: Chapter, charges: Record<string, number>): GameState {
  for (const b of ch.bonuses) {
    const boostsEnergy = (b.effect.energie ?? 0) > 0
    const boostsTime = (b.effect.temps ?? 0) > 0
    const need = (boostsEnergy && s.energie < 24) || (boostsTime && s.temps < 18)
    if (need && (charges[b.key] ?? 0) > 0 && bonusUsable(s, b, charges[b.key])) {
      s = applyEffect(s, b.effect)
      charges[b.key]--
    }
  }
  return s
}

function play(ch: Chapter, smartPlay: boolean) {
  const deck = buildDeck(ch)
  let s = initialState(ch)
  const charges: Record<string, number> = Object.fromEntries(ch.bonuses.map((b) => [b.key, b.charges]))
  for (let i = 0; i < deck.length; i++) {
    if (smartPlay) s = maybeBonus(s, ch, charges)
    const c = smartPlay ? smart(s, deck[i], ch) : deck[i].choices[Math.floor(Math.random() * deck[i].choices.length)]
    s = applyChoice(s, c, ch.drain)
    if (isDead(s)) return { result: 'dead', s }
  }
  const got = gotCount(s, ch)
  return { result: got === ch.items.length ? 'win' : got > 0 ? 'partial' : 'empty', s }
}

function run(ch: Chapter, smartPlay: boolean) {
  const tally: Record<string, number> = { win: 0, partial: 0, dead: 0, empty: 0 }
  let wins = 0
  let tTemps = 0
  for (let i = 0; i < N; i++) {
    const r = play(ch, smartPlay)
    tally[r.result]++
    if (r.result === 'win') {
      wins++
      tTemps += r.s.temps
    }
  }
  const pct = (n: number) => ((n / N) * 100).toFixed(1) + '%'
  const tag = smartPlay ? 'malin ' : 'random'
  console.log(
    `  [${tag}] win ${pct(tally.win)} | partial ${pct(tally.partial)} | dead ${pct(tally.dead)} | bredouille ${pct(tally.empty)} | temps fin ~${wins ? (tTemps / wins).toFixed(0) : '-'}`
  )
}

for (const ch of CHAPTERS) {
  console.log(`\n=== ${ch.kicker} : ${ch.title} (steps ${chapterSteps(ch)}, start ${JSON.stringify(ch.start)}) ===`)
  run(ch, true)
  run(ch, false)
}

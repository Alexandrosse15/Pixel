/* Simulation d'équilibrage (hors build Next). Lancer : npx tsx scripts/sim.ts */
import {
  buildDeck,
  applyChoice,
  applyEffect,
  isDead,
  choiceLockReason,
  bonusUsable,
  BONUSES,
  INITIAL_STATE,
  type GameState,
  type GameEvent,
  type Choice,
} from '../app/creation-equipe/engine'
import { EVENTS } from '../app/creation-equipe/events'

const N = 30000

function smartChoose(state: GameState, ev: GameEvent): Choice {
  const usable = ev.choices.filter((c) => !choiceLockReason(state, c))
  if (usable.length === 0) return ev.choices[0]
  const items = usable.filter(
    (c) => (!state.couches && c.effect.couches) || (!state.lait && c.effect.lait)
  )
  if (items.length) {
    // item le moins cher
    items.sort((a, b) => (b.effect.argent ?? 0) - (a.effect.argent ?? 0))
    return items[0]
  }
  let best = usable[0]
  let bestScore = -Infinity
  for (const c of usable) {
    const a = applyEffect(state, c.effect)
    const dead = a.temps <= 0 || a.energie <= 0 || a.moral <= 0
    const score = a.temps + a.energie + 0.6 * a.moral + 0.45 * a.argent + (dead ? -1000 : 0)
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  return best
}

function maybeBonus(state: GameState, ch: Record<string, number>): GameState {
  let s = state
  const canette = BONUSES.find((b) => b.key === 'canette')!
  const skate = BONUSES.find((b) => b.key === 'skateboard')!
  if (s.energie < 24 && ch.canette > 0 && bonusUsable(s, canette, ch.canette)) {
    s = applyEffect(s, canette.effect)
    ch.canette--
  }
  if (s.temps < 18 && ch.skateboard > 0 && bonusUsable(s, skate, ch.skateboard)) {
    s = applyEffect(s, skate.effect)
    ch.skateboard--
  }
  return s
}

function play(smart: boolean) {
  const deck = buildDeck(EVENTS)
  let state: GameState = { ...INITIAL_STATE }
  const ch: Record<string, number> = { skateboard: 2, canette: 2 }
  for (let i = 0; i < deck.length; i++) {
    if (smart) state = maybeBonus(state, ch)
    const ev = deck[i]
    const choice = smart
      ? smartChoose(state, ev)
      : ev.choices[Math.floor(Math.random() * ev.choices.length)]
    state = applyChoice(state, choice)
    if (isDead(state)) return { result: 'dead', state }
    if (state.couches && state.lait) return { result: 'win', state }
  }
  const got = (state.couches ? 1 : 0) + (state.lait ? 1 : 0)
  return { result: got === 2 ? 'win' : got === 1 ? 'partial' : 'empty', state }
}

function run(smart: boolean) {
  const tally: Record<string, number> = { win: 0, partial: 0, dead: 0, empty: 0 }
  const sums = { temps: 0, energie: 0, argent: 0, moral: 0 }
  let wins = 0
  for (let i = 0; i < N; i++) {
    const r = play(smart)
    tally[r.result]++
    if (r.result === 'win') {
      wins++
      sums.temps += r.state.temps
      sums.energie += r.state.energie
      sums.argent += r.state.argent
      sums.moral += r.state.moral
    }
  }
  const pct = (n: number) => ((n / N) * 100).toFixed(1) + '%'
  const avg = (s: number) => (wins ? (s / wins).toFixed(1) : '-')
  console.log(`\n=== ${smart ? 'JOUEUR MALIN (avec bonus)' : 'JOUEUR ALEATOIRE'} (n=${N}) ===`)
  console.log(`  win ${pct(tally.win)} | partial ${pct(tally.partial)} | dead ${pct(tally.dead)} | bredouille ${pct(tally.empty)}`)
  console.log(
    `  jauges fin de victoire -> temps ${avg(sums.temps)}  energie ${avg(sums.energie)}  argent ${avg(sums.argent)}  moral ${avg(sums.moral)}`
  )
}

console.log(`start: temps ${INITIAL_STATE.temps} energie ${INITIAL_STATE.energie} argent ${INITIAL_STATE.argent} moral ${INITIAL_STATE.moral}`)
run(true)
run(false)

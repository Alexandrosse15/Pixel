// Moteur procédural multi-chapitres : jauges, pioche d'événements, objectifs, fins.

export type SpriteKey =
  | 'papa'
  | 'femme'
  | 'voisin'
  | 'vigile'
  | 'ex'
  | 'mamie'
  | 'ado'
  | 'chien'
  | 'caissiere'
  | 'sdf'
  | 'barman'
  | 'pharmacien'
  | 'enfant'
  | 'primeur'
  | 'cycliste'
  | 'collegue'
  | 'skateur'
  | 'caissier'
  | 'maitresse'
  | 'patron'
  | 'vendeur'
  | 'maire'

export type DecorKey =
  | 'maison'
  | 'rue'
  | 'supermarche'
  | 'rayon'
  | 'pharmacie'
  | 'bar'
  | 'parc'
  | 'parking'
  | 'caisse'
  | 'boulangerie'
  | 'marche'
  | 'atm'
  | 'ruelle'
  | 'cuisine'
  | 'epicerie'
  | 'arret_bus'
  | 'allee'
  | 'ecole'
  | 'bureau'
  | 'magasin_jouets'
  | 'rayon_jouets'
  | 'fleuriste'
  | 'boutique'
  | 'bijouterie'
  | 'mairie'
  | 'photomaton'
  | 'prefecture'
  | 'patisserie'
  | 'pressing'
  | 'aeroport'

export type PropKey =
  | 'couches'
  | 'lait'
  | 'biere'
  | 'cafe'
  | 'painchoco'
  | 'caddie'
  | 'panier'
  | 'parapluie'
  | 'velo'
  | 'trottinette'
  | 'skateboard'
  | 'carte'
  | 'piece'
  | 'billet'
  | 'telephone'
  | 'cles'
  | 'tomates'
  | 'sac'
  | 'ticket'
  | 'carton'
  | 'tondeuse'
  | 'ballon'
  | 'os'
  | 'laisse'
  | 'poussette'
  | 'casquette'
  | 'lunettes'
  | 'promo'
  | 'horloge'
  | 'nuage'
  | 'soleil'
  | 'coeur'
  | 'croix'
  | 'etoile'
  | 'sacpharma'
  | 'eau'
  | 'chips'
  | 'journal'
  | 'parcmetre'
  | 'feu'
  | 'liste'
  | 'doudou'
  | 'canette'
  | 'cartable'
  | 'cloche'
  | 'robot'
  | 'sandwich'
  | 'enfants'
  | 'jouet'
  | 'roses'
  | 'cadeau'
  | 'alliances'
  | 'passeport'
  | 'photo'
  | 'gateau'
  | 'costume'
  | 'valise'
  | 'avion'

export type StatKey = 'temps' | 'energie' | 'argent' | 'moral'

export interface GameState {
  temps: number
  energie: number
  argent: number
  moral: number
  items: Record<string, boolean>
  step: number
}

export interface Effect {
  temps?: number
  energie?: number
  argent?: number
  moral?: number
  // Objectifs débloqués par ce choix (ids d'items du chapitre).
  give?: string[]
}

export interface Choice {
  label: string
  effect: Effect
  result: string
}

export interface GameEvent {
  id: string
  sprite: SpriteKey
  decor: DecorKey
  prop?: PropKey
  title: string
  text: string
  choices: Choice[]
  // true = source d'argent garantie en première moitié (anti-softlock).
  money?: boolean
}

export interface ItemDef {
  id: string
  label: string
  prop: PropKey
}

export interface Bonus {
  key: PropKey
  label: string
  effect: Effect
  charges: number
  desc: string
}

export interface ChapterTheme {
  accent: string
  winGradient: string
  partialGradient: string
  loseGradient: string
  heroSprite: SpriteKey
  loseSprite: SpriteKey
  introDecor: DecorKey
  introSprite: SpriteKey
}

// Un lieu traversé dans l'ordre : pioche ses fillers, puis (si présent) son objectif en fin de zone.
export interface Zone {
  label: string
  steps: number
  fillers: GameEvent[]
  // Candidats objectif : un est tiré au sort et placé à la fin de la zone.
  goals?: GameEvent[]
}

export interface Chapter {
  id: number
  kicker: string
  title: string
  intro: string
  goal: string
  items: ItemDef[]
  zones: Zone[]
  bonuses: Bonus[]
  start: { temps: number; energie: number; argent: number; moral: number }
  drain: Effect
  theme: ChapterTheme
}

export const chapterSteps = (c: Chapter): number => c.zones.reduce((n, z) => n + z.steps, 0)

// Libellé du lieu courant pour une étape donnée.
export function zoneLabelAt(c: Chapter, step: number): string {
  let acc = 0
  for (const z of c.zones) {
    acc += z.steps
    if (step < acc) return z.label
  }
  return c.zones[c.zones.length - 1]?.label ?? ''
}

export interface Ending {
  key: string
  tone: 'win' | 'partial' | 'lose'
  title: string
  text: string
  cause?: string
}

export interface Rank {
  grade: 'S' | 'A' | 'B' | 'C' | 'D'
  label: string
}

export const STAT_META: Record<StatKey, { label: string; unit: string; color: string }> = {
  temps: { label: 'Temps', unit: '%', color: '#FF4500' },
  energie: { label: 'Énergie', unit: '%', color: '#3DDC97' },
  argent: { label: 'Argent', unit: '€', color: '#F2C94C' },
  moral: { label: 'Moral', unit: '%', color: '#56A8FF' },
}

export const half = (steps: number) => Math.ceil(steps / 2)

export function initialState(chapter: Chapter): GameState {
  const items: Record<string, boolean> = {}
  for (const it of chapter.items) items[it.id] = false
  return { ...chapter.start, items, step: 0 }
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n))

export function applyEffect(state: GameState, e: Effect): GameState {
  const items = e.give?.length ? { ...state.items } : state.items
  if (e.give) for (const id of e.give) items[id] = true
  return {
    ...state,
    temps: clamp(state.temps + (e.temps ?? 0)),
    energie: clamp(state.energie + (e.energie ?? 0)),
    moral: clamp(state.moral + (e.moral ?? 0)),
    argent: Math.max(0, state.argent + (e.argent ?? 0)),
    items,
  }
}

export function applyChoice(state: GameState, choice: Choice, drain: Effect): GameState {
  const withChoice = applyEffect(state, choice.effect)
  return { ...applyEffect(withChoice, drain), step: state.step + 1 }
}

export function hasAll(state: GameState, chapter: Chapter): boolean {
  return chapter.items.every((it) => state.items[it.id])
}

export function gotCount(state: GameState, chapter: Chapter): number {
  return chapter.items.filter((it) => state.items[it.id]).length
}

// Raison de verrouillage d'un choix, ou null si jouable. Le timing des objectifs
// est désormais géré par les zones, donc seul le coût en argent verrouille.
export function choiceLockReason(state: GameState, choice: Choice): string | null {
  const cost = choice.effect.argent ?? 0
  if (cost < 0 && state.argent + cost < 0) return 'Trop cher'
  return null
}

export function bonusUsable(state: GameState, b: Bonus, charges: number): boolean {
  if (charges <= 0) return false
  const after = applyEffect(state, b.effect)
  return after.temps > 0 && after.energie > 0 && after.moral > 0
}

const shuffle = <T,>(arr: T[]): T[] => {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

export function eventGrants(e: GameEvent): Set<string> {
  const s = new Set<string>()
  for (const c of e.choices) if (c.effect.give) c.effect.give.forEach((id) => s.add(id))
  return s
}

export const isItemEvent = (e: GameEvent): boolean => eventGrants(e).size > 0

// Construit la partie zone par zone, dans l'ordre. Chaque zone tire ses fillers
// (l'argent est garanti dans la première zone) et place son objectif à la fin.
export function buildDeck(chapter: Chapter): GameEvent[] {
  const deck: GameEvent[] = []
  const used = new Set<string>() // dédup sur toute la partie (pools partagés réutilisables)

  chapter.zones.forEach((zone, zi) => {
    const goal = zone.goals?.length
      ? shuffle(zone.goals.filter((g) => !used.has(g.id)))[0]
      : undefined
    const fillerTarget = goal ? zone.steps - 1 : zone.steps

    const chosen: GameEvent[] = []
    const take = (e?: GameEvent) => {
      if (e && !used.has(e.id)) {
        chosen.push(e)
        used.add(e.id)
      }
    }

    // Argent garanti dans la première zone.
    if (zi === 0) take(zone.fillers.find((e) => e.money))
    for (const e of shuffle(zone.fillers)) {
      if (chosen.length >= fillerTarget) break
      take(e)
    }

    const ordered = shuffle(chosen)
    if (goal) {
      ordered.push(goal)
      used.add(goal.id)
    }
    deck.push(...ordered)
  })

  return deck
}

export function isDead(state: GameState): StatKey | null {
  if (state.temps <= 0) return 'temps'
  if (state.energie <= 0) return 'energie'
  if (state.moral <= 0) return 'moral'
  return null
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function computeRank(state: GameState): Rank {
  const score = state.temps + state.energie + 0.5 * state.moral + 0.4 * state.argent
  if (score >= 150) return { grade: 'S', label: 'Sans-faute légendaire' }
  if (score >= 122) return { grade: 'A', label: 'Maîtrise totale' }
  if (score >= 98) return { grade: 'B', label: 'Mission bien menée' }
  if (score >= 76) return { grade: 'C', label: 'Juste à temps' }
  return { grade: 'D', label: 'Sur le fil du rasoir' }
}

// Points pour le score cumulé inter-chapitres.
export const RANK_POINTS: Record<Rank['grade'], number> = { S: 100, A: 80, B: 60, C: 40, D: 25 }

export function computeEnding(state: GameState, chapter: Chapter): Ending {
  const dead = isDead(state)

  if (dead === 'temps') {
    return {
      key: 'timeout',
      tone: 'lose',
      cause: 'Jauge de temps à zéro : tu as traîné en route et le délai a explosé.',
      title: 'Hors délai',
      text: pick([
        'Trop tard. Le temps imparti est écoulé et tu n’y es pas. Personne ne te félicitera pour la tentative.',
        'Le compte à rebours t’a rattrapé. Mission échouée pour quelques minutes de trop.',
      ]),
    }
  }
  if (dead === 'energie') {
    return {
      key: 'collapse',
      tone: 'lose',
      cause: 'Jauge d’énergie à zéro : ton corps a lâché avant la ligne d’arrivée.',
      title: 'Panne sèche',
      text: pick([
        'Plus une goutte de carburant. Tu t’écroules sur un banc, vaincu, la mission inachevée.',
        'Le corps dit stop. Impossible d’avancer plus loin aujourd’hui.',
      ]),
    }
  }
  if (dead === 'moral') {
    return {
      key: 'giveup',
      tone: 'lose',
      cause: 'Jauge de moral à zéro : tu as craqué et tout abandonné.',
      title: 'Abandon',
      text: pick([
        'Tu n’en peux plus. Tu laisses tomber au milieu de la rue et tu rentres les mains vides.',
        'Le moral à plat, tu jettes l’éponge. Ce sera pour une autre fois.',
      ]),
    }
  }

  const total = chapter.items.length
  const got = gotCount(state, chapter)
  const missing = chapter.items.filter((it) => !state.items[it.id]).map((it) => it.label.toLowerCase())

  if (got === total) {
    const grade = computeRank(state).grade
    if (grade === 'S' || grade === 'A') {
      return {
        key: 'hero',
        tone: 'win',
        title: 'Sans-faute',
        text: pick([
          `Tout y est, et de la marge en plus. ${chapter.goal} : plié comme un chef, sans transpirer. Légende vivante.`,
          'Mission bouclée haut la main, frais comme un gardon. Tu rends ça facile, alors que ça ne l’était pas du tout.',
        ]),
      }
    }
    return {
      key: 'win',
      tone: 'win',
      title: 'Mission accomplie',
      text: pick([
        `Tu y es. Cabossé, en sueur, mais ${chapter.goal} : c’est fait. Le reste, c’est du bonus.`,
        'Tout est rentré dans l’ordre, in extremis. Personne ne saura ce qu’il t’a fallu traverser.',
      ]),
    }
  }

  const moneyCause =
    state.argent < 15
      ? "Plus assez d'argent : tu as trop dépensé en route pour finir ce qu'il restait."
      : 'Occasion manquée : tu n’as pas saisi le bon moment pour boucler la mission.'

  if (got > 0) {
    return {
      key: 'partial',
      tone: 'partial',
      cause: moneyCause,
      title: 'À moitié',
      text: `Tu rapportes une partie seulement. Il manque ${missing.join(' et ')}. Ça ne suffira pas.`,
    }
  }
  return {
    key: 'empty',
    tone: 'lose',
    cause: moneyCause,
    title: 'Échec total',
    text: pick([
      'Rien. Absolument rien. Tu rentres bredouille, avec un long discours à préparer.',
      'Mission ratée sur toute la ligne. Tu n’as rien à montrer pour tout ce temps passé.',
    ]),
  }
}

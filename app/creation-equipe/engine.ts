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

// Texte localisé : soit une chaîne unique, soit une paire fr/en.
export type Lang = 'fr' | 'en'
export type Loc = string | { fr: string; en: string }
export const L = (lang: Lang, v: Loc): string => (typeof v === 'string' ? v : v[lang] ?? v.fr)

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
  label: Loc
  effect: Effect
  result: Loc
}

export interface GameEvent {
  id: string
  sprite: SpriteKey
  decor: DecorKey
  prop?: PropKey
  title: Loc
  text: Loc
  choices: Choice[]
  // true = source d'argent garantie en première moitié (anti-softlock).
  money?: boolean
}

export interface ItemDef {
  id: string
  label: Loc
  prop: PropKey
}

export interface Bonus {
  key: PropKey
  label: Loc
  effect: Effect
  charges: number
  desc: Loc
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

// Un lieu traversé dans l'ordre : pioche ses fillers, puis (si présent) son objectif,
// puis (en magasin) la phase caisse, toujours APRÈS l'objectif. Garde la logique des lieux.
export interface Zone {
  label: Loc
  steps: number
  fillers: GameEvent[]
  // Candidats objectif : un est tiré au sort et placé après les fillers.
  goals?: GameEvent[]
  // Événements de fin de zone (caisse, paiement) placés APRÈS l'objectif.
  tail?: GameEvent[]
  // Combien d'événements de tail piocher (défaut : tous).
  tailSteps?: number
}

export interface Chapter {
  id: number
  kicker: Loc
  title: Loc
  intro: Loc
  goal: Loc
  items: ItemDef[]
  zones: Zone[]
  bonuses: Bonus[]
  start: { temps: number; energie: number; argent: number; moral: number }
  drain: Effect
  theme: ChapterTheme
}

export const chapterSteps = (c: Chapter): number => c.zones.reduce((n, z) => n + z.steps, 0)

// Libellé du lieu courant pour une étape donnée.
export function zoneLabelAt(c: Chapter, step: number): Loc {
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

export const STAT_META: Record<StatKey, { label: Loc; unit: string; color: string }> = {
  temps: { label: { fr: 'Temps', en: 'Time' }, unit: '%', color: '#FF4500' },
  energie: { label: { fr: 'Énergie', en: 'Energy' }, unit: '%', color: '#3DDC97' },
  argent: { label: { fr: 'Argent', en: 'Money' }, unit: '€', color: '#F2C94C' },
  moral: { label: { fr: 'Moral', en: 'Morale' }, unit: '%', color: '#56A8FF' },
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
export function choiceLockReason(state: GameState, choice: Choice): Loc | null {
  const cost = choice.effect.argent ?? 0
  if (cost < 0 && state.argent + cost < 0) return { fr: 'Trop cher', en: 'Too pricey' }
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
    // Phase caisse (tail) : seulement s'il y a un objectif, placée après lui.
    const tailPool = zone.tail ?? []
    const tailN = goal && tailPool.length ? Math.min(zone.tailSteps ?? tailPool.length, tailPool.length) : 0
    const fillerTarget = zone.steps - (goal ? 1 : 0) - tailN

    const chosen: GameEvent[] = []
    const take = (list: GameEvent[], pool: GameEvent[], limit: number, e?: GameEvent) => {
      if (e && !used.has(e.id) && list.length < limit) {
        list.push(e)
        used.add(e.id)
      }
    }

    // Parcours (rayons / rue), dans un ordre procédural.
    if (zi === 0) take(chosen, zone.fillers, fillerTarget, zone.fillers.find((e) => e.money))
    for (const e of shuffle(zone.fillers)) {
      if (chosen.length >= fillerTarget) break
      take(chosen, zone.fillers, fillerTarget, e)
    }

    const ordered = shuffle(chosen)

    if (goal) {
      ordered.push(goal)
      used.add(goal.id)
    }

    // Caisse / paiement : toujours en dernier, après avoir l'objet.
    if (tailN) {
      const tailChosen: GameEvent[] = []
      for (const e of shuffle(tailPool)) {
        if (tailChosen.length >= tailN) break
        take(tailChosen, tailPool, tailN, e)
      }
      ordered.push(...tailChosen)
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

export function computeRank(state: GameState, lang: Lang = 'fr'): Rank {
  const score = state.temps + state.energie + 0.5 * state.moral + 0.4 * state.argent
  const r = (grade: Rank['grade'], label: { fr: string; en: string }): Rank => ({ grade, label: L(lang, label) })
  if (score >= 150) return r('S', { fr: 'Sans-faute légendaire', en: 'Legendary clean run' })
  if (score >= 122) return r('A', { fr: 'Maîtrise totale', en: 'Total mastery' })
  if (score >= 98) return r('B', { fr: 'Mission bien menée', en: 'Mission well handled' })
  if (score >= 76) return r('C', { fr: 'Juste à temps', en: 'Just in time' })
  return r('D', { fr: 'Sur le fil du rasoir', en: 'By the skin of your teeth' })
}

// Points pour le score cumulé inter-chapitres.
export const RANK_POINTS: Record<Rank['grade'], number> = { S: 100, A: 80, B: 60, C: 40, D: 25 }

export function computeEnding(state: GameState, chapter: Chapter, lang: Lang = 'fr'): Ending {
  const T = (v: { fr: string; en: string }) => L(lang, v)
  const pickT = (arr: { fr: string; en: string }[]) => T(pick(arr))
  const dead = isDead(state)

  if (dead === 'temps') {
    return {
      key: 'timeout',
      tone: 'lose',
      cause: T({ fr: 'Jauge de temps à zéro : tu as traîné en route et le délai a explosé.', en: 'Time gauge at zero: you dawdled and blew past the deadline.' }),
      title: T({ fr: 'Hors délai', en: 'Out of time' }),
      text: pickT([
        { fr: 'Trop tard. Le temps imparti est écoulé et tu n’y es pas. Personne ne te félicitera pour la tentative.', en: 'Too late. The clock ran out and you did not make it. Nobody hands out medals for trying.' },
        { fr: 'Le compte à rebours t’a rattrapé. Mission échouée pour quelques minutes de trop.', en: 'The countdown caught up with you. Mission failed by a handful of minutes.' },
      ]),
    }
  }
  if (dead === 'energie') {
    return {
      key: 'collapse',
      tone: 'lose',
      cause: T({ fr: 'Jauge d’énergie à zéro : ton corps a lâché avant la ligne d’arrivée.', en: 'Energy gauge at zero: your body gave out before the finish line.' }),
      title: T({ fr: 'Panne sèche', en: 'Running on empty' }),
      text: pickT([
        { fr: 'Plus une goutte de carburant. Tu t’écroules sur un banc, vaincu, la mission inachevée.', en: 'Not a drop of fuel left. You collapse on a bench, beaten, the mission unfinished.' },
        { fr: 'Le corps dit stop. Impossible d’avancer plus loin aujourd’hui.', en: 'Your body says stop. No way to push any further today.' },
      ]),
    }
  }
  if (dead === 'moral') {
    return {
      key: 'giveup',
      tone: 'lose',
      cause: T({ fr: 'Jauge de moral à zéro : tu as craqué et tout abandonné.', en: 'Morale gauge at zero: you cracked and gave up on everything.' }),
      title: T({ fr: 'Abandon', en: 'Giving up' }),
      text: pickT([
        { fr: 'Tu n’en peux plus. Tu laisses tomber au milieu de la rue et tu rentres les mains vides.', en: 'You have had enough. You quit in the middle of the street and head home empty-handed.' },
        { fr: 'Le moral à plat, tu jettes l’éponge. Ce sera pour une autre fois.', en: 'Morale flat on the floor, you throw in the towel. Another day, maybe.' },
      ]),
    }
  }

  const total = chapter.items.length
  const got = gotCount(state, chapter)
  const goal = L(lang, chapter.goal)
  const missing = chapter.items
    .filter((it) => !state.items[it.id])
    .map((it) => L(lang, it.label).toLowerCase())
  const andSep = lang === 'en' ? ' and ' : ' et '

  if (got === total) {
    const grade = computeRank(state).grade
    if (grade === 'S' || grade === 'A') {
      return {
        key: 'hero',
        tone: 'win',
        title: T({ fr: 'Sans-faute', en: 'Flawless' }),
        text: pickT([
          { fr: `Tout y est, et de la marge en plus. ${goal} : plié comme un chef, sans transpirer. Légende vivante.`, en: `Everything is here, and time to spare. ${goal}: nailed it like a pro, without breaking a sweat. A living legend.` },
          { fr: 'Mission bouclée haut la main, frais comme un gardon. Tu rends ça facile, alors que ça ne l’était pas du tout.', en: 'Mission wrapped up with ease, fresh as a daisy. You make it look easy, when it was anything but.' },
        ]),
      }
    }
    return {
      key: 'win',
      tone: 'win',
      title: T({ fr: 'Mission accomplie', en: 'Mission accomplished' }),
      text: pickT([
        { fr: `Tu y es. Cabossé, en sueur, mais ${goal} : c’est fait. Le reste, c’est du bonus.`, en: `You made it. Battered, sweaty, but ${goal}: done. The rest is a bonus.` },
        { fr: 'Tout est rentré dans l’ordre, in extremis. Personne ne saura ce qu’il t’a fallu traverser.', en: 'Everything fell into place, at the last second. Nobody will ever know what you had to go through.' },
      ]),
    }
  }

  const moneyCause =
    state.argent < 15
      ? T({ fr: "Plus assez d'argent : tu as trop dépensé en route pour finir ce qu'il restait.", en: 'Out of money: you spent too much along the way to finish what was left.' })
      : T({ fr: 'Occasion manquée : tu n’as pas saisi le bon moment pour boucler la mission.', en: 'Missed your chance: you never grabbed the right moment to seal the deal.' })

  if (got > 0) {
    return {
      key: 'partial',
      tone: 'partial',
      cause: moneyCause,
      title: T({ fr: 'À moitié', en: 'Halfway there' }),
      text:
        lang === 'en'
          ? `You only bring back part of it. Still missing ${missing.join(andSep)}. That will not cut it.`
          : `Tu rapportes une partie seulement. Il manque ${missing.join(andSep)}. Ça ne suffira pas.`,
    }
  }
  return {
    key: 'empty',
    tone: 'lose',
    cause: moneyCause,
    title: T({ fr: 'Échec total', en: 'Total failure' }),
    text: pickT([
      { fr: 'Rien. Absolument rien. Tu rentres bredouille, avec un long discours à préparer.', en: 'Nothing. Absolutely nothing. You head home empty-handed, with a long speech to prepare.' },
      { fr: 'Mission ratée sur toute la ligne. Tu n’as rien à montrer pour tout ce temps passé.', en: 'A complete failure across the board. You have nothing to show for all that time.' },
    ]),
  }
}

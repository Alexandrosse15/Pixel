// Moteur procédural de "Mission Couches" : pioche d'événements, jauges, fins.

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

export type StatKey = 'temps' | 'energie' | 'argent' | 'moral'

export interface GameState {
  temps: number
  energie: number
  argent: number
  moral: number
  couches: boolean
  lait: boolean
  step: number
  seen: string[]
}

export interface Effect {
  temps?: number
  energie?: number
  argent?: number
  moral?: number
  couches?: boolean
  lait?: boolean
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
}

export interface Ending {
  key: string
  tone: 'win' | 'partial' | 'lose'
  title: string
  text: string
}

export const MAX_STEPS = 16
// Aucun item (couches/lait) ne peut être obtenu avant cet événement.
export const HALF = Math.ceil(MAX_STEPS / 2)

export const INITIAL_STATE: GameState = {
  temps: 100,
  energie: 78,
  argent: 42,
  moral: 70,
  couches: false,
  lait: false,
  step: 0,
  seen: [],
}

export const STAT_META: Record<StatKey, { label: string; unit: string; color: string }> = {
  temps: { label: 'Temps', unit: '%', color: '#FF4500' },
  energie: { label: 'Énergie', unit: '%', color: '#3DDC97' },
  argent: { label: 'Argent', unit: '€', color: '#F2C94C' },
  moral: { label: 'Moral', unit: '%', color: '#56A8FF' },
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n))

// Applique un effet sans consommer d'événement (utilisé par les bonus).
export function applyEffect(state: GameState, e: Effect): GameState {
  return {
    ...state,
    temps: clamp(state.temps + (e.temps ?? 0)),
    energie: clamp(state.energie + (e.energie ?? 0)),
    moral: clamp(state.moral + (e.moral ?? 0)),
    argent: Math.max(0, state.argent + (e.argent ?? 0)),
    couches: state.couches || !!e.couches,
    lait: state.lait || !!e.lait,
  }
}

// Usure inévitable à chaque mission : le dimanche fatigue, le temps file.
export const STEP_DRAIN: Effect = { temps: -3, energie: -2 }

export function applyChoice(state: GameState, choice: Choice): GameState {
  const withChoice = applyEffect(state, choice.effect)
  return { ...applyEffect(withChoice, STEP_DRAIN), step: state.step + 1 }
}

export interface Bonus {
  key: PropKey
  label: string
  effect: Effect
  charges: number
  desc: string
}

// Bonus cliquables : compromis pour augmenter ses chances, en charges limitées.
export const BONUSES: Bonus[] = [
  {
    key: 'skateboard',
    label: 'Skateboard',
    effect: { temps: 12, energie: -10 },
    charges: 2,
    desc: '+12 temps, -10 énergie',
  },
  {
    key: 'canette',
    label: 'Canette',
    effect: { energie: 16, temps: -4 },
    charges: 2,
    desc: '+16 énergie, -4 temps',
  },
]

// Un bonus est jouable s'il reste des charges et qu'il ne tue aucune jauge.
export function bonusUsable(state: GameState, b: Bonus, charges: number): boolean {
  if (charges <= 0) return false
  const after = applyEffect(state, b.effect)
  return after.temps > 0 && after.energie > 0 && after.moral > 0
}

// Raison de verrouillage d'un choix, ou null si jouable.
export function choiceLockReason(state: GameState, choice: Choice): string | null {
  const cost = choice.effect.argent ?? 0
  if (cost < 0 && state.argent + cost < 0) return 'Trop cher'
  const grantsItem = !!choice.effect.couches || !!choice.effect.lait
  if (grantsItem && state.step < HALF) return 'Trop tôt'
  return null
}

const shuffle = <T,>(arr: T[]): T[] => {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

// Items qu'un événement peut octroyer, déduits de ses choix.
export function eventGrants(e: GameEvent): Set<'couches' | 'lait'> {
  const s = new Set<'couches' | 'lait'>()
  for (const c of e.choices) {
    if (c.effect.couches) s.add('couches')
    if (c.effect.lait) s.add('lait')
  }
  return s
}

export const isItemEvent = (e: GameEvent): boolean => eventGrants(e).size > 0

// Construit la partie. Rythme voulu : aucun item avant la mi-parcours, les
// COUCHES récupérables au milieu (missions HALF+1 à l'avant-dernière), et le
// LAIT uniquement à la toute dernière mission. Un distributeur est garanti en
// première moitié pour qu'on ait toujours de quoi payer : pas de softlock argent.
export function buildDeck(pool: GameEvent[]): GameEvent[] {
  const atm = pool.find((e) => e.id === 'distributeur')
  const fillers = pool.filter((e) => !isItemEvent(e) && e.id !== 'distributeur')
  const couchesSrc = shuffle(pool.filter((e) => eventGrants(e).has('couches')))
  const laitSrc = shuffle(pool.filter((e) => eventGrants(e).has('lait')))

  const deck: (GameEvent | null)[] = new Array(MAX_STEPS).fill(null)

  // Lait : second objet, uniquement à la dernière mission.
  deck[MAX_STEPS - 1] = laitSrc[0]

  // Couches : premier objet, une occasion entre HALF et l'avant-dernière mission.
  const midSlots = shuffle(Array.from({ length: MAX_STEPS - 1 - HALF }, (_, i) => HALF + i))
  deck[midSlots[0]] = couchesSrc[0]

  // Distributeur garanti dans la première moitié (argent dispo avant tout achat).
  if (atm) {
    const earlySlots = shuffle(Array.from({ length: HALF }, (_, i) => i)).filter((i) => !deck[i])
    if (earlySlots[0] !== undefined) deck[earlySlots[0]] = atm
  }

  // Le reste : des fillers, sans doublon.
  const used = new Set(deck.filter(Boolean).map((e) => (e as GameEvent).id))
  const fill = shuffle(fillers).filter((e) => !used.has(e.id))
  let fi = 0
  for (let i = 0; i < MAX_STEPS; i++) {
    if (!deck[i]) deck[i] = fill[fi++] ?? null
  }

  return deck.filter(Boolean) as GameEvent[]
}

export function isDead(state: GameState): StatKey | null {
  if (state.temps <= 0) return 'temps'
  if (state.energie <= 0) return 'energie'
  if (state.moral <= 0) return 'moral'
  return null
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function computeEnding(state: GameState): Ending {
  const dead = isDead(state)

  if (dead === 'temps') {
    return {
      key: 'timeout',
      tone: 'lose',
      title: 'Le coup de fil',
      text: pick([
        "Ton téléphone vibre. C'est elle. Quatorze appels manqués. Tu rentres les mains à moitié vides et l'oreille déjà rouge.",
        "Il est midi passé. La sieste du petit est foutue, et toi avec. Retour à la maison sous escorte vocale.",
      ]),
    }
  }
  if (dead === 'energie') {
    return {
      key: 'collapse',
      tone: 'lose',
      title: 'Panne sèche',
      text: pick([
        "Tu t'assois sur un plot en béton du parking. Juste cinq minutes. Tu te réveilles, le supermarché a fermé.",
        "Plus une goutte de carburant. Tu rentres en traînant les pieds, vaincu par un dimanche.",
      ]),
    }
  }
  if (dead === 'moral') {
    return {
      key: 'giveup',
      tone: 'lose',
      title: 'Abandon en rase campagne',
      text: pick([
        "Tu poses ton panier au milieu du rayon. Tant pis. Le bébé portera une serviette pliée, ce sera très bien.",
        "Tu n'en peux plus. Tu rentres bredouille et tu assumeras. Enfin, tu essaieras.",
      ]),
    }
  }

  const got = (state.couches ? 1 : 0) + (state.lait ? 1 : 0)

  if (got === 2 && state.moral >= 55 && state.temps >= 40) {
    return {
      key: 'hero',
      tone: 'win',
      title: 'Héros du dimanche',
      text: "Couches sous le bras, lait en poudre dans la poche. Tu pousses la porte, frais comme un gardon. Elle lève un sourcil, impressionnée. Tu ne diras jamais ce qu'il t'a fallu traverser.",
    }
  }
  if (got === 2) {
    return {
      key: 'win',
      tone: 'win',
      title: 'Mission accomplie',
      text: pick([
        "Tu as les deux. Tu rentres cabossé, en sueur, mais victorieux. Le petit est sauvé, et ton couple aussi.",
        "Couches et lait sont là. Personne ne saura le prix réel de cette expédition. C'est ça, l'héroïsme discret.",
      ]),
    }
  }
  if (got === 1) {
    const manque = state.couches ? 'le lait en poudre' : 'les couches'
    return {
      key: 'partial',
      tone: 'partial',
      title: 'Le demi-sel',
      text: `Tu rapportes la moitié de la mission. Il manque ${manque}. Le regard qu'elle te lance pèse plus lourd que le sac que tu n'as pas rempli.`,
    }
  }
  return {
    key: 'empty',
    tone: 'lose',
    title: 'Retour bredouille',
    text: pick([
      "Trois heures dehors. Aucune couche. Aucun lait. Tu rentres avec un paquet de chips et beaucoup d'explications à donner.",
      "Mission ratée sur toute la ligne. Tu n'as rien. Tu prépares déjà ton discours dans l'ascenseur.",
    ]),
  }
}

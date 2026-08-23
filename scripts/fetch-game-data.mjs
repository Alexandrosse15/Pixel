// Constitue data/games.json : la fiche factuelle de chaque jeu couvert.
//
// Les hubs /jeu/[slug] n'avaient que la liste de nos articles, ce qui en faisait
// des doublons de ces articles aux yeux de Google. Ce script va chercher chez
// Steam les faits que nous n'écrivons pas nous-mêmes (studio, sortie, prix,
// plateformes, accueil) pour que la page ait une raison d'exister.
//
// On ne récupère JAMAIS le texte marketing de Steam : uniquement des données.
// Et on n'enregistre une fiche que si le nom correspond vraiment, parce qu'une
// fiche fausse est pire que pas de fiche.
//
//   node scripts/fetch-game-data.mjs           met à jour les jeux manquants
//   node scripts/fetch-game-data.mjs --all     refait tout depuis zéro

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'data', 'games.json')
const OVERRIDES_FILE = path.join(ROOT, 'data', 'games-overrides.json')
const REFRESH_ALL = process.argv.includes('--all')

// Reprend uniquement les slugs demandés : --only lanterns,dinosaur
const onlyArg = process.argv.find((a) => a.startsWith('--only='))
const ONLY = onlyArg ? new Set(onlyArg.slice(7).split(',').filter(Boolean)) : null

// Corrections relues à la main. Un nombre force un appid (Steam renvoie parfois
// la bande-son ou une édition retirée avant le jeu), null écarte la fiche quand
// le jeu n'existe pas sur Steam ou qu'un homonyme a été attrapé.
const OVERRIDES = fs.existsSync(OVERRIDES_FILE)
  ? Object.fromEntries(
      Object.entries(JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'))).filter(
        ([k]) => !k.startsWith('_'),
      ),
    )
  : {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function slugifyGame(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Comparaison tolérante aux deux-points, tirets et éditions : "Gallipoli"
// et "Gallipoli: 1915" doivent se reconnaître, "Gargantua" et "Gargantua 2" non.
function normalize(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function nameMatches(ours, theirs) {
  const a = normalize(ours)
  const b = normalize(theirs)
  if (a === b) return 'exact'
  // Un des deux contient l'autre en entier et n'ajoute qu'un sous-titre court
  const [short, long] = a.length <= b.length ? [a, b] : [b, a]
  if (long.startsWith(short + ' ') && short.length / long.length >= 0.55) return 'prefixe'
  return null
}

// --- Étiquettes maison ---------------------------------------------------
// Les identifiants Steam sont stables, pas leurs libellés traduits. On mappe
// nous-mêmes pour ne pas avoir à interroger l'API une fois par langue.

const GENRES = {
  1: { fr: 'Action', en: 'Action' },
  2: { fr: 'Stratégie', en: 'Strategy' },
  3: { fr: 'Aventure', en: 'Adventure' },
  4: { fr: 'Décalé', en: 'Casual' },
  9: { fr: 'Course', en: 'Racing' },
  18: { fr: 'Sport', en: 'Sports' },
  23: { fr: 'Indépendant', en: 'Indie' },
  25: { fr: 'Action-RPG', en: 'Adventure RPG' },
  28: { fr: 'Simulation', en: 'Simulation' },
  29: { fr: 'Jeu de rôle', en: 'RPG' },
  37: { fr: 'Free to play', en: 'Free to Play' },
  70: { fr: 'Accès anticipé', en: 'Early Access' },
  72: { fr: 'Jeu en réseau', en: 'Massively Multiplayer' },
}

const FEATURES = {
  2: { fr: 'Solo', en: 'Single-player' },
  1: { fr: 'Multijoueur', en: 'Multi-player' },
  9: { fr: 'Coopération', en: 'Co-op' },
  38: { fr: 'Coop en ligne', en: 'Online co-op' },
  39: { fr: 'Coop en local', en: 'Local co-op' },
  49: { fr: 'PvP', en: 'PvP' },
  36: { fr: 'PvP en ligne', en: 'Online PvP' },
  37: { fr: 'PvP en local', en: 'Local PvP' },
  22: { fr: 'Succès', en: 'Achievements' },
  23: { fr: 'Cloud', en: 'Cloud saves' },
  28: { fr: 'Manette', en: 'Full controller support' },
  30: { fr: 'Ateliers Steam', en: 'Steam Workshop' },
  62: { fr: 'Écran partagé', en: 'Remote Play Together' },
}

// Seuils officiels Steam, recalculés chez nous pour disposer des deux langues.
function reviewLabel(percent, total) {
  if (total < 10) return null
  if (percent >= 95 && total >= 500) return { fr: 'Extrêmement positives', en: 'Overwhelmingly Positive' }
  if (percent >= 80 && total >= 50) return { fr: 'Très positives', en: 'Very Positive' }
  if (percent >= 80) return { fr: 'Positives', en: 'Positive' }
  if (percent >= 70) return { fr: 'Plutôt positives', en: 'Mostly Positive' }
  if (percent >= 40) return { fr: 'Moyennes', en: 'Mixed' }
  if (percent >= 20) return { fr: 'Plutôt négatives', en: 'Mostly Negative' }
  if (total >= 500) return { fr: 'Extrêmement négatives', en: 'Overwhelmingly Negative' }
  if (total >= 50) return { fr: 'Très négatives', en: 'Very Negative' }
  return { fr: 'Négatives', en: 'Negative' }
}

const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
}

// Steam renvoie "21 Aug, 2026", "Aug 2026" ou "Q3 2026" selon les cas.
function parseSteamDate(raw) {
  if (!raw) return null
  const m = raw.match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*,?\s+(\d{4})/)
  if (m) {
    const mo = MONTHS[m[2].toLowerCase()]
    if (mo) return `${m[3]}-${String(mo).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`
  }
  const m2 = raw.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})/)
  if (m2) {
    const mo = MONTHS[m2[1].toLowerCase()]
    if (mo) return `${m2[2]}-${String(mo).padStart(2, '0')}`
  }
  return null
}

async function getJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'InsertCoinsPress/1.0 (+https://insertcoins.press)' },
      })
      if (res.status === 429 || res.status >= 500) {
        await sleep(8000 * (i + 1))
        continue
      }
      if (!res.ok) return null
      return await res.json()
    } catch {
      await sleep(3000 * (i + 1))
    }
  }
  return null
}

function collectGames() {
  const games = new Map()
  for (const dir of ['content/articles', 'content/articles/en']) {
    const abs = path.join(ROOT, dir)
    if (!fs.existsSync(abs)) continue
    for (const file of fs.readdirSync(abs)) {
      // Même règle que lib/articles.ts : les fichiers en _ sont des gabarits
      if (!file.endsWith('.md') || file.startsWith('_')) continue
      const { data } = matter(fs.readFileSync(path.join(abs, file), 'utf8'))
      const names = new Set()
      if (data.gameName) names.add(data.gameName)
      if (Array.isArray(data.gameNames)) data.gameNames.forEach((n) => names.add(n))
      for (const name of names) {
        const slug = slugifyGame(String(name))
        if (slug && !games.has(slug)) games.set(slug, String(name))
      }
    }
  }
  return games
}

async function fetchGame(slug, name) {
  if (Object.prototype.hasOwnProperty.call(OVERRIDES, slug)) {
    const forced = OVERRIDES[slug]
    if (forced === null) return { slug, name, steam: null, reason: 'écarté à la relecture' }
    return await fetchByAppId(slug, name, forced, 'manuel')
  }

  const search = await getJson(
    `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=english&cc=FR`,
  )
  await sleep(900)

  const items = search?.items ?? []
  let hit = null
  let confidence = null
  for (const item of items.slice(0, 8)) {
    const c = nameMatches(name, item.name ?? '')
    if (c === 'exact') { hit = item; confidence = c; break }
    if (c && !hit) { hit = item; confidence = c }
  }
  if (!hit) return { slug, name, steam: null, reason: 'introuvable' }

  return await fetchByAppId(slug, name, hit.id, confidence)
}

async function fetchByAppId(slug, name, appId, confidence) {
  const details = await getJson(
    `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=FR&l=english`,
  )
  await sleep(1400)

  const d = details?.[String(appId)]?.success ? details[String(appId)].data : null
  if (!d) return { slug, name, steam: null, reason: 'fiche indisponible' }

  const reviews = await getJson(
    `https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=0`,
  )
  await sleep(900)

  const qs = reviews?.query_summary
  const total = qs?.total_reviews ?? 0
  const positive = qs?.total_positive ?? 0
  const percent = total > 0 ? Math.round((positive / total) * 100) : null

  // On retient le prix de base, pas le prix soldé : une promotion capturée un
  // jour donné devient un chiffre faux la semaine suivante.
  const price = d.is_free
    ? { isFree: true }
    : d.price_overview
      ? {
          isFree: false,
          formatted: d.price_overview.initial_formatted || d.price_overview.final_formatted,
          cents: d.price_overview.initial || d.price_overview.final,
          currency: d.price_overview.currency ?? 'EUR',
        }
      : null

  return {
    slug,
    name,
    steam: {
      appId,
      steamName: d.name,
      confidence,
      developers: d.developers ?? [],
      publishers: (d.publishers ?? []).filter((p) => p && p.trim()),
      releaseRaw: d.release_date?.date ?? null,
      releaseDate: parseSteamDate(d.release_date?.date),
      comingSoon: Boolean(d.release_date?.coming_soon),
      price,
      platforms: {
        windows: Boolean(d.platforms?.windows),
        mac: Boolean(d.platforms?.mac),
        linux: Boolean(d.platforms?.linux),
      },
      // On stocke tous les identifiants sans filtrer : le tri et la traduction
      // se font à l'affichage, ce qui permet d'ajouter une étiquette plus tard
      // sans avoir à réinterroger les quatre cents fiches.
      genreIds: (d.genres ?? []).map((g) => Number(g.id)).filter(Number.isFinite),
      featureIds: (d.categories ?? []).map((c) => Number(c.id)).filter(Number.isFinite),
      earlyAccess: (d.genres ?? []).some((g) => Number(g.id) === 70),
      metacritic: d.metacritic?.score ?? null,
      reviews: percent === null ? null : { total, positive, percent, label: reviewLabel(percent, total) },
      fetchedAt: new Date().toISOString().slice(0, 10),
    },
  }
}

async function main() {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  const existing = !REFRESH_ALL && fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
  const games = collectGames()

  const todo = [...games].filter(([slug]) =>
    ONLY ? ONLY.has(slug) : !existing[slug],
  )
  console.log(`${games.size} jeux au total, ${todo.length} à récupérer`)

  let done = 0
  let matched = 0
  for (const [slug, name] of todo) {
    const res = await fetchGame(slug, name)
    existing[slug] = res
    if (res.steam) matched++
    done++
    console.log(
      `[${done}/${todo.length}] ${name} -> ${res.steam ? `${res.steam.appId} (${res.steam.confidence})` : res.reason}`,
    )
    if (done % 10 === 0) {
      const sorted = Object.fromEntries(Object.keys(existing).sort().map((k) => [k, existing[k]]))
      fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n')
    }
  }

  const sorted = Object.fromEntries(Object.keys(existing).sort().map((k) => [k, existing[k]]))
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`\nTerminé. ${matched}/${todo.length} appariés sur cette passe.`)
}

main()

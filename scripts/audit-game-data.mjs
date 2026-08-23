// Contrôle des fiches récupérées par fetch-game-data.mjs.
//
// Publier une fiche fausse sur quatre cents pages est pire que ne rien publier,
// donc on relit les appariements avant de mettre en ligne : ceux qui reposent
// sur un préfixe, ceux qui restent introuvables, et les incohérences de date
// entre la fiche Steam et nos propres articles.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'games.json'), 'utf8'))

const entries = Object.values(data)
const matched = entries.filter((e) => e.steam)
const prefixes = matched.filter((e) => e.steam.confidence === 'prefixe')
const missing = entries.filter((e) => !e.steam)

console.log(`${entries.length} jeux, ${matched.length} appariés (${Math.round((matched.length / entries.length) * 100)} %)\n`)

console.log(`--- Appariements par préfixe, à relire (${prefixes.length}) ---`)
for (const e of prefixes) {
  console.log(`  "${e.name}"  ->  "${e.steam.steamName}"  (app ${e.steam.appId})`)
}

console.log(`\n--- Sans fiche Steam (${missing.length}) ---`)
for (const e of missing) console.log(`  ${e.name}  [${e.reason}]`)

// Une fiche sans studio ni prix ni genre ne remplit pas un tableau : autant le
// savoir, ces hubs resteront hors index.
const thinSheets = matched.filter((e) => {
  const s = e.steam
  const facts = [s.developers.length > 0, Boolean(s.releaseRaw), Boolean(s.price), s.genreIds.length > 0]
  return facts.filter(Boolean).length < 3
})
console.log(`\n--- Fiches trop maigres pour être publiées (${thinSheets.length}) ---`)
for (const e of thinSheets) console.log(`  ${e.name} (app ${e.steam.appId})`)

// Date de sortie Steam très éloignée de la date de notre article : signe d'un
// mauvais appariement (on aurait attrapé un autre jeu du même nom).
const articleDates = new Map()
for (const dir of ['content/articles']) {
  const abs = path.join(ROOT, dir)
  for (const file of fs.readdirSync(abs)) {
    if (!file.endsWith('.md')) continue
    const { data: fm } = matter(fs.readFileSync(path.join(abs, file), 'utf8'))
    if (!fm.gameName || !fm.date) continue
    const slug = String(fm.gameName)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const prev = articleDates.get(slug)
    if (!prev || fm.date < prev) articleDates.set(slug, String(fm.date))
  }
}

const suspicious = []
for (const e of matched) {
  const rel = e.steam.releaseDate
  const ours = articleDates.get(e.slug)
  if (!rel || !ours || rel.length < 7) continue
  const gap = Math.abs(new Date(rel + (rel.length === 7 ? '-01' : '')) - new Date(ours)) / 86400000
  if (gap > 730) suspicious.push({ name: e.name, steamName: e.steam.steamName, rel, ours, gap: Math.round(gap) })
}
suspicious.sort((a, b) => b.gap - a.gap)
console.log(`\n--- Écart de plus de deux ans entre sortie Steam et notre article (${suspicious.length}) ---`)
for (const s of suspicious.slice(0, 40)) {
  console.log(`  ${s.name} -> "${s.steamName}" : Steam ${s.rel}, nous ${s.ours} (${s.gap} j)`)
}

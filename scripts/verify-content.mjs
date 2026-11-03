#!/usr/bin/env node
/**
 * Controle des articles sans lancer de build.
 *
 * Le build complet rend 2800+ pages et sature la memoire d'une machine a 8 Go.
 * Ce script attrape ce qu'un build aurait signale cote contenu (images
 * manquantes, frontmatter casse) plus les regles editoriales du CLAUDE.md, en
 * quelques secondes et sans pic memoire.
 *
 * Par defaut il ne controle que les articles modifies par rapport a origin/main :
 * c'est une barriere avant push, pas un audit. Le fond de catalogue contient des
 * ecarts anciens (excerpts trop longs surtout) qui feraient echouer chaque appel.
 *
 * Usage :
 *   node scripts/verify-content.mjs              articles modifies (defaut)
 *   node scripts/verify-content.mjs --all        tout le catalogue
 *   node scripts/verify-content.mjs --recent=10  les 10 plus recents
 *   node scripts/verify-content.mjs --slug=a,b   des slugs precis
 */
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import matter from 'gray-matter'

const ROOT = process.cwd()
const FR = path.join(ROOT, 'content/articles')
const EN = path.join(ROOT, 'content/articles/en')
const PUBLIC = path.join(ROOT, 'public')

const CATEGORIES = ['tests', 'previews', 'dossiers', 'industrie', 'cinema', 'guides', 'wargame']
const SCORED = ['tests', 'cinema']
const DISCORD = 'discord.gg/473FE3dWvw'

// Tics de langage releves comme marqueurs de redaction automatique.
const TICS = [
  "le coeur du jeu, c'est",
  'il faut neanmoins etre lucide',
  'bouffee de fraicheur',
  'redoutablement efficace',
  'a mille lieues de',
  'a double tranchant',
  "n'a rien d'un hasard",
  'sans jamais trahir',
]
const AI_TRACES = ['claude', 'chatgpt', 'openai', 'anthropic', 'intelligence artificielle', 'ai-generated', 'as an ai']
// Le lecteur se vouvoie : le tutoiement est le marqueur le plus visible.
const TU = [/\btu as\b/, /\btu peux\b/, /\bton souvenir\b/, /\btu me demandes\b/, /\bcomme tu l'as dit\b/, /\bpuisque tu\b/, /\bton impression\b/]

const args = process.argv.slice(2)
const recentArg = args.find((a) => a.startsWith('--recent='))
const slugArg = args.find((a) => a.startsWith('--slug='))

function deaccent(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function listSlugs() {
  return fs
    .readdirSync(FR)
    .filter((n) => n.endsWith('.md') && !n.startsWith('_'))
    .map((n) => n.replace(/\.md$/, ''))
}

function check(file, slug, isEn) {
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const problems = []
  const low = deaccent(raw.toLowerCase())

  // --- regles absolues ---
  if (raw.includes('—')) problems.push(`${(raw.match(/—/g) || []).length} em dash`)
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(raw)) problems.push('emoji')
  for (const a of AI_TRACES) if (low.includes(a)) problems.push(`trace IA "${a}"`)
  if (!isEn) for (const r of TU) if (r.test(low)) problems.push(`tutoiement ${r.source}`)
  for (const t of TICS) if (low.includes(deaccent(t))) problems.push(`tic "${t}"`)

  // --- frontmatter ---
  for (const f of ['title', 'slug', 'category', 'excerpt', 'date', 'author', 'readTime']) {
    if (!data[f]) problems.push(`frontmatter: ${f} manquant`)
  }
  if (data.slug && data.slug !== slug) problems.push(`slug "${data.slug}" != nom de fichier "${slug}"`)
  if (data.category && !CATEGORIES.includes(data.category)) problems.push(`categorie inconnue "${data.category}"`)
  if (data.excerpt && data.excerpt.length > 155) problems.push(`excerpt ${data.excerpt.length} caracteres (max 155)`)
  if (data.score !== undefined && !SCORED.includes(data.category)) problems.push(`score sur une categorie ${data.category}`)
  if (data.score !== undefined && (data.score < 0 || data.score > 10)) problems.push(`score hors bornes (${data.score})`)
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) problems.push(`date mal formee "${data.date}"`)

  // --- fichiers reellement presents (ce qu'un 404 en production donnerait) ---
  const assets = [...content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)].map((m) => m[1])
  if (data.coverImage) assets.push(data.coverImage)
  if (data.pdfUrl) assets.push(data.pdfUrl)
  for (const a of new Set(assets)) {
    if (!fs.existsSync(path.join(PUBLIC, a.replace(/^\//, '')))) problems.push(`fichier absent ${a}`)
  }

  // --- liens internes ---
  for (const m of content.matchAll(/\]\((\/(?:en\/)?articles\/([a-z0-9-]+))\)/g)) {
    const target = m[2]
    if (!fs.existsSync(path.join(FR, `${target}.md`))) problems.push(`lien mort vers ${m[1]}`)
  }

  if (!raw.includes(DISCORD)) problems.push('pas d invitation Discord')

  return problems
}

/** Articles touches par rapport a origin/main, commits locaux et travail en cours compris. */
function changedSlugs() {
  const out = new Set()
  const run = (cmd) => {
    try {
      return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    } catch {
      return ''
    }
  }
  const base = run('git rev-parse --verify --quiet origin/main').trim() ? 'origin/main' : 'HEAD~1'
  const lists = [run(`git diff --name-only ${base}...HEAD`), run('git diff --name-only HEAD'), run('git ls-files --others --exclude-standard')]
  for (const list of lists) {
    for (const line of list.split('\n')) {
      const m = line.trim().match(/^content\/articles\/(?:en\/)?([a-z0-9-]+)\.md$/)
      if (m) out.add(m[1])
    }
  }
  return [...out]
}

const all = listSlugs()
let slugs
let scope
if (slugArg) {
  const want = slugArg.split('=')[1].split(',')
  slugs = all.filter((s) => want.includes(s))
  scope = 'slugs demandes'
} else if (recentArg) {
  const n = parseInt(recentArg.split('=')[1], 10)
  slugs = all
    .map((s) => ({ s, d: matter(fs.readFileSync(path.join(FR, `${s}.md`), 'utf8')).data.date || '' }))
    .sort((a, b) => String(b.d).localeCompare(String(a.d)))
    .slice(0, n)
    .map((x) => x.s)
  scope = `${n} plus recents`
} else if (args.includes('--all')) {
  slugs = all
  scope = 'catalogue complet'
} else {
  slugs = changedSlugs().filter((s) => all.includes(s))
  scope = 'articles modifies depuis origin/main'
  if (slugs.length === 0) {
    console.log('Aucun article modifie. Rien a controler.')
    process.exit(0)
  }
}
console.log(`Portee : ${scope} (${slugs.length} article${slugs.length > 1 ? 's' : ''})\n`)

let failed = 0
let checked = 0
for (const slug of slugs) {
  for (const [dir, isEn] of [[FR, false], [EN, true]]) {
    const file = path.join(dir, `${slug}.md`)
    if (!fs.existsSync(file)) {
      if (!isEn) {
        console.log(`KO  ${slug} : fichier FR introuvable`)
        failed++
      }
      continue
    }
    checked++
    const problems = check(file, slug, isEn)
    if (problems.length) {
      failed++
      console.log(`KO  ${isEn ? 'en/' : ''}${slug}`)
      for (const p of problems) console.log(`      ${p}`)
    }
  }
}

console.log(`\n${checked} fichiers controles, ${failed} en defaut.`)
process.exit(failed ? 1 : 0)

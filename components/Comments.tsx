'use client'

import { useState, useEffect } from 'react'
import { useLocale } from './LocaleProvider'

const APP_ID = 'bb0125e2-8ec8-4f26-b1df-dbed60c5aa7b'
const HOST = 'https://cusdis.com'

interface Comment {
  id: string
  by_nickname: string
  content: string
  createdAt: string
  approved: boolean
}

interface Props {
  slug: string
  title: string
  url: string
}

function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (locale === 'en') {
    if (mins < 2) return 'just now'
    if (mins < 60) return `${mins} min ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }
  if (mins < 2) return "à l'instant"
  if (mins < 60) return `il y a ${mins} min`
  if (hours < 24) return `il y a ${hours}h`
  return `il y a ${days}j`
}

export default function Comments({ slug, title, url }: Props) {
  const { t, locale } = useLocale()
  const [comments, setComments] = useState<Comment[]>([])
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${HOST}/api/open/comments?appId=${APP_ID}&pageId=${slug}`)
      .then(r => r.json())
      .then(json => {
        const all: Comment[] = json?.data?.data ?? []
        setComments(all.filter((c: Comment) => c.approved))
      })
      .catch(() => {})
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || !nickname.trim()) return
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${HOST}/api/open/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: APP_ID,
          pageId: slug,
          pageUrl: url,
          pageTitle: title,
          content: content.trim(),
          nickname: nickname.trim(),
          email: email.trim(),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      setContent('')
      setNickname('')
      setEmail('')
    } catch {
      setError(locale === 'en' ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Réessaie.')
    } finally {
      setSending(false)
    }
  }

  const labels = locale === 'en'
    ? { name: 'Name', email: 'Email (optional)', comment: 'Your comment', send: 'Send', pending: 'Your comment has been submitted and is pending moderation.', noComments: 'No comments yet. Be the first.' }
    : { name: 'Nom', email: 'Email (facultatif)', comment: 'Ton commentaire', send: 'Envoyer', pending: 'Ton commentaire a bien été envoyé. Il sera visible après modération.', noComments: 'Aucun commentaire pour le moment. Sois le premier.' }

  return (
    <div className="mt-16 border-t border-line pt-12">
      <h2 className="mb-8 font-display text-xl font-black uppercase tracking-wide text-white">
        {t.comments.title}
      </h2>

      {/* Liste des commentaires */}
      <div className="mb-10 flex flex-col gap-6">
        {comments.length === 0 ? (
          <p className="text-sm text-ink-muted">{labels.noComments}</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="rounded-sm border border-line bg-bg-card p-5">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-xs font-black text-white">
                  {c.by_nickname.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-white">{c.by_nickname}</span>
                <span className="text-xs text-ink-muted">{timeAgo(c.createdAt, locale)}</span>
              </div>
              <p className="text-sm leading-relaxed text-ink-secondary">{c.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulaire */}
      {sent ? (
        <div className="rounded-sm border border-brand/40 bg-brand/10 p-5 text-sm text-brand">
          {labels.pending}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-xs uppercase tracking-widest text-ink-muted">
                {labels.name} <span className="text-brand">*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                required
                className="rounded-sm border border-line bg-bg-elevated px-4 py-2.5 text-sm text-white placeholder-ink-muted outline-none transition-colors focus:border-brand"
                placeholder={labels.name}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-xs uppercase tracking-widest text-ink-muted">
                {labels.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="rounded-sm border border-line bg-bg-elevated px-4 py-2.5 text-sm text-white placeholder-ink-muted outline-none transition-colors focus:border-brand"
                placeholder="email@exemple.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display text-xs uppercase tracking-widest text-ink-muted">
              {labels.comment} <span className="text-brand">*</span>
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={5}
              className="rounded-sm border border-line bg-bg-elevated px-4 py-2.5 text-sm text-white placeholder-ink-muted outline-none transition-colors focus:border-brand resize-none"
              placeholder={labels.comment}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-2.5 font-display text-xs font-black uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {sending ? '...' : labels.send}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

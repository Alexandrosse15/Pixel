'use client'

import { useEffect, useRef } from 'react'

interface Props {
  slug: string
}

export default function Comments({ slug }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  useEffect(() => {
    if (!ref.current || !repoId || !categoryId) return

    // Remove previous script if any (e.g. navigation between articles)
    const existing = ref.current.querySelector('script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'Alexandrosse15/insertcoin-press')
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'specific')
    script.setAttribute('data-term', slug)
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-lang', 'fr')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [slug, repoId, categoryId])

  if (!repoId || !categoryId) {
    return null
  }

  return (
    <div className="mt-16 border-t border-line pt-12">
      <h2 className="mb-8 font-display text-xl font-black uppercase tracking-wide text-white">
        Commentaires
      </h2>
      <div ref={ref} />
    </div>
  )
}

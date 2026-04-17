'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from './LocaleProvider'

interface Props {
  slug: string
  title: string
  url: string
}

export default function Comments({ slug, title, url }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useLocale()

  useEffect(() => {
    if (!ref.current) return

    ref.current.setAttribute('data-page-id', slug)
    ref.current.setAttribute('data-page-url', url)
    ref.current.setAttribute('data-page-title', title)

    const w = window as any

    if (w.CUSDIS) {
      w.CUSDIS.initial()
      return
    }

    if (!document.getElementById('cusdis-script')) {
      const script = document.createElement('script')
      script.id = 'cusdis-script'
      script.src = 'https://cusdis.com/js/cusdis.es.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [slug, title, url])

  return (
    <div className="mt-16 border-t border-line pt-12">
      <h2 className="mb-8 font-display text-xl font-black uppercase tracking-wide text-white">
        {t.comments.title}
      </h2>
      <div
        ref={ref}
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="bb0125e2-8ec8-4f26-b1df-dbed60c5aa7b"
        data-page-id={slug}
        data-page-url={url}
        data-page-title={title}
      />
    </div>
  )
}

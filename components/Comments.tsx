'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from './LocaleProvider'

interface Props {
  slug: string
}

export default function Comments({ slug: _slug }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useLocale()

  useEffect(() => {
    if (!ref.current) return

    // Remove previous script if any (e.g. navigation between articles)
    const existing = ref.current.querySelector('script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'Alexandrosse15/Pixel')
    script.setAttribute('data-repo-id', 'R_kgDOSDpeTQ')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOSDpeTc4C685n')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-lang', 'fr')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <div className="mt-16 border-t border-line pt-12">
      <h2 className="mb-8 font-display text-xl font-black uppercase tracking-wide text-white">
        {t.comments.title}
      </h2>
      <div ref={ref} />
    </div>
  )
}

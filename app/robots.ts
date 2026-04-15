import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Tous les crawlers classiques
        userAgent: '*',
        allow: '/',
      },
      {
        // ChatGPT
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        // Claude / Anthropic
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        // Perplexity
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        // Google AI / Gemini
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'InsertCoin.press — Le média indépendant du jeu vidéo',
    template: '%s | InsertCoin.press',
  },
  description:
    'Tests, previews, dossiers de fond et actualité de l\'industrie du jeu vidéo. La presse gaming indépendante.',
  keywords: ['jeux vidéo', 'tests', 'previews', 'gaming', 'industrie', 'dossiers'],
  authors: [{ name: 'InsertCoin.press' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'InsertCoin.press',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg-base text-ink-primary">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

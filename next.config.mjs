/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        pathname: '/igdb/image/upload/**',
      },
    ],
    minimumCacheTTL: 604800,
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      // Anciennes URL de categorie vers la structure /articles
      { source: '/tests/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/previews/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/guides/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/dossiers/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/industrie/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/cinema/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/en/tests/:slug', destination: '/en/articles/:slug', permanent: true },
      { source: '/en/previews/:slug', destination: '/en/articles/:slug', permanent: true },
      { source: '/en/guides/:slug', destination: '/en/articles/:slug', permanent: true },
      // Articles passes de preview a test
      { source: '/articles/agent-64-spies-never-die-preview', destination: '/articles/agent-64-spies-never-die-test', permanent: true },
      { source: '/en/articles/agent-64-spies-never-die-preview', destination: '/en/articles/agent-64-spies-never-die-test', permanent: true },
      { source: '/articles/airport-manager-simulator-2026-preview', destination: '/articles/airport-manager-simulator-2026-test', permanent: true },
      { source: '/en/articles/airport-manager-simulator-2026-preview', destination: '/en/articles/airport-manager-simulator-2026-test', permanent: true },
      { source: '/articles/approximately-up-preview', destination: '/articles/approximately-up-test', permanent: true },
      { source: '/en/articles/approximately-up-preview', destination: '/en/articles/approximately-up-test', permanent: true },
      { source: '/articles/car-wash-simulator-preview', destination: '/articles/car-wash-simulator-test', permanent: true },
      { source: '/en/articles/car-wash-simulator-preview', destination: '/en/articles/car-wash-simulator-test', permanent: true },
      { source: '/articles/clawed-preview', destination: '/articles/clawed-test', permanent: true },
      { source: '/en/articles/clawed-preview', destination: '/en/articles/clawed-test', permanent: true },
      { source: '/articles/cs-manager-preview', destination: '/articles/cs-manager-test', permanent: true },
      { source: '/en/articles/cs-manager-preview', destination: '/en/articles/cs-manager-test', permanent: true },
      { source: '/articles/defender-of-the-crown-the-legend-returns-preview', destination: '/articles/defender-of-the-crown-the-legend-returns-test', permanent: true },
      { source: '/en/articles/defender-of-the-crown-the-legend-returns-preview', destination: '/en/articles/defender-of-the-crown-the-legend-returns-test', permanent: true },
      { source: '/articles/hell-let-loose-vietnam-preview', destination: '/articles/hell-let-loose-vietnam-test', permanent: true },
      { source: '/en/articles/hell-let-loose-vietnam-preview', destination: '/en/articles/hell-let-loose-vietnam-test', permanent: true },
      { source: '/articles/iron-nest-preview', destination: '/articles/iron-nest-test', permanent: true },
      { source: '/en/articles/iron-nest-preview', destination: '/en/articles/iron-nest-test', permanent: true },
      { source: '/articles/low-budget-repairs-preview', destination: '/articles/low-budget-repairs-test', permanent: true },
      { source: '/en/articles/low-budget-repairs-preview', destination: '/en/articles/low-budget-repairs-test', permanent: true },
      { source: '/articles/luminary-preview', destination: '/articles/luminary-test', permanent: true },
      { source: '/en/articles/luminary-preview', destination: '/en/articles/luminary-test', permanent: true },
      { source: '/articles/nothing-to-declare-preview', destination: '/articles/nothing-to-declare-test', permanent: true },
      { source: '/en/articles/nothing-to-declare-preview', destination: '/en/articles/nothing-to-declare-test', permanent: true },
      { source: '/articles/pax-autocratica-preview', destination: '/articles/pax-autocratica-test', permanent: true },
      { source: '/en/articles/pax-autocratica-preview', destination: '/en/articles/pax-autocratica-test', permanent: true },
      { source: '/articles/restory-preview', destination: '/articles/restory-test', permanent: true },
      { source: '/en/articles/restory-preview', destination: '/en/articles/restory-test', permanent: true },
      { source: '/articles/shippin-preview', destination: '/articles/shippin-test', permanent: true },
      { source: '/en/articles/shippin-preview', destination: '/en/articles/shippin-test', permanent: true },
      { source: '/articles/sovereign-tower-preview', destination: '/articles/sovereign-tower-test', permanent: true },
      { source: '/en/articles/sovereign-tower-preview', destination: '/en/articles/sovereign-tower-test', permanent: true },
      { source: '/articles/speedrunners-2-king-of-speed-preview', destination: '/articles/speedrunners-2-king-of-speed-test', permanent: true },
      { source: '/en/articles/speedrunners-2-king-of-speed-preview', destination: '/en/articles/speedrunners-2-king-of-speed-test', permanent: true },
      { source: '/articles/spiritstead-preview', destination: '/articles/spiritstead-test', permanent: true },
      { source: '/en/articles/spiritstead-preview', destination: '/en/articles/spiritstead-test', permanent: true },
      { source: '/articles/the-legend-of-mala-tokmachka-preview', destination: '/articles/the-legend-of-mala-tokmachka-test', permanent: true },
      { source: '/en/articles/the-legend-of-mala-tokmachka-preview', destination: '/en/articles/the-legend-of-mala-tokmachka-test', permanent: true },
      { source: '/articles/the-syndicate-classified-operations-preview', destination: '/articles/the-syndicate-classified-operations-test', permanent: true },
      { source: '/en/articles/the-syndicate-classified-operations-preview', destination: '/en/articles/the-syndicate-classified-operations-test', permanent: true },
      { source: '/articles/wild-blue-skies-preview', destination: '/articles/wild-blue-skies-test', permanent: true },
      { source: '/en/articles/wild-blue-skies-preview', destination: '/en/articles/wild-blue-skies-test', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        // Screenshot and cover images — static content, safe to cache long
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // RSS feed — regenerate at most hourly
        source: '/feed.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig

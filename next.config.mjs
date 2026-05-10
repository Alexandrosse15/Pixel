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

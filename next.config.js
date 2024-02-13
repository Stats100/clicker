/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { 
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Git-Author',
            value: 'GalvinPython',
          },
          {
            key: 'Git-Repo',
            value: 'Stats100/clicker',
          },
          {
            key: 'Hi',
            value: ':3',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

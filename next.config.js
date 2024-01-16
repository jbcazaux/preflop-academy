const path = require('path')

const withNextIntl = require('next-intl/plugin')('./src/i18n/i18n.ts')

module.exports = withNextIntl({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/api/hint-tables/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=2592000,s-maxage=2592000',
          },
        ],
      },
      {
        source: '/api/(vs|improvement)/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=3600,s-maxage=3§00',
          },
        ],
      },
      {
        source: '/(fr|en)/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=7200,s-maxage=3600',
          },
        ],
      },
    ]
  },
})

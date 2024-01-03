const path = require('path')

const withNextIntl = require('next-intl/plugin')('./src/i18n/i18n.ts')

module.exports = withNextIntl({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=2592000, stale-while-revalidate=59',
          },
        ],
      },
    ]
  },
})

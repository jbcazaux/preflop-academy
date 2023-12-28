import createMiddleware from 'next-intl/middleware'
import { Pathnames } from 'next-intl/navigation'

export const locales = ['en', 'fr'] as const

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    fr: '/pfadnamen',
  },
} satisfies Pathnames<typeof locales>

export const localePrefix = undefined

export default createMiddleware({
  defaultLocale: 'fr',
  locales,
  pathnames,
  localePrefix,
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(fr|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}

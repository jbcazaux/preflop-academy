import 'server-only'

import { unstable_setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import Providers from '../lib/providers'

import styles from './layout.module.scss'

import Menu from 'app-components/menu/Menu'
import Header from 'components/header/Header'
import { Locale } from 'i18n/types'
import { locales } from 'src/middleware'

const LocaleLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) => {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>PreFlop Academy 1.1</title>
      </head>
      <body>
        <Providers locale={locale as Locale}>
          <div className={styles.app}>
            <Menu />
            <div className={styles.content}>
              <Header />
              <section className={styles.section}>{children}</section>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default LocaleLayout

export const generateStaticParams = () =>
  locales.map(locale => ({
    locale,
  }))

export const dynamicParams = false

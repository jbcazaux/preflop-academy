import 'server-only'

import { ReactNode } from 'react'

import Providers from '../lib/providers'

import styles from './layout.module.scss'

import Menu from 'app-components/menu/Menu'
import Header from 'components/header/Header'
import { Locale } from 'i18n/types'

const RootLayout = ({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) => (
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

export default RootLayout

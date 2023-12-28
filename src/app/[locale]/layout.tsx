import Providers from '../lib/providers'
import Menu from 'src/app-components/menu/Menu'
import Header from 'components/header/Header'

import styles from './layout.module.scss'
import { Locale } from 'i18n/types'

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
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
              <section>{children}</section>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

import TestI18N from 'app-components/TestI18N'
import Link from 'next/link'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'

import Horizontal from 'components/layout/Horizontal'

import styles from './page.module.scss'

const Home = () => {
  const messages = useMessages()
  const t = useTranslations('menu')
  return (
    <nav>
      <Horizontal>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/">{t('home')}</Link>
          </li>
          <li className={styles.item}>
            <Link href="/solver">{t('solver')}</Link>
          </li>
          <li className={styles.item}>
            <Link href="/training">{t('training')}</Link>
          </li>
          <li className={styles.item}>
            <Link href="/ranges">{t('ranges')}</Link>
          </li>
          <li className={styles.item}>
            <Link href="/ranges/editor">{t('ranges-editor')}</Link>
          </li>
        </ul>
      </Horizontal>
      <NextIntlClientProvider locale="fr" messages={messages}>
        <TestI18N />
      </NextIntlClientProvider>
    </nav>
  )
}

export default Home

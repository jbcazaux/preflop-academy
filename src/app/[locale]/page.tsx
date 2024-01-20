import 'server-only'

import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import styles from './page.module.scss'

import Horizontal from 'components/layout/Horizontal'
import { Link } from 'i18n/navigation'

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale)
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
        </ul>
      </Horizontal>
    </nav>
  )
}

export default Home

export const revalidate = 'force-cache'

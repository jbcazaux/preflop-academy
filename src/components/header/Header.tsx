import 'server-only'

import { getTranslations } from 'next-intl/server'

import styles from './Header.module.scss'

import Horizontal from 'components/layout/Horizontal'

const Header = async () => {
  const t = await getTranslations()
  return (
    <header className={styles.header}>
      <Horizontal className={styles.title}>{t('title')}</Horizontal>
      {/*<LanguageSelector />*/}
    </header>
  )
}

export default Header

import 'server-only'

import { getTranslations } from 'next-intl/server'

import Horizontal from 'components/layout/Horizontal'

import styles from './Header.module.scss'

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

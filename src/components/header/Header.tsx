import Horizontal from 'components/layout/Horizontal'
import styles from './Header.module.scss'

const Header = () => (
  <header className={styles.header}>
    <Horizontal className={styles.title}>GTO Poker 2000 !!</Horizontal>
    {/*<LanguageSelector />*/}
  </header>
)

export default Header

import Horizontal from 'components/layout/Horizontal'
import Link from 'next/link'
import styles from './page.module.scss'

const Home = () => (
  <nav>
    <Horizontal>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link href="/solver">Solver</Link>
        </li>
        <li className={styles.item}>
          <Link href="/training">Training</Link>
        </li>
        <li className={styles.item}>
          <Link href="/ranges">Ranges</Link>
        </li>
        <li className={styles.item}>
          <Link href="/ranges/editor">Range Editor</Link>
        </li>
      </ul>
    </Horizontal>
  </nav>
)

export default Home

import 'server-only'

import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Book, Calculator, Cards, Home2, Table, TableImport } from 'tabler-icons-react'

import style from './Menu.module.scss'

const Menu = async () => {
  const t = await getTranslations('menu')
  return (
    <nav className={style.menu}>
      <div className={style.title}>
        <Cards size={36} /> <span>GTO Poker</span>
      </div>
      <ul>
        <li>
          <Link href="/" className={style.link}>
            <Home2 size={36} />
            <span>{t('home')}</span>
          </Link>
        </li>
        <li>
          <Link href="/solver" className={style.link}>
            <Calculator size={36} />
            <span>{t('solver')}</span>
          </Link>
        </li>
        <li>
          <Link href="/training" className={style.link}>
            <Book size={36} />
            <span>{t('training')}</span>
          </Link>
        </li>
        <li>
          <Link href="/ranges" className={style.link}>
            <Table size={36} />
            <span>{t('ranges')}</span>
          </Link>
        </li>
        <li>
          <Link href="/ranges/editor" className={style.link}>
            <TableImport size={36} />
            <span>{t('ranges-editor')}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu

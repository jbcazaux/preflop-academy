'use client'

import style from './LanguageSelector.module.scss'

import FlagFr from 'assets/icons/FlagFr'
import FlagUs from 'assets/icons/FlagUs'
import Horizontal from 'components/layout/Horizontal'
import { useRouter, usePathname } from 'i18n/navigation'
import { Locale } from 'i18n/types'

const LanguageSelector = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (locale: Locale) => {
    router.push(pathname, { locale })
  }
  return (
    <Horizontal className={style.container}>
      <div onClick={() => handleChange('fr')}>
        <FlagFr />
      </div>
      <div onClick={() => handleChange('en')}>
        <FlagUs />
      </div>
    </Horizontal>
  )
}

export default LanguageSelector

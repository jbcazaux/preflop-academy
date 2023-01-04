import i18n from 'i18n/i18n'
import styled from 'styled-components'
import Horizontal from 'components/layout/Horizontal'
import { Locale } from 'i18n/types'
import FlagFr from 'assets/icons/FlagFr'
import FlagUs from 'assets/icons/FlagUs'

const StyledLanguageSelector = styled(Horizontal)``

const LocaleButton = styled.div`
  margin: 5px;
  width: 40px;
  cursor: pointer;
`
interface Props {
  className?: string
}
const LanguageSelector = ({ className = '' }: Props) => {
  const changeLanguage = (lng: Locale) => {
    i18n.changeLanguage(lng)
  }

  return (
    <StyledLanguageSelector className={className}>
      <LocaleButton onClick={() => changeLanguage('fr')}>
        <FlagFr />
      </LocaleButton>
      <LocaleButton onClick={() => changeLanguage('en')}>
        <FlagUs />
      </LocaleButton>
    </StyledLanguageSelector>
  )
}

export default LanguageSelector

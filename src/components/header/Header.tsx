import styled from 'styled-components'
import LS from 'components/i18n/LanguageSelector'
import Horizontal from 'components/layout/Horizontal'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 50px;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 5px 5px rgb(0 0 0 / 20%);
  clip-path: inset(-15px);
`

const Title = styled(Horizontal)`
  font-weight: bold;
  justify-content: center;
`

const LanguageSelector = styled(LS)`
  position: absolute;
  right: 0;
  @media (${({ theme }) => theme.breakpoints.min.tablet}) {
    display: none;
  }
`

const Header = () => (
  <StyledHeader>
    <Title>GTO Poker 2000</Title>
    <LanguageSelector />
  </StyledHeader>
)

export default Header

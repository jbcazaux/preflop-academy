import styled, { ThemeContext } from 'styled-components'
import { Book, Calculator, Cards, Home2, Table, TableImport } from 'tabler-icons-react'
import { useContext } from 'react'
import NavLink from 'app/menu/NavLink'
import { useTranslation } from 'react-i18next'
import LS from 'components/i18n/LanguageSelector'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 170px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  z-index: 10;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};
    display: block;
  }
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    min-width: 50px;
  }
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 40px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
  font-size: 1.2em;
  span {
    @media (${({ theme }) => theme.breakpoints.max.tablet}) {
      display: none;
    }
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
  margin: 50px 5px;
`

const NavItem = styled.li`
  margin: 25px 0 15px 0;
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    margin: 20px 0 10px 0;
  }
`

const LanguageSelector = styled(LS)`
  justify-content: space-evenly;
  align-items: flex-end;
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    display: none;
  }
`

const Menu = () => {
  const { t } = useTranslation()
  const { colors } = useContext(ThemeContext)
  return (
    <StyledMenu>
      <Title>
        <Cards size={36} /> <span>GTO Poker</span>
      </Title>
      <List>
        <NavItem>
          <NavLink to="/" label={t('menu.home')} color={colors.menu.menu1} end>
            <Home2 size={36} color={colors.menu.menu1} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/solver" label={t('menu.solver')} color={colors.menu.menu2}>
            <Calculator size={36} color={colors.menu.menu2} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/training" label={t('menu.training')} color={colors.menu.menu3}>
            <Book size={36} color={colors.menu.menu3} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ranges" label={t('menu.ranges')} color={colors.menu.menu4}>
            <Table size={36} color={colors.menu.menu4} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/editor" label={t('menu.ranges-editor')} color={colors.menu.menu5}>
            <TableImport size={36} color={colors.menu.menu5} />
          </NavLink>
        </NavItem>
      </List>
      <LanguageSelector />
    </StyledMenu>
  )
}

export default Menu

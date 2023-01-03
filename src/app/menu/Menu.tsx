import styled, { ThemeContext } from 'styled-components'
import { Book, Calculator, Cards, Home2, Table, TableImport } from 'tabler-icons-react'
import { useContext } from 'react'
import NavLink from 'app/menu/NavLink'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  z-index: 10;
  a {
    text-decoration: none;
    color: black;
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
  color: black;
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

const Menu = () => {
  const { colors } = useContext(ThemeContext)
  return (
    <StyledMenu>
      <Title>
        <Cards size={36} /> <span>GTO Poker</span>
      </Title>
      <List>
        <NavItem>
          <NavLink to="/" label="Home" color={colors.menu.menu1} end>
            <Home2 size={36} color={colors.menu.menu1} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/solver" label="Solver" color={colors.menu.menu2}>
            <Calculator size={36} color={colors.menu.menu2} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/training" label="Training" color={colors.menu.menu3}>
            <Book size={36} color={colors.menu.menu3} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ranges" label="Ranges" color={colors.menu.menu4}>
            <Table size={36} color={colors.menu.menu4} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/editor" label="Ranges Editor" color={colors.menu.menu5}>
            <TableImport size={36} color={colors.menu.menu5} />
          </NavLink>
        </NavItem>
      </List>
    </StyledMenu>
  )
}

export default Menu

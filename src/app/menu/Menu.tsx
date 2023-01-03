import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 40px;
  color: black;
  font-weight: bold;
  font-size: 1.2em;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
`

const ListItem = styled.li`
  margin: 10px;
`

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  z-index: 10;
  a {
    text-decoration: none;
    color: black;
  }
`

const Menu = () => (
  <StyledMenu>
    <Title>GTO Poker</Title>
    <List>
      <ListItem>
        <NavLink to="/">Home</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/solver">Solver</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/training">Training</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/ranges">Ranges</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/editor">Range Editor</NavLink>
      </ListItem>
    </List>
  </StyledMenu>
)

export default Menu

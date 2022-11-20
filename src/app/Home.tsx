import Horizontal from 'components/layout/Horizontal'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;
`

const ListItem = styled.li`
  margin: 0 10px;
`

const Home = () => (
  <nav>
    <Horizontal>
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
    </Horizontal>
  </nav>
)

export default Home

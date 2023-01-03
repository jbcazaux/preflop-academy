import { NavLink as RRNavLink } from 'react-router-dom'
import { ReactElement } from 'react'
import styled from 'styled-components'
import Horizontal from 'components/layout/Horizontal'
import { useMatch, useResolvedPath } from 'react-router'

const NavContent = styled(Horizontal)`
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-size: 20px;
`

const NavTitle = styled.span`
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
    display: none;
  }
`
const Dot = styled.div<{ color: string }>`
  height: 10px;
  width: 10px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`
const Spacer = styled.div`
  height: 10px;
  width: 10px;
`

interface Props {
  to: string
  children: ReactElement
  label: string
  color: string
  end?: boolean
}

const NavLink = ({ to, label, color, end = false, children }: Props) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end })

  return (
    <RRNavLink to={to}>
      <NavContent>
        {children} <NavTitle>{label}</NavTitle>
        {match ? <Dot color={color} /> : <Spacer />}
      </NavContent>
    </RRNavLink>
  )
}

export default NavLink

import styled from 'styled-components'
import { Position } from 'components/layout/SideMenu/types'

const Container = styled.div<{ position: Position }>`
  display: flex;
  font-size: 25px;
  padding: 0 10px 5px 10px;
  font-weight: bold;
  align-self: ${({ position }) => (position === 'left' ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.black}; ;
`

const Arrow = styled.div<{ open: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(90deg)' : '')};
  transition: transform 0.3s linear;
  transform-origin: 50% 60%;
`

interface Props {
  onClick: () => void
  open: boolean
  hide: boolean
  position: Position
}

const Close = ({ onClick, open, position, hide }: Props) =>
  hide ? null : (
    <Container onClick={onClick} position={position}>
      <Arrow open={open}>{position === 'left' ? '>' : '<'}</Arrow>
    </Container>
  )

export default Close

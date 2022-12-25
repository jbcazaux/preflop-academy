import styled from 'styled-components'
import { Position } from 'components/layout/SideMenu/types'

const Container = styled.div<{ position: Position }>`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  padding: 2px 10px 5px 10px;
  font-weight: bold;
  align-self: ${({ position }) => (position === 'left' ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  border: 1px solid black;
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
      {(open || position === 'left') && (!open || position === 'right') ? '>' : '<'}
    </Container>
  )

export default Close

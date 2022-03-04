import Hand from 'domain/hand'
import gto from 'data/gto'
import styled from 'styled-components'
import Position from 'domain/position'

const Action = styled.div`
  display: flex;
  margin: 10px 0;
  font-weight: bold;
  font-size: 2em;
`

interface Props {
  hero: Position
  raisePositions: ReadonlyArray<Position>
  hand: Hand
}

const Gto: React.FC<Props> = ({ hero, raisePositions, hand }) => {
  const action = gto(hero, raisePositions, hand)
  return <Action>Action : {action}</Action>
}

export default Gto

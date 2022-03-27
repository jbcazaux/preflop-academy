import Hand from 'domain/hand'
import gto from 'data/gto'
import Position from 'domain/position'
import Action from 'components/Action'

interface Props {
  hero: Position
  raisePositions: ReadonlyArray<Position>
  hand: Hand
}

const Gto: React.FC<Props> = ({ hero, raisePositions, hand }) => {
  const move = gto(hero, raisePositions, hand)
  return <Action>You should : {move || 'N/A'}</Action>
}

export default Gto

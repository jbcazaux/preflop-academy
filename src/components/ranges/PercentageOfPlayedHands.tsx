import Move from 'domain/move'
import Position from 'domain/position'
import { getHintsTable } from 'data/gto'

interface Props {
  move: Move
  hero: Position
  vilain: Position
}

const PercentageOfPlayedHand: React.FC<Props> = ({ move, hero, vilain }) => {
  const hintsTable = getHintsTable(move, hero, vilain)
  if (!hintsTable) {
    return <div>N/A</div>
  }
  const moves = hintsTable.flatMap(l => l).reduce((total, current) => (current ? total + 1 : total), 0)
  return <div>{Number((100 * moves) / (13 * 13)).toFixed(2)}%</div>
}

export default PercentageOfPlayedHand

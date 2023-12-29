import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'

import Horizontal from 'components/layout/Horizontal'
import RangeTable from 'components/RangeTable/RangeTable'

import PercentageOfPlayedHand from './PercentageOfPlayedHands'

interface Props {
  hintsTable: HintTable
  hintsTableName?: string
  hand?: Hand
  mini?: boolean
}

const Ranges = ({ hintsTable, hand, hintsTableName, mini = false }: Props) => (
  <div>
    <Horizontal>
      {hintsTableName && <>{hintsTableName}&nbsp;:&nbsp;</>}
      <PercentageOfPlayedHand hintsTable={hintsTable} />
    </Horizontal>
    <RangeTable hintsTable={hintsTable} hand={hand} mini={mini} />
  </div>
)

export default Ranges

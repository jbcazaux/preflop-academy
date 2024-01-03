import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'

import Horizontal from 'components/layout/Horizontal'
import RangeTable from 'components/RangeTable/RangeTable'

import PercentageOfPlayedHand from './PercentageOfPlayedHands'

interface Props {
  hintsTable: HintTable
  hintsTableName?: string
  hand?: Hand
}

const Ranges = ({ hintsTable, hand, hintsTableName }: Props) => (
  <div>
    <Horizontal>
      {hintsTableName && <>{hintsTableName}&nbsp;:&nbsp;</>}
      <PercentageOfPlayedHand hintsTable={hintsTable} />
    </Horizontal>
    <RangeTable hintsTable={hintsTable} hand={hand} />
  </div>
)

export default Ranges

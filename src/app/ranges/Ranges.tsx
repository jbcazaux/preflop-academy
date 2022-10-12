import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'
import RangeTable from 'components/RangeTable'
import HintTable from 'domain/hintTable'
import Horizontal from 'components/layout/Horizontal'
import Hand from 'domain/hand'

interface Props {
  hintsTable: HintTable
  hintsTableName?: string
  hand?: Hand
}

const Ranges = ({ hintsTable, hand, hintsTableName }: Props) => (
  <div>
    <Horizontal>
      {hintsTableName && <>{hintsTableName}&nbsp;:&nbsp;</>}
      <PercentageOfPlayedHands hintsTable={hintsTable} />
    </Horizontal>
    <RangeTable hintsTable={hintsTable} hand={hand} />
  </div>
)

export default Ranges

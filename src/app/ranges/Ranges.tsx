import PercentageOfPlayedHands from 'app/ranges/PercentageOfPlayedHands'
import RangeTable from 'components/RangeTable'
import HintTable from 'domain/hintTable'
import Horizontal from 'components/layout/Horizontal'
import Hand from 'domain/hand'

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
      <PercentageOfPlayedHands hintsTable={hintsTable} />
    </Horizontal>
    <RangeTable hintsTable={hintsTable} hand={hand} mini={mini} />
  </div>
)

export default Ranges

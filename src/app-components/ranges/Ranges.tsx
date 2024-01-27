import PercentageOfPlayedHand from './PercentageOfPlayedHands'

import Horizontal from 'components/layout/Horizontal'
import RangeTable from 'components/RangeTable/RangeTable'
import { RatioRange } from 'domain/combo'
import Hand from 'domain/hand'

interface Props {
  range: RatioRange
  hintsTableName?: string
  hand?: Hand
}

const Ranges = ({ range, hand, hintsTableName }: Props) => (
  <div>
    <Horizontal>
      {hintsTableName && <>{hintsTableName}&nbsp;:&nbsp;</>}
      <PercentageOfPlayedHand range={range} />
    </Horizontal>
    <RangeTable range={range} hand={hand} />
  </div>
)

export default Ranges

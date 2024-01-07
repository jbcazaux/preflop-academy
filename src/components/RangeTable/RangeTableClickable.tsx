import Combo from './Combo'
import style from './RangeTable.module.scss'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import { cards } from 'domain/card'
import PokerHand from 'domain/hand'
import HintTable from 'domain/hintTable'

interface Props {
  hintsTable: HintTable | null
  hand?: PokerHand
}

const RangeTableClickable = ({ hintsTable, hand }: Props) => {
  const xyInRangeTable = hand?.isComplete() ? hand?.xyInRangeTable() : null
  return (
    <Vertical className={style.container}>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => {
            const selected = xyInRangeTable?.[0] === i && xyInRangeTable?.[1] === j
            return (
              <Combo
                key={`${c1}${c2}`}
                active={!!hintsTable?.[i][j]}
                suited={i < j}
                pair={i === j}
                selected={selected}
                xy={[i, j]}
              >
                {i < j ? `${c1}${c2}` : `${c2}${c1}`}
              </Combo>
            )
          })}
        </Horizontal>
      ))}
    </Vertical>
  )
}

export default RangeTableClickable

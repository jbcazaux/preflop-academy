import Combo from './Combo'
import style from './RangeTable.module.scss'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import { cards } from 'domain/card'
import { ComboType, Range } from 'domain/combo'
import PokerHand from 'domain/hand'
import HintTable from 'domain/hintTable'

interface Props {
  hintsTable: HintTable | null
  range?: Range
  hand?: PokerHand
}

const RangeTable = ({ hintsTable, hand, range }: Props) => {
  const xyInRangeTable = hand?.isComplete() ? hand?.xyInRangeTable() : null

  const isActive = (c1: string, i: number, c2: string, j: number) => {
    if (hintsTable) {
      return hintsTable[i][j]
    }
    if (!range) return false

    const combo = i < j ? `${c1}${c2}` : `${c2}${c1}`
    const sop = i === j ? '' : i < j ? 's' : 'o'
    const comboSop = `${combo}${sop}` as ComboType
    return range.includes(comboSop)
  }

  return (
    <Vertical className={style.container}>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => {
            const selected = xyInRangeTable?.[0] === i && xyInRangeTable?.[1] === j
            return (
              <Combo
                key={`${c1}${c2}`}
                active={isActive(c1, i, c2, j)}
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

export default RangeTable

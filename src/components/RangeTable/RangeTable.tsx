import ComboComponent from './Combo'
import style from './RangeTable.module.scss'

import Horizontal from 'components/layout/Horizontal'
import Vertical from 'components/layout/Vertical'
import { cards } from 'domain/card'
import { Combo, RatioRange } from 'domain/combo'
import PokerHand from 'domain/hand'

interface Props {
  range: RatioRange
  hand?: PokerHand
}

const RangeTable = ({ range, hand }: Props) => {
  const handCombo = hand?.isComplete() ? hand?.asCombo() : null

  return (
    <Vertical className={style.container}>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => {
            const c = i < j ? `${c1}${c2}` : `${c2}${c1}`
            const sop = i === j ? '' : i < j ? 's' : 'o'
            const comboSop = `${c}${sop}` as Combo

            return (
              <ComboComponent
                key={`${c1}${c2}`}
                active={!!range[comboSop]}
                suited={i < j}
                pair={i === j}
                selected={handCombo === comboSop}
                combo={comboSop}
              />
            )
          })}
        </Horizontal>
      ))}
    </Vertical>
  )
}

export default RangeTable

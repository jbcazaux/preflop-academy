import cn from 'classnames'

import style from './Combo.module.scss'

import { Combo } from 'domain/combo'

interface Props {
  active: boolean
  pair: boolean
  suited: boolean
  selected?: boolean
  combo: Combo
}

const Combo = ({ active, suited, pair, selected = false, combo }: Props) => (
  <div
    className={cn('combo', style.combo, {
      [style.suited]: suited,
      [style.pair]: pair,
      [style.active]: active,
      [style.selected]: selected,
    })}
    data-combo={combo}
  >
    {combo}
  </div>
)

export default Combo

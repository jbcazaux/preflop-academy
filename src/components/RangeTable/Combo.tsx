import cn from 'classnames'

import style from './Combo.module.scss'

interface Props {
  active: boolean
  pair: boolean
  suited: boolean
  selected?: boolean
  children: string
  xy: [number, number]
}

const Combo = ({ active, suited, pair, selected = false, xy, children }: Props) => (
  <div
    className={cn('combo', style.combo, {
      [style.suited]: suited,
      [style.pair]: pair,
      [style.active]: active,
      [style.selected]: selected,
    })}
    data-xy={xy}
  >
    {children}
    {pair ? '' : suited ? 's' : 'o'}
  </div>
)

export default Combo

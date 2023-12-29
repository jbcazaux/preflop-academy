import { MouseEventHandler, ReactNode } from 'react'
import cn from 'classnames'

import style from './Square.module.scss'

interface Props {
  suited: boolean
  pair: boolean
  active: boolean
  selected: boolean
  children: ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Square = ({ children, suited, pair, active, selected, onClick }: Props) => (
  <div
    className={cn(style.square, {
      [style.suited]: suited,
      [style.pair]: pair,
      [style.active]: active,
      [style.selected]: selected,
    })}
    onClick={onClick}
  >
    {children}
  </div>
)
export default Square

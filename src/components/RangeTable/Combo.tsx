import { MouseEventHandler } from 'react'
import Square from './Square'

interface Props {
  active: boolean
  pair: boolean
  suited: boolean
  selected?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
  children: string
}

const Combo = ({ active, suited, pair, selected = false, onClick, children }: Props) => (
  <Square active={active} selected={selected} suited={suited} pair={pair} onClick={onClick}>
    {children}
    {pair ? '' : suited ? 's' : 'o'}
  </Square>
)

export default Combo

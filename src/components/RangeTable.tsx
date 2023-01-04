import styled, { ThemeContext } from 'styled-components'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import HintTable from 'domain/hintTable'
import PokerHand from 'domain/hand'
import { useContext } from 'react'

interface ISquare {
  bgColor: string
  active: boolean
  selected?: boolean
}

export const Square = styled.div<ISquare>`
  width: 25px;
  height: 25px;
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  margin: 1px;
  border: ${({ selected, theme }) => (selected ? '3px solid red' : `1px solid ${theme.colors.black}`)};
  border-radius: 3px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    width: 20px;
    height: 20px;
    font-size: 0.6em;
  }
`

interface HandProps {
  active: boolean
  pair: boolean
  suited: boolean
  selected?: boolean
  children: string
}

const Hand = ({ active, suited, pair, selected = false, children }: HandProps) => {
  const { colors } = useContext(ThemeContext)
  const color = active ? colors.range.active : suited || pair ? colors.range.suited : colors.range.offsuit
  return (
    <Square bgColor={color} active={active} selected={selected}>
      {children}
      {pair ? '' : suited ? 's' : 'o'}
    </Square>
  )
}
const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

interface Props {
  hintsTable: HintTable | null
  hand?: PokerHand
}

const RangeTable = ({ hintsTable, hand }: Props) => {
  const xyInRangeTable = hand?.isComplete() ? hand?.xyInRangeTable() : null
  return (
    <div>
      <Vertical>
        {cards.map((c1, i) => (
          <Horizontal key={c1}>
            {cards.map((c2, j) => {
              const selected = xyInRangeTable?.[0] === i && xyInRangeTable?.[1] === j
              return (
                <Hand
                  key={`${c1}${c2}`}
                  active={!!hintsTable?.[i][j]}
                  suited={i < j}
                  pair={i === j}
                  selected={selected}
                >
                  {i < j ? `${c1}${c2}` : `${c2}${c1}`}
                </Hand>
              )
            })}
          </Horizontal>
        ))}
      </Vertical>
    </div>
  )
}

export default RangeTable

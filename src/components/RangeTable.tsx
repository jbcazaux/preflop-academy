import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import HintTable from 'domain/hintTable'
import PokerHand from 'domain/hand'

interface ISquare {
  bgColor: string
  active: boolean
  selected?: boolean
}

export const Square = styled.div<ISquare>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  margin: 1px;
  border: ${({ selected }) => (selected ? '3px solid red' : '1px solid black')};
  border-radius: 3px;
  box-sizing: border-box;
`

interface HandProps {
  active: boolean
  pair: boolean
  suited: boolean
  selected?: boolean
  children: string
}

const Hand = ({ active, suited, pair, selected = false, children }: HandProps) => {
  const color = active ? '#97DE5D' : suited || pair ? '#0CF9DF' : '#F9E00C'
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
    <Vertical>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => {
            const selected = xyInRangeTable?.[0] === i && xyInRangeTable?.[1] === j
            return (
              <Hand key={`${c1}${c2}`} active={!!hintsTable?.[i][j]} suited={i < j} pair={i === j} selected={selected}>
                {i < j ? `${c1}${c2}` : `${c2}${c1}`}
              </Hand>
            )
          })}
        </Horizontal>
      ))}
    </Vertical>
  )
}

export default RangeTable

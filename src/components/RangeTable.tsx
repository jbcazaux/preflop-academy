import styled, { useTheme } from 'styled-components'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import HintTable from 'domain/hintTable'
import PokerHand from 'domain/hand'

const Container = styled(Vertical)`
  flex: 0;
`

interface ISquare {
  bgColor: string
  active: boolean
  selected?: boolean
  mini: boolean
}

export const Square = styled.div<ISquare>`
  width: ${({ mini }) => (mini ? '15px;' : '25px;')};
  height: ${({ mini }) => (mini ? '15px;' : '25px;')};
  font-size: ${({ mini }) => (mini ? '0.5em;' : '0.75em;')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  margin: 1px;
  border: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.colors.range.selected}` : `1px solid ${theme.colors.black}`};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  @media (${({ theme }) => theme.breakpoints.max.tablet}) {
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
  onClick?: () => void
  mini?: boolean
  children: string
}

const Combo = ({ active, suited, pair, selected = false, onClick, children, mini }: HandProps) => {
  const { colors } = useTheme()
  const color = active ? colors.range.active : suited || pair ? colors.primary : colors.secondary
  return (
    <Square bgColor={color} active={active} selected={selected} onClick={onClick} mini={mini || false}>
      {children}
      {pair ? '' : suited ? 's' : 'o'}
    </Square>
  )
}
const cards: ReadonlyArray<string> = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

interface Props {
  hintsTable: HintTable | null
  hand?: PokerHand
  onClick?: (i: number, j: number) => void
  mini?: boolean
}

const RangeTable = ({ hintsTable, hand, onClick, mini = false }: Props) => {
  const xyInRangeTable = hand?.isComplete() ? hand?.xyInRangeTable() : null
  return (
    <Container>
      {cards.map((c1, i) => (
        <Horizontal key={c1}>
          {cards.map((c2, j) => {
            const selected = xyInRangeTable?.[0] === i && xyInRangeTable?.[1] === j
            return (
              <Combo
                key={`${c1}${c2}`}
                onClick={() => onClick && onClick(i, j)}
                active={!!hintsTable?.[i][j]}
                suited={i < j}
                pair={i === j}
                selected={selected}
                mini={mini}
              >
                {i < j ? `${c1}${c2}` : `${c2}${c1}`}
              </Combo>
            )
          })}
        </Horizontal>
      ))}
    </Container>
  )
}

export default RangeTable

import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import { Card } from 'domain/card'
import Board from 'domain/board'
import CardComponent from 'components/Card2'

const Vertical0 = styled.div`
  display: flex;
  flex-direction: column;
`

const CenterVertical = styled(Vertical)`
  justify-content: center;
`

const Stats = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 30px;
  align-items: center;
  margin: 1px;
`
const Outs = styled(Stats)`
  background: ${({ theme }) => theme.colors.primary};
`
const OutsPercentage = styled(Stats)`
  background: ${({ theme }) => theme.colors.primary};
`
const BetVsPot = styled(Stats)`
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-weight: bolder;
  height: 20px;
`
const WLResultTotal = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  title: string
  cards: ReadonlyArray<Card>
  board: Board
}

const ImprovementStats = ({ title, cards, board }: Props) => {
  const odds = Number(cards.length / (52 - 2 - board.cards.length))
  return (
    <CenterVertical>
      <Vertical0>
        <Horizontal>{title}</Horizontal>
        <Horizontal>
          <Outs>{cards.length} Outs</Outs>
          <OutsPercentage>{(100 * odds).toFixed(2)} %</OutsPercentage>
        </Horizontal>
        <Horizontal>
          <BetVsPot>{((100 * odds) / (1 - odds)).toFixed(2)} % Pot</BetVsPot>
        </Horizontal>
        <Horizontal>
          <WLResultTotal>
            {cards.map(c => (
              <CardComponent key={c.id} card={c} />
            ))}
          </WLResultTotal>
        </Horizontal>
      </Vertical0>
    </CenterVertical>
  )
}

export default ImprovementStats

import Hand from 'domain/hand'
import Board from 'domain/board'
import { useQuery } from 'react-query'
import Loader from 'components/Loader/Loader'
import styled from 'styled-components'
import Vertical from 'components/layout/Vertical'
import improvementsApi, { ImprovementCards } from 'api/improvements'
import ImprovementStats from 'app/solver/improvements/ImprovementStats'

const CenterVertical = styled(Vertical)`
  align-items: center;
`

interface Props {
  hand: Hand
  board: Board
}

const ImprovementCards = ({ hand, board }: Props) => {
  const {
    data: improvementCardsFlop = null,
    isLoading: isLoadingImprovementCardsFlop,
    isError: isErrorImprovementCardsFlop,
  } = useQuery<ImprovementCards | null>([hand, board, 'improvement', 'flop'], () => improvementsApi.flop(hand, board), {
    enabled: hand.isComplete() && board.cards.length === 3,
  })
  const {
    data: improvementCardsTurn = null,
    isLoading: isLoadingImprovementCardsTurn,
    isError: isErrorImprovementCardsTurn,
  } = useQuery<ImprovementCards | null>([hand, board, 'improvement', 'turn'], () => improvementsApi.turn(hand, board), {
    enabled: hand.isComplete() && board.cards.length === 4,
  })

  if (isLoadingImprovementCardsFlop || isLoadingImprovementCardsTurn) {
    return (
      <CenterVertical>
        <Loader />
      </CenterVertical>
    )
  }

  if (isErrorImprovementCardsFlop || isErrorImprovementCardsTurn) {
    return (
      <CenterVertical>
        <div>Error :(</div>
      </CenterVertical>
    )
  }

  if (improvementCardsFlop) {
    return <ImprovementStats title="Improvement cards @ Flop" cards={improvementCardsFlop.cards} board={board} />
  }
  if (improvementCardsTurn) {
    return <ImprovementStats title="Improvement cards @ Turn" cards={improvementCardsTurn.cards} board={board} />
  }
  return null
}

export default ImprovementCards

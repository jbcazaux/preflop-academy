import { useQuery } from 'react-query'

import style from './ImprovementCards.module.scss'
import ImprovementStats from './ImprovementStats'

import improvementsApi, { ImprovementCards } from 'api/improvements'
import Vertical from 'components/layout/Vertical'
import Loader from 'components/Loader/Loader'
import Board from 'domain/board'
import Hand from 'domain/hand'

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
      <Vertical className={style.center}>
        <Loader />
      </Vertical>
    )
  }

  if (isErrorImprovementCardsFlop || isErrorImprovementCardsTurn) {
    return (
      <Vertical className={style.center}>
        <div>Error :(</div>
      </Vertical>
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

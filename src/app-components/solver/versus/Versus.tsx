'use client'

import { useQuery } from '@tanstack/react-query'

import style from './Versus.module.scss'
import WLResults from './WLResults'

import versusApi, { VsResult } from 'api/versus'
import Vertical from 'components/layout/Vertical'
import Loader from 'components/Loader/Loader'
import Board from 'domain/board'
import { ComboType } from 'domain/combo'
import Hand from 'domain/hand'

interface Props {
  hand: Hand
  board: Board
  vilainRange: ReadonlyArray<ComboType>
}

const Versus = ({ hand, board, vilainRange }: Props) => {
  const {
    data: resultPreflop = null,
    isLoading: isLoadingPreflop,
    isError: isErrorPreflop,
  } = useQuery<VsResult | null>({
    queryKey: [vilainRange, hand, board, 'preflop'],
    queryFn: () => versusApi.rangePreflop(vilainRange || [], hand),
    enabled: !!vilainRange?.length && hand.isComplete() && board.cards.length === 0,
  })

  const {
    data: resultPostFlop = null,
    isLoading: isLoadingPostflop,
    isError: isErrorPostflop,
  } = useQuery<VsResult | null>({
    queryKey: [vilainRange, hand, board, 'postflop'],
    queryFn: () => versusApi.range(vilainRange || [], hand, board),
    enabled: !!vilainRange?.length && hand.isComplete() && board.cards.length >= 3,
  })

  if (isLoadingPreflop || isLoadingPostflop) {
    return (
      <Vertical className={style.center}>
        <Loader />
      </Vertical>
    )
  }

  if (isErrorPostflop || isErrorPreflop) {
    return (
      <Vertical className={style.center}>
        <div>Error :(</div>
      </Vertical>
    )
  }

  if (resultPreflop) {
    return (
      <WLResults
        title="@Preflop"
        total={resultPreflop.total}
        winRate={resultPreflop.winner}
        loseRate={resultPreflop.lose}
        tieRate={resultPreflop.draw}
      />
    )
  }
  if (resultPostFlop) {
    return (
      <WLResults
        title="@Postflop"
        total={resultPostFlop.total}
        winRate={resultPostFlop.winner}
        loseRate={resultPostFlop.lose}
        tieRate={resultPostFlop.draw}
      />
    )
  }
  return null
}

export default Versus

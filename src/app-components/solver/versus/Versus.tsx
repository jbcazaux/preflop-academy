'use client'

import { useMemo } from 'react'
import { useQuery } from 'react-query'
import versusApi, { VsResult } from 'api/versus'
import { getHintsTable } from 'data/gto'
import Action from 'domain/action'
import Board from 'domain/board'
import Hand from 'domain/hand'
import { getRange } from 'domain/hintTable'
import Position from 'domain/position'

import Vertical from 'components/layout/Vertical'
import Loader from 'components/Loader/Loader'

import WLResults from './WLResults'

import style from './Versus.module.scss'

interface Props {
  hero: Position
  hand: Hand
  board: Board
  actions: ReadonlyArray<Action>
}

const Versus = ({ hero, hand, board, actions }: Props) => {
  const range = useMemo(() => {
    const vilainLastAction = actions.reduce(
      (lastAction: Action | null, cur) => (cur.position !== hero ? cur : lastAction),
      null
    )
    if (!vilainLastAction) return null

    const hintsTable = getHintsTable(vilainLastAction.move, vilainLastAction.position, hero)
    if (!hintsTable) return null

    return getRange(hintsTable)
  }, [actions, hero])

  const {
    data: resultPreflop = null,
    isLoading: isLoadingPreflop,
    isError: isErrorPreflop,
  } = useQuery<VsResult | null>([range, hand, board, 'preflop'], () => versusApi.rangePreflop(range || [], hand), {
    enabled: !!range?.length && hand.isComplete() && board.cards.length === 0,
  })

  const {
    data: resultPostFlop = null,
    isLoading: isLoadingPostflop,
    isError: isErrorPostflop,
  } = useQuery<VsResult | null>([range, hand, board, 'postflop'], () => versusApi.range(range || [], hand, board), {
    enabled: !!range?.length && hand.isComplete() && board.cards.length > 0,
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

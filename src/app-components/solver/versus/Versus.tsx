'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import style from './Versus.module.scss'
import WLResults from './WLResults'

import versusApi, { VsResult } from 'api/versus'
import Vertical from 'components/layout/Vertical'
import Loader from 'components/Loader/Loader'
import { getHintsTable } from 'data/gto-client'
import Action from 'domain/action'
import Board from 'domain/board'
import Hand from 'domain/hand'
import { extractRange } from 'domain/hintTable'
import Position from 'domain/position'

interface Props {
  hero: Position
  hand: Hand
  board: Board
  actions: ReadonlyArray<Action>
}

const Versus = ({ hero, hand, board, actions }: Props) => {
  const [range, setRange] = useState<ReadonlyArray<string>>([])

  useEffect(() => {
    const effect = async () => {
      const vilainLastAction = actions.reduce(
        (lastAction: Action | null, cur) => (cur.position !== hero ? cur : lastAction),
        null
      )
      if (!vilainLastAction) {
        setRange([])
        return
      }
      const hintsTable = await getHintsTable(vilainLastAction.move, vilainLastAction.position, hero)
      if (!hintsTable) {
        setRange([])
        return
      }

      setRange(extractRange(hintsTable))
    }
    effect().catch(() => {
      // FIXME: add logger
    })
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

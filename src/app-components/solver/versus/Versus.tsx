'use client'

import { useQuery } from '@tanstack/react-query'

import style from './Versus.module.scss'
import WLResults from './WLResults'

import { config as fetchConfig, Config } from 'api/config'
import versusApi, { VsResult } from 'api/versus'
import Vertical from 'components/layout/Vertical'
import Loader from 'components/Loader/Loader'
import Board from 'domain/board'
import { Combo, isComboType, RatioRange } from 'domain/combo'
import Hand from 'domain/hand'

interface Props {
  hand: Hand
  board: Board
  vilainRange: RatioRange
}

const Versus = ({ hand, board, vilainRange: vr }: Props) => {
  const { data: config } = useQuery<Config>({
    queryKey: ['config'],
    queryFn: fetchConfig,
    initialData: { DISABLE_PREFLOP_VERSUS_RANGE: true },
  })

  const vilainRange: ReadonlyArray<Combo> = Object.entries(vr)
    .filter(([, v]) => v > 0)
    .map(([k]) => k)
    .filter(isComboType)

  const {
    data: resultPreflop = null,
    isLoading: isLoadingPreflop,
    isError: isErrorPreflop,
  } = useQuery<VsResult | null>({
    queryKey: ['versus', 'preflop', vilainRange, hand, board],
    queryFn: () => versusApi.rangePreflop(vilainRange || [], hand),
    enabled:
      !config.DISABLE_PREFLOP_VERSUS_RANGE && !!vilainRange?.length && hand.isComplete() && board.cards.length === 0,
  })

  const {
    data: resultPostFlop = null,
    isLoading: isLoadingPostflop,
    isError: isErrorPostflop,
  } = useQuery<VsResult | null>({
    queryKey: ['versus', 'postflop', vilainRange, hand, board],
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

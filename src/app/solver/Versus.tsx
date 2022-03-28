import Hand from 'domain/hand'
import Board from 'domain/board'
import Action from 'domain/action'
import { getHintsTable } from 'data/gto'
import Position from 'domain/position'
import { useMemo } from 'react'
import { getRange } from 'domain/hintTable'
import { useQuery } from 'react-query'
import versusApi, { VsResult } from '../../api/versus'

interface Props {
  hero: Position
  hand: Hand
  board: Board
  actions: ReadonlyArray<Action>
}

const Versus: React.FC<Props> = ({ hero, hand, board, actions }) => {
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

  const { data: resultPreflop = null } = useQuery<VsResult | null>(
    [range, hand, board, 'preflop'],
    () => versusApi.rangePreflop(range || [], hand),
    { enabled: !!range?.length && hand.isComplete() && board.cards.length === 0 }
  )

  const { data: resultPostFlop = null } = useQuery<VsResult | null>(
    [range, hand, board, 'postflop'],
    () => versusApi.range(range || [], hand, board),
    { enabled: !!range?.length && hand.isComplete() && board.cards.length > 0 }
  )

  return (
    <div>
      {resultPreflop ? (
        <div>
          PREFLOP
          <div>WIN: {resultPreflop.winner.toFixed(2)} %</div>
          <div>LOSE: {resultPreflop.lose.toFixed(2)} %</div>
          <div>DRAW:{resultPreflop.draw.toFixed(2)} %</div>
          <div>TOTAL: {resultPreflop.total}</div>
        </div>
      ) : null}

      {resultPostFlop ? (
        <div>
          POSTFLOP
          <div>WIN: {resultPostFlop.winner.toFixed(2)} %</div>
          <div>LOSE: {resultPostFlop.lose.toFixed(2)} %</div>
          <div>DRAW:{resultPostFlop.draw.toFixed(2)} %</div>
          <div>TOTAL: {resultPostFlop.total}</div>
        </div>
      ) : null}
    </div>
  )
}

export default Versus

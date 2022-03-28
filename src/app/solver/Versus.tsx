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

  const { data: result = null } = useQuery<VsResult | null>(
    [range, hand, board],
    () => versusApi.range(range || [], hand, board),
    { enabled: !!range?.length && hand.isComplete() }
  )

  return result ? (
    <div>
      <div>WIN: {result.winner.toFixed(2)} %</div>
      <div>LOSE: {result.lose.toFixed(2)} %</div>
      <div>DRAW:{result.draw.toFixed(2)} %</div>
      <div>TOTAL: {result.total}</div>
    </div>
  ) : null
}

export default Versus

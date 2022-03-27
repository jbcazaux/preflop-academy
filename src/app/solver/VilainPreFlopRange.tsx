import Vertical from 'components/layout/Vertical'
import React, { useEffect, useMemo, useState } from 'react'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import { getHintsTable } from 'data/gto'
import Ranges from 'app/ranges/Ranges'
import Position, {positionsNames} from 'domain/position'
import Move from 'domain/move'
import HintTable from 'domain/hintTable'
import Action from 'components/Action'

interface Props {
  buttonPosition: number
  raisePositions: ReadonlyArray<number>
}

const VilainPreflopRange: React.FC<Props> = ({ buttonPosition, raisePositions }) => {
  const [vilainHintsTable, setVilainHintsTable] = useState<HintTable | null>(null)
  const [vilainAction, setVilainAction] = useState<Move | null>(null)
  const [vilainPosition, setVilainPosition] = useState<Position | null>(null)

  const hero = useMemo<Position>(() => getHeroPosition(buttonPosition), [buttonPosition])
  const raises = useMemo<ReadonlyArray<Position>>(
    () => raisePositions.map(p => getVilainPosition(p, buttonPosition)),
    [buttonPosition, raisePositions]
  )

  useEffect(() => {
    if (raises.length === 0 || (raises.length === 1 && raises[0] === hero)) {
      setVilainHintsTable(null)
      setVilainAction(null)
      setVilainPosition(null)
      return
    }

    if (raises.length === 1) {
      // and initial raiser !== hero
      const initialRaiser = raises[0]

      setVilainHintsTable(getHintsTable(Move.OPEN, initialRaiser, Position.ANY))
      setVilainAction(Move.OPEN)
      setVilainPosition(initialRaiser)
    }

    if (raises.length === 2) {
      // hero == initial raiser
      const initialRaiser = raises[0]
      const lastRaiser = raises[1]
      if (hero === initialRaiser) {
        setVilainHintsTable(getHintsTable(Move._3BET, lastRaiser, hero))
        setVilainAction(Move._3BET)
        setVilainPosition(lastRaiser)
      } else {
        // hero !== initial raiser
        setVilainHintsTable(getHintsTable(Move.OPEN, initialRaiser, Position.ANY))
        setVilainAction(Move.OPEN)
        setVilainPosition(initialRaiser)
      }
    }

    if (raises.length === 3) {
      const _3betRaiser = raises[1]
      const lastRaiser = raises[2]

      if (lastRaiser !== hero) {
        setVilainHintsTable(getHintsTable(Move._4BET, lastRaiser, _3betRaiser))
        setVilainAction(Move._4BET)
        setVilainPosition(lastRaiser)
      }
    }
  }, [hero, raises])

  return (
    <Vertical>
      <Action>{vilainAction} {vilainPosition !== null && <>@ {positionsNames[vilainPosition ]}</>}</Action>
      {vilainHintsTable && <Ranges hintsTable={vilainHintsTable} hintsTableName={vilainAction || ''} />}
    </Vertical>
  )
}

export default VilainPreflopRange

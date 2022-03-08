import Vertical from 'components/layout/Vertical'
import Hand from 'domain/hand'
import React, { useEffect, useMemo, useState } from 'react'
import getVilainPosition, { getHeroPosition } from 'utils/playerPosition'
import { getHintsTable } from 'data/gto'
import Ranges from 'app/ranges/Ranges'
import Gto from 'app/Gto'
import Position from 'domain/position'
import Move from 'domain/move'
import HintTable from 'domain/hintTable'

interface Props {
  hand: Hand
  buttonPosition: number
  raisePositions: ReadonlyArray<number>
}

const PreFlopSolver: React.FC<Props> = ({ hand, buttonPosition, raisePositions }) => {
  const [hintsTable, setHintsTable] = useState<HintTable | null>(null)
  const [hintsTableName, setHintsTableName] = useState<string>('- No Table To display -')

  const hero = useMemo<Position>(() => getHeroPosition(buttonPosition), [buttonPosition])
  const raises = useMemo<ReadonlyArray<Position>>(
    () => raisePositions.map(p => getVilainPosition(p, buttonPosition)),
    [buttonPosition, raisePositions]
  )

  useEffect(() => {
    if (raises.length === 0) {
      setHintsTable(getHintsTable(Move.OPEN, hero, Position.ANY))
      setHintsTableName('OPEN')
      return
    }

    if (raises.length === 1) {
      const initialRaiser = raises[0]
      if (!hand.isComplete()) {
        setHintsTable(getHintsTable(Move.CALL, hero, initialRaiser))
        setHintsTableName('CALL')
        return
      }
      const _3BetHintsTable = getHintsTable(Move._3BET, hero, initialRaiser)
      const [x, y] = hand.xyInRangeTable()
      if (_3BetHintsTable?.[x][y]) {
        setHintsTable(_3BetHintsTable)
        setHintsTableName('3 BET')
        return
      }

      setHintsTable(getHintsTable(Move.CALL, hero, initialRaiser))
      setHintsTableName('CALL')
      return
    }

    if (raises.length === 2) {
      const lastRaiser = raises[raises.length - 1]
      if (!hand.isComplete()) {
        setHintsTable(getHintsTable(Move.CALL3BET, hero, lastRaiser))
        setHintsTableName('CALL 3 BET')
        return
      }

      const _4BetHintsTable = getHintsTable(Move._4BET, hero, lastRaiser)
      const [x, y] = hand.xyInRangeTable()
      if (_4BetHintsTable?.[x][y]) {
        setHintsTable(_4BetHintsTable)
        setHintsTableName('4 BET')
        return
      }

      const call3BetsHintsTable = getHintsTable(Move.CALL3BET, hero, lastRaiser)
      setHintsTable(call3BetsHintsTable || getHintsTable(Move.OPEN, hero, Position.ANY))
      setHintsTableName(call3BetsHintsTable ? 'CALL 3 BET' : 'OPEN')
    }
  }, [hand, hero, raises])

  return (
    <Vertical>
      <Gto hero={hero} hand={hand} raisePositions={raises} />
      {hintsTable && <Ranges hintsTable={hintsTable} hand={hand} hintsTableName={hintsTableName} />}
    </Vertical>
  )
}

export default PreFlopSolver

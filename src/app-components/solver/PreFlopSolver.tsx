'use client'

import { useEffect, useMemo, useState } from 'react'

import ImprovementCards from './improvements/ImprovementCards'
import style from './PreflopSolver.module.scss'
import Versus from './versus/Versus'
import VilainPreflopRange from './VilainPreFlopRange'

import Gto from 'app-components/Gto'
import Vertical from 'components/layout/Vertical'
import { getHintsTable } from 'data/gto-client'
import Action from 'domain/action'
import Board from 'domain/board'
import ButtonPosition from 'domain/buttonPosition'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition } from 'domain/position'
import Ranges from 'src/app-components/ranges/Ranges'

interface Props {
  hand: Hand
  board: Board
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
  displayStats?: boolean
}

const PreFlopSolver = ({ hand, buttonPosition, actions, board, displayStats = true }: Props) => {
  const [hintsTable, setHintsTable] = useState<HintTable | null>(null)
  const [hintsTableName, setHintsTableName] = useState<string>('- No Table To display -')

  const hero = useMemo<Position>(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    const effect = async () => {
      if (actions.length === 0 || (actions.length === 1 && actions[0].position === hero)) {
        const openHintTable = await getHintsTable(Move.OPEN, hero)
        setHintsTable(openHintTable)
        setHintsTableName('OPEN')
        return
      }

      if (actions.length === 1) {
        // and initial raiser !== hero
        const initialRaiser = actions[0].position

        if (!hand.isComplete()) {
          const hintTable = await getHintsTable(Move.CALL, hero, initialRaiser)
          setHintsTable(hintTable)
          setHintsTableName('CALL')
          return
        }
        const _3BetHintsTable = await getHintsTable(Move._3BET, hero, initialRaiser)
        const [x, y] = hand.xyInRangeTable()
        if (_3BetHintsTable?.[x][y]) {
          setHintsTable(_3BetHintsTable)
          setHintsTableName('3 BET')
          return
        }

        const hintTable = await getHintsTable(Move.CALL, hero, initialRaiser)
        setHintsTable(hintTable)
        setHintsTableName('CALL')
      }

      if (actions.length === 2) {
        // hero == initial raiser
        const initialRaiser = actions[0].position
        const lastRaiser = actions[1].position
        if (hero === initialRaiser) {
          if (!hand.isComplete()) {
            const hintTable = await getHintsTable(Move.CALL3BET, hero, lastRaiser)
            setHintsTable(hintTable)
            setHintsTableName('CALL 3 BET')
            return
          }

          const _4BetHintsTable = await getHintsTable(Move._4BET, hero, lastRaiser)
          const [x, y] = hand.xyInRangeTable()
          if (_4BetHintsTable?.[x][y]) {
            setHintsTable(_4BetHintsTable)
            setHintsTableName('4 BET')
            return
          }

          const call3BetsHintsTable = await getHintsTable(Move.CALL3BET, hero, lastRaiser)
          setHintsTable(call3BetsHintsTable)
          setHintsTableName(call3BetsHintsTable ? 'CALL 3 BET' : 'N/A')
        } else {
          const hintTable = await getHintsTable(Move._3BET, lastRaiser, initialRaiser)
          // hero !== initial raiser
          setHintsTable(hintTable)
          setHintsTableName(Move._3BET)
        }
      }
    }
    effect().catch(() => {
      // FIXME: add logger
    })
  }, [hand, hero, actions])

  return (
    <div className={style.container}>
      <Vertical>
        <div className={style.wrap}>
          <Vertical>
            <Gto hero={hero} hand={hand} actions={actions} />
            {hintsTable && <Ranges hintsTable={hintsTable} hand={hand} hintsTableName={hintsTableName} />}
          </Vertical>
          <VilainPreflopRange actions={actions} buttonPosition={buttonPosition} />
        </div>
      </Vertical>
      {displayStats && (
        <Vertical>
          <Versus hand={hand} board={board} actions={actions} hero={hero} />
          <ImprovementCards hand={hand} board={board} />
        </Vertical>
      )}
    </div>
  )
}

export default PreFlopSolver

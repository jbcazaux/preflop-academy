'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import style from './PreflopSolver.module.scss'
import VilainPreflopRange from './VilainPreFlopRange'

import { fetchHintTable } from 'api/hintTables'
import Gto from 'app-components/Gto'
import Ranges from 'app-components/ranges/Ranges'
import Vertical from 'components/layout/Vertical'
import Action from 'domain/action'
import Board from 'domain/board'
import ButtonPosition from 'domain/buttonPosition'
import { Range } from 'domain/combo'
import Hand from 'domain/hand'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition } from 'domain/position'

interface Props {
  hand: Hand
  board: Board
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
  onVilainRangeUpdate?: (r: Range) => void
  children?: React.ReactNode
}

const PreFlopSolver = ({ hand, buttonPosition, actions, onVilainRangeUpdate, children }: Props) => {
  const [hintsTable, setHintsTable] = useState<HintTable | null>(null)
  const [hintsTableName, setHintsTableName] = useState<string>('- No Table To display -')
  const queryClient = useQueryClient()
  const hero = useMemo<Position>(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    const effect = async () => {
      if (actions.length === 0 || (actions.length === 1 && actions[0].position === hero)) {
        const openHintTable = await queryClient.fetchQuery({
          queryKey: ['hintsTable', Move.OPEN, hero],
          queryFn: () => fetchHintTable(Move.OPEN, hero),
        })
        setHintsTable(openHintTable)
        setHintsTableName('OPEN')
        return
      }

      if (actions.length === 1) {
        // and initial raiser !== hero
        const initialRaiser = actions[0].position

        if (!hand.isComplete()) {
          const hintTable = await queryClient.fetchQuery({
            queryKey: ['hintsTable', Move.CALL, hero, initialRaiser],
            queryFn: () => fetchHintTable(Move.CALL, hero, initialRaiser),
          })
          setHintsTable(hintTable)
          setHintsTableName('CALL')
          return
        }
        const _3BetHintsTable = await queryClient.fetchQuery({
          queryKey: ['hintsTable', Move._3BET, hero, initialRaiser],
          queryFn: () => fetchHintTable(Move._3BET, hero, initialRaiser),
        })
        const [x, y] = hand.xyInRangeTable()
        if (_3BetHintsTable?.[x][y]) {
          setHintsTable(_3BetHintsTable)
          setHintsTableName('3 BET')
          return
        }

        const hintTable = await queryClient.fetchQuery({
          queryKey: ['hintsTable', Move.CALL, hero, initialRaiser],
          queryFn: () => fetchHintTable(Move.CALL, hero, initialRaiser),
        })
        setHintsTable(hintTable)
        setHintsTableName('CALL')
      }

      if (actions.length === 2) {
        // hero == initial raiser
        const initialRaiser = actions[0].position
        const lastRaiser = actions[1].position
        if (hero === initialRaiser) {
          if (!hand.isComplete()) {
            const hintTable = await queryClient.fetchQuery({
              queryKey: ['hintsTable', Move.CALL3BET, hero, lastRaiser],
              queryFn: () => fetchHintTable(Move.CALL3BET, hero, lastRaiser),
            })

            setHintsTable(hintTable)
            setHintsTableName('CALL 3 BET')
            return
          }

          const _4BetHintsTable = await queryClient.fetchQuery({
            queryKey: ['hintsTable', Move._4BET, hero, lastRaiser],
            queryFn: () => fetchHintTable(Move._4BET, hero, lastRaiser),
          })
          const [x, y] = hand.xyInRangeTable()
          if (_4BetHintsTable?.[x][y]) {
            setHintsTable(_4BetHintsTable)
            setHintsTableName('4 BET')
            return
          }

          const call3BetsHintsTable = await queryClient.fetchQuery({
            queryKey: ['hintsTable', Move.CALL3BET, hero, lastRaiser],
            queryFn: () => fetchHintTable(Move.CALL3BET, hero, lastRaiser),
          })
          setHintsTable(call3BetsHintsTable)
          setHintsTableName(call3BetsHintsTable ? 'CALL 3 BET' : 'N/A')
        } else {
          // hero !== initial raiser
          const hintTable = await queryClient.fetchQuery({
            queryKey: ['hintsTable', Move._3BET, lastRaiser, initialRaiser],
            queryFn: () => fetchHintTable(Move._3BET, lastRaiser, initialRaiser),
          })
          setHintsTable(hintTable)
          setHintsTableName(Move._3BET)
        }
      }
    }
    effect().catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
    })
  }, [hand, hero, actions, queryClient])

  return (
    <div className={style.container}>
      <Vertical>
        <div className={style.wrap}>
          <VilainPreflopRange
            actions={actions}
            buttonPosition={buttonPosition}
            onVilainRangeUpdate={onVilainRangeUpdate}
          />
          <Vertical>
            <Gto hero={hero} hand={hand} actions={actions} />
            {hintsTable && <Ranges hintsTable={hintsTable} hand={hand} hintsTableName={hintsTableName} />}
          </Vertical>
        </div>
      </Vertical>
      {children}
    </div>
  )
}

export default PreFlopSolver

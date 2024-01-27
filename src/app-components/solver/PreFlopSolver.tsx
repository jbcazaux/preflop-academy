'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import style from './PreflopSolver.module.scss'
import VilainPreflopRange from './VilainPreFlopRange'

import { fetchRange } from 'api/ranges'
import Gto from 'app-components/Gto'
import Ranges from 'app-components/ranges/Ranges'
import Vertical from 'components/layout/Vertical'
import Action from 'domain/action'
import Board from 'domain/board'
import ButtonPosition from 'domain/buttonPosition'
import { RatioRange } from 'domain/combo'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position, { heroPositionFromButtonPosition } from 'domain/position'

interface Props {
  hand: Hand
  board: Board
  buttonPosition: ButtonPosition
  actions: ReadonlyArray<Action>
  onVilainRangeUpdate?: (r: RatioRange) => void
  children?: React.ReactNode
}

const PreFlopSolver = ({ hand, buttonPosition, actions, onVilainRangeUpdate, children }: Props) => {
  const [range, setRange] = useState<RatioRange>({})
  const [hintsTableName, setHintsTableName] = useState<string>('- No Table To display -')
  const queryClient = useQueryClient()
  const hero = useMemo<Position>(() => heroPositionFromButtonPosition(buttonPosition), [buttonPosition])

  useEffect(() => {
    const effect = async () => {
      if (actions.length === 0 || (actions.length === 1 && actions[0].position === hero)) {
        const openRange = await queryClient.fetchQuery({
          queryKey: ['range', Move.OPEN, hero],
          queryFn: () => fetchRange(Move.OPEN, hero),
        })
        setRange(openRange)
        setHintsTableName('OPEN')
        return
      }

      if (actions.length === 1) {
        // and initial raiser !== hero
        const initialRaiser = actions[0].position

        if (!hand.isComplete()) {
          const callRange = await queryClient.fetchQuery({
            queryKey: ['range', Move.CALL, hero, initialRaiser],
            queryFn: () => fetchRange(Move.CALL, hero, initialRaiser),
          })
          setRange(callRange)
          setHintsTableName('CALL')
          return
        }
        const _3BetRange = await queryClient.fetchQuery({
          queryKey: ['range', Move._3BET, hero, initialRaiser],
          queryFn: () => fetchRange(Move._3BET, hero, initialRaiser),
        })
        const combo = hand.asCombo()
        if (_3BetRange[combo]) {
          setRange(_3BetRange)
          setHintsTableName('3 BET')
          return
        }

        const callRange = await queryClient.fetchQuery({
          queryKey: ['range', Move.CALL, hero, initialRaiser],
          queryFn: () => fetchRange(Move.CALL, hero, initialRaiser),
        })
        setRange(callRange)
        setHintsTableName('CALL')
      }

      if (actions.length === 2) {
        // hero == initial raiser
        const initialRaiser = actions[0].position
        const lastRaiser = actions[1].position
        if (hero === initialRaiser) {
          if (!hand.isComplete()) {
            const call3BetRange = await queryClient.fetchQuery({
              queryKey: ['range', Move.CALL3BET, hero, lastRaiser],
              queryFn: () => fetchRange(Move.CALL3BET, hero, lastRaiser),
            })

            setRange(call3BetRange)
            setHintsTableName('CALL 3 BET')
            return
          }

          const _4BetRange = await queryClient.fetchQuery({
            queryKey: ['range', Move._4BET, hero, lastRaiser],
            queryFn: () => fetchRange(Move._4BET, hero, lastRaiser),
          })
          const combo = hand.asCombo()
          if (_4BetRange[combo]) {
            setRange(_4BetRange)
            setHintsTableName('4 BET')
            return
          }

          const call3BetRange = await queryClient.fetchQuery({
            queryKey: ['range', Move.CALL3BET, hero, lastRaiser],
            queryFn: () => fetchRange(Move.CALL3BET, hero, lastRaiser),
          })
          setRange(call3BetRange)
          setHintsTableName(call3BetRange ? 'CALL 3 BET' : 'N/A')
        } else {
          // hero !== initial raiser
          const _3betRange = await queryClient.fetchQuery({
            queryKey: ['range', Move._3BET, lastRaiser, initialRaiser],
            queryFn: () => fetchRange(Move._3BET, lastRaiser, initialRaiser),
          })
          setRange(_3betRange)
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
            <Ranges range={range} hand={hand} hintsTableName={hintsTableName} />
          </Vertical>
        </div>
      </Vertical>
      {children}
    </div>
  )
}

export default PreFlopSolver

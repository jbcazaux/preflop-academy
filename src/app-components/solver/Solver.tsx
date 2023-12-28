'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Card as CardObject } from 'domain/card'
import PokerTable from 'components/PokerTable/PokerTable'
import Hand from 'domain/hand'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import useWindowSize from 'components/useWindowSize'
import Tabs from 'components/Tabs/Tabs'
import Tab from 'components/Tabs/Tab'
import Action from 'domain/action'
import Board from 'domain/board'
import ButtonPosition from 'domain/buttonPosition'
import { positionBySeatNumberAndButtonPosition } from 'domain/position'
import style from './Solver.module.scss'
import HandDisplay from 'components/HandDisplay'
import actionsFlow from './actionsFlow'
import PreFlopSolver from './PreFlopSolver'
import PushFoldSolver from './PushFoldSolver'
import Deck from 'src/app2/Deck'

const Solver = () => {
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [board, setBoard] = useState<Board>(Board.newBoard)
  const solverContainerRef = useRef<HTMLDivElement>(null)

  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const windowSize = useWindowSize()
  // const t = useTranslations()

  const getPokerTableWidth = () => {
    if (solverContainerRef.current) {
      const boundingRect = solverContainerRef.current.getBoundingClientRect()
      return boundingRect.width
    }
    return windowSize.width
  }

  const onCardClick = useCallback(
    (card: CardObject) => {
      if (hand.contains(card)) {
        setHand(prev => prev.addCard(card))
      } else if (board.contains(card)) {
        setBoard(prev => prev.addCard(card))
      } else if (!hand.isComplete()) {
        setHand(prev => prev.addCard(card))
      } else {
        setBoard(prev => prev.addCard(card))
      }
    },
    [board, hand]
  )

  const onAction = useCallback(
    (seatPosition: number) => {
      setActions(prev => actionsFlow(prev, positionBySeatNumberAndButtonPosition(seatPosition, buttonPosition)))
    },
    [buttonPosition]
  )

  useEffect(() => {
    setHand(Hand.newHand)
    setBoard(Board.newBoard)
    setActions([])
  }, [buttonPosition])

  return (
    <Horizontal className={style.wrap}>
      <Vertical ref={solverContainerRef}>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={setButtonPosition}
          actions={actions}
          addRaisePosition={onAction}
          board={board}
          width={getPokerTableWidth()}
        />
        <HandDisplay hand={hand} />
        <Deck onClick={onCardClick} hand={hand} board={board} />
      </Vertical>
      <Horizontal className={style.tables}>
        <Tabs>
          <Tab title={'solver.moreThan20bb'.toUpperCase()}>
            <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actions} board={board} />
          </Tab>
          <Tab title="PUSH OR FOLD">
            <PushFoldSolver hand={hand} buttonPosition={buttonPosition} />
          </Tab>
        </Tabs>
      </Horizontal>
    </Horizontal>
  )
}

export default Solver

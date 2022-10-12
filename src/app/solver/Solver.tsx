import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card as CardObject } from 'domain/card'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import PushFoldSolver from 'app/solver/PushFoldSolver'
import useWindowSize from 'components/useWindowSize'
import PreFlopSolver from 'app/solver/PreFlopSolver'
import Tabs from 'components/Tabs/Tabs'
import Tab from 'components/Tabs/Tab'
import Deck from 'app/Deck'
import Action from 'domain/action'
import actionsFlow from 'app/solver/actionsFlow'
import Board from 'domain/board'
import getVilainPosition from 'utils/playerPosition'
import ButtonPosition from 'domain/buttonPosition'

const Solver = () => {
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [board, setBoard] = useState<Board>(Board.newBoard)

  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const windowSize = useWindowSize()

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

  const onAction = useCallback((actionPosition: number) => {
    setActions(prev => actionsFlow(prev, actionPosition))
  }, [])

  const actionWithPositions = useMemo(
    () => actions.map(a => new Action(getVilainPosition(a.position, buttonPosition), a.move)),
    [actions, buttonPosition]
  )

  useEffect(() => {
    setHand(Hand.newHand)
    setBoard(Board.newBoard)
    setActions([])
  }, [buttonPosition])

  const width = Math.min(500, Math.max(250, (windowSize.width * 2) / 3))

  return (
    <Horizontal>
      <Vertical>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={setButtonPosition}
          actions={actions}
          addRaisePosition={onAction}
          width={width}
        />
        <Deck onClick={onCardClick} hand={hand} board={board} />
      </Vertical>
      <Horizontal style={{ flex: 2 }}>
        <Tabs>
          <Tab title="MORE THAN 20 Bb">
            <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actionWithPositions} board={board} />
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

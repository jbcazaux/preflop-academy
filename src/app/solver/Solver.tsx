import { useCallback, useEffect, useState } from 'react'
import { Card as CardObject } from 'domain/card'
import PokerTable from 'components/PokerTable/PokerTable'
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
import ButtonPosition from 'domain/buttonPosition'
import { positionBySeatNumberAndButtonPosition } from 'domain/position'
import { useTranslation } from 'react-i18next'

const Solver = () => {
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [board, setBoard] = useState<Board>(Board.newBoard)

  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const windowSize = useWindowSize()
  const { t } = useTranslation()

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
    <Horizontal>
      <Vertical>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={setButtonPosition}
          actions={actions}
          addRaisePosition={onAction}
          board={board}
          width={windowSize.width - 380 - 150}
        />
        <Deck onClick={onCardClick} hand={hand} board={board} />
      </Vertical>
      <Horizontal style={{ flex: 2 }}>
        <Tabs>
          <Tab title={t('solver.moreThan20bb').toUpperCase()}>
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

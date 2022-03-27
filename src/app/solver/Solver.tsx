import React, {useCallback, useEffect, useState} from 'react'
import {Card as CardObject} from 'domain/card'
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

const Solver: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)

  const [actions, setActions] = useState<ReadonlyArray<Action>>([])
  const windowSize = useWindowSize()

  const onCardClick = useCallback((card: CardObject) => {
    setHand(prev => prev.addCard(card))
  }, [])

  const onAction = useCallback(
    (raisePosition: number) => {
      setActions(prev => actionsFlow(prev, raisePosition))
    },
    []
  )

  useEffect(() => {
    setHand(Hand.newHand)
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
        <Deck onClick={onCardClick} hand={hand} />
      </Vertical>
      <Tabs>
        <Tab title="MORE THAN 20 Bb">
          <PreFlopSolver hand={hand} buttonPosition={buttonPosition} actions={actions} />
        </Tab>
        <Tab title="PUSH OR FOLD">
          <PushFoldSolver hand={hand} buttonPosition={buttonPosition} />
        </Tab>
      </Tabs>
    </Horizontal>
  )
}

export default Solver

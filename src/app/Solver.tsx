import React, { useCallback, useEffect, useState } from 'react'
import { Card as CardObject } from 'domain/card'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import PushFoldSolver from 'app/PushFoldSolver'
import useWindowSize from 'components/useWindowSize'
import PreFlopSolver from 'app/PreFlopSolver'
import Tabs from 'components/Tabs/Tabs'
import Tab from 'components/Tabs/Tab'
import Deck from 'app/Deck'

const Solver: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)

  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
  const windowSize = useWindowSize()

  const onCardClick = useCallback((card: CardObject) => {
    setHand(prev => prev.addCard(card))
  }, [])

  const onRaise = useCallback(
    (raisePosition: number) => {
      setRaisePositions(prev => {
        if (raisePositions.length && raisePositions[raisePositions.length - 1] === raisePosition) {
          return prev.filter(rp => rp !== raisePosition)
        }
        if (raisePositions.length === 1 && raisePositions[0] !== 0 && raisePosition !== 0) {
          return prev
        }
        if (raisePositions.length >= 2 && !raisePositions.includes(raisePosition)) {
          return prev
        }
        return prev.concat(raisePosition)
      })
    },
    [raisePositions]
  )

  useEffect(() => {
    setHand(Hand.newHand)
    setRaisePositions([])
  }, [buttonPosition])

  const width = Math.min(500, Math.max(250, (windowSize.width * 2) / 3))

  return (
    <Horizontal>
      <Vertical>
        <PokerTable
          buttonPosition={buttonPosition}
          onButtonChange={setButtonPosition}
          raisePositions={raisePositions}
          addRaisePosition={onRaise}
          width={width}
        />
        <Deck onClick={onCardClick} hand={hand} />
      </Vertical>
      <Tabs>
        <Tab title="MORE THAN 20 Bb">
          <PreFlopSolver hand={hand} buttonPosition={buttonPosition} raisePositions={raisePositions} />
        </Tab>
        <Tab title="PUSH OR FOLD">
          <PushFoldSolver hand={hand} buttonPosition={buttonPosition} />
        </Tab>
      </Tabs>
    </Horizontal>
  )
}

export default Solver

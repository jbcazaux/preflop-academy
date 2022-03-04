import Card from 'components/Card'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { Card as CardObject, deck } from 'domain/cards'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import Vertical from 'components/layout/Vertical'
import Horizontal from 'components/layout/Horizontal'
import PushFoldSolver from 'app/PushFoldSolver'
import useWindowSize from 'components/useWindowSize'
import PreFlopSolver from 'app/PreFlopSolver'
import Tabs from 'components/Tabs/Tabs'
import Tab from 'components/Tabs/Tab'

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
`

const Solver: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [init, setInit] = useState<boolean>(true)
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
        return prev.concat(raisePosition)
      })
    },
    [raisePositions]
  )

  useLayoutEffect(() => {
    setInit(false)
  }, [])

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
        <Deck>
          {deck.map(colorDeck => (
            <Color key={colorDeck[0].color}>
              {colorDeck.map(card => (
                <Card
                  key={card.value}
                  card={card}
                  onClick={onCardClick}
                  selected={init || (!hand.isEmpty() && hand.contains(card))}
                  mobile={windowSize.width <= 470}
                />
              ))}
            </Color>
          ))}
        </Deck>
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

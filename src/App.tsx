import Card from 'components/Card'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { deck, Card as CardObject } from './domain/cards'
import PokerTable from 'components/PokerTable'
import Hand from './domain/hand'
import Gto from './components/Gto'
import useWindowResize from './useWindowResize'

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
`

const App: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [init, setInit] = useState<boolean>(true)
  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
  const size = useWindowResize()

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

  return (
    <>
      <PokerTable
        buttonPosition={buttonPosition}
        onButtonChange={setButtonPosition}
        raisePositions={raisePositions}
        addRaisePosition={onRaise}
        width={Math.max(250, (size.width * 2) / 3)}
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
              />
            ))}
          </Color>
        ))}
      </Deck>
      <Gto buttonPostion={buttonPosition} hand={hand} raisePositions={raisePositions} />
    </>
  )
}

export default App

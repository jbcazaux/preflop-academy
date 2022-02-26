import Card from 'components/Card'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { deck, Card as CardObject } from 'domain/cards'
import PokerTable from 'components/PokerTable'
import Hand from 'domain/hand'
import Gto from 'components/Gto'
import useWindowSize from '../useWindowSize'

const Deck = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
`

const Training: React.VFC = () => {
  const [buttonPosition, setButtonPosition] = useState(0)
  const [hand, setHand] = useState<Hand>(Hand.newHand)
  const [init, setInit] = useState<boolean>(true)
  const [raisePositions, setRaisePositions] = useState<ReadonlyArray<number>>([])
  const windowSize = useWindowSize()

  const setRandomPlay = useCallback(() => {
      setHand(hand.random())
      setButtonPosition(Math.floor(Math.random() * 6))
      setRaisePositions([])

  }, [hand])


  const onCardClick = useCallback((card: CardObject) => {
    // do nothing
  }, [])

  const onRaise = useCallback(
    (raisePosition: number) => {
        // do nothing
    },
    []
  )

  useLayoutEffect(() => {
    setInit(false)
  }, [])

  useEffect(() => {
      setRandomPlay()
  }, [setRandomPlay])

  const width = Math.min(500, Math.max(250, (windowSize.width * 2) / 3))

  return (
    <>
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
      <Gto buttonPostion={buttonPosition} hand={hand} raisePositions={raisePositions} />
    </>
  )
}

export default Training

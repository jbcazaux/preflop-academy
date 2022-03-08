import { Card as CardObject, deck } from 'domain/cards'
import Card from 'components/Card'
import React from 'react'
import styled from 'styled-components'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'

const DeckContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Color = styled.div`
  display: flex;
  flex-direction: row;
`

interface Props {
  onClick: (card: CardObject) => void
  hand: Hand
}

const Deck: React.FC<Props> = ({ onClick, hand }) => {
  const windowSize = useWindowSize()

  return (
    <DeckContainer>
      {deck.map(colorDeck => (
        <Color key={colorDeck[0].color}>
          {colorDeck.map(card => (
            <Card
              key={card.value}
              card={card}
              onClick={onClick}
              selected={!hand.isEmpty() && hand.contains(card)}
              mobile={windowSize.width <= 470}
            />
          ))}
        </Color>
      ))}
    </DeckContainer>
  )
}

export default Deck

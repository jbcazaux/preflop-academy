import { Card, deck } from 'domain/card'
import CardComponent from 'components/Card'
import React from 'react'
import styled from 'styled-components'
import Hand from 'domain/hand'
import useWindowSize from 'components/useWindowSize'
import Horizontal from 'components/layout/Horizontal'
import Board from 'domain/board'

const DeckContainer = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  onClick: (card: Card) => void
  hand: Hand
  board: Board
}

const Deck: React.FC<Props> = ({ onClick, hand, board }) => {
  const windowSize = useWindowSize()

  return (
    <DeckContainer>
      {deck.map(colorDeck => (
        <Horizontal key={colorDeck[0].id}>
          {colorDeck.map(card => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={onClick}
              inHand={!hand.isEmpty() && hand.contains(card)}
              onBoard={board.contains(card)}
              mobile={windowSize.width <= 470}
            />
          ))}
        </Horizontal>
      ))}
    </DeckContainer>
  )
}

export default Deck

import { Card, deck } from 'domain/card'
import CardComponent from 'components/Card2'

import styled from 'styled-components'
import Hand from 'domain/hand'
import Horizontal from 'components/layout/Horizontal'
import Board from 'domain/board'

const DeckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  onClick: (card: Card) => void
  hand: Hand
  board: Board
}

const Deck = ({ onClick, hand, board }: Props) => (
  <DeckContainer>
    {deck.map(colorDeck => (
      <Horizontal key={colorDeck[0].id}>
        {colorDeck.map(card => (
          <CardComponent
            key={card.id}
            card={card}
            onClick={onClick}
            inHand={!hand.isEmpty() && hand.contains(card)}
            isOnBoard={board.contains(card)}
          />
        ))}
      </Horizontal>
    ))}
  </DeckContainer>
)

export default Deck

import style from './Deck.module.scss'

import CardComponent from 'components/Card'
import Horizontal from 'components/layout/Horizontal'
import Board from 'domain/board'
import { Card, deck } from 'domain/card'
import Hand from 'domain/hand'

interface Props {
  onClick: (card: Card) => void
  hand: Hand
  board: Board
}

const Deck = ({ onClick, hand, board }: Props) => (
  <div className={style.container}>
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
  </div>
)

export default Deck

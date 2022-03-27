import { Card } from './card'

export default class Board {
  constructor(readonly cards: ReadonlyArray<Card>) {}

  static newBoard = new Board([])

  addCard = (card: Card): Board => {
    if (this.contains(card)) {
      return new Board(this.cards.filter(c => !c.equals(card)))
    }
    if (this.cards.length < 5) {
      return new Board(this.cards.concat(card))
    }
    return this
  }

  contains = (card: Card): boolean => this.cards.some(c => c.equals(card))
}

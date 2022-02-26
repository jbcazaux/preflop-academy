import { Card } from './cards'

export default class Hand {
  constructor(readonly card1: Card | null, readonly card2: Card | null) {}

  static newHand = new Hand(null, null)

  addCard = (card: Card): Hand => {
    if (this.card1 === null) {
      return new Hand(card, this.card2)
    }
    if (this.card2 === null) {
      if (this.card1.equals(card)) {
        return Hand.newHand
      }
      return new Hand(this.card1, card)
    }
    if (this.card1.equals(card)) {
      return new Hand(this.card2, null)
    }
    if (this.card2.equals(card)) {
      return new Hand(this.card1, null)
    }
    return this
  }

  isSorted = (): boolean => this.card1?.color === this.card2?.color

  isEmpty = (): boolean => this.card1 === null && this.card2 === null

  contains = (card: Card): boolean => this.card1?.equals(card) || this.card2?.equals(card) || false

  isFull = (): boolean => this.card1 !== null && this.card2 !== null

  random = () : Hand => {
    const c1 = Card.random([])
    const c2 = Card.random([c1])
    return new Hand(c1, c2)
  }
}

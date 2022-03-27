import { Card } from './card'

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

  isSuited = (): boolean => (this.card1 && this.card2) ? (this.card1.id - this.card2.id) % 4 === 0 : false

  isEmpty = (): boolean => this.card1 === null && this.card2 === null

  isComplete = (): boolean => this.card1 !== null && this.card2 !== null

  contains = (card: Card): boolean => this.card1?.equals(card) || this.card2?.equals(card) || false

  sort = (): Hand => {
    if (!this.isComplete) {
      return new Hand(this.card1, this.card2)
    }
    return this.card2?.isBigger(this.card1) ? new Hand(this.card2, this.card1) : new Hand(this.card1, this.card2)
  }

  static random = (): Hand => {
    const c1 = Card.random([])
    const c2 = Card.random([c1])
    return new Hand(c1, c2)
  }

  xyInRangeTable = (): [number, number] => {
    const h = this.sort()
    if (!h.card1 || !h.card2) {
      throw new Error('Can not compute range if hand is not complete')
    }
    const x = - Math.floor((h.card1.id - 1) / 4) + 12
    const y = - Math.floor((h.card2.id - 1) / 4) + 12

    return this.isSuited() ? [x, y] : [y, x]
  }
}

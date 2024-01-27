import { Card } from './card'
import { Combo } from './combo'

import { throwError } from 'utils/throw-error'

export default class Hand {
  constructor(
    readonly card1: Card | null,
    readonly card2: Card | null
  ) {}

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

  isSuited = (): boolean => (this.card1 && this.card2 ? (this.card1.id - this.card2.id) % 4 === 0 : false)

  isPair = (): boolean => (this.card1 && this.card2 ? this.card1.value() === this.card2.value() : false)

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

  asCombo = (): Combo => {
    if (!this.isComplete || this.card1 === null || this.card2 === null) {
      return throwError('Cannot compute combo if hand is not complete')
    }

    if (this.isPair()) return `${this.card1.value()}${this.card2?.value()}` as Combo
    const pos = this.isPair() ? '' : this.isSuited() ? 's' : 'o'
    const c1c2 = this.card1.isBigger(this.card2)
      ? `${this.card1.value()}${this.card2.value()}`
      : `${this.card2.value()}${this.card1.value()}`

    return `${c1c2}${pos}` as Combo
  }

  xyInRangeTable = (): [number, number] => {
    const h = this.sort()
    if (!h.card1 || !h.card2) {
      throw new Error('Can not compute range if hand is not complete')
    }
    const x = -Math.floor((h.card1.id - 1) / 4) + 12
    const y = -Math.floor((h.card2.id - 1) / 4) + 12

    return this.isSuited() ? [x, y] : [y, x]
  }
}

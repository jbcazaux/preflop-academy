export class Card {
  constructor(readonly color: Color, readonly value: Value) {}

  static random = (not: ReadonlyArray<Card>): Card => {
    const randomCard = (): Card => {
      const value = Math.floor(Math.random() * 14)
      const color = colors[Math.floor(Math.random() * 2)]
      return new Card(color, value === 1 ? 0 : value)
    }

    let retriesLeft = 100
    let card: Card
    do {
      retriesLeft--
      card = randomCard()
    } while (not.some(c => c.equals(card)) && retriesLeft > 0)

    if (retriesLeft <= 0) {
      throw new Error('Cannot get a card')
    }

    return card
  }

  equals = (other: Card): boolean => this.color === other.color && this.value === other.value

  isBigger = (other: Card | null): boolean => {
    if (other === null) {
      return true
    }
    if (this.value === 0) {
      return other.value !== 0
    }
    if (other.value === 0) {
      return false
    }
    return this.value > other.value
  }
}

export const values: { [key: string]: Value } = {
  AS: 0,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
}
export type Value = number

export const colors = ['DIAMOND', 'CLUB'] as const
export type Color = typeof colors[number]

export const deck: ReadonlyArray<ReadonlyArray<Card>> = colors.map(color =>
  Object.values(values)
    .sort((a, b) => a - b)
    .map(value => new Card(color, value))
)

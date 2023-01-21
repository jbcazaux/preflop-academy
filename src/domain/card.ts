import { random as randomInt } from 'utils/random'

export class Card {
  constructor(readonly id: CardId) {}

  static random = (not: ReadonlyArray<Card>): Card => {
    const randomCard = (): Card => {
      const value = randomInt(1, 52)
      return new Card(value)
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

  equals = (other: Card): boolean => this.id === other.id

  isBigger = (other: Card | null): boolean => {
    if (other === null) {
      return true
    }
    return this.id > other.id
  }
}

export const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'AS']
export type CardId = number

const cards: Record<string, number> = {
  2: 1,
  3: 5,
  4: 9,
  5: 13,
  6: 17,
  7: 21,
  8: 25,
  9: 29,
  T: 33,
  J: 37,
  Q: 41,
  K: 45,
  A: 49,
}

export const colors = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'] as const
export type Color = typeof colors[number]

export const deck: ReadonlyArray<ReadonlyArray<Card>> = colors.map((color, i) =>
  Object.values(cards)
    .sort((a, b) => b - a)
    .map(value => new Card(value + i))
)

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const colorsShort = ['s', 'h', 'd', 'c']
const cardHeight = (cardId: CardId): number => Math.floor((cardId - 1) / 4)
export const cardTitle = (id: number): string => {
  const value = values[cardHeight(id)]
  const color = colorsShort[(id - 1) % 4]
  return `${value}${color}`
}
export const cardValue = (cardId: CardId): string => values[cardHeight(cardId)]
export const cardColor = (cardId: CardId): Color => colors[(cardId - 1) % 4]

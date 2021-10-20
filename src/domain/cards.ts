export class Card {
  constructor(readonly color: Color, readonly value: Value) {}

  equals = (other: Card): boolean => this.color === other.color && this.value === other.value
}

export const values: { [key: string]: number } = {
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
  Object.values(values).sort((a, b) => a - b).map(value => new Card(color, value))
)

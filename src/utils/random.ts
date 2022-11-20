import Position from 'domain/position'

export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export const randomPosition = (positions: ReadonlyArray<Position>): Position =>
  positions.at(random(0, positions.length - 1)) || positions[0]

import ButtonPosition from 'domain/buttonPosition'
import { random } from 'utils/random'

enum Position {
  B = 'B',
  SB = 'SB',
  BB = 'BB',
  UTG = 'UTG',
  MP = 'MP',
  CO = 'CO',
  ANY = 'ANY',
}

export default Position

export const positionsNamesMap = new Map<Position, string>([
  [Position.B, 'Button'],
  [Position.SB, 'SB'],
  [Position.BB, 'BB'],
  [Position.UTG, 'UTG'],
  [Position.MP, 'MP'],
  [Position.CO, 'CO'],
])
export const allPositions: ReadonlyArray<Position> = [
  Position.B,
  Position.SB,
  Position.BB,
  Position.UTG,
  Position.MP,
  Position.CO,
]
export const buttonPositionByHeroPositionMap = new Map<Position, ButtonPosition>([
  [Position.B, 0],
  [Position.SB, 5],
  [Position.BB, 4],
  [Position.UTG, 3],
  [Position.MP, 2],
  [Position.CO, 1],
])

export const seatNumberByPositionAndButtonPosition = (position: Position, buttonPosition: ButtonPosition) => {
  const index = allPositions.indexOf(position)
  return (index + buttonPosition) % 6
}

export const positionBySeatNumberAndButtonPosition = (seatNumber: number, buttonPosition: ButtonPosition): Position =>
  allPositions[(seatNumber - buttonPosition + 6) % 6]

export const heroPositionFromButtonPosition = (buttonPosition: ButtonPosition): Position =>
  positionBySeatNumberAndButtonPosition(0, buttonPosition)

export const buttonPositionFromHeroPosition = (heroPosition: Position): ButtonPosition => {
  const hero = buttonPositionByHeroPositionMap.get(heroPosition)
  if (hero === undefined) throw Error('Cannot get button position for Hero @' + heroPosition)
  return hero
}

export const getRandomHeroPosition = () => allPositions[random(0, 5)]

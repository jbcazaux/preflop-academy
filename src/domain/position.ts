import ButtonPosition from 'domain/buttonPosition'

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

export const seatNumberByPositionAndButtonPosition = (position: Position, buttonPosition: ButtonPosition) => {
  const index = allPositions.indexOf(position)
  return (index + buttonPosition) % 6
}

export const positionBySeatNumberAndButtonPosition = (seatNumber: number, buttonPosition: ButtonPosition): Position =>
  allPositions[(seatNumber - buttonPosition + 6) % 6]

export const heroPositionByButtonPosition = (buttonPosition: ButtonPosition): Position =>
  positionBySeatNumberAndButtonPosition(0, buttonPosition)

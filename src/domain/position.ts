import ButtonPosition from 'domain/buttonPosition'
import buttonPosition from 'domain/buttonPosition'

enum Position {
  B,
  SB,
  BB,
  UTG,
  MP,
  CO,
  ANY,
}

export default Position

export const positionsNames = ['Button', 'SB', 'BB', 'UTG', 'MP', 'CO']
export const allPositions = [Position.B, Position.SB, Position.BB, Position.UTG, Position.MP, Position.CO]
export const positionByButtonPositionMap = new Map<ButtonPosition, Position>([
  [0, Position.B],
  [5, Position.SB],
  [4, Position.BB],
  [3, Position.UTG],
  [2, Position.MP],
  [1, Position.CO],
])
export const positionByButtonPosition = (buttonPosition: buttonPosition): Position =>
    positionByButtonPositionMap.get(buttonPosition) || Position.B

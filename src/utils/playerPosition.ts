import Position from 'domain/position'
import ButtonPosition from 'domain/buttonPosition'

const getVilainPosition = (player: number, button: ButtonPosition): Position => {
  const positions: ReadonlyArray<Position> = [
    Position.B,
    Position.SB,
    Position.BB,
    Position.UTG,
    Position.MP,
    Position.CO,
  ]
  return positions[(player - button + 6) % 6]
}

export default getVilainPosition

export const getHeroPosition = (buttonPosition: ButtonPosition) => getVilainPosition(0, buttonPosition)

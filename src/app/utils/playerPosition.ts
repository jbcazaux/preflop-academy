import Position from 'domain/position'

const getVilainPosition = (player: number, button: number): Position => {
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

export const getHeroPosition = (buttonPosition: number) => getVilainPosition(0, buttonPosition)

import Position, {
  heroPositionFromButtonPosition,
  positionBySeatNumberAndButtonPosition,
  seatNumberByPositionAndButtonPosition,
} from 'domain/position'

describe('position', () => {
  it('should get hero position', () => {
    expect(heroPositionFromButtonPosition(0)).toBe(Position.B)
    expect(heroPositionFromButtonPosition(1)).toBe(Position.CO)
    expect(heroPositionFromButtonPosition(2)).toBe(Position.MP)
    expect(heroPositionFromButtonPosition(3)).toBe(Position.UTG)
    expect(heroPositionFromButtonPosition(4)).toBe(Position.BB)
    expect(heroPositionFromButtonPosition(5)).toBe(Position.SB)
  })

  it('should get vilain position @ seat 1', () => {
    expect(positionBySeatNumberAndButtonPosition(1, 0)).toBe(Position.SB)
    expect(positionBySeatNumberAndButtonPosition(1, 1)).toBe(Position.B)
    expect(positionBySeatNumberAndButtonPosition(1, 2)).toBe(Position.CO)
    expect(positionBySeatNumberAndButtonPosition(1, 3)).toBe(Position.MP)
    expect(positionBySeatNumberAndButtonPosition(1, 4)).toBe(Position.UTG)
    expect(positionBySeatNumberAndButtonPosition(1, 5)).toBe(Position.BB)
  })
  it('should get vilain position @ seat 2', () => {
    expect(positionBySeatNumberAndButtonPosition(2, 0)).toBe(Position.BB)
    expect(positionBySeatNumberAndButtonPosition(2, 1)).toBe(Position.SB)
    expect(positionBySeatNumberAndButtonPosition(2, 2)).toBe(Position.B)
    expect(positionBySeatNumberAndButtonPosition(2, 3)).toBe(Position.CO)
    expect(positionBySeatNumberAndButtonPosition(2, 4)).toBe(Position.MP)
    expect(positionBySeatNumberAndButtonPosition(2, 5)).toBe(Position.UTG)
  })
  it('should get vilain position @ seat 3', () => {
    expect(positionBySeatNumberAndButtonPosition(3, 0)).toBe(Position.UTG)
    expect(positionBySeatNumberAndButtonPosition(3, 1)).toBe(Position.BB)
    expect(positionBySeatNumberAndButtonPosition(3, 2)).toBe(Position.SB)
    expect(positionBySeatNumberAndButtonPosition(3, 3)).toBe(Position.B)
    expect(positionBySeatNumberAndButtonPosition(3, 4)).toBe(Position.CO)
    expect(positionBySeatNumberAndButtonPosition(3, 5)).toBe(Position.MP)
  })
  it('should get vilain position @ seat 4', () => {
    expect(positionBySeatNumberAndButtonPosition(4, 0)).toBe(Position.MP)
    expect(positionBySeatNumberAndButtonPosition(4, 1)).toBe(Position.UTG)
    expect(positionBySeatNumberAndButtonPosition(4, 2)).toBe(Position.BB)
    expect(positionBySeatNumberAndButtonPosition(4, 3)).toBe(Position.SB)
    expect(positionBySeatNumberAndButtonPosition(4, 4)).toBe(Position.B)
    expect(positionBySeatNumberAndButtonPosition(4, 5)).toBe(Position.CO)
  })
  it('should get vilain position @ seat 5', () => {
    expect(positionBySeatNumberAndButtonPosition(5, 0)).toBe(Position.CO)
    expect(positionBySeatNumberAndButtonPosition(5, 1)).toBe(Position.MP)
    expect(positionBySeatNumberAndButtonPosition(5, 2)).toBe(Position.UTG)
    expect(positionBySeatNumberAndButtonPosition(5, 3)).toBe(Position.BB)
    expect(positionBySeatNumberAndButtonPosition(5, 4)).toBe(Position.SB)
    expect(positionBySeatNumberAndButtonPosition(5, 5)).toBe(Position.B)
  })

  it('should get seat number of B', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.B, 0)).toBe(0)
    expect(seatNumberByPositionAndButtonPosition(Position.B, 1)).toBe(1)
    expect(seatNumberByPositionAndButtonPosition(Position.B, 2)).toBe(2)
    expect(seatNumberByPositionAndButtonPosition(Position.B, 3)).toBe(3)
    expect(seatNumberByPositionAndButtonPosition(Position.B, 4)).toBe(4)
    expect(seatNumberByPositionAndButtonPosition(Position.B, 5)).toBe(5)
  })
  it('should get seat number of SB', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 0)).toBe(1)
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 1)).toBe(2)
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 2)).toBe(3)
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 3)).toBe(4)
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 4)).toBe(5)
    expect(seatNumberByPositionAndButtonPosition(Position.SB, 5)).toBe(0)
  })
  it('should get seat number of BB', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 0)).toBe(2)
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 1)).toBe(3)
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 2)).toBe(4)
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 3)).toBe(5)
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 4)).toBe(0)
    expect(seatNumberByPositionAndButtonPosition(Position.BB, 5)).toBe(1)
  })
  it('should get seat number of UTG', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 0)).toBe(3)
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 1)).toBe(4)
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 2)).toBe(5)
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 3)).toBe(0)
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 4)).toBe(1)
    expect(seatNumberByPositionAndButtonPosition(Position.UTG, 5)).toBe(2)
  })
  it('should get seat number of MP', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 0)).toBe(4)
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 1)).toBe(5)
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 2)).toBe(0)
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 3)).toBe(1)
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 4)).toBe(2)
    expect(seatNumberByPositionAndButtonPosition(Position.MP, 5)).toBe(3)
  })
  it('should get seat number of CO', () => {
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 0)).toBe(5)
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 1)).toBe(0)
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 2)).toBe(1)
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 3)).toBe(2)
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 4)).toBe(3)
    expect(seatNumberByPositionAndButtonPosition(Position.CO, 5)).toBe(4)
  })
})

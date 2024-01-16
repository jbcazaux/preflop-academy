import Move from 'domain/move'
import Position from 'domain/position'

export const isMoveAllowed = (move: Move | null, hero: Position, vilain?: Position): boolean => {
  if (!move) {
    return true
  }

  switch (move) {
    case Move.OPEN:
      return hero !== Position.BB && !vilain
    case Move.CALL:
    case Move._3BET: {
      if (hero === Position.UTG || !vilain || hero === vilain) return false
      if (hero === Position.HJ) return vilain === Position.UTG
      if (hero === Position.CO) return [(Position.UTG, Position.HJ)].includes(vilain)
      if (hero === Position.B) return [Position.UTG, Position.HJ, Position.CO].includes(vilain)
      if (hero === Position.SB) return [Position.UTG, Position.HJ, Position.CO, Position.B].includes(vilain)
      if (hero === Position.BB)
        return [Position.UTG, Position.HJ, Position.CO, Position.B, Position.SB].includes(vilain)
      return false
    }
    case Move.CALL3BET:
    case Move._4BET: {
      if (hero === Position.BB || !vilain || hero === vilain) return false
      if (hero === Position.UTG) return true
      if (hero === Position.HJ) return vilain !== Position.UTG
      if (hero === Position.CO) return [(Position.B, Position.SB, Position.BB)].includes(vilain)
      if (hero === Position.B) return [(Position.SB, Position.BB)].includes(vilain)
      if (hero === Position.SB) return vilain === Position.BB
      return false
    }
    default:
      return false
  }
}

export const isMovePossible = (move: Move | null, hero: Position): boolean => {
  if (!move) {
    return true
  }

  switch (move) {
    case Move.OPEN:
      return hero !== Position.BB
    case Move.CALL:
    case Move._3BET:
      return hero !== Position.UTG
    case Move.CALL3BET:
    case Move._4BET:
      return hero !== Position.BB
    default:
      return false
  }
}

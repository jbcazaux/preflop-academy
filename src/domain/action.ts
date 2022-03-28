import Move from 'domain/move'
import Position from 'domain/position'

class Action {
  constructor(
    readonly position: Position,
    readonly move: Move.OPEN | Move.CALL | Move._3BET | Move.CALL3BET | Move._4BET
  ) {}
}

export default Action

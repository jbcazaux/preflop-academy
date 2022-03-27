import Move from 'domain/move'

class Action {
  constructor(
    readonly position: number,
    readonly move: Move.OPEN | Move.CALL | Move._3BET | Move.CALL3BET | Move._4BET
  ) {}
}

export default Action

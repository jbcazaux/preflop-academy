import actionsFlow from 'app/solver/actionsFlow'
import Action from 'domain/action'
import position from 'domain/position'
import Move from 'domain/move'

describe('actions flow', () => {
  it('opens', () => {
    const noAction: ReadonlyArray<Action> = []
    const flow = actionsFlow(noAction, position.ANY)

    expect(flow).toEqual([new Action(position.ANY, Move.OPEN)])
  })
  it('does not allow 3 way', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN), new Action(position.SB, Move.CALL)]
    const flow = actionsFlow(actions, position.BB)

    expect(flow).toEqual(actions)
  })
  it('3 bets', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN), new Action(position.SB, Move.CALL)]
    const flow = actionsFlow(actions, position.SB)

    expect(flow).toEqual([new Action(position.B, Move.OPEN), new Action(position.SB, Move._3BET)])
  })
  it('4 bets', () => {
    const actions: ReadonlyArray<Action> = [
      new Action(position.B, Move.OPEN),
      new Action(position.SB, Move._3BET),
      new Action(position.B, Move.CALL3BET),
    ]
    const flow = actionsFlow(actions, position.B)

    expect(flow).toEqual([
        new Action(position.B, Move.OPEN),
        new Action(position.SB, Move._3BET),
        new Action(position.B, Move._4BET),
    ])
  })
  it('cancels open', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN)]
    const flow = actionsFlow(actions, position.B)

    expect(flow).toHaveLength(0)
  })
  it('cancels 3bet', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN), new Action(position.SB, Move._3BET)]
    const flow = actionsFlow(actions, position.SB)

    expect(flow).toEqual([new Action(position.B, Move.OPEN)])
  })
  it('cancels 4bet', () => {
    const actions: ReadonlyArray<Action> = [
      new Action(position.B, Move.OPEN),
      new Action(position.SB, Move._3BET),
      new Action(position.B, Move._4BET),
    ]
    const flow = actionsFlow(actions, position.B)

    expect(flow).toEqual([new Action(position.B, Move.OPEN), new Action(position.SB, Move._3BET)])
  })
  it('calls', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN)]
    const flow = actionsFlow(actions, position.SB)

    expect(flow).toEqual([new Action(position.B, Move.OPEN), new Action(position.SB, Move.CALL)])
  })
  it('calls 3 bet', () => {
    const actions: ReadonlyArray<Action> = [new Action(position.B, Move.OPEN)]
    const flow = actionsFlow(actions, position.SB)

    expect(flow).toEqual([new Action(position.B, Move.OPEN), new Action(position.SB, Move.CALL)])
  })
})

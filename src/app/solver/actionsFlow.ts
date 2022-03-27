import Action from 'domain/action'
import Move from 'domain/move'
import Position from 'domain/position'

const actionsFlow = (actions: ReadonlyArray<Action>, next: Position): ReadonlyArray<Action> => {
    if (actions.length === 0) {
        return [new Action(next, Move.OPEN)]
    }
    const threeWay = actions.length >= 2 && !actions.some(a => a.position === next)
    if (threeWay) {
        return actions
    }
    if (actions[actions.length - 1].position === next) {
        const lastAction = actions[actions.length - 1]
        if ([Move.OPEN, Move._3BET, Move._4BET].includes(lastAction.move)) {
            return actions.slice(0, -1)
        }
        if (Move.CALL === lastAction.move) {
            return actions.slice(0, -1).concat(new Action(lastAction.position, Move._3BET))
        }
        if (Move.CALL3BET === lastAction.move) {
            return actions.slice(0, -1).concat(new Action(lastAction.position, Move._4BET))
        }

        throw new Error('Cannot do that: ' + actions + ' ' + next)
    }
    if (actions[actions.length - 1].position !== next) {
        const lastAction = actions[actions.length - 1]
        if (Move.OPEN === lastAction.move) {
            return actions.concat(new Action(next, Move.CALL))
        }
        if (Move._3BET === lastAction.move) {
            return actions.concat(new Action(next, Move.CALL3BET))
        }
        return actions
    }
    throw new Error('Cannot do that: ' + actions + ' ' + next)
}


export default actionsFlow
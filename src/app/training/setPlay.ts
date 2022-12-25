import { getRandomMoveType } from 'app/training/trainingMoveDistribution'
import Move from 'domain/move'
import Hand from 'domain/hand'
import randomHandInRange from 'utils/randomHandInRange'
import Position from 'domain/position'
import { Play } from 'app/training/types'
import Action from 'domain/action'
import { randomPosition } from 'utils/random'

const getRandomOpenActionForCallOr3Bet = (hero: Position): ReadonlyArray<Action> => {
  switch (hero) {
    case Position.UTG:
      throw Error('cannot be there - getRandomOpenActionForCall / Cannot call from UTG')
    case Position.MP:
      return [new Action(Position.UTG, Move.OPEN)]
    case Position.CO:
      return [new Action(randomPosition([Position.UTG, Position.MP]), Move.OPEN)]
    case Position.B:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO]), Move.OPEN)]
    case Position.SB:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO, Position.B]), Move.OPEN)]
    case Position.BB:
      return [new Action(randomPosition([Position.UTG, Position.MP, Position.CO, Position.B, Position.SB]), Move.OPEN)]
    default:
      throw Error('cannot be there - getRandomOpenActionForCall / ' + hero)
  }
}

const getRandomOpenActionForCall3BetOr4Bet = (hero: Position): ReadonlyArray<Action> => {
  switch (hero) {
    case Position.UTG:
      return [
        new Action(Position.UTG, Move.OPEN),
        new Action(randomPosition([Position.MP, Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.MP:
      return [
        new Action(Position.MP, Move.OPEN),
        new Action(randomPosition([Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.CO:
      return [
        new Action(Position.CO, Move.OPEN),
        new Action(randomPosition([Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.B:
      return [new Action(Position.B, Move.OPEN), new Action(randomPosition([Position.SB, Position.BB]), Move._3BET)]
    case Position.SB:
      return [new Action(Position.SB, Move.OPEN), new Action(Position.BB, Move._3BET)]
    case Position.BB:
      throw Error('cannot be there - getRandomOpenActionForCall3Bet / Cannot call 3bet fromBB')
    default:
      throw Error('cannot be there - getRandomOpenActionForCall / ' + hero)
  }
}

export const setRandomPlay = (move: Move | null, heroPosition: Position): Play => {
  const newMove: Move = move || getRandomMoveType(heroPosition)
  switch (newMove) {
    case Move.OPEN: {
      return {
        hand: Hand.random(),
        actions: [],
      }
    }
    case Move.CALL: {
      return {
        hand: Hand.random(),
        actions: getRandomOpenActionForCallOr3Bet(heroPosition),
      }
    }
    case Move._3BET: {
      return {
        hand: Hand.random(),
        actions: getRandomOpenActionForCallOr3Bet(heroPosition),
      }
    }
    case Move.CALL3BET: {
      return {
        hand: randomHandInRange(Move.OPEN, heroPosition),
        actions: getRandomOpenActionForCall3BetOr4Bet(heroPosition),
      }
    }
    case Move._4BET: {
      return {
        hand: randomHandInRange(Move.OPEN, heroPosition),
        actions: getRandomOpenActionForCall3BetOr4Bet(heroPosition),
      }
    }
    default:
      throw Error('should not be there - setRandomPlay / ' + newMove)
  }
}

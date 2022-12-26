import { getRandomMoveType } from 'app/training/trainingMovesDistribution'
import Move from 'domain/move'
import Hand from 'domain/hand'
import randomHandInRange from 'utils/randomHandInRange'
import Position, { getRandomHeroPosition } from 'domain/position'
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
  const heroOpenAction = new Action(hero, Move.OPEN)
  switch (hero) {
    case Position.UTG:
      return [
        heroOpenAction,
        new Action(randomPosition([Position.MP, Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.MP:
      return [
        heroOpenAction,
        new Action(randomPosition([Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.CO:
      return [heroOpenAction, new Action(randomPosition([Position.B, Position.SB, Position.BB]), Move._3BET)]
    case Position.B:
      return [heroOpenAction, new Action(randomPosition([Position.SB, Position.BB]), Move._3BET)]
    case Position.SB:
      return [heroOpenAction, new Action(Position.BB, Move._3BET)]
    case Position.BB:
      throw Error('cannot be there - getRandomOpenActionForCall3Bet / Cannot call 3bet fromBB')
    default:
      throw Error('cannot be there - getRandomOpenActionForCall / ' + hero)
  }
}

export const setRandomPlay = (move: Move | null, heroPosition: Position | null): Play => {
  const hero = heroPosition || getRandomHeroPosition()
  const newMove = move || getRandomMoveType(hero)

  switch (newMove) {
    case Move.OPEN: {
      return {
        hand: Hand.random(),
        actions: [],
        heroPosition: hero,
      }
    }
    case Move.CALL: {
      return {
        hand: Hand.random(),
        actions: getRandomOpenActionForCallOr3Bet(hero),
        heroPosition: hero,
      }
    }
    case Move._3BET: {
      return {
        hand: Hand.random(),
        actions: getRandomOpenActionForCallOr3Bet(hero),
        heroPosition: hero,
      }
    }
    case Move.CALL3BET: {
      return {
        hand: randomHandInRange(Move.OPEN, hero),
        actions: getRandomOpenActionForCall3BetOr4Bet(hero),
        heroPosition: hero,
      }
    }
    case Move._4BET: {
      return {
        hand: randomHandInRange(Move.OPEN, hero),
        actions: getRandomOpenActionForCall3BetOr4Bet(hero),
        heroPosition: hero,
      }
    }
    default:
      throw Error('should not be there - setRandomPlay / ' + newMove)
  }
}

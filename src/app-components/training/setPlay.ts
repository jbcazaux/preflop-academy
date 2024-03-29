import { QueryClient } from '@tanstack/react-query'

import { getRandomMoveType } from './trainingMovesDistribution'
import { Play } from './types'

import { fetchRange } from 'api/ranges'
import Action from 'domain/action'
import Hand from 'domain/hand'
import Move from 'domain/move'
import Position, { getRandomHeroPosition } from 'domain/position'
import { randomPosition } from 'utils/random'
import randomHandInRange from 'utils/randomHandInRange'
import { throwError } from 'utils/throw-error'

const getRandomOpenActionForCallOr3Bet = (hero: Position): ReadonlyArray<Action> => {
  switch (hero) {
    case Position.UTG:
      throw Error('cannot be there - getRandomOpenActionForCall / Cannot call from UTG')
    case Position.HJ:
      return [new Action(Position.UTG, Move.OPEN)]
    case Position.CO:
      return [new Action(randomPosition([Position.UTG, Position.HJ]), Move.OPEN)]
    case Position.B:
      return [new Action(randomPosition([Position.UTG, Position.HJ, Position.CO]), Move.OPEN)]
    case Position.SB:
      return [new Action(randomPosition([Position.UTG, Position.HJ, Position.CO, Position.B]), Move.OPEN)]
    case Position.BB:
      return [new Action(randomPosition([Position.UTG, Position.HJ, Position.CO, Position.B, Position.SB]), Move.OPEN)]
    default:
      throw Error(`cannot be there - getRandomOpenActionForCall / ${String(hero)}`)
  }
}

const getRandomOpenActionForCall3BetOr4Bet = (hero: Position): ReadonlyArray<Action> => {
  const heroOpenAction = new Action(hero, Move.OPEN)
  switch (hero) {
    case Position.UTG:
      return [
        heroOpenAction,
        new Action(randomPosition([Position.HJ, Position.CO, Position.B, Position.SB, Position.BB]), Move._3BET),
      ]
    case Position.HJ:
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
      throw Error('cannot be there - getRandomOpenActionForCall3Bet / Cannot call 3bet from BB')
    default:
      throw Error(`cannot be there - getRandomOpenActionForCall / ${String(hero)}`)
  }
}

export const setRandomPlay = async (
  move: Move | null,
  heroPosition: Position | null,
  queryClient: QueryClient
): Promise<Play> => {
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
    case Move.CALL3BET:
    case Move._4BET: {
      const openRange = await queryClient.fetchQuery({
        queryKey: ['range', hero, Move.OPEN],
        queryFn: () => fetchRange(Move.OPEN, hero),
      })
      if (openRange !== null) {
        return {
          hand: randomHandInRange(Move.OPEN, openRange),
          actions: getRandomOpenActionForCall3BetOr4Bet(hero),
          heroPosition: hero,
        }
      }
      return throwError(`range is null open @${hero}`)
    }
    default:
      throw Error('should not be there - setRandomPlay / ' + newMove)
  }
}

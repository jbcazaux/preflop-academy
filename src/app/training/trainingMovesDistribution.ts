import Move from 'domain/move'
import { random } from 'utils/random'
import Position from 'domain/position'
import { Distribution } from 'app/training/types'

export const getRandomMoveDistribution = (heroPosition: Position): Distribution => {
  switch (heroPosition) {
    case Position.UTG:
      return {
        [Move.OPEN]: 40,
        [Move.CALL3BET]: 40,
        [Move._4BET]: 20,
      }
    case Position.BB:
      return {
        [Move.CALL]: 75,
        [Move._3BET]: 25,
      }
    case Position.SB:
      return {
        [Move.OPEN]: 35,
        [Move.CALL]: 50,
        [Move._3BET]: 15,
      }
    case Position.B:
    case Position.CO:
    case Position.MP:
      return {
        [Move.OPEN]: 10,
        [Move.CALL]: 10,
        [Move._3BET]: 5,
        [Move.CALL3BET]: 5,
        [Move._4BET]: 2,
      }
    default:
      throw new Error('should not be there - getRandomMoveType / ' + heroPosition)
  }
}

export const getRandomMoveType = (heroPosition: Position): Move => {
  const distribution = getRandomMoveDistribution(heroPosition)
  const max = Object.values(distribution).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(distribution).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution)
    .sort(([, a], [, b]) => a - b)
    .find(([, d]) => r <= d)
  if (!entry) {
    throw Error('getRandomMoveType, r/max=' + r + '/' + max)
  }
  return entry[0] as Move.OPEN | Move.CALL | Move._3BET | Move.CALL3BET | Move._4BET
}

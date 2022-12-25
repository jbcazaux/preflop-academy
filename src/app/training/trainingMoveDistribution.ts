import Move from 'domain/move'
import { random } from 'utils/random'
import Position from 'domain/position'

type Distribution = { [key: string]: number }

const moveTypes: Distribution = {
  [Move.OPEN]: 50,
  [Move.CALL]: 35,
  [Move.CALL3BET]: 15,
}
export const getRandomMoveType2 = (): Move.OPEN | Move.CALL | Move.CALL3BET => {
  const max = Object.values(moveTypes).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(moveTypes).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return entry[0] as Move.OPEN | Move.CALL | Move.CALL3BET
}

export const getRandomActions = (heroMoveType: Distribution): Move => {
  const max = Object.values(heroMoveType).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(moveTypes).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return entry[0] as Move
}

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
        [Move.OPEN]: 30,
        [Move.CALL]: 35,
        [Move._3BET]: 15,
        [Move.CALL3BET]: 15,
        [Move._4BET]: 5,
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

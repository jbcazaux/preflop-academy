import Move from 'domain/move'
import random from 'utils/random'

type Distribution = { [key: string ]: number }

const moveTypes: Distribution = {
  [Move.OPEN]: 50,
  [Move.CALL]: 35,
  [Move.CALL3BET]: 15,
}
export const getRandomMoveType = (): Move.OPEN | Move.CALL | Move.CALL3BET => {
  const max = Object.values(moveTypes).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(moveTypes).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return entry[0] as Move.OPEN | Move.CALL | Move.CALL3BET
}

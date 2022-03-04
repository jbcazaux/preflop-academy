import Move from 'domain/move'
import random from 'app/utils/random'

type Distribution = { [key: string | number]: number }

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

export const buttonPositionForCall = {
  0: 20,
  1: 14,
  2: 8,
  3: 0,
  4: 32,
  5: 26,
}

export const getButtonPositionForCall = (): number => {
  const max = Object.values(buttonPositionForCall).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(buttonPositionForCall).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return Number(entry[0])
}

export const buttonPositionForOpen = {
  0: 20,
  1: 20,
  2: 20,
  3: 20,
  4: 0,
  5: 20,
}

export const getButtonPositionForOpen = (): number => {
  const max = Object.values(buttonPositionForOpen).reduce((total, i) => total + i, 0)
  const summedDistribution = Object.entries(buttonPositionForOpen).reduce((distrib: Distribution, [position, d], i) => {
    const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
    return { ...distrib, [position]: last + d }
  }, {})
  const r = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return Number(entry[0])
}

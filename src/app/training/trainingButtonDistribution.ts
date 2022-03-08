import random from 'utils/random'

type Distribution = { [key: number]: number }

export const buttonPositionForCall = {
  0: 20,
  1: 14,
  2: 8,
  3: 0,
  4: 32,
  5: 26,
}
export const getButtonPositionForCall = (): number => randomPositionWithDistributionMap(buttonPositionForCall)

export const buttonPositionForOpen = {
  0: 20,
  1: 20,
  2: 20,
  3: 20,
  4: 0,
  5: 20,
}
export const getButtonPositionForOpen = (): number => randomPositionWithDistributionMap(buttonPositionForOpen)

export const buttonPositionFor3BetCall = {
  0: 14,
  1: 20,
  2: 26,
  3: 32,
  4: 0,
  5: 8,
}
export const getButtonPositionFor3BetCall = (): number => randomPositionWithDistributionMap(buttonPositionFor3BetCall)

const randomPositionWithDistributionMap = (distributionMap: Distribution): number => {
  const max = Object.values(distributionMap).reduce((total, i) => total + i, 0)
  const summedDistribution: Distribution = Object.entries(distributionMap).reduce(
    (distrib: Distribution, [position, d], i) => {
      const last = i < 1 ? 0 : Object.values(distrib)[i - 1]
      return { ...distrib, [position]: last + d }
    },
    {}
  )
  const r: number = random(0, max)
  const entry = Object.entries(summedDistribution).find(([, d]) => r < d) || [0, 0]
  return Number(entry[0])
}

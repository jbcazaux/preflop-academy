/*
import { random } from 'utils/random'
import Position from 'domain/position'

type Distribution = { [key: number]: number }

export const buttonPositionForCall = {
  [Position.B]: 20,
  [Position.SB]: 14,
  [Position.BB]: 8,
  [Position.UTG]: 0,
  [Position.MP]: 32,
  [Position.CO]: 26,
}
export const getButtonPositionForCall = (): number => randomPositionWithDistributionMap(buttonPositionForCall)

export const buttonPositionForOpen = {
  [Position.B]: 20,
  [Position.SB]: 20,
  [Position.BB]: 20,
  [Position.UTG]: 20,
  [Position.MP]: 0,
  [Position.CO]: 20,
}
export const getButtonPositionForOpen = (): Position => randomPositionWithDistributionMap(buttonPositionForOpen)

export const buttonPositionFor3BetCall = {
  [Position.B]: 14,
  [Position.SB]: 20,
  [Position.BB]: 26,
  [Position.UTG]: 32,
  [Position.MP]: 0,
  [Position.CO]: 8,
}
export const getButtonPositionFor3BetCall = (): Position => randomPositionWithDistributionMap(buttonPositionFor3BetCall)

const randomPositionWithDistributionMap = (distributionMap: Distribution): Position => {
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
*/
export {}

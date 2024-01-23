import { AxiosInstance } from 'axios'

import getAxios from './axios'

import { RatioRange } from 'domain/combo'
import Move from 'domain/move'
import Position from 'domain/position'

const axios: AxiosInstance = getAxios()

export const migrateRange = async (position: Position, move: Move, rangeRatio: RatioRange, vs?: Position) => {
  const { data } = await axios.post<ReadonlyArray<number>>('/db/ranges', {
    move,
    position,
    versus: vs || '',
    range: rangeRatio,
  })
  return data
}

export const migratePushFold = async (position: Position, bb: number, rangeRatio: RatioRange) => {
  const { data } = await axios.post<ReadonlyArray<number>>('/db/push-fold', {
    bb,
    position,
    range: rangeRatio,
  })
  return data
}

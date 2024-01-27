import { AxiosInstance } from 'axios'

import getAxios from './axios'

import { RatioRange } from 'domain/combo'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { positionToUrlParam } from 'domain/position'

const axios: AxiosInstance = getAxios()

export const fetchRange = async (move: Move, position: Position, vilainPosition?: Position): Promise<RatioRange> => {
  const url = `/ranges/${moveToUrlParam(move)}/${positionToUrlParam(position)}${vilainPosition ? `/vs/${positionToUrlParam(vilainPosition)}` : ''}`
  const { data } = await axios.get<RatioRange>(url)
  return data
}

export const fetchPushOrFold = async (stack: number, position: Position): Promise<RatioRange> => {
  const { data } = await axios.get<RatioRange>(`/ranges/push-fold/${positionToUrlParam(position)}/${stack}`)
  return data
}

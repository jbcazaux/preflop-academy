import { AxiosInstance } from 'axios'

import getAxios from './axios'

import HintTable from 'domain/hintTable'
import Move, { moveToUrlParam } from 'domain/move'
import Position, { positionToUrlParam } from 'domain/position'

const axios: AxiosInstance = getAxios()

export const fetchHintTable = async (
  move: Move,
  position: Position,
  vilainPosition?: Position
): Promise<HintTable | null> => {
  const url = `/hint-tables/${moveToUrlParam(move)}/${positionToUrlParam(position)}${vilainPosition ? `/vs/${positionToUrlParam(vilainPosition)}` : ''}`
  const { data } = await axios.get<HintTable>(url)
  return data
}

export const fetchPushOrFold = async (stack: number, position: Position) => {
  const { data } = await axios.get<HintTable>(`/hint-tables/push-fold/${positionToUrlParam(position)}/${stack}`)
  return data
}

import { AxiosInstance } from 'axios'

import getAxios from './axios'

import Board from 'domain/board'
import { Range } from 'domain/combo'
import Hand from 'domain/hand'

const axios: AxiosInstance = getAxios()
let controllerRange: AbortController | null = null
let controllerRangeLight: AbortController | null = null

export interface VsResult {
  winner: number
  lose: number
  draw: number
  total: number
}

const versus = {
  range: async (vilain: Range, hand: Hand, board: Board): Promise<VsResult | null> => {
    if (controllerRange) controllerRange.abort()
    if (!hand.card1 || !hand.card2 || vilain.length === 0) return null
    const hero = [hand.card1.id, hand.card2.id]
    const b = board.cards.map(c => c.id)
    controllerRange = new AbortController()
    const { data } = await axios.post<VsResult>(
      '/vs/range',
      {
        vilain,
        hero,
        board: b,
      },
      {
        signal: controllerRange.signal,
      }
    )
    controllerRange = null
    return data
  },
  rangePreflop: async (vilain: Range, hand: Hand): Promise<VsResult | null> => {
    if (controllerRangeLight) controllerRangeLight.abort()
    if (!hand.card1 || !hand.card2 || vilain.length === 0) return null
    const hero = [hand.card1.id, hand.card2.id]
    controllerRangeLight = new AbortController()
    const { data } = await axios.post<VsResult>(
      '/vs/range-light',
      {
        vilain,
        hero,
      },
      {
        signal: controllerRangeLight.signal,
      }
    )
    controllerRangeLight = null
    return data
  },
}

export default versus

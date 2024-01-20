import { AxiosInstance } from 'axios'

import getAxios from './axios'

import Board from 'domain/board'
import Hand from 'domain/hand'

const axios: AxiosInstance = getAxios()
const controllerRange = new AbortController()
let controllerRangeLight: AbortController | null = null

export interface VsResult {
  winner: number
  lose: number
  draw: number
  total: number
}

const versus = {
  range: async (vilain: ReadonlyArray<string>, hand: Hand, board: Board): Promise<VsResult | null> => {
    try {
      controllerRange.abort()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
    if (!hand.card1 || !hand.card2) return null
    const hero = [hand.card1.id, hand.card2.id]
    const b = board.cards.map(c => c.id)
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
    return data
  },
  rangePreflop: async (vilain: ReadonlyArray<string>, hand: Hand): Promise<VsResult | null> => {
    try {
      if (controllerRangeLight) controllerRangeLight.abort()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.info(e)
    }
    if (!hand.card1 || !hand.card2) return null
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

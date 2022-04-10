import getAxios from './axios'
import { AxiosInstance } from 'axios'
import Hand from 'domain/hand'
import { Card } from 'domain/card'
import Board from 'domain/board'

const axios: AxiosInstance = getAxios()

export interface ImprovementCards {
  cards: ReadonlyArray<Card>
}

const improvement = {
  turn: async (hand: Hand, board: Board): Promise<ImprovementCards | null> => {
    if (!hand.card1 || !hand.card2) return null
    const h = [hand.card1.id, hand.card2.id]
    const b = board.cards.map(c => c.id)
    const { data } = await axios.post<ReadonlyArray<number>>('/improvement/turn', {
      hand: h,
      turn: b,
    })
    return {
      cards: data.map(id => new Card(id)) || [],
    }
  },
  flop: async (hand: Hand, board: Board): Promise<ImprovementCards | null> => {
    if (!hand.card1 || !hand.card2) return null
    const h = [hand.card1.id, hand.card2.id]
    const b = board.cards.map(c => c.id)
    const { data } = await axios.post<ReadonlyArray<number>>('/improvement/flop', {
      hand: h,
      flop: b,
    })
    return {
      cards: data.map(id => new Card(id)) || [],
    }
  },
}

export default improvement

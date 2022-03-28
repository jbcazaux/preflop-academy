import getAxios from './axios'
import {AxiosInstance} from 'axios'
import Hand from 'domain/hand'
import Board from 'domain/board'

const axios: AxiosInstance = getAxios()

export interface VsResult {
    winner: number
    lose: number
    draw: number
    total: number
}

const versus = {
    range: async (vilain: ReadonlyArray<string>, hand: Hand, board: Board): Promise<VsResult | null > => {
        if (!hand.card1 || !hand.card2) return null
        const hero = [hand.card1.id, hand.card2.id]
        const b = board.cards.map(c => c.id)
        const {data} = await axios.post<VsResult>('/vs/range', {
            vilain,
            hero,
            board: b,
        })
        return data
    },
    rangePreflop: async (vilain: ReadonlyArray<string>, hand: Hand): Promise<VsResult | null > => {
        if (!hand.card1 || !hand.card2) return null
        const hero = [hand.card1.id, hand.card2.id]
        const {data} = await axios.post<VsResult>('/vs/range-light', {
            vilain,
            hero,
        })
        return data
    }
}

export default versus
import { AxiosInstance } from 'axios'

import getAxios from './axios'

import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const axios: AxiosInstance = getAxios()

export const open = {
  B: async () => {
    const { data } = await axios.get<HintTable>('/hint-tables/open/b')
    return data
  },
  SB: async () => {
    const { data } = await axios.get<HintTable>('/hint-tables/open/sb')
    return data
  },
  UTG: async () => {
    const { data } = await axios.get<HintTable>('/hint-tables/open/utg')
    return data
  },
  HJ: async () => {
    const { data } = await axios.get<HintTable>('/hint-tables/open/hj')
    return data
  },
  CO: async () => {
    const { data } = await axios.get<HintTable>('/hint-tables/open/co')
    return data
  },
  BB: () => Promise.resolve(null),
} satisfies Record<Position, () => Promise<HintTable | null>>

export const call = {
  B: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call/b/vs/${vs}`)
    return data
  },
  CO: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call/co/vs/${vs}`)
    return data
  },
  HJ: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call/hj/vs/${vs}`)
    return data
  },
  SB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call/sb/vs/${vs}`)
    return data
  },
  BB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call/bb/vs/${vs}`)
    return data
  },
  UTG: () => Promise.resolve(null),
} satisfies Record<Position, (vs: Position) => Promise<HintTable | null>>

export const _3bet = {
  B: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/3-bet/b/vs/${vs}`)
    return data
  },
  CO: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/3-bet/co/vs/${vs}`)
    return data
  },
  HJ: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/3-bet/hj/vs/${vs}`)
    return data
  },
  SB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/3-bet/sb/vs/${vs}`)
    return data
  },
  BB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/3-bet/bb/vs/${vs}`)
    return data
  },
  UTG: () => Promise.resolve(null),
} satisfies Record<Position, (vs: Position) => Promise<HintTable | null>>

export const call3bet = {
  B: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call-3-bet/b/vs/${vs}`)
    return data
  },
  CO: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call-3-bet/co/vs/${vs}`)
    return data
  },
  HJ: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call-3-bet/hj/vs/${vs}`)
    return data
  },
  SB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call-3-bet/sb/vs/${vs}`)
    return data
  },
  BB: () => Promise.resolve(null),
  UTG: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/call-3-bet/utg/vs/${vs}`)
    return data
  },
} satisfies Record<Position, (vs: Position) => Promise<HintTable | null>>

export const _4bet = {
  B: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/4-bet/b/vs/${vs}`)
    return data
  },
  CO: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/4-bet/co/vs/${vs}`)
    return data
  },
  HJ: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/4-bet/hj/vs/${vs}`)
    return data
  },
  SB: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/4-bet/sb/vs/${vs}`)
    return data
  },
  BB: () => Promise.resolve(null),
  UTG: async (vs: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/4-bet/utg/vs/${vs}`)
    return data
  },
} satisfies Record<Position, (vs: Position) => Promise<HintTable | null>>

export const pushOrFold = {
  get: async (stack: number, position: Position) => {
    const { data } = await axios.get<HintTable>(`/hint-tables/push-fold/${position}/${stack}`)
    return data
  },
}

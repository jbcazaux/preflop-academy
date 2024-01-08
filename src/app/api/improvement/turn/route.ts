import { AxiosInstance } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import getAxios from 'api/axios-server'
import { ImprovementCards } from 'api/improvements'
import Hand from 'domain/hand'

const axios: AxiosInstance = getAxios()

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as { hand: Hand; turn: [number, number, number, number] }
  const { data } = await axios.post<ImprovementCards>('/improvement/turn', body)
  return NextResponse.json(data)
}

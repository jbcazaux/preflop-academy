import { AxiosInstance } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import getAxios from 'api/axios-server'
import { ImprovementCards } from 'api/improvements'
import Hand from 'domain/hand'

const axios: AxiosInstance = getAxios()

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as { hand: Hand; flop: [number, number, number] }
  try {
    const { data } = await axios.post<ImprovementCards>('/improvement/flop', body)
    return NextResponse.json(data)
  } catch (e) {
    // FIXME: add logger
  }
}

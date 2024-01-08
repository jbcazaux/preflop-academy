import { AxiosInstance } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import getAxios from 'api/axios-server'
import { VsResult } from 'api/versus'
import Board from 'domain/board'
import Hand from 'domain/hand'

const axios: AxiosInstance = getAxios()

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as { vilain: ReadonlyArray<string>; hero: Hand; board?: Board }
  const { data } = await axios.post<VsResult>('/vs/range-light', body)
  return NextResponse.json(data)
}

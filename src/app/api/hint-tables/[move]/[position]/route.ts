import { getHintsTable } from 'data/gto'
import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import { NextRequest, NextResponse } from 'next/server'
import { throwError } from 'utils/throw-error'

export const GET = (
  request: NextRequest,
  { params: { move, position } }: { params: { move: string; position: string } }
) => {
  const m = urlParamToMove(move) || throwError(`invalid move: ${move}`)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)

  const table = getHintsTable(m, p)
  return NextResponse.json(table)
}

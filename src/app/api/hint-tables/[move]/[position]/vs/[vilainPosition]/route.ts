import { getHintsTable } from 'data/gto'
import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import { NextRequest, NextResponse } from 'next/server'
import { throwError } from 'utils/throw-error'

export const GET = (
  request: NextRequest,
  { params: { move, position, vilainPosition } }: { params: { move: string; position: string; vilainPosition: string } }
) => {
  const m = urlParamToMove(move) || throwError(`invalid move: ${move}`)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)
  const vp = stringToPosition(vilainPosition) || throwError(`invalid vilain position: ${vilainPosition}`)
  const table = getHintsTable(m, p, vp)
  return NextResponse.json(table)
}

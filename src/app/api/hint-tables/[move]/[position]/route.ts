import { getHintsTable } from 'data/gto'
import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import { throwError } from 'utils/throw-error'

export const GET = async (
  request: Request,
  { params: { move, position } }: { params: { move: string; position: string } }
) => {
  const m = urlParamToMove(move) || throwError(`invalid move: ${move}`)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)

  const table = await getHintsTable(m, p)
  return Response.json(table)
}

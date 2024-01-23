import { pushfoldHintsTable } from 'data/gto'
import { stringToPosition } from 'domain/position'
import { throwError } from 'utils/throw-error'

export const GET = async (
  request: Request,
  { params: { stack, position } }: { params: { stack: string; position: string } }
) => {
  const s = Number(stack)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)

  const table = await pushfoldHintsTable(p, s)
  return Response.json(table)
}

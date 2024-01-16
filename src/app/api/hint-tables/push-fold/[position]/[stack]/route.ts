import pushfoldHintsTable from 'data/pushfold'
import { stringToPosition } from 'domain/position'
import { throwError } from 'utils/throw-error'

export const GET = (
  request: Request,
  { params: { stack, position } }: { params: { stack: string; position: string } }
) => {
  const s = Number(stack)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)

  const table = pushfoldHintsTable(p, s)
  return Response.json(table)
}

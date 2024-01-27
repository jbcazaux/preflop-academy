import { pushfoldRange } from 'data/gto'
import { stringToPosition } from 'domain/position'
import { throwError } from 'utils/throw-error'

export const GET = async (
  request: Request,
  { params: { stack, position } }: { params: { stack: string; position: string } }
) => {
  const s = Number(stack)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)

  const range = await pushfoldRange(p, s)
  return Response.json(range)
}

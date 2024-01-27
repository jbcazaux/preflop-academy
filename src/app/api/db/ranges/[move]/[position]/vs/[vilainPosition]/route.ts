import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import logger from 'utils/logger'
import { throwError } from 'utils/throw-error'

const prisma = new PrismaClient({ log: ['info', 'query'] }).$extends(withAccelerate())

export const GET = async (
  request: Request,
  { params: { move, position, vilainPosition } }: { params: { move: string; position: string; vilainPosition: string } }
) => {
  const m = urlParamToMove(move) || throwError(`invalid move: ${move}`)
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)
  const vp = stringToPosition(vilainPosition) || throwError(`invalid vilain position: ${vilainPosition}`)

  const data = await prisma.ranges.findUnique({
    where: {
      move_position_versus: {
        move: m,
        position: p,
        versus: vp,
      },
    },
    select: {
      range: true,
    },
    cacheStrategy: { swr: 24 * 60 * 60, ttl: 24 * 60 * 60 },
  })
  logger.debug({ position, move, vilainPosition })
  return Response.json(data ? data.range : {})
}

export const runtime = 'edge'

import { PrismaClient } from '@prisma/client/edge'

import { RatioRange } from 'domain/combo'
import Position, { stringToPosition } from 'domain/position'
import { throwError } from 'utils/throw-error'

const prisma = new PrismaClient()

export const GET = async (
  request: Request,
  { params: { position, stack } }: { params: { position: string; stack: string } }
) => {
  const p = stringToPosition(position) || throwError(`invalid position: ${position}`)
  const bb = Number(stack)

  const ranges = await prisma.pushFold.findUnique({
    where: {
      bb_position: {
        bb,
        position: p,
      },
    },
    select: {
      range: true,
    },
  })

  return Response.json(ranges)
}

export const POST = async (request: Request) => {
  const { range, position, bb } = (await request.json()) as {
    range: RatioRange
    bb: number
    position: Position
  }

  const ranges = await prisma.pushFold.upsert({
    where: {
      bb_position: {
        bb,
        position,
      },
    },
    update: {
      range,
      updatedAt: new Date(),
    },
    create: {
      bb,
      position,
      range,
    },
  })
  return Response.json(ranges)
}

export const runtime = 'edge'

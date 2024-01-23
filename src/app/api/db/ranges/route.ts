import { PrismaClient } from '@prisma/client/edge'

import { RatioRange } from 'domain/combo'
import Move from 'domain/move'
import Position from 'domain/position'

const prisma = new PrismaClient({
  log: ['info'],
})

export const POST = async (request: Request) => {
  const { range, move, position, versus } = (await request.json()) as {
    range: RatioRange
    move: Move
    position: Position
    versus: Position
  }

  const ranges = await prisma.ranges.upsert({
    where: {
      move_position_versus: {
        move,
        position,
        versus,
      },
    },
    update: {
      range,
      updatedAt: new Date(),
    },
    create: {
      move,
      position,
      versus,
      range,
    },
  })
  return Response.json(ranges)
}

export const runtime = 'edge'

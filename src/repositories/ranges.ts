import 'server-only'

import { cache } from 'react'

import prisma from './prismaClient'

import { RatioRange } from 'domain/combo'
import Move from 'domain/move'
import Position from 'domain/position'

export const findAllRanges = cache(
  async (): Promise<ReadonlyArray<{ move: Move; position: Position; versus: Position | ''; range: RatioRange }>> => {
    const ranges = await prisma.ranges.findMany({
      select: {
        move: true,
        position: true,
        versus: true,
        range: true,
      },
      cacheStrategy: { swr: 24 * 60 * 60, ttl: 24 * 60 * 60 },
    })

    return ranges as ReadonlyArray<{ move: Move; position: Position; versus: Position | ''; range: RatioRange }>
  }
)

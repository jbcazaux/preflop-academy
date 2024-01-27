import 'server-only'

import { RatioRange } from 'domain/combo'
import Move from 'domain/move'
import Position from 'domain/position'
import { findAllRanges } from 'src/repositories/ranges'
import logger from 'utils/logger'

export const getRange = async (
  move: Move,
  heroPosition: Position,
  vilainPosition?: Position
): Promise<RatioRange | null> => {
  logger.debug({ where: 'gto-server.getRange', move, heroPosition, vilainPosition })

  if (move !== Move.OPEN && !vilainPosition) return null

  const ranges = await findAllRanges()

  const range = ranges
    .filter(r => r.position === heroPosition)
    .filter(r => r.move === move)
    .filter(r => (r.move !== Move.OPEN ? r.versus === vilainPosition : true))
    .map(r => r.range)
    .at(0)
  logger.debug({ where: 'gto-server.getRange', range })
  return range || null
}

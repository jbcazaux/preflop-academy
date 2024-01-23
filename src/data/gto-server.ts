import 'server-only'

import { convertToHintsTable } from 'domain/combo'
import HintTable from 'domain/hintTable'
import Move from 'domain/move'
import Position from 'domain/position'
import { findAllRanges } from 'src/repositories/ranges'
import logger from 'utils/logger'

export const getHintsTable = async (
  move: Move,
  heroPosition: Position,
  vilainPosition?: Position
): Promise<HintTable | null> => {
  logger.debug({ where: 'gto-server.getHintsTable', move, heroPosition, vilainPosition })

  if (move !== Move.OPEN && !vilainPosition) return null

  const ranges = await findAllRanges()

  const range = ranges
    .filter(r => r.position === heroPosition)
    .filter(r => r.move === move)
    .filter(r => (r.move !== Move.OPEN ? r.versus === vilainPosition : true))
    .map(r => r.range)
    .at(0)
  logger.debug({ where: 'gto-server.getHintsTable', range })
  return range ? convertToHintsTable(range) : null
}

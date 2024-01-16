import button from './button'
import cutoff from './cutoff'
import hj from './hj'
import sb from './sb'
import utg from './utg'

import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const open = new Map<Position, HintTable | null>([
  [Position.B, button],
  [Position.SB, sb],
  [Position.BB, null],
  [Position.UTG, utg],
  [Position.CO, cutoff],
  [Position.HJ, hj],
])

export default open

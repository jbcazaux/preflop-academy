import button from './button'
import cutoff from './cutoff'
import mp from './mp'
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
  [Position.MP, mp],
])

export default open

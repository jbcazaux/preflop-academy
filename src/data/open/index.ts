import Position from 'domain/position'
import HintTable from 'domain/hintTable'
import button from './button'
import cutoff from './cutoff'
import mp from './mp'
import sb from './sb'
import utg from './utg'

const open = new Map<Position, HintTable | null>([
  [Position.B, button],
  [Position.SB, sb],
  [Position.BB, null],
  [Position.UTG, utg],
  [Position.CO, cutoff],
  [Position.MP, mp],
])

export default open

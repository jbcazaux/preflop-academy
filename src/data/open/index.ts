import Position from 'domain/position'
import HintTable from 'domain/hintTable'
import button from './button'
import cutoff from './cutoff'
import mp from './mp'
import sb from './sb'
import utg from './utg'

const open = new Map<Position, HintTable | null>([
  [Position.B, localStorage.open?.button || button],
  [Position.SB, localStorage.open?.sb || sb],
  [Position.BB, null],
  [Position.UTG, localStorage.open?.utg || utg],
  [Position.CO, localStorage.open?.cutoff || cutoff],
  [Position.MP, localStorage.open?.mp || mp],
])

export default open

import bCalls3betBb from './bCalls3betBb'
import bCalls3betSb from './bCalls3betSb'
import coCalls3betB from './coCalls3betB'
import coCalls3betBb from './coCalls3betBb'
import coCalls3betSb from './coCalls3betSb'
import mpCalls3betB from './hjCalls3betB'
import mpCalls3betBb from './hjCalls3betBb'
import mpCalls3betCo from './hjCalls3betCo'
import mpCalls3betSb from './hjCalls3betSb'
import sbCalls3betBb from './sbCalls3betBb'
import utgCalls3betB from './utgCalls3betB'
import utgCalls3betBb from './utgCalls3betBb'
import utgCalls3betCo from './utgCalls3betCo'
import utgCalls3betHj from './utgCalls3betHj'
import utgCalls3betSb from './utgCalls3betSb'

import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const call3bet: Map<Position, Map<Position, HintTable>> = new Map([
  [
    Position.B,
    new Map<Position, HintTable>([
      [Position.SB, bCalls3betSb],
      [Position.BB, bCalls3betBb],
    ]),
  ],
  [
    Position.CO,
    new Map<Position, HintTable>([
      [Position.B, coCalls3betB],
      [Position.SB, coCalls3betSb],
      [Position.BB, coCalls3betBb],
    ]),
  ],
  [
    Position.HJ,
    new Map<Position, HintTable>([
      [Position.CO, mpCalls3betCo],
      [Position.B, mpCalls3betB],
      [Position.SB, mpCalls3betSb],
      [Position.BB, mpCalls3betBb],
    ]),
  ],
  [
    Position.UTG,
    new Map<Position, HintTable>([
      [Position.HJ, utgCalls3betHj],
      [Position.CO, utgCalls3betCo],
      [Position.B, utgCalls3betB],
      [Position.SB, utgCalls3betSb],
      [Position.BB, utgCalls3betBb],
    ]),
  ],
  [Position.SB, new Map<Position, HintTable>([[Position.BB, sbCalls3betBb]])],
])

export default call3bet

import b4betsBb from './b4betsBb'
import b4betsSb from './b4betsSb'
import co4betsB from './co4betsB'
import co4betsBb from './co4betsBb'
import co4betsSb from './co4betsSb'
import mp4betsB from './hj4betsB'
import mp4betsBb from './hj4betsBb'
import mp4betsCo from './hj4betsCo'
import mp4betsSb from './hj4betsSb'
import utg4betsB from './utg4betsB'
import utg4betsBb from './utg4betsBb'
import utg4betsCo from './utg4betsCo'
import utg4betsHj from './utg4betsHj'
import utg4betsSb from './utg4betsSb'

import sb4betsBb from 'data/4bet/sb4betsBb'
import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const _4bet: Map<Position, Map<Position, HintTable>> = new Map([
  [
    Position.B,
    new Map<Position, HintTable>([
      [Position.SB, b4betsSb],
      [Position.BB, b4betsBb],
    ]),
  ],
  [
    Position.CO,
    new Map<Position, HintTable>([
      [Position.B, co4betsB],
      [Position.SB, co4betsSb],
      [Position.BB, co4betsBb],
    ]),
  ],
  [
    Position.HJ,
    new Map<Position, HintTable>([
      [Position.CO, mp4betsCo],
      [Position.B, mp4betsB],
      [Position.SB, mp4betsSb],
      [Position.BB, mp4betsBb],
    ]),
  ],
  [
    Position.UTG,
    new Map<Position, HintTable>([
      [Position.HJ, utg4betsHj],
      [Position.CO, utg4betsCo],
      [Position.B, utg4betsB],
      [Position.SB, utg4betsSb],
      [Position.BB, utg4betsBb],
    ]),
  ],
  [Position.SB, new Map<Position, HintTable>([[Position.BB, sb4betsBb]])],
])

export default _4bet

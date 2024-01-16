import b3betsCo from './b3betsCo'
import b3betsHj from './b3betsHj'
import b3betsUtg from './b3betsUtg'
import bb3betsB from './bb3betsB'
import bb3betsCo from './bb3betsCo'
import bb3betsHj from './bb3betsHj'
import bb3betsSb from './bb3betsSb'
import bb3betsUtg from './bb3betsUtg'
import co3betsHj from './co3betsHj'
import co3betsUtg from './co3betsUtg'
import mp3betsUtg from './hj3betsUtg'
import sb3betsB from './sb3betsB'
import sb3betsCo from './sb3betsCo'
import sb3betsHj from './sb3betsHj'
import sb3betsUtg from './sb3betsUtg'

import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const _3bet: Map<Position, Map<Position, HintTable>> = new Map([
  [
    Position.B,
    new Map<Position, HintTable>([
      [Position.UTG, b3betsUtg],
      [Position.HJ, b3betsHj],
      [Position.CO, b3betsCo],
    ]),
  ],
  [
    Position.CO,
    new Map<Position, HintTable>([
      [Position.UTG, co3betsUtg],
      [Position.HJ, co3betsHj],
    ]),
  ],
  [Position.HJ, new Map<Position, HintTable>([[Position.UTG, mp3betsUtg]])],
  [Position.UTG, new Map<Position, HintTable>([])],
  [
    Position.BB,
    new Map<Position, HintTable>([
      [Position.UTG, bb3betsUtg],
      [Position.HJ, bb3betsHj],
      [Position.CO, bb3betsCo],
      [Position.B, bb3betsB],
      [Position.SB, bb3betsSb],
    ]),
  ],
  [
    Position.SB,
    new Map<Position, HintTable>([
      [Position.UTG, sb3betsUtg],
      [Position.HJ, sb3betsHj],
      [Position.CO, sb3betsCo],
      [Position.B, sb3betsB],
    ]),
  ],
])

export default _3bet

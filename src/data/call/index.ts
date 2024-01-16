import bbCallsB from './bbCallsB'
import bbCallsCo from './bbCallsCo'
import bbCallsHj from './bbCallsHj'
import bbCallsSb from './bbCallsSb'
import bbCallsUtg from './bbCallsUtg'
import bCallsCo from './bCallsCo'
import bCallsHj from './bCallsHj'
import bCallsUtg from './bCallsUtg'
import coCallsHj from './coCallsHj'
import coCallsUtg from './coCallsUtg'
import mpCallsUtg from './hjCallsUtg'
import sbCallsB from './sbCallsB'
import sbCallsCo from './sbCallsCo'
import sbCallsHj from './sbCallsHj'
import sbCallsUtg from './sbCallsUtg'

import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const call: Map<Position, Map<Position, HintTable>> = new Map([
  [
    Position.B,
    new Map<Position, HintTable>([
      [Position.UTG, bCallsUtg],
      [Position.HJ, bCallsHj],
      [Position.CO, bCallsCo],
    ]),
  ],
  [
    Position.CO,
    new Map<Position, HintTable>([
      [Position.UTG, coCallsUtg],
      [Position.HJ, coCallsHj],
    ]),
  ],
  [Position.HJ, new Map<Position, HintTable>([[Position.UTG, mpCallsUtg]])],
  [Position.UTG, new Map<Position, HintTable>([])],
  [
    Position.BB,
    new Map<Position, HintTable>([
      [Position.UTG, bbCallsUtg],
      [Position.HJ, bbCallsHj],
      [Position.CO, bbCallsCo],
      [Position.B, bbCallsB],
      [Position.SB, bbCallsSb],
    ]),
  ],
  [
    Position.SB,
    new Map<Position, HintTable>([
      [Position.UTG, sbCallsUtg],
      [Position.HJ, sbCallsHj],
      [Position.CO, sbCallsCo],
      [Position.B, sbCallsB],
    ]),
  ],
])

export default call

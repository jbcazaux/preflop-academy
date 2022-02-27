import bbCallsB from './bbCallsB'
import bbCallsCo from './bbCallsCo'
import bbCallsMp from './bbCallsMp'
import bbCallsSb from './bbCallsSb'
import bbCallsUtg from './bbCallsUtg'
import bCallsCo from './bCallsCo'
import bCallsMp from './bCallsMp'
import bCallsUtg from './bCallsUtg'
import coCallsMp from './coCallsMp'
import coCallsUtg from './coCallsUtg'
import mpCallsUtg from './mpCallsUtg'
import sbCallsB from './sbCallsB'
import sbCallsCo from './sbCallsCo'
import sbCallsMp from './sbCallsMp'
import sbCallsUtg from './sbCallsUtg'
import HintTable from 'domain/hintTable'
import Position from 'domain/position'

const call: Map<Position, Map<Position, HintTable>> = new Map([
  [
    Position.B,
    new Map<Position, HintTable>([
      [Position.UTG, bCallsUtg],
      [Position.MP, bCallsMp],
      [Position.CO, bCallsCo],
    ]),
  ],
  [
    Position.CO,
    new Map<Position, HintTable>([
      [Position.UTG, coCallsUtg],
      [Position.MP, coCallsMp],
    ]),
  ],
  [Position.MP, new Map<Position, HintTable>([[Position.UTG, mpCallsUtg]])],
  [Position.UTG, new Map<Position, HintTable>([])],
  [
    Position.BB,
    new Map<Position, HintTable>([
      [Position.UTG, bbCallsUtg],
      [Position.MP, bbCallsMp],
      [Position.CO, bbCallsCo],
      [Position.B, bbCallsB],
      [Position.SB, bbCallsSb],
    ]),
  ],
  [
    Position.SB,
    new Map<Position, HintTable>([
      [Position.UTG, sbCallsUtg],
      [Position.MP, sbCallsMp],
      [Position.CO, sbCallsCo],
      [Position.B, sbCallsB],
    ]),
  ],
])

export default call

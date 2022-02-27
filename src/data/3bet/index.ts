import b3betsCo from './b3betsCo'
import b3betsMp from './b3betsMp'
import b3betsUtg from './b3betsUtg'
import bb3betsB from './bb3betsB'
import bb3betsCo from './bb3betsCo'
import bb3betsMp from './bb3betsMp'
import bb3betsSb from './bb3betsSb'
import bb3betsUtg from './bb3betsUtg'
import co3betsMp from './co3betsMp'
import co3betsUtg from './co3betsUtg'
import mp3betsUtg from './mp3betsUtg'
import sb3betsB from './sb3betsB'
import sb3betsCo from './sb3betsCo'
import sb3betsMp from './sb3betsMp'
import sb3betsUtg from './sb3betsUtg'
import Position from 'domain/position'
import HintTable from 'domain/hintTable'

const _3bet: Map<Position, Map<Position, HintTable>> = new Map([
    [
        Position.B,
        new Map<Position, HintTable>([
            [Position.UTG, b3betsUtg],
            [Position.MP, b3betsMp],
            [Position.CO, b3betsCo],
        ]),
    ],
    [
        Position.CO,
        new Map<Position, HintTable>([
            [Position.UTG, co3betsUtg],
            [Position.MP, co3betsMp],
        ]),
    ],
    [Position.MP, new Map<Position, HintTable>([[Position.UTG, mp3betsUtg]])],
    [Position.UTG, new Map<Position, HintTable>([])],
    [
        Position.BB,
        new Map<Position, HintTable>([
            [Position.UTG, bb3betsUtg],
            [Position.MP, bb3betsMp],
            [Position.CO, bb3betsCo],
            [Position.B, bb3betsB],
            [Position.SB, bb3betsSb],
        ]),
    ],
    [
        Position.SB,
        new Map<Position, HintTable>([
            [Position.UTG, sb3betsUtg],
            [Position.MP, sb3betsMp],
            [Position.CO, sb3betsCo],
            [Position.B, sb3betsB],
        ]),
    ],
])

export default _3bet

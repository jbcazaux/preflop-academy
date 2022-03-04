import Position from 'domain/position'
import _2BB from './2bb'
import _3BB from './3bb'
import _4BB from './4bb'
import _5BB from './5bb'
import _6BB from './6bb'
import _7BB from './7bb'
import _8BB from './8bb'
import _9BB from './9bb'
import _10BB from './10bb'
import _11BB from './11bb'
import _12BB from './12bb'
import _13BB from './13bb'
import _14BB from './14bb'
import _15BB from './15bb'
import _16BB from './16bb'
import _17BB from './17bb'
import _18BB from './18bb'
import _19BB from './19bb'
import _20BB from './20bb'
import HintTable from 'domain/hintTable'

const map: { [key: number]: Map<Position, HintTable> } = {
  2: _2BB,
  3: _3BB,
  4: _4BB,
  5: _5BB,
  6: _6BB,
  7: _7BB,
  8: _8BB,
  9: _9BB,
  10: _10BB,
  11: _11BB,
  12: _12BB,
  13: _13BB,
  14: _14BB,
  15: _15BB,
  16: _16BB,
  17: _17BB,
  18: _18BB,
  19: _19BB,
  20: _20BB,
}

const pushfoldHintsTable = (position: Position, stack: number): HintTable | null => map[stack].get(position) || null

export default pushfoldHintsTable

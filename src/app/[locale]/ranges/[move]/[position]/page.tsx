import 'server-only'

import Move, { urlParamToMove } from 'domain/move'
import Position, { stringToPosition } from 'domain/position'
import PreflopRanges from 'src/app-components/ranges/PreflopRanges'
import { throwError } from 'utils/throw-error'

const Page = ({ params: { position, move } }: { params: { position: Position; move: Move } }) => {
  const hp = stringToPosition(position) || throwError(`invalid hero position: ${position}`)
  const m = urlParamToMove(move) || throwError('Invalid move ' + move)
  return <PreflopRanges heroPosition={hp} heroMove={m} />
}

export default Page

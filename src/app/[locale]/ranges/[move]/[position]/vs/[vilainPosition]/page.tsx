import 'server-only'

import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import PreflopRanges from 'src/app-components/ranges/PreflopRanges'
import { throwError } from 'utils/throw-error'

const Page = ({
  params: { position, move, vilainPosition },
}: {
  params: { position: string; move: string; vilainPosition: string }
}) => {
  const hp = stringToPosition(position) || throwError(`invalid hero position: ${position}`)
  const vp = stringToPosition(vilainPosition) || throwError(`invalid vilain position: ${vilainPosition}`)
  const m = urlParamToMove(move) || throwError(`Invalid move: ${move}`)
  return <PreflopRanges heroPosition={hp} heroMove={m} vilainPosition={vp} />
}

export default Page

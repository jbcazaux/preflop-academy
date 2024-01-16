import 'server-only'

import { unstable_setRequestLocale } from 'next-intl/server'

import Move, { moveToUrlParam, urlParamToMove } from 'domain/move'
import Position, { positionToUrlParam, stringToPosition } from 'domain/position'
import PreflopRanges from 'src/app-components/ranges/PreflopRanges'
import { throwError } from 'utils/throw-error'

const Page = ({
  params: { position, move, locale },
}: {
  params: { position: Position; move: Move; locale: string }
}) => {
  unstable_setRequestLocale(locale)
  const hp = stringToPosition(position) || throwError(`invalid hero position: ${position}`)
  const m = urlParamToMove(move) || throwError('Invalid move ' + move)
  return <PreflopRanges heroPosition={hp} heroMove={m} />
}

export default Page

const allowedPositionsWithoutVersus = [Position.B, Position.SB, Position.UTG, Position.HJ, Position.CO]
const allowedMovesWithoutVersus = [Move.OPEN]

export const generateStaticParams = () =>
  allowedMovesWithoutVersus.flatMap(move =>
    allowedPositionsWithoutVersus.map(position => ({
      position: positionToUrlParam(position),
      move: moveToUrlParam(move),
    }))
  )

export const dynamicParams = false

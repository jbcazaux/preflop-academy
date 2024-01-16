import 'server-only'

import { unstable_setRequestLocale } from 'next-intl/server'

import { isMoveAllowed } from 'data/movesByPositions'
import Move, { moveToUrlParam, urlParamToMove } from 'domain/move'
import Position, { positionToUrlParam, stringToPosition } from 'domain/position'
import PreflopRanges from 'src/app-components/ranges/PreflopRanges'
import { throwError } from 'utils/throw-error'

const Page = ({
  params: { position, move, vilainPosition, locale },
}: {
  params: { position: string; move: string; vilainPosition: string; locale: string }
}) => {
  unstable_setRequestLocale(locale)

  const hp = stringToPosition(position) || throwError(`invalid hero position: ${position}`)
  const vp = stringToPosition(vilainPosition) || throwError(`invalid vilain position: ${vilainPosition}`)
  const m = urlParamToMove(move) || throwError(`Invalid move: ${move}`)
  return <PreflopRanges heroPosition={hp} heroMove={m} vilainPosition={vp} />
}

export default Page

const allowedMovesWithVersus = [Move.CALL, Move.CALL3BET, Move._3BET, Move._4BET]
const allPositions = [Position.B, Position.SB, Position.BB, Position.UTG, Position.HJ, Position.CO]

export const generateStaticParams = () =>
  allPositions
    .flatMap(position =>
      allPositions.flatMap(vilainPosition =>
        allowedMovesWithVersus.map(move => {
          if (!isMoveAllowed(move, position, vilainPosition)) {
            return null
          }
          return {
            position: positionToUrlParam(position),
            move: moveToUrlParam(move),
            vilainPosition: positionToUrlParam(vilainPosition),
          }
        })
      )
    )
    .filter(Boolean)

export const dynamicParams = false

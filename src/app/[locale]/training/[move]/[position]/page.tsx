import 'server-only'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import Training from 'app-components/training/Training'
import TrainingMenu from 'app-components/training/trainingMenu/TrainingMenu'
import Horizontal from 'components/layout/Horizontal'
import { isMovePossible } from 'data/movesByPositions'
import Move, { moveToUrlParam, urlParamToMove } from 'domain/move'
import Position, { stringToPosition } from 'domain/position'

const Page = ({
  params: { position, move, locale },
}: {
  params: { position: string; move: string; locale: string }
}) => {
  unstable_setRequestLocale(locale)

  const messages = useMessages()
  const m = urlParamToMove(move) || null
  const p = stringToPosition(position) || null
  return (
    <NextIntlClientProvider messages={messages}>
      <Horizontal>
        <TrainingMenu heroPosition={p} moveType={m} />
        <Training heroPosition={p} move={m} />
      </Horizontal>
    </NextIntlClientProvider>
  )
}

export default Page

const allMoves = [Move.CALL, Move.CALL3BET, Move._3BET, Move._4BET, Move.OPEN]
const allPositions = [Position.B, Position.SB, Position.BB, Position.UTG, Position.MP, Position.CO]

export const generateStaticParams = () =>
  allMoves.flatMap(move =>
    allPositions.map(position => {
      if (!isMovePossible(move, position)) {
        return null
      }

      return {
        move: moveToUrlParam(move),
        position: position.toLowerCase(),
      }
    })
  )

export const dynamicParams = false

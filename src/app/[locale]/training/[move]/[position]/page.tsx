import 'server-only'

import { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import Training from 'app-components/training/Training'
import TrainingMenu from 'app-components/training/trainingMenu/TrainingMenu'
import Horizontal from 'components/layout/Horizontal'
import { isMovePossible } from 'data/movesByPositions'
import Move, { moveToUrlParam, urlParamToMove } from 'domain/move'
import Position, { positionToUrlParam, stringToPosition } from 'domain/position'

export const generateMetadata = async ({
  params: { position, move, locale },
}: {
  params: { position: string; move: string; locale: string }
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'training' })

  return {
    title: t('metadata.title'),
    description: t('metadata.description', { position, move }),
  }
}

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
const allPositions = [Position.B, Position.SB, Position.BB, Position.UTG, Position.HJ, Position.CO]

export const generateStaticParams = () =>
  allMoves
    .flatMap(move =>
      allPositions.map(position => {
        if (!isMovePossible(move, position)) {
          return null
        }

        return {
          move: moveToUrlParam(move),
          position: positionToUrlParam(position),
        }
      })
    )
    .filter(Boolean)
    .concat(
      allMoves.flatMap(move => ({
        position: 'random',
        move: moveToUrlParam(move),
      }))
    )
    .concat(
      allPositions
        .flatMap(position => ({
          position: positionToUrlParam(position),
          move: 'random',
        }))
        .concat({
          position: 'random',
          move: 'random',
        })
    )

export const dynamicParams = false

import 'server-only'

import Training from 'app-components/training/Training'
import TrainingMenu from 'app-components/training/trainingMenu/TrainingMenu'
import { urlParamToMove } from 'domain/move'
import { stringToPosition } from 'domain/position'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import Horizontal from 'components/layout/Horizontal'

const Page = ({ params: { position, move } }: { params: { position: string; move: string } }) => {
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

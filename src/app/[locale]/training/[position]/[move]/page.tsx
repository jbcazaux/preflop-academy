import 'server-only'

import Training from 'app-components/training/Training'
import TrainingMenu from 'app-components/training/trainingMenu/TrainingMenu'
import Move from 'domain/move'
import Position from 'domain/position'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import Horizontal from 'components/layout/Horizontal'

const Page = ({ params: { position, move } }: { params: { position: Position; move: Move } }) => {
  const messages = useMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Horizontal>
        <TrainingMenu heroPosition={position} moveType={move} />
        <Training heroPosition={position} move={move} />
      </Horizontal>
    </NextIntlClientProvider>
  )
}

export default Page

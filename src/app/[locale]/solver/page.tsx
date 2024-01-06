import { NextIntlClientProvider, useMessages } from 'next-intl'
import Solver from 'src/app-components/solver/Solver'

const Page = () => {
  const messages = useMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Solver />
    </NextIntlClientProvider>
  )
}

export default Page

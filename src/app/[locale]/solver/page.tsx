import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import Solver from 'src/app-components/solver/Solver'

const Page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale)
  const messages = useMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Solver />
    </NextIntlClientProvider>
  )
}

export default Page

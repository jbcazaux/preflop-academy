import { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import Solver from 'src/app-components/solver/Solver'

export const generateMetadata = async ({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'solver' })

  return {
    title: t('metadata.title'),
  }
}

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

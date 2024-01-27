import { AbstractIntlMessages, NextIntlClientProvider, useMessages } from 'next-intl'
import React, { ReactNode } from 'react'

import ClientProviders from './clientProviders'

import { Locale } from 'i18n/types'

interface Props {
  children: ReactNode
  locale: Locale
}

const Providers = ({ children, locale }: Props) => {
  const { error } = useMessages()
  return (
    <ClientProviders>
      <NextIntlClientProvider locale={locale} messages={{ error } as AbstractIntlMessages}>
        {children}
      </NextIntlClientProvider>
    </ClientProviders>
  )
}

export default Providers

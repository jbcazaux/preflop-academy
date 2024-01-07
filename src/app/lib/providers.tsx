import React, { ReactNode } from 'react'

import ClientProviders from './clientProviders'

import { Locale } from 'i18n/types'

interface Props {
  children: ReactNode
  locale: Locale
}

const Providers = ({ children }: Props) => <ClientProviders>{children}</ClientProviders>

export default Providers

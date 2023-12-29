import React, { ReactNode } from 'react'
import { Locale } from 'i18n/types'

import ClientProviders from './clientProviders'

interface Props {
  children: ReactNode
  locale: Locale
}

const Providers = ({ children }: Props) => <ClientProviders>{children}</ClientProviders>

export default Providers

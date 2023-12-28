'use client'

import { Locale } from 'i18n/types'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

interface Props {
  children: React.ReactNode
  locale: Locale
}

const Providers = ({ children }: Props) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export default Providers

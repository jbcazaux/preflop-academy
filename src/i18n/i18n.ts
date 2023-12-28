import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Locale } from './types'

const locales = ['en', 'fr']

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`./${locale}.json`)).default,
  }
})

'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('error')

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>{t('generic')}</h2>
      <button onClick={() => reset()}>{t('try-again')}</button>
    </div>
  )
}

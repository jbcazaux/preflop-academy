'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const TestI18N = () => {
  const t = useTranslations()
  useState(null)

  return (
    <section>
      <h2>{t('title')}</h2>
    </section>
  )
}

export default TestI18N

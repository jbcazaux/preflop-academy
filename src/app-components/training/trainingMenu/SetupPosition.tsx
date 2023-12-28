import { useTranslations } from 'next-intl'

const SetupPosition = () => {
  const t = useTranslations()
  return <div>{t('training.setup.position')}</div>
}

export default SetupPosition

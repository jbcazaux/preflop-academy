import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as en from './i18n/en.json'
import * as fr from './i18n/fr.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr,
      en,
    },
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

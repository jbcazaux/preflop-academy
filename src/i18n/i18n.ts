import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as en from './en.json'
import * as fr from './fr.json'

i18n.use(initReactI18next).init({
  resources: {
    fr,
    en,
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

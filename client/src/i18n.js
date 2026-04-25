import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import ka from './locales/ka/translation.json'

function mergeWithSaved(defaults, storageKey) {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return defaults
    const flat = JSON.parse(saved)
    const merged = JSON.parse(JSON.stringify(defaults))
    for (const [dotKey, val] of Object.entries(flat)) {
      const parts = dotKey.split('.')
      let cur = merged
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {}
        cur = cur[parts[i]]
      }
      cur[parts[parts.length - 1]] = val
    }
    return merged
  } catch {
    return defaults
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: mergeWithSaved(en, 'cg_translations_en') },
    ka: { translation: mergeWithSaved(ka, 'cg_translations_ka') },
  },
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng)
  document.documentElement.lang = lng
})

export default i18n

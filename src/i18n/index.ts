import { createI18n, type I18n } from 'vue-i18n'
import en from './en.json'
import ptBR from './pt-BR.json'

const STORAGE_KEY = 'portfolio-locale'
const VALID_LOCALES = ['en', 'pt-BR'] as const
export type Locale = (typeof VALID_LOCALES)[number]

const isLocale = (value: string): value is Locale =>
  (VALID_LOCALES as readonly string[]).includes(value)

const getDefaultLocale = (): Locale => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && isLocale(stored)) {
    return stored
  }

  const browserLang = navigator.language
  if (browserLang.startsWith('pt')) {
    return 'pt-BR'
  }
  return 'en'
}

export const i18n: I18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR,
  },
})

const currentLocaleRef = (i18n.global.locale as unknown as { value: Locale })

export const setLocale = (locale: Locale): void => {
  currentLocaleRef.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale === 'pt-BR' ? 'pt-BR' : 'en')
}

export const getLocale = (): Locale => {
  const current = currentLocaleRef.value
  return isLocale(current) ? current : 'en'
}

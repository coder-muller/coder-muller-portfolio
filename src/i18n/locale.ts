import { createContext, useContext } from 'react'
import { dictionaries, type Dictionary, type Locale } from './content'

type LocaleContextValue = {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: 'pt',
  t: dictionaries.pt,
  setLocale: () => {},
})

export function useLocale() {
  return useContext(LocaleContext)
}

const STORAGE_KEY = 'locale'

export function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    // storage bloqueado: segue para o idioma do navegador
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // sem storage, o idioma vale só para esta visita
  }
}

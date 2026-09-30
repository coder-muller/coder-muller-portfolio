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
    // storage bloqueado: segue no idioma padrão
  }
  // Português é o padrão; inglês só quando escolhido no menu.
  return 'pt'
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // sem storage, o idioma vale só para esta visita
  }
}

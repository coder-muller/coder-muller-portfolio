import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Locale } from './content'
import { LocaleContext, persistLocale, readInitialLocale } from './locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)
  const t = dictionaries[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description)
  }, [locale, t])

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale: (next: Locale) => {
        setLocaleState(next)
        persistLocale(next)
      },
    }),
    [locale, t],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}

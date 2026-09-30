import { useEffect, useRef, type ReactNode } from 'react'
import { useAnimate, useReducedMotion } from 'motion/react'
import { useLocale } from '../i18n/locale'

// Troca de idioma: um desfoque curto disfarça o texto trocando no lugar.
export default function LocaleFade({ children }: { children: ReactNode }) {
  const { locale } = useLocale()
  const reduce = useReducedMotion()
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const previous = useRef(locale)

  useEffect(() => {
    if (previous.current === locale) return
    previous.current = locale
    const el = scope.current
    const controls = animate(
      el,
      reduce
        ? { opacity: [0.4, 1] }
        : { opacity: [0.35, 1], filter: ['blur(6px)', 'blur(0px)'] },
      { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
    )
    // Filtro residual cria camada e contexto de empilhamento na página toda.
    controls.then(() => {
      el.style.filter = ''
    })
    return () => controls.stop()
  }, [locale, reduce, animate, scope])

  return (
    <div id="page" ref={scope}>
      {children}
    </div>
  )
}

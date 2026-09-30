import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#0e0c0b', light: '#f8f6f3' }
const LIGHT_QUERY = '(prefers-color-scheme: light)'

// Sem escolha salva, o tema segue o sistema. O script inline no index.html
// aplica a escolha salva antes da primeira pintura.
export function resolvedTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

export function subscribeTheme(onChange: () => void) {
  const mq = window.matchMedia(LIGHT_QUERY)
  mq.addEventListener('change', onChange)
  window.addEventListener('themechange', onChange)
  return () => {
    mq.removeEventListener('change', onChange)
    window.removeEventListener('themechange', onChange)
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute('content', THEME_COLOR[theme])
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // sem storage, a escolha vale só para esta visita
  }
  window.dispatchEvent(new Event('themechange'))
}

// O novo tema entra num círculo que cresce a partir do botão.
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce || !origin) {
    apply(theme)
    return
  }

  const { x, y } = origin
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const transition = document.startViewTransition(() => flushSync(() => apply(theme)))
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        {
          duration: 700,
          easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {})
}

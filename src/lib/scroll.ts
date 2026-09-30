import type Lenis from 'lenis'

// Ponto único de controle do scroll: com Lenis (movimento completo) ou nativo
// (movimento reduzido).
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function lockScroll() {
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  document.documentElement.style.overflow = ''
  lenis?.start()
}

export function scrollToId(id: string) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -24, force: true })
    return
  }
  if (target === 0) window.scrollTo({ top: 0 })
  else target.scrollIntoView()
}

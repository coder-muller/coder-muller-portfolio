import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      anchors: { offset: -24 },
      autoRaf: true,
    })

    return () => lenis.destroy()
  }, [])
}

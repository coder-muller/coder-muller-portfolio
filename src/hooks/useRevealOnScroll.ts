import { useEffect } from 'react'

export function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          const siblings = target.parentElement
            ? Array.from(target.parentElement.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)'))
            : [target]
          const index = siblings.indexOf(target)

          window.setTimeout(() => target.classList.add('in'), Math.max(0, index) * 80)
          observer.unobserve(target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

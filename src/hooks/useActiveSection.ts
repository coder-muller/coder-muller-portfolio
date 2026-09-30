import { useEffect, useState } from 'react'
import type { SectionId } from '../i18n/content'

// A seção ativa é a que cruza a faixa central da viewport.
export function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [ids])

  return active
}

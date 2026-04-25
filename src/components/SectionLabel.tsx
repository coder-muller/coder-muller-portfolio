import type { ReactNode } from 'react'

type SectionLabelProps = {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      data-reveal
      className="reveal mb-[52px] text-[10px] uppercase tracking-[0.25em] text-muted2 before:content-['//_']"
    >
      {children}
    </div>
  )
}

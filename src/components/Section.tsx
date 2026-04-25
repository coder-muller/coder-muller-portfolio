import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  const sectionClasses =
    'relative border-t border-rule px-[clamp(24px,5vw,80px)] py-[clamp(80px,10vw,140px)]'

  return (
    <section id={id} className={`${sectionClasses} ${className}`.trim()}>
      {children}
    </section>
  )
}

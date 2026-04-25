import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  variant: 'solid' | 'ghost'
  children: ReactNode
  className?: string
}

const baseClasses =
  'btn inline-flex min-h-11 items-center px-6 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] whitespace-nowrap border no-underline transition-[background,color,border-color,transform] duration-200 [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] max-[420px]:w-full max-[420px]:justify-center'

const variantClasses = {
  solid: 'btn-solid border-dim bg-dim text-bg',
  ghost: 'btn-ghost border-rule bg-transparent text-muted',
} as const

export function ButtonLink({ href, variant, children, className = '' }: ButtonLinkProps) {
  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </a>
  )
}

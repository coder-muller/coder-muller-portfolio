import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { EASE_OUT } from '../lib/motion'

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

// O whileInView fica no contêiner visível: filhos 100% transladados dentro de
// uma máscara não cruzam a viewport, então a animação chega por variants.
export function WordsReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  onMount = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  onMount?: boolean
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT }

  return (
    <motion.span initial="hidden" {...trigger} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${wordClassName ?? ''}`}
              variants={{
                hidden: reduce ? { opacity: 0 } : { transform: 'translateY(108%)' },
                show: {
                  opacity: 1,
                  transform: 'translateY(0%)',
                  transition: { duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'li' | 'span'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateY(${y}px)`, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  )
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      count.set(value)
      return
    }
    const controls = animate(count, value, { duration: 1.8, ease: EASE_OUT })
    return () => controls.stop()
  }, [inView, reduce, value, count])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// Seta que sai pelo canto e volta pelo lado oposto no hover.
export function SwapArrow({ className = 'size-4' }: { className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`} aria-hidden>
      <ArrowUpRightIcon
        weight="bold"
        className="size-full transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full"
      />
      <ArrowUpRightIcon
        weight="bold"
        className="absolute inset-0 size-full -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  )
}

type LinkButtonProps = ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
}

export function LinkButton({
  variant = 'primary',
  icon = <SwapArrow />,
  className = '',
  children,
  ...props
}: LinkButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-accent text-accent-fg hover:bg-[oklch(0.76_0.19_42)]'
      : 'text-fg ring-1 ring-line-strong ring-inset hover:bg-fg/[0.06]'

  return (
    <a
      className={`group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full pr-5 pl-6 text-[15px] font-medium whitespace-nowrap transition-[background-color,scale] duration-200 active:scale-[0.97] ${styles} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </a>
  )
}

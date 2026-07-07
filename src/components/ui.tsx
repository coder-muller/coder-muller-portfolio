import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'

// As máscaras (overflow-hidden) cortam 100% do filho transladado, o que impede
// o IntersectionObserver de vê-lo — por isso o whileInView fica no contêiner
// visível e a animação chega aos filhos por propagação de variants.

// Palavras marcadas com *asteriscos* recebem a cor de acento.
export function MaskWords({
  text,
  delay = 0,
  className,
}: {
  text: string
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((word, i) => {
        const accent = word.startsWith('*')
        const clean = word.replaceAll('*', '')
        return (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span
                custom={i}
                variants={{
                  hidden: { y: reduce ? 0 : '110%' },
                  show: (idx: number) => ({
                    y: 0,
                    transition: { duration: 0.7, ease: EASE, delay: delay + idx * 0.03 },
                  }),
                }}
                className={`inline-block will-change-transform ${accent ? 'text-accent' : ''}`}
              >
                {clean}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </motion.span>
  )
}

export function CountUp({
  target,
  suffix = '',
  pad = 0,
}: {
  target: number
  suffix?: string
  pad?: number
}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return
        started.current = true
        const duration = 1400
        const steps = 50
        const inc = target / steps
        let current = 0
        const t = setInterval(() => {
          current += inc
          if (current >= target) {
            setCount(target)
            clearInterval(t)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
      }}
      viewport={{ once: true }}
    >
      {String(count).padStart(pad, '0')}
      {suffix}
    </motion.span>
  )
}

export function SectionTitle({ num, label }: { num: string; label: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-[clamp(40px,6vw,80px)]"
    >
      <div className="flex items-start gap-6">
        <span className="font-mono text-sm font-bold text-accent">[{num}]</span>
        <h2 className="overflow-hidden font-display text-[clamp(32px,5vw,64px)] font-extrabold uppercase leading-none tracking-[-0.02em] text-bright">
          <motion.span
            variants={{
              hidden: { y: reduce ? 0 : '110%' },
              show: { y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
            className="block will-change-transform"
          >
            {label}
          </motion.span>
        </h2>
      </div>
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
        }}
        className="mt-6 h-0.5 max-w-[120px] origin-left bg-accent"
      />
    </motion.div>
  )
}

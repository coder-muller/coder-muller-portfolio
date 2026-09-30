import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { AsteriskIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import { stackRows } from '../i18n/content'
import { Reveal } from './primitives'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// A faixa anda sozinha, acelera com a velocidade do scroll e troca de sentido
// quando o scroll inverte.
function Row({ items, baseVelocity, muted }: { items: string[]; baseVelocity: number; muted?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    const moveBy = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(f))
    baseX.set(baseX.get() + moveBy)
  })

  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span
            className={`px-[clamp(16px,2vw,32px)] text-[clamp(40px,6.4vw,96px)] leading-[1.1] font-semibold tracking-[-0.05em] whitespace-nowrap ${
              muted ? 'text-subtle' : 'text-fg'
            }`}
          >
            {item}
          </span>
          <AsteriskIcon weight="bold" className="size-[clamp(16px,2vw,28px)] shrink-0 text-accent" aria-hidden />
        </li>
      ))}
    </ul>
  )

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max">
        {copy(false)}
        {copy(true)}
      </motion.div>
    </div>
  )
}

export default function StackMarquee() {
  const { t } = useLocale()

  return (
    <section id="stack" aria-labelledby="stack-title" className="pb-[clamp(96px,12vw,180px)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <h2 id="stack-title" className="font-mono text-[13px] text-muted">
          {t.stack.title}
        </h2>
      </Reveal>
      <div className="mt-8 flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={stackRows[0]} baseVelocity={-2.2} />
        <Row items={stackRows[1]} baseVelocity={2.2} muted />
      </div>
    </section>
  )
}

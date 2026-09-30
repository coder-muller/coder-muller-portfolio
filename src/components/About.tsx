import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useLocale } from '../i18n/locale'
import { CountUp, Reveal } from './primitives'

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

const MANIFESTO =
  'max-w-[32ch] text-[clamp(26px,3.4vw,50px)] leading-[1.12] font-medium tracking-[-0.035em] text-fg'

// O texto acende palavra por palavra conforme a leitura acompanha o scroll.
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  if (reduce) {
    return <p className={MANIFESTO}>{text}</p>
  }

  return (
    <p ref={ref} className={MANIFESTO}>
      {words.map((word, i) => {
        const start = i / words.length
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

export default function About() {
  const { t } = useLocale()

  return (
    <section
      id="about"
      className="mx-auto max-w-[1400px] px-4 py-[clamp(112px,16vw,220px)] sm:px-8 lg:px-12"
    >
      <div className="lg:pl-[12%]">
        <ScrollLitText text={t.about.manifesto} />
      </div>

      <div className="mt-[clamp(80px,11vw,160px)] grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
        {t.about.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="border-t border-line pt-6">
            <p className="text-[clamp(52px,7vw,96px)] leading-none font-semibold tracking-[-0.06em] text-fg">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-5 text-[15px] font-medium text-fg">{stat.label}</p>
            <p className="mt-1.5 max-w-[26ch] text-[14px] leading-normal text-muted">
              {stat.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

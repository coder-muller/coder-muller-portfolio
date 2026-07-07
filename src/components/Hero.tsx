import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE } from '../lib/motion'

function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { y: '110%', rotate: 4 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.04 }}
          className="inline-block will-change-transform"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 180])
  const y2 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : -90])

  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-[clamp(24px,5vw,80px)] pt-20 pb-[60px]">
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[50vw] w-[50vw] bg-[radial-gradient(circle,#FF3B0020_0%,transparent_70%)] blur-[80px]" />

      <motion.p
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent"
      >
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="h-px w-10 origin-left bg-accent"
        />
        Engenheiro de Software
      </motion.p>

      <div className="relative z-[1]">
        <motion.div style={{ y: y1 }}>
          <h1 className="font-display text-[clamp(48px,15vw,200px)] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] text-bright">
            <Letters text="GUILHERME" delay={0.15} />
          </h1>
        </motion.div>

        <motion.div style={{ y: y2 }}>
          <h1 className="ml-0 flex flex-wrap items-baseline font-display text-[clamp(48px,15vw,200px)] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] sm:ml-[5vw]">
            <motion.span
              initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="inline-block bg-accent px-[0.08em] text-bg"
            >
              MÜLLER.
            </motion.span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 right-[clamp(24px,5vw,80px)] hidden rotate-180 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dim [writing-mode:vertical-rl] sm:flex"
      >
        <span>Scroll to explore</span>
        <span className="h-[60px] w-px bg-dim" />
      </motion.div>
    </section>
  )
}

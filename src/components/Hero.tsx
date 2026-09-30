import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import { EASE_OUT } from '../lib/motion'
import EqualizerField from './EqualizerField'
import { LinkButton, WordsReveal } from './primitives'

function Enter({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(16px)', filter: 'blur(8px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,oklch(0.72_0.19_42/0.16),transparent_70%)]"
      />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-4 pt-32 pb-10 sm:px-8 md:pb-14 lg:px-12"
      >
        <h1 className="text-[clamp(44px,7.6vw,120px)] leading-[0.95] font-semibold tracking-[-0.05em] text-fg">
          <WordsReveal text={t.hero.headline[0]} onMount delay={0.25} className="block" />
          <WordsReveal
            text={t.hero.headline[1]}
            onMount
            delay={0.4}
            className="block text-subtle"
          />
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Enter delay={0.75}>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted md:text-lg">
              {t.hero.subtext}
            </p>
          </Enter>
          <Enter delay={0.9} className="flex flex-wrap items-center gap-3">
            <LinkButton href="#contact">{t.hero.primary}</LinkButton>
            <LinkButton
              href="#projects"
              variant="ghost"
              icon={
                <ArrowDownIcon
                  weight="bold"
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                  aria-hidden
                />
              }
            >
              {t.hero.secondary}
            </LinkButton>
          </Enter>
        </div>
      </motion.div>

      <div className="h-[26svh] min-h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,black_35%),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-composite:intersect]">
        <EqualizerField />
      </div>
    </section>
  )
}

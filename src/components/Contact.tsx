import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import { EMAIL, socials } from '../i18n/content'
import { Reveal, SwapArrow, WordsReveal } from './primitives'

// O botão é puxado de leve pelo cursor e volta com mola quando ele sai.
function MagneticLink({ href, children }: { href: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="group inline-flex h-16 items-center gap-3 rounded-full bg-accent pr-6 pl-8 text-[17px] font-medium whitespace-nowrap text-accent-fg transition-[background-color,scale] duration-200 hover:bg-[oklch(0.76_0.19_42)] active:scale-[0.96]"
    >
      {children}
      <SwapArrow className="size-5" />
    </motion.a>
  )
}

function CopyEmail() {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-16 max-w-full items-center gap-3 rounded-full pr-6 pl-7 text-[15px] text-fg ring-1 ring-line-strong ring-inset transition-[background-color,scale] duration-200 hover:bg-fg/[0.06] active:scale-[0.96]"
    >
      <span className="truncate font-mono text-[14px] text-muted">{EMAIL}</span>
      <span className="relative grid size-5 shrink-0 place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="grid place-items-center"
          >
            {copied ? (
              <CheckIcon weight="bold" className="size-4.5 text-accent" aria-hidden />
            ) : (
              <CopyIcon className="size-4.5" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? t.contact.copied : t.contact.copy}
      </span>
    </button>
  )
}

export default function Contact() {
  const { t } = useLocale()

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8 lg:px-12">
      <div className="relative isolate overflow-hidden rounded-[40px] bg-surface px-6 py-16 ring-1 ring-line sm:px-12 sm:py-24 lg:px-20 lg:py-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_110%,oklch(0.72_0.19_42/0.22),transparent_70%),radial-gradient(40%_50%_at_0%_0%,oklch(0.965_0.004_80/0.04),transparent_70%)]"
        />

        <h2 className="text-[clamp(48px,8.4vw,136px)] leading-[0.92] font-semibold tracking-[-0.055em] text-fg">
          <WordsReveal text={t.contact.title[0]} className="block" />
          <WordsReveal text={t.contact.title[1]} delay={0.12} className="block text-subtle" />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[40ch] text-[17px] leading-relaxed text-muted md:text-lg">
            {t.contact.body}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center gap-3">
          <MagneticLink href={`mailto:${EMAIL}`}>{t.contact.primary}</MagneticLink>
          <CopyEmail />
        </Reveal>

        <Reveal delay={0.4} className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-[12px] text-subtle">{t.contact.socialLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 py-2 text-[17px] text-fg"
                >
                  <span className="relative">
                    {s.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                  <ArrowUpRightIcon
                    weight="bold"
                    className="size-3.5 text-subtle transition-[color,translate] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

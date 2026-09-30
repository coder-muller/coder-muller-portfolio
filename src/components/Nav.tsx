import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { ArrowUpRightIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import { EMAIL, socials, type Locale, type SectionId } from '../i18n/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { EASE_DRAWER, EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { lockScroll, scrollToId, unlockScroll } from '../lib/scroll'
import { resolvedTheme, setTheme, subscribeTheme } from '../lib/theme'
import LogoMark from './LogoMark'
import { RollText } from './primitives'

const SECTION_IDS: SectionId[] = ['top', 'about', 'projects', 'services', 'stack', 'contact']

type Origin = { x: number; y: number; r: number }

export default function Nav() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0, r: 0 })
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  // O menu nasce do botão: o círculo cresce a partir do centro dele até cobrir
  // o canto mais distante da tela.
  const toggle = () => {
    if (open) {
      setOpen(false)
      return
    }
    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth
    const y = rect ? rect.top + rect.height / 2 : 0
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    setOrigin({ x, y, r })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const page = document.getElementById('page')
    const button = buttonRef.current
    lockScroll()
    page?.setAttribute('inert', '')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      page?.removeAttribute('inert')
      unlockScroll()
      button?.focus({ preventScroll: true })
    }
  }, [open])

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpen(false)
    unlockScroll()
    scrollToId(id)
  }

  const enter = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, transform: 'translateY(-12px)', filter: 'blur(6px)' },
          animate: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
          transition: { duration: 0.8, ease: EASE_OUT, delay },
        }

  return (
    <>
      <a
        href="#content"
        className="sr-only z-[60] rounded-full bg-accent px-5 py-3 text-[15px] font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.nav.skip}
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* Desfoque progressivo: só aparece quando há conteúdo passando por baixo. */}
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 -z-10 h-28 bg-linear-to-b from-bg/85 to-transparent backdrop-blur-md transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] ${
            scrolled && !open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 md:pt-6 lg:px-12">
          <motion.a
            {...enter(0.1)}
            href="#top"
            onClick={go('top')}
            aria-label={`Guilherme Müller, ${t.footer.backToTop.toLowerCase()}`}
            className="group pointer-events-auto -mx-2 flex h-11 items-center gap-2.5 rounded-full px-2"
          >
            <LogoMark className="size-[22px]" />
            <RollText
              text="Guilherme Müller"
              className="text-[15px] font-medium tracking-[-0.01em] text-fg"
            />
          </motion.a>

          <motion.div {...enter(0.2)} className="pointer-events-auto flex items-center gap-5">
            <SectionIndicator label={active === 'top' || open ? null : t.sections[active]} />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={buttonRef}
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                className="glass flex h-11 items-center gap-3 rounded-full pr-4 pl-5 text-[14px] font-medium text-fg ring-1 ring-line transition-[scale] duration-200 active:scale-[0.96]"
              >
                <RollText text={t.nav.menu} swapTo={t.nav.close} active={open} />
                <span className="relative block h-2.5 w-3.5" aria-hidden>
                  <span
                    className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-out ${
                      open ? 'top-[4.25px] rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,rotate] duration-300 ease-out ${
                      open ? 'top-[4.25px] -rotate-45' : 'top-[8.5px]'
                    }`}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MenuOverlay key="menu" origin={origin} active={active} onNavigate={go} />}
      </AnimatePresence>
    </>
  )
}

function ThemeToggle() {
  const { t } = useLocale()
  const theme = useSyncExternalStore(subscribeTheme, resolvedTheme, () => 'dark' as const)
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      aria-label={next === 'light' ? t.nav.themeLight : t.nav.themeDark}
      className="glass grid size-11 place-items-center rounded-full text-fg ring-1 ring-line transition-[scale] duration-200 active:scale-[0.96]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={next}
          initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="grid place-items-center"
        >
          {next === 'light' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function SectionIndicator({ label }: { label: string | null }) {
  return (
    <span
      className="hidden h-11 items-center overflow-hidden font-mono text-[12px] text-muted sm:flex"
      aria-hidden
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, transform: 'translateY(10px)', filter: 'blur(4px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-10px)', filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function MenuOverlay({
  origin,
  active,
  onNavigate,
}: {
  origin: Origin
  active: SectionId
  onNavigate: (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const firstLink = useRef<HTMLAnchorElement>(null)
  const at = `${origin.x}px ${origin.y}px`

  useEffect(() => {
    firstLink.current?.focus({ preventScroll: true })
  }, [])

  const shape = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        initial: { clipPath: `circle(0px at ${at})` },
        animate: {
          clipPath: `circle(${origin.r}px at ${at})`,
          transition: { duration: 0.8, ease: EASE_DRAWER },
        },
        exit: {
          clipPath: `circle(0px at ${at})`,
          transition: { duration: 0.55, ease: EASE_IN_OUT, delay: 0.1 },
        },
      }

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { transform: 'translateY(110%)' },
    animate: {
      opacity: 1,
      transform: 'translateY(0%)',
      transition: { duration: 0.9, ease: EASE_OUT, delay },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  })

  const fade = (delay: number) => ({
    initial: { opacity: 0, filter: 'blur(6px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, delay } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  })

  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      data-lenis-prevent
      {...shape}
      className="fixed inset-0 z-40 overflow-y-auto bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_0%_100%,oklch(0.72_0.19_42/0.16),transparent_70%)]"
      />

      <div className="relative mx-auto flex min-h-full max-w-[1400px] flex-col justify-between gap-16 px-4 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 md:pt-36 lg:px-12">
        <nav aria-label={t.nav.menu}>
          <ul className="group/list flex flex-col">
            {t.nav.items.map((item, i) => (
              <li key={item.id} className="overflow-hidden">
                <motion.a
                  ref={i === 0 ? firstLink : undefined}
                  href={`#${item.id}`}
                  onClick={onNavigate(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  {...rise(0.32 + i * 0.06)}
                  className="group flex items-center gap-4 py-1 text-[clamp(44px,9vw,120px)] leading-[1.02] font-semibold tracking-[-0.055em] text-fg transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100 focus-visible:!opacity-100"
                >
                  <RollText text={item.label} />
                  {active === item.id ? (
                    <span className="size-[0.14em] rounded-full bg-accent" aria-hidden />
                  ) : null}
                  <ArrowUpRightIcon
                    weight="bold"
                    className="ml-auto size-[0.4em] -translate-x-3 text-accent opacity-0 transition-[opacity,translate] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <motion.div
          {...fade(0.6)}
          className="grid gap-10 border-t border-line pt-8 md:grid-cols-[auto_1fr] md:items-end md:gap-16"
        >
          <div>
            <p className="font-mono text-[12px] text-subtle">{t.nav.language}</p>
            <LocaleSwitch />
          </div>

          <div className="md:justify-self-end md:text-right">
            <p className="font-mono text-[12px] text-subtle">{t.sections.contact}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-block text-[clamp(18px,2vw,24px)] font-medium tracking-[-0.02em] break-all text-fg underline decoration-line-strong decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-accent"
            >
              {EMAIL}
            </a>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2 text-[15px] text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'pt', label: 'Português' },
  { id: 'en', label: 'English' },
]

function LocaleSwitch() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="mt-3 inline-flex rounded-full bg-bg/70 p-1 ring-1 ring-line"
    >
      {LOCALES.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id}
          aria-pressed={locale === l.id}
          onClick={() => setLocale(l.id)}
          className={`relative h-11 rounded-full px-5 text-[15px] transition-colors duration-200 ${
            locale === l.id ? 'text-fg' : 'text-subtle hover:text-muted'
          }`}
        >
          {locale === l.id && (
            <motion.span
              layoutId="locale-pill"
              transition={{ type: 'spring', duration: 0.45, bounce: 0.2 }}
              className="absolute inset-0 rounded-full bg-fg/10"
            />
          )}
          <span className="relative">{l.label}</span>
        </button>
      ))}
    </div>
  )
}

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Transition,
} from 'motion/react'
import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import type { Locale, SectionId } from '../i18n/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { EASE_OUT, SPRING_SNAPPY } from '../lib/motion'

const SECTION_IDS: SectionId[] = ['top', 'about', 'projects', 'services', 'stack', 'contact']

// A ilha se comporta como o notch do Light Notch: nasce compacta, se expande,
// e no mobile vira o próprio menu. O `layout` anima a forma entre os estados.
const ISLAND: Transition = { type: 'spring', duration: 0.55, bounce: 0.18 }

const fadeIn = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.12 } },
}

export default function Nav() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)', true)
  const active = useActiveSection(SECTION_IDS)
  const [booted, setBooted] = useState(false)
  const [open, setOpen] = useState(false)
  const menuOpen = open && !isDesktop

  useEffect(() => {
    const id = window.setTimeout(() => setBooted(true), reduce ? 0 : 650)
    return () => window.clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const close = () => setOpen(false)

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="scrim"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
        <motion.nav
          layout
          initial={reduce ? false : { opacity: 0, y: -28, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...ISLAND, opacity: { duration: 0.3 } }}
          style={{ borderRadius: menuOpen ? 28 : 999 }}
          className={`glass pointer-events-auto flex overflow-hidden ring-1 ring-line ${
            menuOpen ? 'w-full max-w-md flex-col p-2' : 'items-center gap-1 p-1.5'
          }`}
        >
          <motion.div layout="position" className="flex items-center gap-1">
            <Logo />
            {!isDesktop && booted && (
              <SectionLabel label={t.sections[active]} hidden={menuOpen} />
            )}
            {!isDesktop && booted && (
              <motion.button
                layout="position"
                {...fadeIn}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="island-menu"
                aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                className="ml-auto grid size-11 place-items-center rounded-full text-fg transition-[background-color,scale] duration-200 hover:bg-fg/[0.08] active:scale-[0.94]"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={menuOpen ? 'x' : 'list'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="grid place-items-center"
                  >
                    {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}
          </motion.div>

          {isDesktop && booted && <DesktopLinks active={active} />}

          <AnimatePresence>
            {menuOpen && <MobileMenu key="menu" active={active} onNavigate={close} />}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  )
}

function Logo() {
  const { t } = useLocale()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  return (
    <motion.a
      layout="position"
      href="#top"
      aria-label={`Guilherme Müller, ${t.footer.backToTop.toLowerCase()}`}
      className="relative grid size-11 shrink-0 place-items-center rounded-full bg-bg text-[13px] font-semibold tracking-[-0.02em] text-fg transition-[scale] duration-200 active:scale-[0.94]"
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="22" cy="22" r="20.5" fill="none" stroke="var(--color-line-strong)" strokeWidth="1" />
        <motion.circle
          cx="22"
          cy="22"
          r="20.5"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      gm
    </motion.a>
  )
}

function SectionLabel({ label, hidden }: { label: string; hidden: boolean }) {
  return (
    <motion.span
      layout="position"
      {...fadeIn}
      aria-hidden
      className={`relative flex h-11 min-w-24 items-center overflow-hidden pr-2 pl-2.5 font-mono text-[12px] tracking-[0.04em] text-muted uppercase transition-opacity duration-200 ${
        hidden ? 'opacity-0' : ''
      }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          initial={{ opacity: 0, transform: 'translateY(10px)', filter: 'blur(4px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-10px)', filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="block whitespace-nowrap"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

function DesktopLinks({ active }: { active: SectionId }) {
  const { t } = useLocale()

  return (
    <motion.div
      className="flex items-center gap-1"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
    >
      <ul className="flex items-center pl-2">
        {t.nav.items.map((item) => (
          <motion.li key={item.id} variants={childFade}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`relative block rounded-full px-4 py-2.5 text-[14px] transition-colors duration-200 ${
                active === item.id ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-full bg-fg/[0.08]"
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.div variants={childFade} className="mx-1 h-5 w-px bg-line-strong" aria-hidden />

      <motion.div variants={childFade}>
        <LocaleToggle id="desktop" />
      </motion.div>

      <motion.a
        variants={childFade}
        href="#contact"
        className="group ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-5 text-[14px] font-medium whitespace-nowrap text-accent-fg transition-[background-color,scale] duration-200 hover:bg-[oklch(0.76_0.19_42)] active:scale-[0.97]"
      >
        {t.nav.cta}
        <ArrowUpRightIcon
          weight="bold"
          className="size-3.5 transition-transform duration-300 ease-out group-hover:rotate-45"
          aria-hidden
        />
      </motion.a>
    </motion.div>
  )
}

const childFade = {
  hidden: { opacity: 0, filter: 'blur(6px)', transform: 'translateY(4px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transform: 'translateY(0px)',
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

function MobileMenu({ active, onNavigate }: { active: SectionId; onNavigate: () => void }) {
  const { t } = useLocale()

  return (
    <motion.div
      id="island-menu"
      layout="position"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
      className="px-3 pt-4 pb-2"
    >
      <ul className="flex flex-col">
        {t.nav.items.map((item) => (
          <motion.li key={item.id} variants={childFade}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={active === item.id ? 'true' : undefined}
              className="flex items-center justify-between py-3 text-[28px] font-medium tracking-[-0.03em] text-fg"
            >
              {item.label}
              {active === item.id && <span className="size-2 rounded-full bg-accent" aria-hidden />}
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.div
        variants={childFade}
        className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4"
      >
        <LocaleToggle id="mobile" />
        <a
          href="#contact"
          onClick={onNavigate}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-5 text-[15px] font-medium text-accent-fg transition-[scale] duration-200 active:scale-[0.97]"
        >
          {t.nav.cta}
          <ArrowUpRightIcon weight="bold" className="size-3.5" aria-hidden />
        </a>
      </motion.div>
    </motion.div>
  )
}

const LOCALES: { id: Locale; label: string; name: string }[] = [
  { id: 'pt', label: 'PT', name: 'Português' },
  { id: 'en', label: 'EN', name: 'English' },
]

function LocaleToggle({ id }: { id: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div role="group" aria-label={t.nav.language} className="flex rounded-full bg-bg/60 p-1">
      {LOCALES.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id}
          aria-pressed={locale === l.id}
          aria-label={l.name}
          onClick={() => setLocale(l.id)}
          className={`relative h-9 w-11 rounded-full font-mono text-[12px] transition-colors duration-200 ${
            locale === l.id ? 'text-fg' : 'text-subtle hover:text-muted'
          }`}
        >
          {locale === l.id && (
            <motion.span
              layoutId={`locale-${id}`}
              transition={SPRING_SNAPPY}
              className="absolute inset-0 rounded-full bg-fg/[0.1]"
            />
          )}
          <span className="relative">{l.label}</span>
        </button>
      ))}
    </div>
  )
}

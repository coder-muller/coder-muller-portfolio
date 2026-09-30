import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'

export default function Footer() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // O nome sobe do rodapé conforme a página termina.
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '45%', '0%'])

  return (
    <footer ref={ref} className="overflow-hidden">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-line px-4 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <a
          href="#top"
          className="group -my-2 inline-flex items-center gap-1.5 py-2 text-fg transition-colors duration-200 hover:text-accent"
        >
          {t.footer.backToTop}
          <ArrowUpIcon
            weight="bold"
            className="size-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </div>

      <motion.p
        aria-hidden
        style={{ y }}
        className="-mb-[0.18em] px-2 text-center text-[clamp(48px,11.4vw,200px)] leading-[0.9] font-semibold tracking-[-0.065em] whitespace-nowrap bg-linear-to-b from-fg/15 to-fg/[0.02] bg-clip-text text-transparent select-none"
      >
        Guilherme Müller
      </motion.p>
    </footer>
  )
}

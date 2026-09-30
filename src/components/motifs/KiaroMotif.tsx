import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale } from '../../i18n/locale'
import { EASE_OUT } from '../../lib/motion'
import { useLoopTick } from './useLoopTick'

const MONTHS = 12
const STEP = 700

// Ciclo de mensalidades: um ponteiro percorre os 12 meses e cada cobrança
// acende quando é emitida, depois assenta como paga.
export default function KiaroMotif({ active, still }: { active: boolean; still: boolean }) {
  const { locale } = useLocale()
  const tick = useLoopTick(active && !still, STEP)
  const current = still ? 4 : tick % MONTHS

  const months = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en', { month: 'short' })
    return Array.from({ length: MONTHS }, (_, m) =>
      fmt.format(new Date(2026, m, 1)).replace('.', ''),
    )
  }, [locale])

  const labels =
    locale === 'pt'
      ? { top: 'Cobrança', bottom: 'enviada' }
      : { top: 'Invoice', bottom: 'sent' }

  return (
    <div className="relative aspect-square w-[min(78%,320px)]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="100" cy="100" r="78" fill="none" stroke="var(--line-strong)" strokeDasharray="1 5" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="var(--line)" />
      </svg>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: (tick + (still ? 4 : 0)) * 30 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
      >
        <svg viewBox="0 0 200 200" className="size-full" aria-hidden>
          <line x1="100" y1="46" x2="100" y2="32" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {months.map((label, m) => {
        const angle = (m / MONTHS) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(angle) * 39
        const y = 50 + Math.sin(angle) * 39
        const distance = (current - m + MONTHS) % MONTHS
        const state = distance === 0 ? 'now' : distance < 6 ? 'paid' : 'open'
        return (
          <span
            key={m}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={`block size-2.5 rounded-full transition-[background-color,box-shadow,scale] duration-500 ease-out ${
                state === 'now'
                  ? 'scale-150 bg-accent shadow-[0_0_0_6px_var(--accent-soft)]'
                  : state === 'paid'
                    ? 'bg-fg/70'
                    : 'bg-fg/15'
              }`}
            />
            <span
              className={`absolute top-1/2 left-1/2 mt-4 -translate-x-1/2 font-mono text-[10px] uppercase transition-colors duration-500 ${
                state === 'now' ? 'text-fg' : 'text-subtle/70'
              }`}
            >
              {m % 3 === 0 ? label : ''}
            </span>
          </span>
        )
      })}

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="relative h-9 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={current}
                initial={{ opacity: 0, transform: 'translateY(100%)' }}
                animate={{ opacity: 1, transform: 'translateY(0%)' }}
                exit={{ opacity: 0, transform: 'translateY(-100%)' }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="text-[28px] leading-9 font-semibold tracking-[-0.04em] text-fg capitalize"
              >
                {months[current]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
            {labels.top} {labels.bottom}
          </p>
        </div>
      </div>
    </div>
  )
}

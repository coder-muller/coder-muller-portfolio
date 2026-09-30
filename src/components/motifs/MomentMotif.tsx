import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale } from '../../i18n/locale'
import { EASE_OUT } from '../../lib/motion'
import { useLoopTick } from './useLoopTick'

type Booking = { cell: number; name: string; time: string; accent?: boolean }

// Mês que começa numa quarta: a célula 3 é o dia 1.
const FIRST_DAY_CELL = 3
const TODAY_CELL = 16

const BOOKINGS: Booking[] = [
  { cell: 9, name: 'Marina', time: '09:30' },
  { cell: 17, name: 'Rafael', time: '14:00', accent: true },
  { cell: 11, name: 'Beatriz', time: '10:15' },
  { cell: 23, name: 'Lucas', time: '16:45' },
  { cell: 19, name: 'Helena', time: '08:00', accent: true },
  { cell: 25, name: 'Tiago', time: '11:30' },
  { cell: 30, name: 'Camila', time: '15:00' },
  { cell: 12, name: 'Bruno', time: '13:20', accent: true },
]

// Agendamentos chegam um a um, como o tempo real do Moment entre abas.
export default function MomentMotif({ active, still }: { active: boolean; still: boolean }) {
  const { locale } = useLocale()
  const tick = useLoopTick(active && !still, 1300)
  const cycle = BOOKINGS.length + 2
  const shown = still ? BOOKINGS.length : Math.min(tick % cycle, BOOKINGS.length)
  const latest = shown > 0 && (still || tick % cycle <= BOOKINGS.length) ? BOOKINGS[shown - 1] : null

  const { weekdays, weekdayLong } = useMemo(() => {
    const tag = locale === 'pt' ? 'pt-BR' : 'en'
    const narrow = new Intl.DateTimeFormat(tag, { weekday: 'narrow' })
    const short = new Intl.DateTimeFormat(tag, { weekday: 'short' })
    // 4 de janeiro de 2026 é domingo.
    const days = Array.from({ length: 7 }, (_, d) => new Date(2026, 0, 4 + d))
    return {
      weekdays: days.map((d) => narrow.format(d)),
      weekdayLong: days.map((d) => short.format(d).replace('.', '')),
    }
  }, [locale])

  const booked = new Map(BOOKINGS.slice(0, shown).map((b) => [b.cell, b]))

  return (
    <div className="flex w-[min(88%,420px)] flex-col">
      <div className="grid grid-cols-7 gap-1.5 pb-2 text-center font-mono text-[10px] text-subtle uppercase">
        {weekdays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }, (_, cell) => {
          const day = cell - FIRST_DAY_CELL + 1
          const booking = booked.get(cell)
          const isToday = cell === TODAY_CELL
          return (
            <div
              key={cell}
              className={`relative aspect-square rounded-[10px] ${
                day < 1 || day > 31 ? 'bg-transparent' : 'bg-fg/[0.04]'
              } ${isToday ? 'ring-1 ring-accent/70 ring-inset' : ''}`}
            >
              {day >= 1 && day <= 31 && (
                <span
                  className={`absolute top-1.5 left-2 font-mono text-[9px] tabular-nums ${
                    isToday ? 'text-accent' : 'text-subtle'
                  }`}
                >
                  {day}
                </span>
              )}
              <AnimatePresence>
                {booking && (
                  <motion.span
                    key={booking.name}
                    initial={{ opacity: 0, transform: 'scale(0.6)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                    className={`absolute inset-x-1.5 bottom-1.5 h-[18%] origin-bottom-left rounded-[4px] ${
                      booking.accent ? 'bg-accent' : 'bg-fg/60'
                    }`}
                  />
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="relative mt-4 h-11">
        <AnimatePresence mode="popLayout" initial={false}>
          {latest && (
            <motion.div
              key={latest.name}
              initial={{ opacity: 0, transform: 'translateY(12px) scale(0.96)', filter: 'blur(4px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }}
              exit={{ opacity: 0, transform: 'translateY(-8px) scale(0.98)', filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="absolute inset-x-0 flex h-11 items-center gap-3 rounded-full bg-raised pr-4 pl-1.5 ring-1 ring-line"
            >
              <span className="grid size-8 place-items-center rounded-full bg-fg/10 text-[12px] font-semibold text-fg">
                {latest.name[0]}
              </span>
              <span className="truncate text-[13px] text-muted">
                <span className="text-fg">{latest.name}</span>{' '}
                {locale === 'pt' ? 'agendou' : 'booked'} {weekdayLong[latest.cell % 7]}{' '}
                {locale === 'pt' ? 'às' : 'at'} {latest.time}
              </span>
              <span className="ml-auto size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

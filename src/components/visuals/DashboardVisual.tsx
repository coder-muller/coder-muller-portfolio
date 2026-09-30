import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useLocale } from '../../i18n/locale'
import { EASE_OUT } from '../../lib/motion'
import { useLoopTick } from '../motifs/useLoopTick'
import type { VisualProps } from './types'

// Três leituras do mesmo painel: a cada ciclo os dados chegam e tudo se ajusta.
const SNAPSHOTS = [
  {
    revenue: 48200,
    orders: 1284,
    ticket: 37.5,
    delta: [12, 8, 4],
    bars: [0.34, 0.42, 0.38, 0.5, 0.46, 0.57, 0.52, 0.63, 0.6, 0.71, 0.68, 0.82],
  },
  {
    revenue: 51700,
    orders: 1352,
    ticket: 38.2,
    delta: [7, 5, 2],
    bars: [0.42, 0.38, 0.5, 0.46, 0.57, 0.52, 0.63, 0.6, 0.71, 0.68, 0.82, 0.88],
  },
  {
    revenue: 55300,
    orders: 1419,
    ticket: 39,
    delta: [7, 5, 2],
    bars: [0.38, 0.5, 0.46, 0.57, 0.52, 0.63, 0.6, 0.71, 0.68, 0.82, 0.88, 0.95],
  },
]

function Metric({
  label,
  value,
  format,
  delta,
  still,
}: {
  label: string
  value: number
  format: (v: number) => string
  delta: number
  still: boolean
}) {
  const count = useMotionValue(still ? value : 0)
  const text = useTransform(count, format)

  useEffect(() => {
    if (still) {
      count.set(value)
      return
    }
    const controls = animate(count, value, { duration: 1.2, ease: EASE_OUT })
    return () => controls.stop()
  }, [value, still, count])

  return (
    <div className="min-w-0 rounded-xl bg-fg/[0.03] p-3 ring-1 ring-line">
      <p className="truncate font-mono text-[10px] text-subtle">{label}</p>
      <motion.p className="mt-1.5 truncate text-[17px] font-semibold tracking-[-0.02em] text-fg tabular-nums">
        {text}
      </motion.p>
      <p className="mt-1 flex items-center gap-0.5 font-mono text-[10px] text-accent tabular-nums">
        <ArrowUpRightIcon weight="bold" className="size-2.5" />
        {delta}%
      </p>
    </div>
  )
}

export default function DashboardVisual({ active, seen, still }: VisualProps) {
  const { locale } = useLocale()
  const tick = useLoopTick(active && !still, 3200)
  const snap = SNAPSHOTS[still ? SNAPSHOTS.length - 1 : tick % SNAPSHOTS.length]
  const tag = locale === 'pt' ? 'pt-BR' : 'en-US'
  const currency = locale === 'pt' ? 'BRL' : 'USD'

  const compact = new Intl.NumberFormat(tag, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  })
  const plain = new Intl.NumberFormat(tag, { maximumFractionDigits: 0 })
  const money = new Intl.NumberFormat(tag, { style: 'currency', currency })
  const labels =
    locale === 'pt'
      ? ['Receita do mês', 'Pedidos', 'Ticket médio']
      : ['Monthly revenue', 'Orders', 'Average ticket']

  const shown = still || seen

  return (
    <div className="flex w-full max-w-[460px] flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <Metric
          key={`${locale}-0`}
          label={labels[0]}
          value={shown ? snap.revenue : 0}
          format={(v) => compact.format(v)}
          delta={snap.delta[0]}
          still={still}
        />
        <Metric
          key={`${locale}-1`}
          label={labels[1]}
          value={shown ? snap.orders : 0}
          format={(v) => plain.format(v)}
          delta={snap.delta[1]}
          still={still}
        />
        <Metric
          key={`${locale}-2`}
          label={labels[2]}
          value={shown ? snap.ticket : 0}
          format={(v) => money.format(v)}
          delta={snap.delta[2]}
          still={still}
        />
      </div>

      <div className="flex h-24 items-end gap-1.5 rounded-xl bg-fg/[0.03] px-3 pt-3 pb-2 ring-1 ring-line">
        {snap.bars.map((h, i) => (
          <motion.span
            key={i}
            className={`h-full flex-1 origin-bottom rounded-[3px] ${
              i === snap.bars.length - 1 ? 'bg-accent' : 'bg-fg/15'
            }`}
            initial={{ transform: `scaleY(${still ? h : 0.04})` }}
            animate={{ transform: `scaleY(${shown ? h : 0.04})` }}
            transition={{
              type: 'spring',
              duration: 0.7,
              bounce: 0.15,
              delay: still ? 0 : i * 0.03,
            }}
          />
        ))}
      </div>
    </div>
  )
}

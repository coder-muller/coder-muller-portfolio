import { motion } from 'motion/react'
import { ChartBarIcon, CheckCircleIcon, FileTextIcon, type Icon } from '@phosphor-icons/react'
import type { VisualProps } from './types'

const CYCLE = 3.6
const ICONS: Icon[] = [FileTextIcon, CheckCircleIcon, ChartBarIcon]

// Momentos do ciclo (0–1) em que cada etapa recebe o pulso.
const NODE_AT = [0.04, 0.42, 0.8]
const LINK_SPAN: [number, number][] = [
  [0.1, 0.38],
  [0.48, 0.76],
]

const loop = (active: boolean) =>
  active ? { duration: CYCLE, repeat: Infinity, ease: 'linear' as const } : { duration: 0 }

function Node({
  Icon,
  label,
  at,
  active,
  final,
}: {
  Icon: Icon
  label: string
  at: number
  active: boolean
  final: boolean
}) {
  return (
    <div className="flex w-[76px] shrink-0 flex-col items-center gap-2.5">
      <div className="relative grid size-13 place-items-center rounded-2xl bg-raised text-fg ring-1 ring-line">
        <Icon size={22} weight={final ? 'fill' : 'regular'} className={final ? 'text-accent' : ''} />
        <motion.span
          aria-hidden
          className="absolute -inset-px rounded-[inherit] ring-[1.5px] ring-accent shadow-[0_0_24px_oklch(0.72_0.19_42/0.35)]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: [0, 0, 1, 0, 0] } : { opacity: final ? 1 : 0 }}
          transition={{
            ...loop(active),
            ease: 'easeOut',
            times: [0, Math.max(at - 0.01, 0), at, Math.min(at + 0.16, 0.99), 1],
          }}
        />
      </div>
      <span className="text-center font-mono text-[11px] leading-tight text-muted">{label}</span>
    </div>
  )
}

function Link({ span, active }: { span: [number, number]; active: boolean }) {
  const [a, b] = span
  return (
    <div className="relative -mt-6 h-px flex-1 bg-line-strong">
      {/* O wrapper ocupa a largura toda: translateX(100%) leva o pulso até o fim. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ transform: 'translateX(0%)', opacity: 0 }}
        animate={
          active
            ? {
                transform: ['translateX(0%)', 'translateX(0%)', 'translateX(100%)', 'translateX(100%)'],
                opacity: [0, 1, 1, 0],
              }
            : { opacity: 0 }
        }
        transition={{ ...loop(active), times: [0, a, b, Math.min(b + 0.04, 1)] }}
      >
        <span className="absolute top-1/2 -left-4 h-[3px] w-8 -translate-y-1/2 rounded-full bg-linear-to-r from-transparent to-accent" />
      </motion.div>
    </div>
  )
}

// Processo manual virando sistema: cada etapa passa o pulso para a próxima.
export default function FlowVisual({
  labels,
  active,
  still,
}: VisualProps & { labels: [string, string, string] }) {
  const running = active && !still

  return (
    <div className="flex w-full max-w-[360px] items-center">
      <Node Icon={ICONS[0]} label={labels[0]} at={NODE_AT[0]} active={running} final={false} />
      <Link span={LINK_SPAN[0]} active={running} />
      <Node Icon={ICONS[1]} label={labels[1]} at={NODE_AT[1]} active={running} final={false} />
      <Link span={LINK_SPAN[1]} active={running} />
      <Node Icon={ICONS[2]} label={labels[2]} at={NODE_AT[2]} active={running} final />
    </div>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import {
  PauseIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react'
import { useLoopTick } from './useLoopTick'

type Phase = 'idle' | 'playing' | 'open'

// Mesma sequência do app: o notch estica quando a música toca e vira player
// quando recebe o clique.
const TIMELINE: Phase[] = [
  'idle', 'idle',
  'playing', 'playing', 'playing',
  'open', 'open', 'open', 'open', 'open',
  'playing', 'playing',
]

const NOTCH_SPRING = { type: 'spring', duration: 0.6, bounce: 0.22 } as const

const content = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.35, delay: 0.12 } },
  exit: { opacity: 0, filter: 'blur(6px)', transition: { duration: 0.12 } },
}

function Cover({ className }: { className: string }) {
  return (
    <span
      className={`block shrink-0 bg-[linear-gradient(135deg,oklch(0.78_0.17_55),oklch(0.62_0.22_28)_55%,oklch(0.42_0.16_350))] shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] ${className}`}
    />
  )
}

function Bars({ active, size = 'sm' }: { active: boolean; size?: 'sm' | 'md' }) {
  const durations = [0.82, 0.54, 0.7, 0.46]
  return (
    <span className={`flex items-end gap-[3px] ${size === 'sm' ? 'h-3.5' : 'h-5'}`} aria-hidden>
      {durations.map((d, i) => (
        <span
          key={i}
          className="eq-bar h-full w-[3px] origin-bottom rounded-full bg-accent"
          style={{
            animationDuration: `${d}s`,
            animationDelay: `${i * -0.21}s`,
            animationPlayState: active ? 'running' : 'paused',
          }}
        />
      ))}
    </span>
  )
}

export default function NotchMotif({ active, still }: { active: boolean; still: boolean }) {
  const tick = useLoopTick(active && !still, 900)
  const phase: Phase = still ? 'open' : TIMELINE[tick % TIMELINE.length]
  const radius = phase === 'open' ? 30 : 14
  const animating = active && !still

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_110%,oklch(0.62_0.2_32/0.35),transparent_70%),radial-gradient(60%_50%_at_90%_90%,oklch(0.5_0.16_350/0.28),transparent_70%)]"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-fg/10" aria-hidden />

      <div className="absolute inset-x-0 top-0 flex justify-center px-4">
        <motion.div
          layout
          transition={NOTCH_SPRING}
          style={{ borderBottomLeftRadius: radius, borderBottomRightRadius: radius }}
          className={`relative overflow-hidden bg-[oklch(0.08_0_0)] shadow-[0_18px_40px_oklch(0_0_0/0.45)] ${
            phase === 'idle'
              ? 'h-8 w-36'
              : phase === 'playing'
                ? 'h-8 w-64'
                : 'w-full max-w-[360px]'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {phase === 'idle' && (
              <motion.div key="idle" layout="position" {...content} className="flex h-8 items-center justify-end pr-5">
                <span className="size-2 rounded-full bg-[oklch(0.2_0.02_260)] ring-1 ring-[oklch(0.3_0.03_260)]" />
              </motion.div>
            )}

            {phase === 'playing' && (
              <motion.div
                key="playing"
                layout="position"
                {...content}
                className="flex h-8 items-center justify-between px-2.5"
              >
                <Cover className="size-5 rounded-[5px]" />
                <Bars active={animating} />
              </motion.div>
            )}

            {phase === 'open' && (
              <motion.div key="open" layout="position" {...content} className="px-5 pt-10 pb-5">
                <div className="flex items-center gap-3.5">
                  <Cover className="size-13 rounded-[12px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-fg">
                      Slow Orbit
                    </p>
                    <p className="truncate text-[13px] text-muted">Mira Vale</p>
                  </div>
                  <Bars active={animating} size="md" />
                </div>

                <div className="mt-4 flex items-center gap-2.5 font-mono text-[10px] text-subtle tabular-nums">
                  <span>1:12</span>
                  <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-fg/15">
                    <motion.span
                      className="absolute inset-0 origin-left rounded-full bg-fg"
                      initial={{ transform: 'scaleX(0.32)' }}
                      animate={{ transform: animating ? 'scaleX(0.5)' : 'scaleX(0.38)' }}
                      transition={{ duration: 4.5, ease: 'linear' }}
                    />
                  </span>
                  <span>3:48</span>
                </div>

                <div className="mt-3.5 flex items-center justify-between px-1 text-fg">
                  <ShuffleIcon size={15} className="text-subtle" />
                  <SkipBackIcon size={19} weight="fill" />
                  <PauseIcon size={26} weight="fill" />
                  <SkipForwardIcon size={19} weight="fill" />
                  <RepeatIcon size={15} className="text-accent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

import type { PointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'motion/react'
import {
  AppleLogoIcon,
  BatteryHighIcon,
  PauseIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  WifiHighIcon,
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

const NOTCH_SIZE: Record<Phase, string> = {
  idle: 'h-[18px] w-[76px]',
  playing: 'h-[18px] w-[172px]',
  open: 'w-[min(250px,78%)]',
}

const content = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.3, delay: 0.14 } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.1 } },
}

function Cover({ className }: { className: string }) {
  return (
    <span
      className={`block shrink-0 bg-[linear-gradient(135deg,oklch(0.78_0.17_55),oklch(0.62_0.22_28)_55%,oklch(0.42_0.16_350))] shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] ${className}`}
    />
  )
}

function Bars({ active, tall }: { active: boolean; tall?: boolean }) {
  const durations = [0.82, 0.54, 0.7, 0.46]
  return (
    <span className={`flex items-end gap-[2px] ${tall ? 'h-4' : 'h-2.5'}`} aria-hidden>
      {durations.map((d, i) => (
        <span
          key={i}
          className="eq-bar h-full w-[2.5px] origin-bottom rounded-full bg-accent"
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

function Notch({ phase, animating }: { phase: Phase; animating: boolean }) {
  const radius = phase === 'open' ? 18 : 7

  return (
    <motion.div
      layout
      transition={NOTCH_SPRING}
      style={{ borderBottomLeftRadius: radius, borderBottomRightRadius: radius }}
      className={`relative overflow-hidden bg-[oklch(0.06_0_0)] shadow-[0_10px_30px_oklch(0_0_0/0.5)] ${NOTCH_SIZE[phase]}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {phase === 'idle' && (
          <motion.div key="idle" layout="position" {...content} className="flex h-[18px] items-center justify-center">
            <span className="size-[5px] rounded-full bg-[oklch(0.2_0.03_260)] ring-1 ring-[oklch(0.3_0.03_260)]" />
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div
            key="playing"
            layout="position"
            {...content}
            className="flex h-[18px] items-center justify-between px-1.5"
          >
            <Cover className="size-3 rounded-[3px]" />
            <Bars active={animating} />
          </motion.div>
        )}

        {phase === 'open' && (
          <motion.div key="open" layout="position" {...content} className="px-3.5 pt-6 pb-3">
            <div className="flex items-center gap-2.5">
              <Cover className="size-9 rounded-[8px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] leading-tight font-semibold text-fg">Slow Orbit</p>
                <p className="truncate text-[10px] leading-tight text-muted">Mira Vale</p>
              </div>
              <Bars active={animating} tall />
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[7.5px] text-subtle tabular-nums">
              <span>1:12</span>
              <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-fg/15">
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-fg"
                  initial={{ transform: 'scaleX(0.32)' }}
                  animate={{ transform: animating ? 'scaleX(0.5)' : 'scaleX(0.38)' }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                />
              </span>
              <span>3:48</span>
            </div>

            <div className="mt-2 flex items-center justify-between px-1 text-fg">
              <ShuffleIcon size={10} className="text-subtle" />
              <SkipBackIcon size={12} weight="fill" />
              <PauseIcon size={17} weight="fill" />
              <SkipForwardIcon size={12} weight="fill" />
              <RepeatIcon size={10} className="text-accent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function NotchMotif({ active, still }: { active: boolean; still: boolean }) {
  const reduce = useReducedMotion()
  const tick = useLoopTick(active && !still, 900)
  const phase: Phase = still ? 'open' : TIMELINE[tick % TIMELINE.length]
  const animating = active && !still
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 })

  // Inclinação leve seguindo o cursor, como se o MacBook estivesse na mesa.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 12)
    rotateX.set(-py * 9)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="absolute inset-0 grid place-items-center [perspective:1400px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-[min(88%,560px)] [transform-style:preserve-3d]"
      >
        <div
          aria-hidden
          className="absolute -z-10 -bottom-6 left-1/2 h-8 w-[110%] -translate-x-1/2 rounded-[50%] bg-[oklch(0_0_0/0.55)] blur-xl"
        />
        {/* tampa: alumínio escuro, borda preta e a tela */}
        <div className="relative rounded-t-[16px] rounded-b-[4px] bg-[oklch(0.24_0.004_260)] p-[5px] shadow-[inset_0_1px_0_oklch(1_0_0/0.14),0_30px_60px_-20px_oklch(0_0_0/0.7)]">
          <div className="rounded-[12px] bg-[oklch(0.06_0_0)] p-[6px] pt-0">
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-[4px] rounded-b-[6px]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(80%_70%_at_15%_110%,oklch(0.62_0.2_32/0.75),transparent_70%),radial-gradient(70%_60%_at_95%_95%,oklch(0.45_0.16_350/0.7),transparent_70%),radial-gradient(90%_80%_at_60%_-10%,oklch(0.3_0.06_260),transparent_70%),linear-gradient(oklch(0.14_0.01_300),oklch(0.14_0.01_300))]"
              />

              <div className="absolute inset-x-0 top-0 flex h-[18px] items-center justify-between bg-[oklch(0.1_0.01_300/0.35)] px-2.5 text-[8px] text-fg/85 backdrop-blur-sm">
                <span className="flex items-center gap-2.5">
                  <AppleLogoIcon weight="fill" size={9} />
                  <span className="font-semibold">Spotify</span>
                  <span className="hidden text-fg/60 sm:inline">File</span>
                  <span className="hidden text-fg/60 sm:inline">Edit</span>
                </span>
                <span className="flex items-center gap-2">
                  <WifiHighIcon size={9} weight="bold" />
                  <BatteryHighIcon size={11} />
                  <span className="tabular-nums">9:41</span>
                </span>
              </div>

              <div className="absolute inset-x-0 top-0 flex justify-center">
                <Notch phase={phase} animating={animating} />
              </div>
            </div>
          </div>
        </div>

        {/* base com o recorte de abrir a tampa */}
        <div className="relative -mx-[7%] h-[10px] rounded-t-[2px] rounded-b-[14px] bg-linear-to-b from-[oklch(0.34_0.004_260)] to-[oklch(0.2_0.004_260)] shadow-[inset_0_1px_0_oklch(1_0_0/0.2)]">
          <div className="absolute top-0 left-1/2 h-[5px] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-[oklch(0.16_0.004_260)]" />
        </div>
      </motion.div>
    </div>
  )
}

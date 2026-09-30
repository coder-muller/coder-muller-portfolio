import { useEffect, useRef, useState, type PointerEvent } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import {
  CalendarBlankIcon,
  CompassIcon,
  EnvelopeSimpleIcon,
  FolderSimpleIcon,
  GearSixIcon,
  MusicNotesIcon,
  TerminalWindowIcon,
  type Icon,
} from '@phosphor-icons/react'
import type { VisualProps } from './types'

const APPS: { Icon: Icon; accent?: boolean; running?: boolean; wide?: boolean }[] = [
  { Icon: FolderSimpleIcon, running: true },
  { Icon: CompassIcon, wide: true },
  { Icon: EnvelopeSimpleIcon },
  { Icon: CalendarBlankIcon },
  { Icon: MusicNotesIcon, accent: true, running: true },
  { Icon: TerminalWindowIcon, running: true },
  { Icon: GearSixIcon, wide: true },
]

const BASE = 40
const PEAK = 64
const REACH = 120

function Tile({ app, pointerX }: { app: (typeof APPS)[number]; pointerX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)
  const distance = useTransform(pointerX, (x) => {
    const rect = ref.current?.getBoundingClientRect()
    return rect ? x - rect.left - rect.width / 2 : REACH
  })
  const target = useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE])
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 })
  const { Icon } = app

  return (
    <div className={`flex-col items-center gap-1 ${app.wide ? 'hidden sm:flex' : 'flex'}`}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className={`grid place-items-center rounded-[28%] shadow-[inset_0_1px_0_oklch(1_0_0/0.14)] ring-1 ${
          app.accent
            ? 'bg-linear-to-b from-[oklch(0.76_0.18_45)] to-[oklch(0.62_0.2_35)] text-accent-fg ring-transparent'
            : 'bg-linear-to-b from-raised to-surface text-fg ring-line'
        }`}
      >
        <Icon weight={app.accent ? 'fill' : 'regular'} className="size-[48%]" />
      </motion.div>
      <span className={`size-1 rounded-full ${app.running ? 'bg-fg/60' : 'bg-transparent'}`} />
    </div>
  )
}

// Dock do macOS: os ícones crescem perto do cursor. Sem cursor (ou no toque),
// uma onda passa sozinha de um lado ao outro.
export default function DockVisual({ active, still }: VisualProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(Number.NEGATIVE_INFINITY)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dock = dockRef.current
    if (!dock || still || !active || hovering) return
    const rect = dock.getBoundingClientRect()
    const controls = animate(pointerX, [rect.left - 40, rect.right + 40], {
      duration: 3.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 0.6,
    })
    return () => controls.stop()
  }, [active, still, hovering, pointerX])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (still || e.pointerType !== 'mouse') return
    setHovering(true)
    pointerX.set(e.clientX)
  }

  const onLeave = () => {
    setHovering(false)
    pointerX.set(Number.NEGATIVE_INFINITY)
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="flex w-full justify-center py-4">
      <div
        ref={dockRef}
        className="glass flex h-[62px] items-end gap-1.5 rounded-[22px] px-2 pb-1 ring-1 ring-line sm:gap-2 sm:px-2.5"
      >
        {APPS.map((app, i) => (
          <Tile key={i} app={app} pointerX={pointerX} />
        ))}
      </div>
    </div>
  )
}

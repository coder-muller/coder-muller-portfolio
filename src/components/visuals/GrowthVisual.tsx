import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { EASE_IN_OUT } from '../../lib/motion'
import type { VisualProps } from './types'

const W = 400
const H = 150
const LINE =
  'M8 132 C 48 130, 70 118, 104 112 S 158 104, 190 88 S 252 80, 284 60 S 346 38, 388 20'
const AREA = `${LINE} L388 ${H} L8 ${H} Z`
const END = { x: 388, y: 20 }

// Receita recorrente subindo: a linha se desenha uma vez e, no hover, um
// marcador percorre a curva seguindo o cursor.
export default function GrowthVisual({ active, seen, still }: VisualProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const samples = useRef<{ x: number; y: number }[]>([])
  const [hovering, setHovering] = useState(false)
  const cx = useSpring(END.x, { stiffness: 300, damping: 30 })
  const cy = useSpring(END.y, { stiffness: 300, damping: 30 })
  const guide = useMotionValue(END.x)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    samples.current = Array.from({ length: 120 }, (_, i) => {
      const p = path.getPointAtLength((i / 119) * total)
      return { x: p.x, y: p.y }
    })
  }, [])

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== 'mouse' || still) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    let best = samples.current[0]
    for (const s of samples.current) if (Math.abs(s.x - x) < Math.abs(best.x - x)) best = s
    if (!best) return
    cx.set(best.x)
    cy.set(best.y)
    guide.set(best.x)
    setHovering(true)
  }

  const onLeave = () => {
    cx.set(END.x)
    cy.set(END.y)
    guide.set(END.x)
    setHovering(false)
  }

  const drawn = still || seen

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full overflow-visible"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <defs>
        <linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[24, 60, 96, 132].map((y) => (
        <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="var(--color-line)" strokeDasharray="2 6" />
      ))}

      <motion.path
        d={AREA}
        fill="url(#growth-fill)"
        initial={{ opacity: still ? 1 : 0 }}
        animate={{ opacity: drawn ? 1 : 0 }}
        transition={{ duration: 1.2, delay: still ? 0 : 1 }}
      />
      <motion.path
        ref={pathRef}
        d={LINE}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: still ? 1 : 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: 1.8, ease: EASE_IN_OUT }}
      />

      <motion.line
        x1={guide}
        x2={guide}
        y1="0"
        y2={H}
        stroke="var(--color-line-strong)"
        style={{ opacity: hovering ? 1 : 0 }}
        className="transition-opacity duration-200"
      />

      {drawn && active && !still && !hovering && (
        <motion.circle
          cx={END.x}
          cy={END.y}
          fill="var(--color-accent)"
          initial={{ r: 4, opacity: 0.5 }}
          animate={{ r: 14, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 1.8 }}
        />
      )}
      <motion.circle
        cx={cx}
        cy={cy}
        r="4.5"
        fill="var(--color-bg)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        initial={{ opacity: still ? 1 : 0 }}
        animate={{ opacity: drawn ? 1 : 0 }}
        transition={{ duration: 0.3, delay: still ? 0 : 1.7 }}
      />
    </svg>
  )
}

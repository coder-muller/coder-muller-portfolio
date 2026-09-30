import { useEffect, useRef } from 'react'

// Matriz de pontos que se comporta como o equalizador do Light Notch: cada
// coluna é uma barra que respira sozinha e sobe perto do ponteiro.
const CELL = 11
const DOT = 3
const DIM_ALPHA = 0.08
const BODY_LEVELS = 6
const BODY_ALPHAS = Array.from({ length: BODY_LEVELS }, (_, i) => 0.16 + (i / (BODY_LEVELS - 1)) * 0.5)

export default function EqualizerField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // As cores vêm do tema atual; trocar de tema relê os tokens.
    let fg = ''
    let accent = ''
    const readColors = () => {
      const style = getComputedStyle(canvas)
      fg = style.getPropertyValue('--fg').trim()
      accent = style.getPropertyValue('--accent').trim()
    }
    readColors()

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let offsetX = 0
    let levels = new Float32Array(0)
    let frame = 0
    let visible = true
    const start = performance.now()
    const pointer = { x: -1, energy: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.floor(width / CELL)
      rows = Math.floor(height / CELL)
      offsetX = (width - cols * CELL) / 2
      const next = new Float32Array(cols)
      next.set(levels.subarray(0, Math.min(cols, levels.length)))
      levels = next
    }

    const target = (c: number, t: number) => {
      let v =
        0.34 +
        0.22 * Math.sin(c * 0.16 + t * 1.25) +
        0.16 * Math.sin(c * 0.057 - t * 0.7) +
        0.12 * Math.sin(c * 0.41 + t * 2.3) +
        0.06 * Math.sin(c * 1.3 - t * 3.1)
      if (pointer.energy > 0.01 && pointer.x >= 0) {
        const d = (c - pointer.x) / 7
        v += Math.exp(-d * d) * 0.55 * pointer.energy
      }
      return Math.min(0.97, Math.max(0.04, v))
    }

    const draw = (now: number) => {
      const t = (now - start) / 1000
      // Liga devagar: as barras sobem do zero depois que o texto entrou.
      const power = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.9) / 1.4))
      pointer.energy *= 0.965

      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = fg
      ctx.globalAlpha = DIM_ALPHA
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * CELL
        for (let r = 0; r < rows; r++) ctx.fillRect(x, r * CELL, DOT, DOT)
      }

      for (let c = 0; c < cols; c++) {
        const goal = target(c, reduce ? 2 : t) * power
        levels[c] += (goal - levels[c]) * (reduce ? 1 : 0.14)
        const lit = Math.round(levels[c] * rows)
        if (lit < 1) continue
        const x = offsetX + c * CELL

        ctx.fillStyle = fg
        for (let i = 0; i < lit - 1; i++) {
          const level = Math.floor((i / rows) * BODY_LEVELS)
          ctx.globalAlpha = BODY_ALPHAS[Math.min(level, BODY_LEVELS - 1)]
          ctx.fillRect(x, (rows - 1 - i) * CELL, DOT, DOT)
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = accent
        ctx.fillRect(x, (rows - lit) * CELL, DOT, DOT)
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      draw(now)
      if (visible && !document.hidden) frame = requestAnimationFrame(loop)
    }

    const play = () => {
      cancelAnimationFrame(frame)
      if (reduce) draw(performance.now())
      else frame = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientY < rect.top - 240 || e.clientY > rect.bottom) return
      pointer.x = (e.clientX - rect.left - offsetX) / CELL
      pointer.energy = Math.min(1, pointer.energy + 0.18)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduce || !visible) draw(performance.now())
    })
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
    })
    const onVisibility = () => !document.hidden && visible && play()
    const scheme = window.matchMedia('(prefers-color-scheme: light)')
    const onTheme = () => {
      readColors()
      if (reduce || !visible) draw(performance.now())
    }

    resize()
    resizeObserver.observe(canvas)
    intersection.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('themechange', onTheme)
    scheme.addEventListener('change', onTheme)
    if (!reduce) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('themechange', onTheme)
      scheme.removeEventListener('change', onTheme)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`block size-full ${className}`} />
}

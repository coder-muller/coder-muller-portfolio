import { useEffect, useState } from 'react'

// Relógio discreto para os motivos: avança um passo a cada `interval` ms,
// só enquanto `active` e com a aba visível.
export function useLoopTick(active: boolean, interval: number) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1)
    }, interval)
    return () => window.clearInterval(id)
  }, [active, interval])

  return tick
}

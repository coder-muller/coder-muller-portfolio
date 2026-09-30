import { motion } from 'motion/react'
import { CursorIcon, LockSimpleIcon } from '@phosphor-icons/react'
import { EASE_OUT } from '../../lib/motion'
import { useLoopTick } from '../motifs/useLoopTick'
import type { VisualProps } from './types'

const BEATS_PER_CYCLE = 7

// Uma landing page se montando bloco a bloco, até o cursor clicar no CTA.
export default function BrowserVisual({ url, active, still }: VisualProps & { url: string }) {
  const tick = useLoopTick(active && !still, 900)
  const cycle = Math.floor(tick / BEATS_PER_CYCLE)

  const block = (i: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, transform: 'translateY(8px)', filter: 'blur(4px)' },
          animate: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
          transition: { duration: 0.6, ease: EASE_OUT, delay: 0.15 + i * 0.12 },
        }

  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-[14px] bg-bg shadow-[0_24px_48px_-24px_oklch(0_0_0/0.6)] ring-1 ring-line">
      <div className="flex h-8 items-center gap-3 border-b border-line px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/15" />
        </span>
        <span className="flex h-5 flex-1 items-center justify-center gap-1 rounded-md bg-fg/[0.05] font-mono text-[10px] text-subtle">
          <LockSimpleIcon size={9} weight="bold" />
          {url}
        </span>
      </div>

      <div key={cycle} className="grid grid-cols-[1.25fr_1fr] gap-4 p-4">
        <div className="flex flex-col">
          <motion.span {...block(0)} className="h-2.5 w-[88%] rounded-full bg-fg/85" />
          <motion.span {...block(1)} className="mt-1.5 h-2.5 w-[62%] rounded-full bg-fg/85" />
          <motion.span {...block(2)} className="mt-3.5 h-1.5 w-full rounded-full bg-fg/20" />
          <motion.span {...block(3)} className="mt-1.5 h-1.5 w-[78%] rounded-full bg-fg/20" />
          <motion.div {...block(4)} className="relative mt-4 w-fit">
            <motion.span
              className="block h-6 w-[72px] rounded-full bg-accent"
              animate={still ? {} : { transform: ['scale(1)', 'scale(1)', 'scale(0.92)', 'scale(1)'] }}
              transition={{ duration: 3.4, times: [0, 0.87, 0.92, 1], ease: 'easeOut' }}
            />
            {!still && (
              <motion.span
                aria-hidden
                className="absolute top-3 left-11 text-fg drop-shadow-[0_2px_4px_oklch(0_0_0/0.6)]"
                initial={{ transform: 'translate(150px, 70px)', opacity: 0 }}
                animate={{
                  transform: ['translate(150px, 70px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 2.6, delay: 1, times: [0, 0.75, 1], ease: [0.65, 0, 0.35, 1] }}
              >
                <CursorIcon size={16} weight="fill" />
              </motion.span>
            )}
          </motion.div>
        </div>
        <motion.span
          {...block(2)}
          className="block aspect-[4/5] rounded-[10px] bg-[radial-gradient(90%_90%_at_30%_20%,oklch(0.72_0.19_42/0.55),transparent_70%),linear-gradient(160deg,oklch(0.3_0.02_40),oklch(0.2_0.01_60))]"
        />
      </div>
    </div>
  )
}

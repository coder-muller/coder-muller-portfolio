import { Fragment } from 'react'
import { motion } from 'motion/react'
import { stacks } from '../data/portfolio'
import { SectionTitle } from './ui'
import { EASE } from '../lib/motion'

export default function Stack() {
  return (
    <section id="stack" className="bg-surface px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle num="03" label="Stack" />

        <div className="border-t border-rule">
          {stacks.map((s, gi) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: gi * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 gap-y-3 border-b border-rule py-[clamp(24px,3vw,40px)] lg:grid-cols-[200px_1fr] lg:gap-x-10"
            >
              <span className="pt-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dim">
                {s.group}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {s.items.map((item, ii) => (
                  <Fragment key={item}>
                    <motion.span
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: gi * 0.08 + ii * 0.05 }}
                      viewport={{ once: true, margin: '-60px' }}
                      className="stack-word font-display text-[clamp(24px,3.5vw,48px)] font-semibold text-bright"
                    >
                      {item}
                    </motion.span>
                    {ii < s.items.length - 1 && (
                      <span aria-hidden className="text-[10px] text-accent">
                        ◆
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

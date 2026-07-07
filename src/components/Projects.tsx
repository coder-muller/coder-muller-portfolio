import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { projects } from '../data/portfolio'
import { SectionTitle } from './ui'
import { EASE } from '../lib/motion'

// Sem hover (touch), os drawers ficam sempre abertos e os títulos preenchidos.
function useCanHover() {
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return canHover
}

export default function Projects() {
  const [active, setActive] = useState<number | null>(null)
  const canHover = useCanHover()
  const reduce = useReducedMotion()

  return (
    <section id="projects" className="bg-bg px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle num="02" label="Projetos" />

        <div>
          {projects.map((p, i) => {
            const open = !canHover || active === i
            return (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-60px' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                className="project-link block border-b border-rule py-[clamp(28px,4vw,52px)] no-underline first:border-t"
              >
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 lg:flex-nowrap">
                  <span className="project-index w-10 shrink-0 font-mono text-sm font-bold text-dim">
                    0{i + 1}/
                  </span>
                  <h3 className="project-title min-w-0 flex-[1_1_55%] break-words font-display text-[clamp(40px,9vw,140px)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] lg:flex-1">
                    {p.name}
                  </h3>
                  <span className="flex shrink-0 items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-dim">
                    {p.status === 'production' ? (
                      <span className="status-live h-[7px] w-[7px] rounded-full bg-accent" />
                    ) : (
                      <span className="h-[7px] w-[7px] rounded-full border border-dim" />
                    )}
                    {p.meta}
                  </span>
                  <span
                    className="project-arrow hidden shrink-0 font-display text-[clamp(28px,3vw,44px)] font-extrabold text-accent sm:inline-block"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[680px] pt-6 lg:pl-16">
                    <p className="font-display text-[17px] leading-[1.55] text-dim">
                      {p.description}
                    </p>
                    <div className="pt-4 font-mono text-[11px] uppercase tracking-[0.05em] text-text">
                      {p.pills.join(' · ')}
                    </div>
                  </div>
                </motion.div>
              </motion.a>
            )
          })}

          <motion.a
            href="https://github.com/coder-muller"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            viewport={{ once: true, margin: '-60px' }}
            className="github-strip flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-rule py-[clamp(20px,3vw,32px)] no-underline"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dim">
              Open source · contínuo
            </span>
            <span className="strip-title flex items-baseline gap-4 font-display text-[clamp(20px,2.6vw,32px)] font-semibold text-bright">
              Mais experimentos no GitHub
              <span className="strip-arrow text-accent" aria-hidden>
                ↗
              </span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

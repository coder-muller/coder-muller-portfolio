import { motion } from 'motion/react'
import { stats } from '../data/portfolio'
import { CountUp, MaskWords, SectionTitle } from './ui'
import { EASE } from '../lib/motion'

export default function About() {
  return (
    <section id="about" className="bg-bg px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle num="01" label="Sobre" />

        <p className="max-w-[22ch] font-display text-[clamp(30px,4.5vw,64px)] font-semibold leading-[1.08] tracking-[-0.02em] text-bright">
          <MaskWords text="Transformo problemas reais em software rápido, claro e *em* *produção.*" />
        </p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 max-w-[560px] font-mono text-sm leading-[1.7] text-dim lg:ml-[38%]"
        >
          Engenheiro fullstack focado no que importa: performance, design e experiência de uso. Do
          modelo de dados ao deploy — aplicações completas, sistemas confiáveis e integrações que
          não quebram.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-60px' }}
          className="mt-[clamp(48px,7vw,96px)] grid grid-cols-2 gap-px border-y border-rule bg-rule lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center bg-bg px-[clamp(16px,2vw,32px)] py-[clamp(24px,3vw,44px)]"
            >
              <div className="font-display text-[clamp(36px,5vw,72px)] font-extrabold leading-none tracking-[-0.04em] text-bright">
                <CountUp target={s.target} suffix={s.suffix} pad={s.pad} />
              </div>
              <div className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
                {s.label}
              </div>
              <div className="mt-2 font-mono text-[11px] leading-[1.6] text-dim">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

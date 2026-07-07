import { motion, useReducedMotion } from 'motion/react'
import { contactLinks } from '../data/portfolio'
import { SectionTitle } from './ui'
import { EASE } from '../lib/motion'

export default function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="bg-bg px-[clamp(24px,5vw,80px)] py-[clamp(80px,12vw,160px)]">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle num="04" label="Contato" />

        <a
          href="mailto:guilhermemullerxx@gmail.com"
          className="contact-cta block no-underline"
          aria-label="Enviar email para guilhermemullerxx@gmail.com"
        >
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(44px,11vw,160px)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: reduce ? 0 : '110%' },
                  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
                }}
                className="cta-plain block text-bright will-change-transform"
              >
                Vamos trabalhar
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{
                  hidden: { y: reduce ? 0 : '110%' },
                  show: { y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.12 } },
                }}
                className="inline-flex items-baseline gap-[0.15em] will-change-transform"
              >
                <span className="inline-block bg-accent px-[0.08em] text-bg">Juntos.</span>
                <span className="cta-arrow text-[0.5em] text-accent" aria-hidden>
                  ↗
                </span>
              </motion.span>
            </span>
          </motion.h2>
        </a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 max-w-[480px] font-mono text-sm leading-[1.7] text-dim"
        >
          Projetos, colaborações ou uma boa ideia — me escreve. Respondo rápido.
        </motion.p>

        <div className="mt-[clamp(48px,7vw,96px)] grid grid-cols-1 gap-px border-y border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? '_self' : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              viewport={{ once: true, margin: '-40px' }}
              className="contact-card flex flex-col gap-2 bg-bg p-6 no-underline"
            >
              <span className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-dim">
                {link.label}
                <span className="card-arrow text-sm" aria-hidden>
                  ↗
                </span>
              </span>
              <span className="card-value break-all font-display text-[17px] font-semibold tracking-[-0.01em] text-bright">
                {link.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

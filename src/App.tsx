import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { projects } from './data/portfolio'
import { useCustomCursor } from './hooks/useCustomCursor'

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#050505',
  surface: '#121212',
  border: '#2A2A2A',
  accent: '#FF3B00',
  text: '#F5F5F5',
  dim: '#8A8A8A',
  bright: '#FFFFFF',
}

const DISPLAY = "'Bricolage Grotesque', sans-serif"
const MONO = "'JetBrains Mono', monospace"

// ─── Letters: per-letter rise reveal ─────────────────────────────────────────
function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { y: '110%', rotate: 4 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.04 }}
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

// ─── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return
        started.current = true
        const duration = 1400
        const steps = 50
        const inc = target / steps
        let current = 0
        const t = setInterval(() => {
          current += inc
          if (current >= target) {
            setCount(target)
            clearInterval(t)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
      }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.span>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'SOBRE', href: '#about' },
    { label: 'STACKS', href: '#stack' },
    { label: 'PROJETOS', href: '#projects' },
    { label: 'CONTATO', href: '#contact' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px clamp(24px, 5vw, 80px)',
          pointerEvents: 'none',
        }}
      >
        <a
          href="#"
          style={{
            color: C.bright,
            fontSize: '18px',
            fontFamily: DISPLAY,
            fontWeight: 800,
            textDecoration: 'none',
            pointerEvents: 'auto',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          Müller<span style={{ color: C.accent }}>.</span>
        </a>

        <div style={{ pointerEvents: 'auto', gap: '32px' }} className="hidden sm:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: C.bright,
                fontSize: '11px',
                textDecoration: 'none',
                fontFamily: MONO,
                fontWeight: 700,
                letterSpacing: '0.1em',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
              }}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="flex sm:hidden"
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: C.bright,
                display: 'block',
                transition: 'transform 0.2s, opacity 0.2s',
                transform: open
                  ? n === 0
                    ? 'translateY(7px) rotate(45deg)'
                    : n === 2
                      ? 'translateY(-7px) rotate(-45deg)'
                      : 'none'
                  : 'none',
                opacity: open && n === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: C.bg,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {links.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              onClick={() => setOpen(false)}
              style={{
                color: C.bright,
                fontSize: 'clamp(36px, 10vw, 56px)',
                textDecoration: 'none',
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                padding: '12px 0',
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      )}
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 180])
  const y2 = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : -90])

  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px clamp(24px, 5vw, 80px) 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: -1,
        }}
      />

      <motion.p
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          color: C.accent,
          fontSize: '12px',
          fontFamily: MONO,
          marginBottom: '24px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: C.accent,
            transformOrigin: 'left',
          }}
        />
        Engenheiro de Software
      </motion.p>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: y1 }}>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 'clamp(48px, 15vw, 200px)',
              color: C.bright,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            <Letters text="GUILHERME" delay={0.15} />
          </h1>
        </motion.div>

        <motion.div style={{ y: y2 }}>
          <h1
            className="ml-0 sm:ml-[5vw]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 'clamp(48px, 15vw, 200px)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
            }}
          >
            <motion.span
              initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: C.accent,
                color: C.bg,
                padding: '0 0.08em',
                display: 'inline-block',
              }}
            >
              MÜLLER.
            </motion.span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          bottom: '40px',
          right: 'clamp(24px, 5vw, 80px)',
          fontFamily: MONO,
          fontSize: '10px',
          color: C.dim,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span>Scroll to explore</span>
        <span style={{ width: '1px', height: '60px', backgroundColor: C.dim }} />
      </motion.div>
    </section>
  )
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
function Marquee() {
  const words = ['Fullstack', 'Performance', 'Design', 'TypeScript', 'Produto']
  const chunk = (
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(40px, 7vw, 96px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            padding: '0 28px',
            whiteSpace: 'nowrap',
            color: i % 2 === 0 ? 'transparent' : C.bright,
            WebkitTextStroke: i % 2 === 0 ? `1px ${C.dim}` : undefined,
            display: 'flex',
            alignItems: 'center',
            gap: '56px',
          }}
        >
          {w}
          <span style={{ color: C.accent, fontSize: '0.4em', WebkitTextStroke: '0' }}>◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      aria-hidden
      style={{
        overflow: 'hidden',
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: '20px 0',
      }}
    >
      <div className="marquee-track">
        {chunk}
        {chunk}
      </div>
    </div>
  )
}

// ─── SectionTitle ────────────────────────────────────────────────────────────
function SectionTitle({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
        <span
          style={{
            color: C.accent,
            fontSize: '14px',
            fontFamily: MONO,
            fontWeight: 700,
          }}
        >
          [{num}]
        </span>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 800,
            color: C.bright,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {label}
        </h2>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        style={{
          height: '2px',
          backgroundColor: C.accent,
          transformOrigin: 'left',
          marginTop: '24px',
          maxWidth: '120px',
        }}
      />
    </div>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle num="01" label="Sobre" />

        <div
          style={{ gap: 'clamp(48px, 10vw, 100px)', alignItems: 'center' }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600,
                color: C.bright,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '32px',
              }}
            >
              Criando soluções que transformam{' '}
              <span style={{ color: C.accent }}>complexidade</span> em interfaces limpas e
              eficientes.
            </p>
            <p
              style={{
                color: C.dim,
                fontSize: '16px',
                lineHeight: 1.6,
                fontFamily: MONO,
                maxWidth: '600px',
              }}
            >
              Focado no que realmente importa: performance, design e experiência de usuário.
              Desenvolvo aplicações completas, sistemas de alta confiabilidade e integrações
              eficientes.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2px',
              backgroundColor: C.border,
            }}
          >
            {[
              {
                target: 3,
                suffix: '+',
                label: 'ANOS DE EXP',
                desc: 'Construindo produtos digitais.',
              },
              { target: 10, suffix: '+', label: 'PROJETOS', desc: 'Entregues em produção.' },
              {
                target: 200,
                suffix: '+',
                label: 'CLIENTES REAIS',
                desc: 'Que confiam no meu trabalho',
              },
              {
                target: 100,
                suffix: '%',
                label: 'COMPROMETIMENTO',
                desc: 'Com o sucesso do projeto.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: C.bg,
                  padding: 'clamp(16px, 3vw, 40px) clamp(12px, 2.5vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    fontSize: 'clamp(32px, 6vw, 80px)',
                    color: C.bright,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    marginBottom: '16px',
                  }}
                >
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    color: C.accent,
                    fontSize: '12px',
                    fontFamily: MONO,
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}
                >
                  {s.label}
                </div>
                <div style={{ color: C.dim, fontSize: '12px', fontFamily: MONO }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stack ─────────────────────────────────────────────────────────────────
const techStacks = [
  { num: '01', group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Motion'] },
  { num: '02', group: 'Backend', items: ['Node.js', 'Bun', 'Elysia', 'Express', 'tRPC'] },
  { num: '03', group: 'Database', items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Neon'] },
  { num: '04', group: 'Ecosystem', items: ['Stripe', 'Better Auth', 'Resend', 'Vercel', 'Figma'] },
]

function StackColumn({
  stack,
  idx,
  isOpen,
  onToggle,
  isMobile,
}: {
  stack: (typeof techStacks)[0]
  idx: number
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <button
        onClick={() => {
          if (isMobile) onToggle()
        }}
        style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: C.bg,
          border: 'none',
          borderBottom: isOpen ? `1px solid ${C.border}` : 'none',
          cursor: isMobile ? 'pointer' : 'default',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            fontFamily: MONO,
            fontSize: '12px',
            color: C.dim,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
          }}
        >
          {stack.group}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: C.accent }}>
            [{stack.num}]
          </span>
          <span
            className="sm:hidden"
            style={{
              color: C.dim,
              fontFamily: MONO,
              fontSize: '14px',
              transition: 'transform 0.3s',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ↓
          </span>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {stack.items.map((item, itemIdx) => (
          <div
            key={item}
            className="stack-item"
            style={{
              padding: 'clamp(16px, 2vw, 24px)',
              borderBottom: itemIdx !== stack.items.length - 1 ? `1px solid ${C.border}` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background-color 0.3s ease',
            }}
          >
            <span
              className="stack-item-text"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(20px, 2vw, 28px)',
                fontWeight: 600,
                color: C.bright,
                transition: 'all 0.3s ease',
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function Stack() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="stack"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        backgroundColor: C.surface,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle num="02" label="Tech Stack" />

        <div
          style={{ borderTop: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}` }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {techStacks.map((stack, idx) => (
            <StackColumn
              key={stack.group}
              stack={stack}
              idx={idx}
              isOpen={isMobile ? openIndex === idx : true}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)', backgroundColor: C.bg }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle num="03" label="Projetos" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              style={{
                textDecoration: 'none',
                gap: 'clamp(16px, 4vw, 40px)',
                alignItems: 'start',
                padding: 'clamp(32px, 6vw, 64px) clamp(8px, 1.5vw, 24px)',
                borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: `1px solid ${C.border}`,
                position: 'relative',
              }}
              className="project-row grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr_60px]"
            >
              <div
                className="hidden lg:block"
                style={{ fontFamily: MONO, fontSize: '14px', color: C.dim, fontWeight: 700 }}
              >
                0{i + 1}
              </div>

              <div>
                <h3
                  className="project-title"
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 'clamp(28px, 6vw, 80px)',
                    fontWeight: 800,
                    color: C.bright,
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    wordBreak: 'break-word',
                  }}
                >
                  {p.name}
                </h3>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: '12px',
                    color: C.accent,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  {p.meta}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: '18px',
                    color: C.dim,
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {p.description}
                </p>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: '11px',
                    color: C.text,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {p.pills.join(' · ')}
                </div>
              </div>

              <div
                className="project-arrow hidden lg:block"
                aria-hidden
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '40px',
                  fontWeight: 800,
                  color: C.accent,
                  opacity: 0,
                  transform: 'translate(-12px, 12px)',
                  transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  justifySelf: 'end',
                }}
              >
                ↗
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
        backgroundColor: C.surface,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <motion.a
          href="mailto:guilhermemullerxx@gmail.com"
          className="mega-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 'clamp(8px, 2vw, 24px)',
            textDecoration: 'none',
            marginBottom: '24px',
          }}
        >
          <h2
            className="mega-cta-text"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 'clamp(32px, 8vw, 80px)',
              color: C.bright,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: 0,
              textTransform: 'uppercase',
              wordBreak: 'break-word',
              transition: 'color 0.3s ease',
            }}
          >
            Vamos
            <br />
            <span style={{ color: C.accent }}>Conversar</span>
          </h2>
          <span
            className="mega-cta-arrow"
            aria-hidden
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 800,
              color: C.accent,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            ↗
          </span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontFamily: MONO,
            fontSize: '14px',
            color: C.dim,
            maxWidth: '500px',
            margin: '0 auto 40px auto',
            lineHeight: 1.6,
          }}
        >
          Aberto a projetos, colaborações e oportunidades que gerem valor real.
        </motion.p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            margin: '0 auto',
            borderTop: `1px solid ${C.border}`,
          }}
        >
          {[
            {
              label: 'Email',
              value: 'guilhermemullerxx@gmail.com',
              href: 'mailto:guilhermemullerxx@gmail.com',
            },
            { label: 'GitHub', value: 'coder-muller', href: 'https://github.com/coder-muller' },
            {
              label: 'LinkedIn',
              value: 'guilherme-cmuller',
              href: 'https://www.linkedin.com/in/guilherme-cmuller',
            },
            {
              label: 'Instagram',
              value: '@coder.muller',
              href: 'https://instagram.com/coder.muller',
            },
          ].map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? '_self' : '_blank'}
              rel={link.label === 'Email' ? '' : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              className="contact-link-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                padding: '20px 0',
                borderBottom: `1px solid ${C.border}`,
                textDecoration: 'none',
                position: 'relative',
              }}
            >
              <span
                className="contact-label"
                style={{
                  fontFamily: MONO,
                  fontSize: '12px',
                  color: C.dim,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </span>

              <span
                className="contact-value"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(16px, 2.5vw, 24px)',
                  fontWeight: 600,
                  color: C.bright,
                  letterSpacing: '-0.01em',
                  transition: 'all 0.3s',
                  wordBreak: 'break-word',
                }}
              >
                {link.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useCustomCursor()

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100dvh', color: C.text, overflowX: 'hidden' }}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Contact />
        <footer
          style={{
            padding: '40px clamp(24px, 5vw, 80px)',
            backgroundColor: C.bg,
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <span
            style={{
              color: C.dim,
              fontSize: '12px',
              fontFamily: MONO,
              textTransform: 'uppercase',
            }}
          >
            © {new Date().getFullYear()} Guilherme Müller
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/coder-muller' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/guilherme-cmuller' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: C.dim,
                  fontFamily: MONO,
                  fontSize: '12px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}

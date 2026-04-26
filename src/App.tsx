import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects } from './data/portfolio'
import { useCustomCursor } from './hooks/useCustomCursor'

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#050505',
  surface: '#121212',
  border: '#2A2A2A',
  accent: '#FF3B00', // Vivid Orange for striking accents
  text: '#F5F5F5',
  dim: '#8A8A8A',
  bright: '#FFFFFF',
}

// ─── Font loader ─────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;700&display=swap'
    document.head.appendChild(link)
    return () => link.remove()
  }, [])
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
      {count}{suffix}
    </motion.span>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
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
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          textDecoration: 'none',
          pointerEvents: 'auto',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
        }}
      >
        Müller<span style={{color: C.accent}}>.</span>
      </a>

      <div style={{ pointerEvents: 'auto', display: 'flex', gap: '32px' }} className="max-[640px]:hidden">
        {[
          { label: 'SOBRE', href: '#about' },
          { label: 'STACKS', href: '#stack' },
          { label: 'PROJETOS', href: '#projects' },
          { label: 'CONTATO', href: '#contact' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: C.bright,
              fontSize: '11px',
              textDecoration: 'none',
              fontFamily: "'JetBrains Mono', monospace",
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
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

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
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-10%',
        width: '50vw', height: '50vw',
        background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`,
        filter: 'blur(80px)',
        zIndex: -1,
      }} />

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          color: C.accent,
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: '24px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span style={{ width: '40px', height: '1px', backgroundColor: C.accent }}></span>
        Engenheiro de Software
      </motion.p>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: y1 }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(60px, 15vw, 200px)',
              color: C.bright,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            GUILHERME
          </motion.h1>
        </motion.div>
        
        <motion.div style={{ y: y2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(60px, 15vw, 200px)',
              color: 'transparent',
              WebkitTextStroke: `2px ${C.border}`,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0,
              textTransform: 'uppercase',
              marginLeft: '5vw',
            }}
          >
            MÜLLER.
          </motion.h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: 'clamp(24px, 5vw, 80px)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: C.dim,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <span>Scroll to explore</span>
        <span style={{ width: '1px', height: '60px', backgroundColor: C.dim }}></span>
      </motion.div>
    </section>
  )
}

// ─── SectionTitle ────────────────────────────────────────────────────────────
function SectionTitle({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '80px' }}>
      <span style={{ color: C.accent, fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
        [{num}]
      </span>
      <h2 style={{ 
        fontFamily: "'Bricolage Grotesque', sans-serif", 
        fontSize: 'clamp(32px, 5vw, 64px)', 
        fontWeight: 800,
        color: C.bright,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        margin: 0
      }}>
        {label}
      </h2>
    </div>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      style={{ padding: '120px clamp(24px, 5vw, 80px)', borderTop: `1px solid ${C.border}`, position: 'relative' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle num="01" label="Visão Geral" />

        <div
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}
          className="max-[1024px]:grid-cols-1 max-[1024px]:gap-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600,
                color: C.bright,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '32px',
              }}
            >
              Arquitetando soluções escaláveis que convertem complexidade em interfaces limpas e eficientes.
            </p>
            <p
              style={{
                color: C.dim,
                fontSize: '16px',
                lineHeight: 1.6,
                fontFamily: "'JetBrains Mono', monospace",
                maxWidth: '600px',
              }}
            >
              Focado no que realmente importa: performance, conversão e experiência de usuário. Desenvolvo aplicações SaaS completas, sistemas de alta disponibilidade e integrações financeiras ponta a ponta.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: C.border }}>
            {[
              { target: 3, suffix: '+', label: 'ANOS DE EXP', desc: 'Construindo produtos digitais.' },
              { target: 12, suffix: '+', label: 'PROJETOS', desc: 'Entregues em produção.' },
              { target: 1000, suffix: '+', label: 'USUÁRIOS FINAIS', desc: 'Impactados diariamente.' },
              { target: 100, suffix: '%', label: 'COMPROMETIMENTO', desc: 'Com o sucesso do projeto.' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ 
                  backgroundColor: C.bg, 
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    color: C.bright,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    marginBottom: '16px'
                  }}
                >
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div style={{ color: C.accent, fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, marginBottom: '8px' }}>
                  {s.label}
                </div>
                <div style={{ color: C.dim, fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.desc}
                </div>
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
  { num: '03', group: 'Database', items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'AWS'] },
  { num: '04', group: 'Ecosystem', items: ['Stripe', 'Better Auth', 'Resend', 'Vercel', 'Figma'] },
]

function Stack() {
  return (
    <section
      id="stack"
      style={{ padding: '120px clamp(24px, 5vw, 80px)', backgroundColor: C.surface }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle num="02" label="Tech Stack" />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${C.border}`,
            borderLeft: `1px solid ${C.border}`,
          }}
          className="max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1"
        >
          {techStacks.map((stack, idx) => (
            <motion.div 
              key={stack.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {/* Header */}
              <div style={{
                padding: '24px',
                borderBottom: `1px solid ${C.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: C.bg
              }}>
                <h3 style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontSize: '12px', 
                  color: C.dim,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0
                }}>
                  {stack.group}
                </h3>
                <span style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontSize: '10px', 
                  color: C.accent,
                }}>
                  [{stack.num}]
                </span>
              </div>
              
              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stack.items.map((item, itemIdx) => (
                  <div 
                    key={item}
                    className="stack-item"
                    style={{
                      padding: '24px',
                      borderBottom: itemIdx !== stack.items.length - 1 ? `1px solid ${C.border}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'default',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <span 
                      className="stack-item-text" 
                      style={{ 
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        fontWeight: 600,
                        color: C.bright,
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      {item}
                    </span>
                    <span 
                      className="stack-item-arrow" 
                      style={{ 
                        fontFamily: "'JetBrains Mono', monospace", 
                        fontSize: '16px', 
                        color: C.accent,
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      +
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
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
      style={{ padding: '120px clamp(24px, 5vw, 80px)', backgroundColor: C.bg }}
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
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{
                textDecoration: 'none',
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '40px',
                alignItems: 'start',
                padding: '64px 0',
                borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: `1px solid ${C.border}`,
                position: 'relative',
              }}
              className="project-row max-[1024px]:grid-cols-1 max-[1024px]:gap-6 max-[1024px]:py-8"
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                color: C.dim,
                fontWeight: 700
              }}>
                0{i + 1}
              </div>

              <div>
                <h3 className="project-title" style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  fontWeight: 800,
                  color: C.bright,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease'
                }}>
                  {p.name}
                </h3>
                <div style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontSize: '12px', 
                  color: C.accent,
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}>
                  {p.meta}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '18px',
                  color: C.dim,
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 400
                }}>
                  {p.description}
                </p>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: C.text,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {p.pills.join(' · ')}
                </div>
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
      style={{ padding: '160px clamp(24px, 5vw, 80px)', backgroundColor: C.surface }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(48px, 10vw, 140px)',
            color: C.bright,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            margin: '0 0 24px 0',
            textTransform: 'uppercase'
          }}
        >
          Vamos<br/><span style={{ color: C.accent }}>Conversar</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '16px',
            color: C.dim,
            maxWidth: '600px',
            margin: '0 auto 64px auto',
            lineHeight: 1.6
          }}
        >
          Disponível para novos projetos, colaborações e oportunidades de impactar o mundo real com código escalável.
        </motion.p>

        <motion.a
          href="mailto:guilhermecoelhomuller@gmail.com"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80px',
            padding: '0 64px',
            backgroundColor: C.bright,
            color: C.bg,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: '20px',
            fontWeight: 800,
            textDecoration: 'none',
            borderRadius: '100px',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            transition: 'transform 0.2s, background-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLElement).style.backgroundColor = C.accent;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.backgroundColor = C.bright;
          }}
        >
          Iniciar Projeto
        </motion.a>
      </div>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useCustomCursor()
  useFonts()

  useEffect(() => {
    document.body.style.backgroundColor = C.bg
    document.body.style.color = C.text
    document.body.style.margin = '0'
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
      document.body.style.overflowX = ''
    }
  }, [])

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100dvh', color: C.text, overflowX: 'hidden' }}>
      <Nav />
      <main>
        <Hero />
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
          <span style={{ color: C.dim, fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Guilherme Müller
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="https://github.com/coder-muller" target="_blank" rel="noreferrer" style={{ color: C.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase' }}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: C.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase' }}>LinkedIn</a>
          </div>
        </footer>
      </main>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: ${C.accent};
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .project-row:hover .project-title {
          color: ${C.accent} !important;
        }

        .stack-item:hover {
          background-color: ${C.bg};
        }
        .stack-item:hover .stack-item-text {
          transform: translateX(8px);
          color: ${C.accent} !important;
        }
        .stack-item:hover .stack-item-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  )
}

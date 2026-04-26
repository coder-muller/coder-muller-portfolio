import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { projects, stackItems } from './data/portfolio'
import { useCustomCursor } from './hooks/useCustomCursor'

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#09090b',
  surface: '#18181b',
  border: '#27272a',
  borderHover: '#52525b',
  text: '#e4e4e7',
  dim: '#71717a',
  bright: '#ffffff',
}

// ─── Font loader ─────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap'
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
        backgroundColor: 'rgba(9,9,11,0.92)',
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(24px, 5vw, 80px)',
        height: '52px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <a
        href="#"
        style={{
          color: C.bright,
          fontSize: '14px',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        GM
      </a>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', gap: '28px' }} className="max-[640px]:hidden">
          {[
            { n: '01', label: 'sobre', href: '#about' },
            { n: '02', label: 'stack', href: '#stack' },
            { n: '03', label: 'projetos', href: '#projects' },
            { n: '04', label: 'contato', href: '#contact' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: C.dim,
                fontSize: '12px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 150ms',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.text)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.dim)}
            >
              <span style={{ fontSize: '10px', opacity: 0.5 }}>{item.n}</span>
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            }}
          />
          <span style={{ color: C.dim, fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace" }}>disponível</span>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px clamp(24px, 5vw, 80px) 60px',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          color: C.dim,
          fontSize: '11px',
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: '28px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        full-stack · saas · pelotas, brasil
      </motion.p>

      <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(64px, 13vw, 168px)',
            color: C.bright,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          GUILHERME
        </motion.h1>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(64px, 13vw, 168px)',
            color: C.dim,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          MÜLLER.
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <a
          href="#projects"
          style={{
            color: C.bright,
            fontSize: '13px',
            fontFamily: "'IBM Plex Mono', monospace",
            textDecoration: 'none',
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: '2px',
            transition: 'border-color 150ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = C.bright)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}
        >
          ver projetos →
        </a>
        <a
          href="#contact"
          style={{
            color: C.dim,
            fontSize: '13px',
            fontFamily: "'IBM Plex Mono', monospace",
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.text)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.dim)}
        >
          entrar em contato →
        </a>
      </motion.div>
    </section>
  )
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '48px' }}>
      <span style={{ color: C.dim, fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace" }}>
        {num}
      </span>
      <span style={{ color: C.text, fontSize: '12px', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      style={{ padding: '80px clamp(24px, 5vw, 80px)', borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="01" label="SOBRE" />

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '80px', alignItems: 'start' }}
          className="max-[768px]:grid-cols-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 700,
                color: C.bright,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Focado no que realmente entrega.
            </h2>
            <p
              style={{
                color: C.dim,
                fontSize: '15px',
                lineHeight: 1.7,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                maxWidth: '520px',
              }}
            >
              Desenvolvedor web full-stack construindo aplicações rápidas e sustentáveis do front ao deploy. Foco em SaaS, integrações de pagamento e plataformas voltadas ao cliente.
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: '48px' }} className="max-[768px]:gap-8">
            {[
              { target: 3, suffix: '+', label: 'anos' },
              { target: 12, suffix: '+', label: 'projetos' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    color: C.bright,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div style={{ color: C.dim, fontSize: '12px', fontFamily: "'IBM Plex Mono', monospace", marginTop: '8px' }}>
                  {s.label}
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
function Stack() {
  return (
    <section
      id="stack"
      style={{ padding: '80px clamp(24px, 5vw, 80px)', borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="02" label="STACK" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1px',
            backgroundColor: C.border,
          }}
        >
          {stackItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: C.bg,
                padding: '16px 20px',
                transition: 'background-color 150ms',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = C.surface }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = C.bg }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: '6px',
                }}
              >
                {item.name}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: C.dim }}>
                {item.tag}
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
      style={{ padding: '80px clamp(24px, 5vw, 80px)', borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader num="03" label="PROJETOS" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                textDecoration: 'none',
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto auto',
                gap: '16px',
                alignItems: 'center',
                padding: '20px 0',
                borderBottom: `1px solid ${C.border}`,
                backgroundColor: 'transparent',
                transition: 'background-color 150ms, padding-left 150ms',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.surface
                ;(e.currentTarget as HTMLAnchorElement).style.paddingLeft = '12px'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0'
              }}
              className="max-[640px]:grid-cols-1"
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: C.dim }}>
                0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: C.bright,
                  letterSpacing: '-0.02em',
                }}
              >
                {p.name}
              </span>
              <span
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: C.dim, whiteSpace: 'nowrap' }}
                className="max-[640px]:hidden"
              >
                {p.pills.slice(0, 3).join(' · ')}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: C.dim, whiteSpace: 'nowrap' }}>
                {p.meta} →
              </span>
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
      style={{ padding: '80px clamp(24px, 5vw, 80px)', borderTop: `1px solid ${C.border}` }}
    >
      <div
        style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '80px', alignItems: 'start' }}
        className="max-[768px]:grid-cols-1"
      >
        <div>
          <SectionHeader num="04" label="CONTATO" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: C.bright,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Vamos construir algo juntos.
          </motion.h2>
          <p style={{ color: C.dim, fontSize: '15px', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: '400px' }}>
            Aberto a freelance, colaborações em SaaS e oportunidades full-time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'email', value: 'guilhermecoelhomuller@gmail.com', href: 'mailto:guilhermecoelhomuller@gmail.com' },
            { label: 'github', value: 'github.com/coder-muller', href: 'https://github.com/coder-muller' },
            { label: 'onde', value: 'Pelotas, Brasil · Remoto', href: undefined },
          ].map(row => (
            <div
              key={row.label}
              style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'center' }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: C.dim, minWidth: '52px' }}>
                {row.label}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: C.text,
                    textDecoration: 'none',
                    transition: 'color 150ms',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = C.bright)}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = C.text)}
                >
                  {row.value}
                </a>
              ) : (
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: C.dim }}>
                  {row.value}
                </span>
              )}
            </div>
          ))}

          <a
            href="mailto:guilhermecoelhomuller@gmail.com"
            style={{
              display: 'block',
              marginTop: '24px',
              textAlign: 'center',
              backgroundColor: C.bright,
              color: C.bg,
              padding: '12px 24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'opacity 150ms',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.opacity = '0.88')}
            onMouseLeave={e => ((e.target as HTMLElement).style.opacity = '1')}
          >
            enviar mensagem
          </a>
        </motion.div>
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
    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [])

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100dvh', color: C.text }}>
      <Nav />
      <main style={{ paddingTop: '52px' }}>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
        <footer
          style={{
            padding: '24px clamp(24px, 5vw, 80px)',
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span style={{ color: C.dim, fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace" }}>
            © 2025 Guilherme Müller
          </span>
          <span style={{ color: C.dim, fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace" }}>
            desenvolvido à mão
          </span>
        </footer>
      </main>
    </div>
  )
}

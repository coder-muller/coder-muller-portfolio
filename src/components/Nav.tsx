import { useState } from 'react'
import { motion } from 'motion/react'
import { navItems } from '../data/portfolio'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(24px,5vw,80px)] py-6 mix-blend-difference">
        <a
          href="#"
          className="pointer-events-auto font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-bright no-underline"
        >
          Müller<span className="text-accent">.</span>
        </a>

        <div className="pointer-events-auto hidden gap-8 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link relative inline-block overflow-hidden font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-bright no-underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="pointer-events-auto flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1 sm:hidden"
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="block h-0.5 w-6 bg-bright transition-[transform,opacity] duration-200"
              style={{
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
        <div className="fixed inset-0 z-[49] flex flex-col items-center justify-center gap-2 bg-bg">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              onClick={() => setOpen(false)}
              className="py-3 font-display text-[clamp(36px,10vw,56px)] font-extrabold uppercase tracking-[-0.02em] text-bright no-underline"
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      )}
    </>
  )
}

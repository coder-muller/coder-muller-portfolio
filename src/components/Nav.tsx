import { navItems } from '../data/portfolio'

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[500] flex items-center justify-between border-b border-rule bg-[rgba(10,10,10,0.88)] px-[clamp(24px,5vw,80px)] py-[22px] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]">
      <a href="#" className="nav-logo text-[13px] font-normal tracking-[0.04em] text-bright no-underline">
        <span>coder-muller</span>
        <span className="dim text-muted font-light">.dev</span>
      </a>

      <ul className="nav-links flex list-none gap-[clamp(20px,4vw,48px)] max-[640px]:hidden">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-[11px] font-light uppercase tracking-[0.14em] text-muted no-underline transition-colors duration-200 hover:text-dim"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-avail flex items-center gap-[7px] text-[11px] text-muted max-[640px]:hidden">
        <span className="avail-dot h-[6px] w-[6px] rounded-full bg-sub animate-[blink_3s_ease_infinite]" />
        disponível
      </div>
    </nav>
  )
}

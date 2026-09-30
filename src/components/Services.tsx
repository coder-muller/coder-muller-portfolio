import { useRef, type PointerEvent } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useLocale } from '../i18n/locale'
import type { Service } from '../i18n/content'
import { Reveal, WordsReveal } from './primitives'
import GrowthVisual from './visuals/GrowthVisual'
import FlowVisual from './visuals/FlowVisual'
import BrowserVisual from './visuals/BrowserVisual'
import DockVisual from './visuals/DockVisual'

// Bento 7/5 e 5/7: as larguras alternam para o grid ter ritmo.
const LAYOUT: Record<Service['id'], string> = {
  saas: 'lg:col-span-7',
  custom: 'lg:col-span-5',
  web: 'lg:col-span-5',
  macos: 'lg:col-span-7',
}

const BACKDROP: Partial<Record<Service['id'], string>> = {
  saas: 'bg-[radial-gradient(oklch(0.965_0.004_80/0.09)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(80%_90%_at_100%_0%,black,transparent_70%)]',
  macos:
    'bg-[radial-gradient(70%_90%_at_100%_100%,oklch(0.72_0.19_42/0.16),transparent_70%)]',
}

export default function Services() {
  const { t } = useLocale()

  return (
    <section
      id="services"
      className="mx-auto max-w-[1400px] px-4 pb-[clamp(96px,12vw,180px)] sm:px-8 lg:px-12"
    >
      <h2 className="max-w-[16ch] text-[clamp(38px,5.2vw,76px)] leading-[1] font-semibold tracking-[-0.045em] text-fg">
        <WordsReveal text={t.services.title} />
      </h2>

      <div className="mt-[clamp(48px,7vw,96px)] grid gap-3 md:grid-cols-2 lg:grid-cols-12">
        {t.services.items.map((service, i) => (
          <Reveal key={service.id} delay={(i % 2) * 0.1} className={LAYOUT[service.id]}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const active = useInView(ref, { amount: 0.3 })
  const seen = useInView(ref, { amount: 0.5, once: true })
  const props = { active, seen, still: !!reduce }

  // Só o próprio cartão recebe as variáveis: o brilho segue o ponteiro na borda.
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="group relative isolate flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-surface p-7 ring-1 ring-line lg:p-9"
    >
      {BACKDROP[service.id] && (
        <div aria-hidden className={`absolute inset-0 -z-10 ${BACKDROP[service.id]}`} />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),oklch(0.72_0.19_42/0.1),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 [mask:linear-gradient(black,black)_content-box_exclude,linear-gradient(black,black)] bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),oklch(0.72_0.19_42/0.7),transparent_70%)]"
      />

      <div aria-hidden className="relative flex h-48 items-center justify-center lg:h-56">
        {service.id === 'saas' && <GrowthVisual {...props} />}
        {service.id === 'custom' && <FlowVisual {...props} labels={t.services.visuals.flow} />}
        {service.id === 'web' && <BrowserVisual {...props} url={t.services.visuals.url} />}
        {service.id === 'macos' && <DockVisual {...props} />}
      </div>

      <div>
        <h3 className="text-[clamp(24px,2.3vw,32px)] leading-tight font-semibold tracking-[-0.035em] text-fg">
          {service.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">{service.body}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-fg/[0.05] px-3 py-1 font-mono text-[11.5px] text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

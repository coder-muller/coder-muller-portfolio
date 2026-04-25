import { stackItems } from '../data/portfolio'
import { Section } from './Section'
import { SectionLabel } from './SectionLabel'

export function StackSection() {
  return (
    <Section id="stack">
      <SectionLabel>stack</SectionLabel>

      <div className="stack-grid grid gap-px bg-rule [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
        {stackItems.map((item) => (
          <div
            key={item.name}
            data-reveal
            className="stack-card reveal flex flex-col gap-2.5 bg-bg p-[clamp(22px,3vw,36px)]"
          >
            <div className="stack-top flex items-start justify-between gap-2">
              <span className="stack-name text-[13px] font-normal tracking-[0.03em] text-dim">
                {item.name}
              </span>
              <span className="stack-tag shrink-0 text-[10px] uppercase tracking-[0.1em] text-muted2">
                {item.tag}
              </span>
            </div>
            <p className="stack-desc text-[12px] leading-[1.7] text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

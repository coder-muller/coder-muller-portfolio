import { stats } from '../data/portfolio'
import { Section } from './Section'
import { SectionLabel } from './SectionLabel'

export function AboutSection() {
  return (
    <Section id="about">
      <SectionLabel>sobre</SectionLabel>

      <div className="about-grid grid grid-cols-2 items-start gap-[clamp(40px,6vw,100px)] max-[720px]:grid-cols-1">
        <div data-reveal className="reveal">
          <h2 className="mb-7 text-[clamp(26px,3.5vw,46px)] font-light leading-[1.15] tracking-[-0.02em] text-bright">
            Focado no que
            <br />
            <em className="italic text-muted">realmente entrega.</em>
          </h2>

          <p className="font-sans text-[clamp(13px,1.5vw,15px)] font-light leading-[1.9] text-muted">
            Construo <strong className="font-normal text-sub">aplicações web rápidas e sustentáveis</strong>{' '}
            do início ao fim — do schema do banco até o deploy em produção. Atualmente focado em
            SaaS, integrações de pagamento e plataformas voltadas a clientes.
            <br />
            <br />
            Me importo com código que faz sentido daqui a um ano, interfaces que não precisam de
            explicação e arquiteturas que escalam sem drama.
          </p>
        </div>

        <div data-reveal className="stats reveal flex flex-col">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="stat flex items-baseline justify-between border-b border-rule py-5 first:border-t"
            >
              <span className="stat-n text-[clamp(32px,4vw,52px)] font-light tracking-[-0.02em] text-bright">
                {stat.value}
              </span>
              <span className="stat-l text-right text-[11px] leading-[1.5] tracking-[0.08em] text-muted">
                {stat.lines[0]}
                <br />
                {stat.lines[1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

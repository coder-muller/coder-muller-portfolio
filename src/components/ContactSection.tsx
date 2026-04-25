import { ButtonLink } from './ButtonLink'
import { Section } from './Section'
import { SectionLabel } from './SectionLabel'

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionLabel>contato</SectionLabel>

      <div className="contact-grid grid grid-cols-2 items-end gap-[clamp(40px,6vw,100px)] max-[720px]:grid-cols-1">
        <div data-reveal className="reveal">
          <h2 className="mb-7 text-[clamp(36px,5.5vw,76px)] font-light leading-none tracking-[-0.025em] text-bright">
            Vamos construir
            <br />
            <em className="block italic text-muted">algo juntos.</em>
          </h2>
          <p className="font-sans text-[14px] font-light leading-[1.8] text-muted">
            Aberto a projetos freelance, colaborações em SaaS e oportunidades em tempo integral.
          </p>
        </div>

        <div data-reveal className="reveal">
          <div className="contact-links flex flex-col">
            <div className="contact-row flex flex-wrap items-center justify-between gap-4 border-b border-rule py-[17px] first:border-t">
              <span className="c-label text-[10px] uppercase tracking-[0.18em] text-muted2">E-mail</span>
              <a
                href="mailto:guilhermecoelhomuller@gmail.com"
                className="c-val break-all text-[12px] text-sub no-underline transition-colors duration-200 hover:text-dim"
              >
                guilhermecoelhomuller@gmail.com
              </a>
            </div>
            <div className="contact-row flex flex-wrap items-center justify-between gap-4 border-b border-rule py-[17px]">
              <span className="c-label text-[10px] uppercase tracking-[0.18em] text-muted2">GitHub</span>
              <a
                href="https://github.com/coder-muller"
                target="_blank"
                rel="noreferrer"
                className="c-val break-all text-[12px] text-sub no-underline transition-colors duration-200 hover:text-dim"
              >
                github.com/coder-muller
              </a>
            </div>
            <div className="contact-row flex flex-wrap items-center justify-between gap-4 border-b border-rule py-[17px]">
              <span className="c-label text-[10px] uppercase tracking-[0.18em] text-muted2">Localização</span>
              <span className="c-val break-all text-[12px] text-sub">Pelotas, Brasil · Remoto</span>
            </div>
          </div>

          <div className="contact-cta mt-9">
            <ButtonLink href="mailto:guilhermecoelhomuller@gmail.com" variant="solid">
              enviar mensagem
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

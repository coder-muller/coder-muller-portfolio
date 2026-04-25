import { typedPhrases } from '../data/portfolio'
import { useTypewriter } from '../hooks/useTypewriter'
import { ButtonLink } from './ButtonLink'

export function Hero() {
  const typedCommand = useTypewriter(typedPhrases)

  return (
    <section className="hero relative grid min-h-svh grid-rows-[1fr_auto] border-none px-[clamp(24px,5vw,80px)] pt-[110px]">
      <div className="hero-main flex flex-col justify-center">
        <p className="mb-8 text-[11px] uppercase tracking-[0.2em] text-muted opacity-0 animate-[up_0.6s_ease_0.2s_forwards] before:content-['//_']">
          desenvolvedor web full-stack
        </p>

        <h1 className="mb-[14px] text-[clamp(42px,8vw,112px)] font-light leading-none tracking-[-0.025em] text-bright opacity-0 animate-[up_0.8s_ease_0.35s_forwards] max-[420px]:tracking-[-0.02em]">
          Guilherme
          <br />
          <span className="italic text-sub">Müller</span>
        </h1>

        <p className="mb-[clamp(48px,8vw,96px)] text-[clamp(13px,1.8vw,18px)] font-light text-muted opacity-0 animate-[up_0.8s_ease_0.5s_forwards]">
          Construindo <em className="not-italic text-sub">produtos SaaS</em> e aplicações web modernas
        </p>

        <div className="terminal inline-flex max-w-full flex-col gap-1 overflow-hidden text-[clamp(11px,1.4vw,13px)] text-muted opacity-0 animate-[up_0.8s_ease_0.7s_forwards]" aria-hidden="true">
          <div className="t-line flex flex-nowrap items-baseline gap-3">
            <span className="t-prompt shrink-0 select-none text-muted2">$</span>
            <span className="t-cmd text-sub">whoami</span>
          </div>
          <div className="t-line flex flex-nowrap items-baseline gap-3">
            <span className="t-out break-words pl-6 text-muted max-[420px]:text-[10px]">
              guilherme-muller · dev web · pelotas, brasil
            </span>
          </div>
          <div className="t-line mt-[6px] flex flex-nowrap items-baseline gap-3">
            <span className="t-prompt shrink-0 select-none text-muted2">$</span>
            <span className="t-cmd text-sub">cat stack.txt</span>
          </div>
          <div className="t-line flex flex-nowrap items-baseline gap-3">
            <span className="t-out break-words pl-6 text-muted max-[420px]:text-[10px]">
              next.js · typescript · prisma · stripe · docker · bun
            </span>
          </div>
          <div className="t-line mt-[6px] flex flex-nowrap items-baseline gap-3">
            <span className="t-prompt shrink-0 select-none text-muted2">$</span>
            <span id="typed-cmd" className="t-cmd text-sub">
              {typedCommand}
            </span>
            <span className="t-cursor" />
          </div>
        </div>
      </div>

      <div className="hero-footer flex flex-wrap items-center justify-between gap-5 border-t border-rule py-7 opacity-0 animate-[fadeIn_0.8s_ease_1.1s_forwards] max-[420px]:flex-col max-[420px]:items-start">
        <div className="hero-footer-left text-[12px] leading-[2] text-muted">
          <span className="text-muted2">→ </span>
          Pelotas, Brasil &nbsp;·&nbsp;
          <a
            href="mailto:guilhermecoelhomuller@gmail.com"
            className="text-sub no-underline transition-colors duration-200 hover:text-dim"
          >
            guilhermecoelhomuller@gmail.com
          </a>
        </div>

        <div className="hero-ctas flex flex-wrap gap-3 max-[420px]:w-full">
          <ButtonLink href="#projects" variant="solid">
            ver projetos
          </ButtonLink>
          <ButtonLink href="#contact" variant="ghost">
            entrar em contato
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

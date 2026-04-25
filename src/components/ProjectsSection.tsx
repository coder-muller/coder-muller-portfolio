import { projects } from '../data/portfolio'
import { Section } from './Section'
import { SectionLabel } from './SectionLabel'

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionLabel>projetos selecionados</SectionLabel>

      <div className="projects-list flex flex-col">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="project reveal grid grid-cols-[1fr_auto] items-start gap-6 border-b border-rule py-[clamp(28px,4vw,44px)] text-inherit no-underline [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] first:border-t"
          >
            <div>
              <div className="proj-meta mb-2.5 text-[10px] uppercase tracking-[0.18em] text-muted2">
                {project.meta}
              </div>
              <h3 className="proj-name mb-[14px] text-[clamp(20px,3vw,32px)] font-light leading-[1.2] tracking-[-0.01em] text-dim transition-colors duration-200">
                {project.name}
              </h3>
              <p className="proj-desc mb-5 max-w-[600px] font-sans text-[clamp(12px,1.4vw,14px)] font-light leading-[1.8] text-muted">
                {project.description}
              </p>
              <div className="proj-pills flex flex-wrap gap-2">
                {project.pills.map((pill) => (
                  <span key={pill} className="pill border border-rule px-[11px] py-[5px] text-[10px] tracking-[0.08em] text-muted2">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <span className="proj-arrow pt-1 text-[18px] text-muted2 opacity-40 transition-[opacity,transform] duration-200">
              ↗
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}

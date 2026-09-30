import { useRef, type ComponentType } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { GithubLogoIcon } from '@phosphor-icons/react'
import { useLocale } from '../i18n/locale'
import { LINKS, type Project, type ProjectId } from '../i18n/content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { EASE_OUT } from '../lib/motion'
import { LinkButton, Reveal, WordsReveal } from './primitives'
import KiaroMotif from './motifs/KiaroMotif'
import MomentMotif from './motifs/MomentMotif'
import NotchMotif from './motifs/NotchMotif'

const MOTIFS: Record<ProjectId, ComponentType<{ active: boolean; still: boolean }>> = {
  kiaro: KiaroMotif,
  moment: MomentMotif,
  lightnotch: NotchMotif,
}

const STICKY_TOP = 104
const STICKY_STEP = 26

export default function Projects() {
  const { t } = useLocale()
  const reduce = useReducedMotion()
  const canStack = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const stack = canStack && !reduce
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })
  const items = t.projects.items

  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-4 pt-8 pb-[clamp(96px,12vw,180px)] sm:px-8 lg:px-12">
      <h2 className="max-w-[16ch] text-[clamp(38px,5.2vw,76px)] leading-[1] font-semibold tracking-[-0.045em] text-fg">
        <WordsReveal text={t.projects.title} />
      </h2>

      <div ref={listRef} className="mt-[clamp(48px,7vw,96px)] flex flex-col gap-4 lg:gap-0">
        {items.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={items.length}
            progress={scrollYProgress}
            stack={stack}
          />
        ))}
      </div>

      <Reveal className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted">{t.projects.more.lead}</p>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={LINKS.veltro} target="_blank" rel="noopener noreferrer" variant="ghost">
            {t.projects.more.veltro}
          </LinkButton>
          <LinkButton
            href="https://github.com/coder-muller"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            icon={<GithubLogoIcon weight="fill" className="size-4" aria-hidden />}
          >
            {t.projects.more.github}
          </LinkButton>
        </div>
      </Reveal>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  stack,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  stack: boolean
}) {
  const reduce = useReducedMotion()
  const cardRef = useRef<HTMLElement>(null)
  const inView = useInView(cardRef, { amount: 0.35 })
  const behind = total - 1 - index
  // Os cartões de trás encolhem e escurecem enquanto o próximo sobe por cima.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - behind * 0.05])
  const shade = useTransform(progress, [index / total, 1], [0, behind * 0.28])
  const Motif = MOTIFS[project.id]

  return (
    <div
      className={stack ? 'sticky top-0 flex h-[100svh] items-start' : ''}
      style={stack ? { paddingTop: STICKY_TOP + index * STICKY_STEP } : undefined}
    >
      <motion.article
        ref={cardRef}
        {...(stack
          ? { style: { scale, transformOrigin: 'top center' } }
          : {
              initial: reduce ? false : { opacity: 0, transform: 'translateY(40px)' },
              whileInView: { opacity: 1, transform: 'translateY(0px)' },
              viewport: { once: true, margin: '0px 0px -10% 0px' },
              transition: { duration: 0.9, ease: EASE_OUT },
            })}
        className={`relative grid w-full gap-3 overflow-hidden rounded-[32px] bg-surface p-3 ring-1 ring-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] ${
          stack ? 'h-[min(640px,calc(100svh-190px))]' : ''
        }`}
      >
        <div className="flex flex-col justify-between gap-10 p-4 sm:p-6 lg:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-2.5 font-mono text-[12px] text-muted ring-1 ring-line ring-inset">
                {project.live ? (
                  <span className="relative flex size-1.5" aria-hidden>
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
                    <span className="relative size-1.5 rounded-full bg-accent" />
                  </span>
                ) : (
                  <span className="size-1.5 rounded-full bg-subtle" aria-hidden />
                )}
                {project.status}
              </span>
              <span className="font-mono text-[12px] text-subtle">{project.year}</span>
            </div>

            <h3 className="mt-6 text-[clamp(46px,5.4vw,82px)] leading-[0.92] font-semibold tracking-[-0.055em] text-fg">
              {project.name}
            </h3>
            <p className="mt-4 text-[clamp(18px,1.6vw,22px)] leading-snug tracking-[-0.01em] text-fg">
              {project.tagline}
            </p>
          </div>

          <div>
            <p className="max-w-[48ch] text-[15px] leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-fg/[0.05] px-3 py-1 font-mono text-[11.5px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <LinkButton
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="mt-7"
            >
              {project.linkLabel}
            </LinkButton>
          </div>
        </div>

        <div
          aria-hidden
          className="relative isolate grid min-h-[340px] place-items-center overflow-hidden rounded-[20px] bg-bg ring-1 ring-line sm:min-h-[400px] lg:min-h-0"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.72_0.19_42/0.08),transparent_75%)]" />
          <Motif active={inView} still={!!reduce} />
        </div>

        {stack && (
          <motion.div
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-bg"
          />
        )}
      </motion.article>
    </div>
  )
}

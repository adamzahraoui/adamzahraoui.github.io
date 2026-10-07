import { ArrowUpRight, GitFork, ExternalLink } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  const { projects } = portfolio

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Work"
      heading={projects.heading}
      intro={projects.intro}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.items.map((project, index) => (
          <Reveal key={project.name} delay={(index % 2) * 80}>
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted">
                  {project.kind === 'Pair project' ? (
                    <GitFork size={12} aria-hidden="true" />
                  ) : null}
                  {project.kind}
                </span>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open the ${project.name} repository on GitHub`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent"
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-accent"
                >
                  {project.name}
                </a>
              </h3>
              <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

              <ul className="mt-4 space-y-2">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4 text-sm">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-strong"
                >
                  Repository
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
                  >
                    Live demo
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight text-ink">More repositories</h3>
            <p className="font-mono text-xs text-muted">{projects.moreReposNote}</p>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.moreRepos.map((repo) => (
              <li key={repo.name} className="text-sm">
                <span className="font-medium text-ink">{repo.name}</span>
                <span className="text-muted"> — {repo.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

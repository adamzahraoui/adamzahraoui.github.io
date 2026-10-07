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
            <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong focus-within:border-accent sm:p-7">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open the ${project.name} repository on GitHub`}
                className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted">
                  {project.kind === 'Pair project' ? (
                    <GitFork size={12} aria-hidden="true" />
                  ) : null}
                  {project.kind}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent"
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>

              <h3 className="relative z-10 mt-5 text-xl font-semibold tracking-tight text-ink group-hover:text-accent">
                {project.name}
              </h3>
              <p className="relative z-10 mt-1 font-mono text-xs text-accent">{project.tagline}</p>

              <p className="relative z-10 mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

              <ul className="relative z-10 mt-4 space-y-2">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <ul className="relative z-10 mt-6 flex list-none flex-wrap gap-2 p-0">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="relative z-20 mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4 text-sm">
                <span className="inline-flex cursor-pointer items-center gap-1.5 text-accent transition-colors group-hover:text-accent-strong">
                  Repository
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex flex-wrap items-baseline gap-1 text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <span className="font-medium underline-offset-4 hover:underline">{repo.name}</span>
                  <span className="text-muted"> — {repo.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

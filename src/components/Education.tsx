import { GraduationCap, Target } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  const { education } = portfolio

  return (
    <Section
      id="education"
      index="06"
      eyebrow="Education"
      heading={education.heading}
      intro={education.intro}
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {education.entries.map((entry, index) => (
          <Reveal key={entry.institution} delay={index * 70}>
            <article className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                  <GraduationCap size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {entry.institution}
                  </h3>
                  <p className="font-mono text-xs text-muted">{entry.context}</p>
                </div>
              </div>

              <p className="mt-5 text-base font-medium text-ink">{entry.programme}</p>

              <ul className="mt-4 space-y-3">
                {entry.details.map((detail) => (
                  <li key={detail} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}

        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                <Target size={18} aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold tracking-tight text-ink">
                {education.goalsTitle}
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {education.goals.map((goal, index) => (
                <li key={goal} className="flex items-baseline gap-3 text-sm text-ink">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

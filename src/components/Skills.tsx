import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  const { skills } = portfolio

  return (
    <Section id="skills" index="02" eyebrow="Skills" heading={skills.heading} intro={skills.intro}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.groups.map((group, index) => (
          <Reveal key={group.title} delay={index * 70}>
            <article className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <h3 className="text-base font-semibold tracking-tight text-ink">{group.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{group.note}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

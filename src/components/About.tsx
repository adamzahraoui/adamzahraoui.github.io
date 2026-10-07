import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  const { about } = portfolio

  return (
    <Section id="about" index="01" eyebrow="About" heading={about.heading} intro={about.intro[0]}>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5">
          {about.intro.slice(1).map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              {about.asideTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {about.aside.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <dl className="overflow-hidden rounded-2xl border border-line bg-surface">
            {about.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
                  index > 0 ? 'border-t border-line' : ''
                }`}
              >
                <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="text-right text-sm font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

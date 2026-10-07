import { portfolio } from '../data/portfolio'
import { Section } from './Section'
import { Terminal } from './Terminal'

export function TerminalSection() {
  const { terminal } = portfolio

  return (
    <Section
      id="terminal"
      index="05"
      eyebrow="Terminal"
      heading={terminal.heading}
      intro={terminal.intro}
    >
      <Terminal />
    </Section>
  )
}

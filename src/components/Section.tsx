import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  heading: string
  intro?: string
  children: ReactNode
}

export function Section({ id, index, eyebrow, heading, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {index} — {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  )
}

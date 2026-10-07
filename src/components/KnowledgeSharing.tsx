import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function KnowledgeSharing() {
  const { knowledgeSharing } = portfolio
  const [portrait, landscape] = knowledgeSharing.photos

  return (
    <Section
      id="knowledge"
      index="02"
      eyebrow="Knowledge sharing"
      heading={knowledgeSharing.title}
      intro={knowledgeSharing.text}
    >
      <div className="grid gap-5 sm:gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center">
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <img
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>

        <Reveal delay={90}>
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <img
              src={landscape.src}
              alt={landscape.alt}
              width={landscape.width}
              height={landscape.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

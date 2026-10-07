import type { ReactNode } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { portfolio } from '../data/portfolio'
import { Reveal } from './Reveal'
import { Section } from './Section'

interface IconProps {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

function MailIcon({ size = 18, className, 'aria-hidden': hidden = 'true' }: IconProps): ReactNode {
  return <Mail size={size} className={className} aria-hidden={hidden} />
}

function ArrowIcon({ size = 15, className, 'aria-hidden': hidden = 'true' }: IconProps): ReactNode {
  return <ArrowUpRight size={size} className={className} aria-hidden={hidden} />
}

const icons: Record<string, (props: IconProps) => ReactNode> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: MailIcon,
}

export function Contact() {
  const { contact } = portfolio

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      heading={contact.heading}
      intro={contact.intro}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {contact.links.map((link, index) => {
          const Icon = icons[link.label] ?? ArrowIcon
          const isExternal = !link.href.startsWith('mailto:')

          return (
            <Reveal key={link.label} delay={index * 70}>
              <a
                href={link.href}
                {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent">
                  <Icon size={18} />
                </span>
                <span className="mt-4 flex items-center gap-1.5 text-base font-semibold text-ink">
                  {link.label}
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted">
                  {link.description}
                </span>
              </a>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

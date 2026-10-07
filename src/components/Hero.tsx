import type { CSSProperties } from 'react'
import { ArrowDown, Download, ExternalLink, FileText } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { github, portfolio } from '../data/portfolio'

export function Hero() {
  const { hero, meta, brand } = portfolio

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-accent-soft blur-3xl sm:h-96 sm:w-96"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p
              className="hero-in font-mono text-xs tracking-[0.2em] text-accent uppercase"
              style={{ '--reveal-delay': '60ms' } as CSSProperties}
            >
              {hero.eyebrow}
            </p>

            <h1
              className="hero-in mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
              style={{ '--reveal-delay': '140ms' } as CSSProperties}
            >
              {hero.name}
            </h1>

            <p
              className="hero-in mt-5 max-w-2xl text-balance-tight text-lg leading-relaxed font-medium text-ink sm:text-xl"
              style={{ '--reveal-delay': '220ms' } as CSSProperties}
            >
              {hero.headline}
            </p>

            <p
              className="hero-in mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              style={{ '--reveal-delay': '300ms' } as CSSProperties}
            >
              {hero.intro}
            </p>

            <ul
              className="hero-in mt-7 flex flex-wrap gap-2"
              style={{ '--reveal-delay': '380ms' } as CSSProperties}
            >
              {hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div
              className="hero-in mt-9 flex flex-wrap items-center gap-3"
              style={{ '--reveal-delay': '460ms' } as CSSProperties}
            >
              <a
                href={hero.primaryAction.href}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent-strong"
              >
                {hero.primaryAction.label}
                <ArrowDown size={16} aria-hidden="true" />
              </a>

              <a
                href={hero.secondaryAction.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <GithubIcon size={16} aria-hidden="true" />
                {hero.secondaryAction.label}
              </a>
            </div>

            <div
              className="hero-in mt-8 w-full max-w-xl rounded-2xl border border-line bg-surface p-4 sm:p-5"
              style={{ '--reveal-delay': '540ms' } as CSSProperties}
              role="group"
              aria-label={hero.cv.label}
            >
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                <FileText size={13} aria-hidden="true" />
                {hero.cv.label}
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-ink">{hero.cv.downloadLabel}</span>
                <div className="flex flex-wrap gap-2">
                  {hero.cv.languages
                    .filter((language) => language.pdf)
                    .map((language) => (
                      <a
                        key={`download-${language.code}`}
                        href={language.pdf ?? undefined}
                        download
                        lang={language.code}
                        hrefLang={language.code}
                        aria-label={`${hero.cv.downloadLabel} — ${language.label} (PDF)`}
                        className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        <Download size={13} aria-hidden="true" />
                        {language.label}
                        <span className="font-mono text-[10px] text-muted">PDF</span>
                      </a>
                    ))}
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-ink">{hero.cv.viewLabel}</span>
                <div className="flex flex-wrap gap-2">
                  {hero.cv.languages.map((language) => (
                    <a
                      key={`view-${language.code}`}
                      href={language.html}
                      target="_blank"
                      rel="noreferrer noopener"
                      lang={language.code}
                      hrefLang={language.code}
                      aria-label={`${hero.cv.viewLabel} — ${language.label} (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      {language.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="hero-in mx-auto w-full max-w-[19rem] lg:mx-0 lg:justify-self-end"
            style={{ '--reveal-delay': '260ms' } as CSSProperties}
          >
            <figure className="relative rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                <img
                  src={meta.avatarUrl}
                  alt={brand.name}
                  width={1254}
                  height={1254}
                  loading="eager"
                  decoding="async"
                  className="avatar-float aspect-square w-full object-cover object-[50%_33%]"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-3 px-1 pb-1">
                <span className="font-mono text-xs text-muted">@{github.profile.login}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

import { portfolio, github } from '../data/portfolio'

export function Footer() {
  const { footer, brand } = portfolio

  return (
    <footer className="border-t border-line bg-bg-elevated">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-ink">{brand.monogram}</span>
          <span className="text-sm text-muted">{brand.name}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="max-w-sm text-xs leading-relaxed text-muted">
          {footer.note} Last data refresh:{' '}
          <time dateTime={github.fetchedAt}>{github.fetchedAt.slice(0, 10)}</time>.
        </p>
      </div>
    </footer>
  )
}

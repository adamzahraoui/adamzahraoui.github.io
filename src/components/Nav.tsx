import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { portfolio } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionHashes = portfolio.nav.map((item) => item.href)

export function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionHashes)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-bg/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-mono text-sm font-medium tracking-[0.2em] text-ink">
            {portfolio.brand.monogram}
          </span>
          <span className="hidden text-sm text-muted transition-colors group-hover:text-accent sm:inline">
            / {portfolio.brand.name}
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {portfolio.nav.map((item) => {
            const isActive = active === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-accent' : 'text-muted hover:text-ink'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={toggle}
            aria-label={nextLabel}
            title={nextLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={portfolio.hero.secondaryAction.href}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            <GithubIcon size={16} />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-bg-elevated md:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-5 py-3 sm:px-8">
          {portfolio.nav.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-3 text-base text-ink last:border-b-0"
              >
                {item.label}
                <span aria-hidden="true" className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
          <li className="pt-3 pb-1">
            <a
              href={portfolio.hero.secondaryAction.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-accent"
              onClick={() => setOpen(false)}
            >
              <GithubIcon size={16} />
              View GitHub profile
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

/**
 * Google Analytics 4 integration (gtag.js).
 *
 * The official asynchronous tag is injected only on the production hostname,
 * so localhost, `vite preview` and any other environment never load gtag.js or
 * contact Google. This also keeps the site fully functional if the script is
 * blocked or unavailable — every call here is a no-op guard, never a throw.
 *
 * The single `page_view` of a visit is fired automatically by gtag.js when the
 * `config` command is processed; the app never calls `page_view` itself, so
 * React StrictMode (which double-invokes component effects in development) can
 * never duplicate it. Initialization also runs once per page load from a module
 * side effect and is idempotent (guarded), so double imports cannot duplicate.
 *
 * No personal information and no terminal command input is ever sent — the only
 * tracked custom event is a CV PDF download (language only).
 */
const MEASUREMENT_ID = 'G-LNS9G8HY0N'

const DEFAULT_PRODUCTION_HOST = 'adamzahraoui.github.io'
/**
 * Override only for local testing (e.g. `VITE_GA_HOSTNAME=localhost npm run
 * build`). Leave unset in real deploys; the built site then only ever tracks on
 * adamzahraoui.github.io.
 */
const PRODUCTION_HOST = import.meta.env.VITE_GA_HOSTNAME || DEFAULT_PRODUCTION_HOST

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __ga4Initialized?: boolean
  }
}

function hostIsProduction(): boolean {
  return typeof window !== 'undefined' && window.location.hostname === PRODUCTION_HOST
}

/** True only when gtag.js is both allowed (production host) and actually loaded. */
export function isTrackingEnabled(): boolean {
  return hostIsProduction() && typeof window.gtag === 'function'
}

/** Send an event, never throwing. On non-production hosts this is a no-op. */
export function trackEvent(name: string, params: Record<string, unknown>): void {
  if (!isTrackingEnabled()) return
  try {
    window.gtag?.('event', name, params)
  } catch {
    // analytics must never break the site
  }
}

/** CV PDF download, e.g. `cv_download` with `language: "fr"`. */
export function trackCvDownload(language: string): void {
  if (language === 'en' || language === 'fr') {
    trackEvent('cv_download', { language })
  }
}

/**
 * Install the official asynchronous Google tag. Runs once per page load from
 * `main.tsx`; returns immediately (and touches nothing) off the production host.
 */
export function initAnalytics(): void {
  if (!hostIsProduction()) return
  try {
    if (window.__ga4Initialized) return
    window.__ga4Initialized = true

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]): void {
      window.dataLayer!.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    })
    window.gtag('config', MEASUREMENT_ID)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
    document.head.appendChild(script)
  } catch {
    // analytics must never break the site
  }
}
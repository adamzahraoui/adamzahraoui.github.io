# Adam Zahraoui — Developer Portfolio

A single-page portfolio built from the public GitHub profile of [adamzahraoui](https://github.com/adamzahraoui).
All copy is curated in one typed file, and the site renders instantly from static assets — no GitHub API calls at runtime, no tokens in the frontend.

Sections: hero, about, skills, featured projects, an interactive project
terminal, education and contact.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Lucide icons, plus two small inline brand SVGs (`src/components/BrandIcons.tsx`)
- Inter (body) and JetBrains Mono (technical labels), self-hosted via Fontsource
- Oxlint for linting, `tsc -b` for type checking

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server with HMR
npm run build        # type-check + production build into dist/
npm run typecheck    # type-check only
npm run lint         # lint
npm run preview      # serve the production build locally
npm run refresh:github   # refresh the GitHub data snapshot
```

## Editing the content

**Everything visitor-facing lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).**

| What you want to change | Where |
| --- | --- |
| Name, monogram, site meta / SEO text | `meta`, `brand` |
| Profile photo shown in the hero | `meta.avatarUrl` (file in `public/images/`) |
| Hero headline, intro, action buttons | `hero` |
| CV files, languages, download labels | `hero.cv` (files in `public/cv/`) |
| About copy and fact list | `about` |
| Skill groups and badges | `skills.groups` |
| Featured projects (name, description, tech, links, kind) | `projects.items` |
| Short repo list under the grid | `projects.moreRepos` |
| Terminal heading, welcome text, prompt, cd hint, quick buttons | `terminal` |
| Education entry and stated goals | `education` |
| Contact links | `contact.links` |
| Footer text and links | `footer` |
| Section links in the navigation | `nav` |

Types are exported from the same file (`Project`, `SkillGroup`, `SocialLink`, `EducationEntry`), so edits are type-checked.

The one exception is the terminal's generated copy — `help` text, error messages
and the exact command list live in
[`src/lib/terminal.ts`](src/lib/terminal.ts), next to the parser that produces
them. Everything a visitor reads in the terminal's welcome area (title, prompt,
welcome lines, `cd` hint, quick-command buttons) is in `portfolio.terminal`.

Design tokens (colours, borders, light/dark values) are CSS variables in
[`src/index.css`](src/index.css); component layout lives in `src/components/`.

## Refreshing the GitHub data

`src/data/github-snapshot.json` is a local, curated snapshot of the public GitHub
profile and repository list. It is refreshed by:

```bash
npm run refresh:github
```

The script (`scripts/refresh-github.mjs`) calls the public REST API without
authentication (60 requests/hour per IP, no token, nothing secret in the repo),
handles pagination, and rewrites the JSON file. If GitHub is unreachable the old
snapshot is left untouched and the script exits non-zero.

The site itself never calls GitHub: the snapshot is imported at build time.

## The bilingual CV

The hero shows a **Curriculum vitae** panel with two rows: **Download CV**
(English / Français) and **View CV** (English / Français, opens in a new tab).

| Language | HTML (`public/cv/`) | PDF (`public/cv/`) |
| --- | --- | --- |
| English | `adam-zahraoui-cv.html` | `adam-zahraoui-cv-en.pdf` |
| Français | `adam-zahraoui-cv-fr.html` | `adam-zahraoui-cv-fr.pdf` |

All four paths live in `hero.cv.languages` in `src/data/portfolio.ts`, so adding
a language or renaming a file is a one-place edit.

- **Downloads only appear for real files.** A language is listed under
  *Download CV* only when its `pdf` value is set; set `pdf: null` and that
  download disappears while the *View CV* link stays. `npm run build` starts
  with `scripts/check-cv.mjs`, which fails the build if a declared file is
  missing or is not a genuine PDF — HTML is never renamed to `.pdf`.
- **Regenerating the PDFs.** They are printed from the HTML with headless
  Chromium (A4, 12 mm margins, toolbar hidden, links kept clickable):

```bash
CHROME="$(ls -d ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell | tail -1)"
for pair in "adam-zahraoui-cv.html:adam-zahraoui-cv-en.pdf" \
            "adam-zahraoui-cv-fr.html:adam-zahraoui-cv-fr.pdf"; do
  src="${pair%%:*}"; out="${pair##*:}"
  "$CHROME" --no-sandbox --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$PWD/public/cv/$out" "file://$PWD/public/cv/$src"
done
```

- **If PDFs cannot be generated**, leave `pdf: null` for that language: the
  *View CV* links keep working and each HTML page has its own
  “Print / Save as PDF” (“Imprimer / Enregistrer en PDF”) button, so visitors
  can print it themselves.
- Print styling lives in each HTML file’s `@media print` block (`@page A4`,
  `.toolbar { display: none }`, `break-inside: avoid` on entries and projects).

## Google Analytics 4

The site tracks with the official asynchronous Google tag (gtag.js,
measurement ID `G-LNS9G8HY0N`) via `src/lib/analytics.ts`, initialised once from
`src/main.tsx`.

- **Production only.** The tag is installed only when
  `window.location.hostname` is `adamzahraoui.github.io`. On `localhost`, `vite
  preview` or any other host the module is a no-op: gtag.js is never loaded and
  no request ever reaches Google.
- **One `page_view` per load.** `page_view` is fired automatically by gtag.js
  when the `config` command runs; the app never sends it manually and the init
  is idempotent, so React StrictMode cannot duplicate it.
- **One custom event:** `cv_download` with `{ language: "en" | "fr" }`, sent
  from the single `onClick` handler on each Download CV link in `Hero.tsx`.
  Nothing else is tracked — no terminal input, no forms, no personal data.
- **Consent (no banner yet).** Consent defaults are declared *denied* for
  `ad_storage`, `ad_user_data`, `ad_personalization` and `analytics_storage`
  before the `config` call, so no advertising features run and analytics runs
  cookieless. If a consent banner is added later, grant with
  `gtag('consent', 'update', { analytics_storage: 'granted', ... })`.
- **Resilient.** Every analytics call is wrapped so that a blocked, slow or
  broken script can never break the site.

### Verifying in Google Analytics → Realtime

1. Deploy and open `https://adamzahraoui.github.io/` in a browser where you are
   not logged into Analytics (or use a private/new window).
2. Open **Analytics (GA4) → Reports → Real-time** in the property for
   `G-LNS9G8HY0N`.
3. Reload the page: a `page_view` appears for the traffic source within a
   second or two.
4. Click **Download CV → English**: a `cv_download` event with
   `language = en` appears (same for Français → `fr`).
5. On the deployed site, open the browser network tab: the
   `googletagmanager.com/gtag/js` script and `google-analytics.com` beacon are
   only requested on the real domain, never on `localhost`.

## The project terminal

`src/components/Terminal.tsx` renders the “Explore my projects” section
(`src/components/TerminalSection.tsx` wraps it in the shared `Section`).

- **Logic vs. rendering:** parsing, command execution, project matching and tab
  completion are pure functions in `src/lib/terminal.ts`. The component only
  handles state (output lines, history, focus) and markup.
- **Data:** commands read the same `github-snapshot.json` repositories and the
  same `skills.groups` used by the rest of the page, so `ls`, `ls -l`, `cd` and
  `skills` can never drift from the visible content.
- **Safety:** it is a simulator. There is no `eval`, no shell, no filesystem —
  only a fixed command list (`help`, `ls`, `ls -l`, `cd`, `pwd`, `whoami`,
  `skills`, `clear`) matched against stored repository names and URLs.
  Shell metacharacters are rejected, and `cd` only ever navigates to a URL that
  exists in the snapshot.
- **Interaction:** Enter runs, Arrow Up / Arrow Down walk history, Tab completes
  commands and project names (and releases focus when nothing matches),
  Ctrl+L clears while the input is focused. Quick-command buttons cover the
  common cases on touch devices.

To change the wording of a command's output, edit the relevant function in
`src/lib/terminal.ts` (`helpLines`, `NOT_FOUND_MESSAGE`, `cdLines`, …).

## Accessibility and behaviour notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link,
  keyboard-operable navigation, visible focus outlines, and `aria-expanded` /
  `Escape` handling on the mobile menu.
- Persistent light/dark toggle (`localStorage`, defaults to the system preference,
  applied before first paint by an inline script in `index.html`).
- Entrance animations respect `prefers-reduced-motion`.
- Colour pairs were checked against WCAG AA contrast in both themes, including
  the terminal body, links, hint and input in both themes.
- The terminal input has a real `<label>`, its output is a `role="log"` /
  `aria-live="polite"` region, keyboard focus is never trapped (Tab only
  completes when a match exists), and the input is not autofocused on load.

## Content provenance

Only verifiable public information is used:

- GitHub profile fields (`name`, `bio`, `company`, `location`, contact field)
- The profile README (`adamzahraoui/adamzahraoui`)
- The README of each featured repository

The hero portrait is Adam's own profile photo, stored locally at
`public/images/adam-zahraoui.png` and referenced by `meta.avatarUrl` in
`src/data/portfolio.ts`. It is not hot-linked from any third-party CDN.

Social previews use an absolute URL built from the deployment origin
(`https://adamzahraoui.github.io/images/adam-zahraoui.png`) in the `og:image` and
`twitter:image` tags in `index.html`; update both lines if the site moves.

No experience, employers, dates, awards, statistics or proficiency percentages
were invented. There is no employment/experience section because no such
information exists in those sources. Repository languages are reported as
project evidence, not as skill claims. Projects are marked “Coursework” or
“Pair project” to distinguish them from independent work.

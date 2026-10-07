import type { SkillGroup } from '../data/portfolio'

/**
 * Pure logic for the simulated portfolio terminal.
 * No DOM access, no eval, no shell execution: commands are matched against a
 * small fixed command list and against the repository snapshot.
 */

export interface RepoRef {
  name: string
  url: string
  description: string | null
  language: string | null
}

export interface TerminalContext {
  repos: RepoRef[]
  skills: SkillGroup[]
  prompt: string
  welcome: string[]
  user: { name: string; role: string }
  pwd: string
}

export type TerminalLine =
  | { kind: 'text'; text: string }
  | { kind: 'command'; text: string }
  | { kind: 'repo'; repo: RepoRef; showLanguage: boolean }
  | { kind: 'suggestion'; label: string; command: string }
  | { kind: 'blank' }

export interface CommandResult {
  lines: TerminalLine[]
  clear?: boolean
  navigateTo?: string
}

export type Completion = { value: string } | { suggestions: string[] }

export const COMMANDS = ['help', 'ls', 'cd', 'pwd', 'whoami', 'skills', 'clear'] as const

export const NOT_FOUND_MESSAGE = 'Command not found. Type help for available commands.'

/** Shell metacharacters are never interpreted; they simply fail as commands. */
const SHELL_OPERATORS = /[;&|<>()`]/

/** How many clickable suggestions are shown for one command. */
const SUGGESTION_LIMIT = 10

const text = (value: string): TerminalLine => ({ kind: 'text', text: value })
const blank = (): TerminalLine => ({ kind: 'blank' })

/** Splits on whitespace, honouring single and double quotes. No expansion of any kind. */
export function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  let started = false

  for (const char of input) {
    if (quote) {
      if (char === quote) quote = null
      else current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      started = true
      continue
    }
    if (/\s/.test(char)) {
      if (started || current.length > 0) {
        tokens.push(current)
        current = ''
        started = false
      }
      continue
    }
    current += char
    started = true
  }

  if (started || current.length > 0) tokens.push(current)
  return tokens
}

/** Case-insensitive lookup: exact name first, then substring matches. */
export function matchRepos(query: string, repos: RepoRef[]) {
  const normalized = query.trim().toLowerCase().replace(/^\.\//, '')
  if (!normalized) return { exact: null, partial: [] as RepoRef[] }

  const exact = repos.find((repo) => repo.name.toLowerCase() === normalized) ?? null
  if (exact) return { exact, partial: [] as RepoRef[] }

  const partial = repos
    .filter((repo) => repo.name.toLowerCase().includes(normalized))
    .sort((a, b) => a.name.localeCompare(b.name))
  return { exact: null, partial }
}

function helpLines(): TerminalLine[] {
  return [
    text('Available commands'),
    text('  help            show this message and examples'),
    text('  ls              list every public repository'),
    text('  ls -l           list repositories with language and description'),
    text('  cd <project>    open a project on GitHub'),
    text('  pwd             print the working directory'),
    text('  whoami          print my name and role'),
    text('  skills          list my skill groups'),
    text('  clear           clear the terminal'),
    blank(),
    text('Examples'),
    text('  cd Inception'),
    text('  cd "so_long"'),
  ]
}

function lsLines(repos: RepoRef[], long: boolean): TerminalLine[] {
  if (repos.length === 0) return [text('No repositories found.')]
  return repos.map((repo) => ({ kind: 'repo', repo, showLanguage: long }) as TerminalLine)
}

function skillsLines(skills: SkillGroup[]): TerminalLine[] {
  const lines: TerminalLine[] = []
  skills.forEach((group, index) => {
    lines.push(text(group.title))
    lines.push(text(`  ${group.items.join(' · ')}`))
    if (index < skills.length - 1) lines.push(blank())
  })
  return lines
}

function cdLines(argument: string, ctx: TerminalContext): CommandResult {
  const query = argument.trim()

  if (!query) {
    return {
      lines: [
        text('Usage: cd <project>. Type ls to see the available projects.'),
      ],
    }
  }

  const { exact, partial } = matchRepos(query, ctx.repos)
  const target = exact ?? (partial.length === 1 ? partial[0] : null)

  if (target) {
    return {
      lines: [text(`Opening ${target.name} on GitHub…`)],
      navigateTo: target.url,
    }
  }

  if (partial.length > 1) {
    const shown = partial.slice(0, SUGGESTION_LIMIT)
    const rest = partial.length - shown.length
    return {
      lines: [
        text(`Several projects match "${query}":`),
        ...shown.map(
          (repo): TerminalLine => ({
            kind: 'suggestion',
            label: `cd ${repo.name}`,
            command: `cd "${repo.name}"`,
          }),
        ),
        ...(rest > 0 ? [text(`…and ${rest} more.`)] : []),
        text('Pick one above, or type a longer name.'),
      ],
    }
  }

  return {
    lines: [
      text(`Project "${query}" not found. Type ls to see the available projects.`),
    ],
  }
}

/** Runs one already-submitted line and returns the result. Never executes a shell. */
export function execute(rawInput: string, ctx: TerminalContext): CommandResult {
  const trimmed = rawInput.trim()
  if (!trimmed) return { lines: [] }

  if (SHELL_OPERATORS.test(trimmed)) {
    return { lines: [text(NOT_FOUND_MESSAGE)] }
  }

  const tokens = tokenize(trimmed)
  if (tokens.length === 0) return { lines: [] }

  const [command, ...args] = tokens
  const name = command.toLowerCase()

  switch (name) {
    case 'help':
      return { lines: helpLines() }

    case 'ls': {
      const long = args.some((arg) => arg === '-l' || arg === '--long')
      const unknown = args.find((arg) => !['-l', '--long'].includes(arg))
      if (unknown) {
        return { lines: [text(`ls: unknown option "${unknown}". Try ls or ls -l.`)] }
      }
      return { lines: lsLines(ctx.repos, long) }
    }

    case 'cd':
      return cdLines(args.join(' '), ctx)

    case 'pwd':
      return { lines: [text(ctx.pwd)] }

    case 'whoami':
      return { lines: [text(ctx.user.name), text(ctx.user.role)] }

    case 'skills':
      return { lines: skillsLines(ctx.skills) }

    case 'clear':
      return { lines: [], clear: true }

    default:
      return { lines: [text(NOT_FOUND_MESSAGE)] }
  }
}

/**
 * Tab completion for command names and for the argument of `cd`.
 * Returns null when nothing can be completed, so the browser can move focus.
 */
export function complete(rawInput: string, ctx: TerminalContext): Completion | null {
  const input = rawInput
  const spaceIndex = input.indexOf(' ')

  if (spaceIndex === -1) {
    const prefix = input.trim().toLowerCase()
    if (!prefix) return null
    const matches = COMMANDS.filter((command) => command.startsWith(prefix))
    if (matches.length === 1) return { value: `${matches[0]} ` }
    if (matches.length > 1) return { suggestions: [...matches] }
    return null
  }

  const head = input.slice(0, spaceIndex).trim().toLowerCase()
  if (head !== 'cd') return null

  const argument = input.slice(spaceIndex + 1)
  const prefix = argument.replace(/["']/g, '').trim().toLowerCase()
  if (!prefix) return null

  const matches = ctx.repos
    .filter((repo) => repo.name.toLowerCase().includes(prefix))
    .map((repo) => repo.name)
    .sort((a, b) => a.localeCompare(b))

  if (matches.length === 1) return { value: `cd "${matches[0]}" ` }
  if (matches.length > 1) return { suggestions: matches.slice(0, SUGGESTION_LIMIT) }
  return null
}

/** Lines shown when the terminal is first rendered. */
export function initialLines(ctx: TerminalContext): TerminalLine[] {
  return [...ctx.welcome.map((line) => text(line)), blank()]
}

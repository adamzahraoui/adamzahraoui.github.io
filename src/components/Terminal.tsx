import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { portfolio, github } from '../data/portfolio'
import {
  complete,
  execute,
  initialLines,
  type TerminalContext,
  type TerminalLine,
} from '../lib/terminal'

const terminalContext: TerminalContext = {
  repos: github.repos.map((repo) => ({
    name: repo.name,
    url: repo.htmlUrl,
    description: repo.description,
    language: repo.language,
  })),
  skills: portfolio.skills.groups,
  prompt: portfolio.terminal.prompt,
  pwd: portfolio.terminal.pwd,
  welcome: portfolio.terminal.welcome,
  user: { name: portfolio.brand.name, role: portfolio.hero.headline },
}

const NAVIGATION_DELAY_MS = 450

/** Groups consecutive suggestion chips so they sit on one wrapping row. */
function groupLines(lines: TerminalLine[]): TerminalLine[][] {
  const groups: TerminalLine[][] = []
  for (const line of lines) {
    const last = groups[groups.length - 1]
    if (line.kind === 'suggestion' && last && last[0].kind === 'suggestion') {
      last.push(line)
    } else {
      groups.push([line])
    }
  }
  return groups
}

export function Terminal() {
  const { terminal } = portfolio
  const [lines, setLines] = useState<TerminalLine[]>(() => initialLines(terminalContext))
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [navigateTo, setNavigateTo] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navigateTo) return
    const timer = window.setTimeout(() => window.location.assign(navigateTo), NAVIGATION_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [navigateTo])

  useEffect(() => {
    const output = outputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [lines])

  const run = (input: string) => {
    const result = execute(input, terminalContext)

    setLines((previous) => {
      if (result.clear) return []
      const next = [...previous]
      if (input.trim()) next.push({ kind: 'command', text: input })
      next.push(...result.lines)
      return next
    })

    if (input.trim()) {
      setHistory((previous) =>
        previous[previous.length - 1] === input ? previous : [...previous, input],
      )
      setHistoryIndex(null)
    }

    if (result.navigateTo) setNavigateTo(result.navigateTo)
  }

  const runAndFocus = (input: string) => {
    run(input)
    inputRef.current?.focus()
  }

  const showSuggestions = (input: string, suggestions: string[], isCommand: boolean) => {
    setLines((previous) => {
      const next = [...previous]
      if (input.trim()) next.push({ kind: 'command', text: input })
      next.push({ kind: 'text', text: isCommand ? 'Matches:' : 'Several projects match:' })
      for (const name of suggestions) {
        next.push({
          kind: 'suggestion',
          label: isCommand ? name : `cd ${name}`,
          command: isCommand ? `${name} ` : `cd "${name}"`,
        })
      }
      next.push({ kind: 'text', text: 'Pick one, or type a longer name.' })
      return next
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      run(value)
      setValue('')
      return
    }

    if (event.key === 'ArrowUp') {
      if (history.length === 0) return
      event.preventDefault()
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex])
      return
    }

    if (event.key === 'ArrowDown') {
      if (historyIndex === null) return
      event.preventDefault()
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(null)
        setValue('')
      } else {
        setHistoryIndex(nextIndex)
        setValue(history[nextIndex])
      }
      return
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setLines([])
      return
    }

    if (event.key === 'Tab') {
      const completion = complete(value, terminalContext)
      if (!completion) return // no match: let the browser move focus away
      event.preventDefault()
      if ('value' in completion) {
        setValue(completion.value)
        return
      }
      showSuggestions(value, completion.suggestions, value.trim().indexOf(' ') === -1)
    }
  }

  const renderLine = (line: TerminalLine, key: number) => {
    switch (line.kind) {
      case 'text':
        return (
          <p key={key} className="whitespace-pre-wrap break-words">
            {line.text}
          </p>
        )
      case 'command':
        return (
          <p key={key} className="whitespace-pre-wrap break-words">
            <span className="text-accent">{terminal.prompt}</span> {line.text}
          </p>
        )
      case 'blank':
        return <div key={key} className="h-3" aria-hidden="true" />
      case 'repo':
        return (
          <p key={key} className="break-words">
            <a
              href={line.repo.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent underline-offset-2 hover:underline"
            >
              {line.repo.name}
            </a>
            {line.showLanguage && line.repo.language ? (
              <span className="text-muted"> [{line.repo.language}]</span>
            ) : null}
            {line.repo.description ? (
              <span className="text-muted"> — {line.repo.description}</span>
            ) : null}
          </p>
        )
      case 'suggestion':
        return (
          <button
            key={key}
            type="button"
            onClick={() => runAndFocus(line.command)}
            className="rounded-md border border-line bg-surface px-2 py-1 text-left font-mono text-accent transition-colors hover:border-accent hover:bg-accent-soft"
          >
            {line.label}
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="truncate font-mono text-xs text-muted">{terminal.windowTitle}</span>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label={terminal.outputLabel}
        tabIndex={0}
        className="max-h-72 overflow-y-auto overflow-x-hidden bg-bg-elevated px-4 py-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-words text-ink outline-offset-[-2px] sm:max-h-80"
      >
        {groupLines(lines).map((group, index) =>
          group[0].kind === 'suggestion' ? (
            <div key={index} className="my-1 flex flex-wrap gap-2">
              {group.map((line, inner) => renderLine(line, inner))}
            </div>
          ) : (
            <div key={index}>{renderLine(group[0], index)}</div>
          ),
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-2 px-4 py-3">
        <label htmlFor="terminal-input" className="sr-only">
          {terminal.inputLabel}
        </label>
        <span aria-hidden="true" className="font-mono text-[13px] whitespace-nowrap text-accent">
          {terminal.prompt}
        </span>
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="go"
          aria-describedby="terminal-hint"
          className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-ink focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
        {terminal.quickCommands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => runAndFocus(command)}
            className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {command}
          </button>
        ))}
        <p id="terminal-hint" className="ml-auto font-mono text-xs break-words text-muted">
          {terminal.cdHint}
        </p>
      </div>
    </div>
  )
}

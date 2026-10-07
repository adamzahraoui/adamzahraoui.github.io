/**
 * Fails the build when a CV file declared in src/data/portfolio.ts is missing.
 *
 * The hero only renders a “Download CV” link for languages whose `pdf` path is
 * set, so setting `pdf: null` hides that download on purpose. This script makes
 * the other case impossible: a declared path that does not exist on disk can
 * never ship as a broken link.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataFile = join(root, 'src/data/portfolio.ts')
const source = readFileSync(dataFile, 'utf8')

const declared = [...source.matchAll(/'(\/cv\/[^']+)'/g)].map((match) => match[1])
const unique = [...new Set(declared)]

if (unique.length === 0) {
  console.error('check-cv: no /cv/ paths found in src/data/portfolio.ts')
  process.exit(1)
}

const problems = []

for (const publicPath of unique) {
  const file = join(root, 'public', publicPath)

  if (!existsSync(file)) {
    problems.push(`${publicPath} → missing file: public${publicPath}`)
    continue
  }

  if (publicPath.endsWith('.pdf')) {
    const head = readFileSync(file).subarray(0, 5).toString('latin1')
    if (head !== '%PDF-') {
      problems.push(`${publicPath} → not a real PDF (found "${head}"; HTML must not be renamed to .pdf)`)
    }
  }
}

if (problems.length > 0) {
  console.error('check-cv: CV asset check failed')
  for (const problem of problems) console.error(`  ✗ ${problem}`)
  console.error('  Fix the path in src/data/portfolio.ts or add the file under public/cv/.')
  process.exit(1)
}

const hidden = [...source.matchAll(/pdf:\s*null/g)].length
console.log(
  `check-cv: ${unique.length} CV asset(s) OK (${unique.join(', ')})` +
    (hidden ? ` · ${hidden} download option(s) hidden via pdf: null` : ''),
)

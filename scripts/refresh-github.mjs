#!/usr/bin/env node
/**
 * Refreshes the local GitHub data snapshot used by the portfolio.
 *
 * Usage:  npm run refresh:github
 *
 * - Uses the public GitHub REST API only. No token is required or used.
 * - Writes src/data/github-snapshot.json, which src/data/portfolio.ts imports.
 * - Unauthenticated requests are limited to 60/hour per IP.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const USER = 'adamzahraoui'
const API = 'https://api.github.com'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(here, '../src/data/github-snapshot.json')

async function get(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-refresh-script' },
  })
  if (!res.ok) {
    throw new Error(`GitHub API ${path} -> ${res.status} ${res.statusText}`)
  }
  return res.json()
}

async function getAllRepos() {
  const repos = []
  for (let page = 1; page <= 10; page += 1) {
    const batch = await get(`/users/${USER}/repos?per_page=100&page=${page}&sort=updated`)
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos
}

try {
  const [profile, repos] = await Promise.all([get(`/users/${USER}`), getAllRepos()])

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    source: `https://api.github.com/users/${USER}`,
    profile: {
      login: profile.login,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      htmlUrl: profile.html_url,
      bio: profile.bio,
      company: profile.company,
      location: profile.location,
      blog: profile.blog,
      twitterUsername: profile.twitter_username,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      createdAt: profile.created_at,
    },
    repos: repos
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        language: r.language,
        topics: r.topics ?? [],
        homepage: r.homepage || null,
        htmlUrl: r.html_url,
        fork: r.fork,
        archived: r.archived,
        stars: r.stargazers_count,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  }

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${outFile} (${snapshot.repos.length} repositories)`)
} catch (error) {
  console.error('Failed to refresh GitHub data:', error.message)
  console.error('The previous snapshot (if any) was left untouched.')
  process.exit(1)
}

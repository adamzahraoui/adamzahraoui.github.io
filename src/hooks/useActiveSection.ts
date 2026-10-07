import { useEffect, useState } from 'react'

/** Returns the hash of the section currently in view, e.g. '#projects'. */
export function useActiveSection(hashes: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = hashes
      .map((hash) => document.getElementById(hash.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [hashes])

  return active
}

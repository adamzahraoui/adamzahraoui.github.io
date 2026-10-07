import snapshot from './github-snapshot.json'

/**
 * ---------------------------------------------------------------------------
 *  EDIT EVERYTHING IN THIS FILE
 * ---------------------------------------------------------------------------
 *  All visitor-facing copy lives here: hero text, about, skills, projects,
 *  terminal text, education, contact links and footer. Component copy that is
 *  generated (help text, error messages) lives in src/lib/terminal.ts.
 *
 *  • github snapshot ... regenerated with `npm run refresh:github`
 *  • CV              ... files live in `public/cv/`; `hero.cv` lists the HTML
 *                        and PDF paths per language (see the comment there).
 */

export interface SocialLink {
  label: string
  href: string
  description: string
}

export interface SkillGroup {
  title: string
  note: string
  items: string[]
}

export interface Project {
  name: string
  tagline: string
  description: string
  details: string[]
  tech: string[]
  repoUrl: string
  demoUrl?: string
  kind: 'Original project' | 'Pair project' | 'Coursework'
}

export interface EducationEntry {
  institution: string
  programme: string
  context: string
  details: string[]
}

export interface CvLanguage {
  code: string
  /** Shown on the link, in the language's own name. */
  label: string
  /** HTML version (public/cv/) — always linked, opens in a new tab. */
  html: string
  /** PDF version (public/cv/) — link is rendered only when set to a real file. */
  pdf: string | null
}

const profile = snapshot.profile

export const portfolio = {
  meta: {
    siteTitle: 'Adam Zahraoui — Full Stack & DevOps Student',
    title: 'Adam Zahraoui (AKIRA) — Full Stack & DevOps Student at 1337 School',
    description:
      'Portfolio of Adam Zahraoui, a Full Stack Development and DevOps student at 1337 School (UM6P), a 42 Network campus. Systems programming in C and C++, full stack web development, and containerized infrastructure with Docker and NGINX.',
    /** Profile photo shown in the hero. Swap the file in public/images/ and update this path. */
    avatarUrl: '/images/adam-zahraoui.png',
    favicon: '/favicon.svg',
  },

  brand: {
    name: 'Adam Zahraoui',
    monogram: 'AKIRA',
    initials: 'AZ',
  },

  hero: {
    eyebrow: '42 Network · 1337 School (UM6P) · Morocco',
    name: 'Adam Zahraoui',
    headline: 'Full Stack & DevOps Student at 1337 School (UM6P)',
    intro:
      'I build projects to learn how applications work, from systems programming in C and C++ to full stack web development and containerized infrastructure. My current focus is developing web applications and strengthening my DevOps skills.',
    chips: ['C & C++ systems', 'React / Next.js / TypeScript', 'Linux · Docker · DevOps'],
    primaryAction: { label: 'View projects', href: '#projects' },
    secondaryAction: { label: 'GitHub profile', href: profile.htmlUrl },
    /**
     *  Bilingual CV. Files live in `public/cv/`.
     *  • `html` — “View CV” links (open in a new tab)
     *  • `pdf`  — “Download CV” links; only rendered when it points at a real
     *             file, so set it to `null` to hide a language's download.
     *             The build (`scripts/check-cv.mjs`) fails if a declared file
     *             is missing, so a broken download can never ship.
     */
    cv: {
      label: 'Curriculum vitae',
      downloadLabel: 'Download CV',
      viewLabel: 'View CV',
      languages: [
        {
          code: 'en',
          label: 'English',
          html: '/cv/adam-zahraoui-cv.html',
          pdf: '/cv/adam-zahraoui-cv-en.pdf',
        },
        {
          code: 'fr',
          label: 'Français',
          html: '/cv/adam-zahraoui-cv-fr.html',
          pdf: '/cv/adam-zahraoui-cv-fr.pdf',
        },
      ] satisfies CvLanguage[],
    },
  },

  about: {
    heading: 'About',
    intro: [
      `I'm ${profile.name}, a Full Stack Development and DevOps student at 1337 School (UM6P), part of the 42 Network. I learn by building: every project is a way to find out how something really works underneath.`,
      'A lot of that started in C — a Unix shell, a raycasting engine, a multithreaded solution to the Dining Philosophers problem, a custom C library and a set of sorting and networking exercises. Those projects taught me how processes, memory, signals and concurrency behave in practice.',
      'My current focus is full stack web development with React, Next.js and TypeScript, plus the DevOps side of shipping software: Linux, Bash, Docker, Docker Compose and NGINX. My goal is to take an application from source code all the way to a running, containerized service.',
    ],
    asideTitle: 'Beyond the code',
    aside: ['Motorcycles and sport, outside of coursework.'],
    facts: [
      { label: 'Based in', value: 'Morocco' },
      { label: 'School', value: '1337 School (UM6P)' },
      { label: 'Curriculum', value: '42 Network' },
      { label: 'Focus', value: 'Full Stack Development & DevOps' },
    ],
  },

  skills: {
    heading: 'Skills',
    intro:
      'The technologies I work with, grouped by where they fit. Everything here shows up in my repositories or in my coursework at 1337.',
    groups: [
      {
        title: 'Languages',
        note: 'C and C++ through the 42 curriculum, JavaScript and TypeScript on the web.',
        items: ['C', 'C++', 'JavaScript', 'TypeScript'],
      },
      {
        title: 'Frontend',
        note: 'Interfaces I build with React and Next.js.',
        items: ['HTML', 'CSS', 'React', 'Next.js'],
      },
      {
        title: 'Backend & data',
        note: 'Node.js services with SQL and document databases.',
        items: ['Node.js', 'MongoDB', 'MySQL'],
      },
      {
        title: 'DevOps & Infrastructure',
        note: 'The stack behind my infrastructure projects: Linux administration, containerized services and reverse proxying.',
        items: ['Linux', 'Bash', 'Docker', 'Docker Compose', 'NGINX', 'Git'],
      },
      {
        title: 'Tools',
        note: 'Day-to-day editors, hosting and build automation.',
        items: ['GitHub', 'VS Code', 'Makefile'],
      },
    ] satisfies SkillGroup[],
  },

  projects: {
    heading: 'Featured projects',
    intro:
      'Infrastructure, systems and algorithm work from the 42 curriculum and beyond. Every project links to its repository, where you can read the README and the source.',
    items: [
      {
        name: 'Inception',
        tagline: 'Containerized WordPress infrastructure with Docker Compose',
        description:
          'A WordPress stack running as three isolated containers — NGINX, WordPress with PHP-FPM and MariaDB — on a private Docker network. NGINX terminates HTTPS at the edge, named volumes keep the database and site files persistent across restarts, and every password is mounted as a Docker secret instead of living in an image or environment file.',
        details: [
          'Container isolation: one service per container, and only NGINX publishes a host port.',
          'Private bridge network gives each service a hostname for internal traffic.',
          'Persistence through named volumes, with repeatable entrypoints for database and WordPress setup.',
          'Secrets mounted at runtime under /run/secrets, never baked into the image.',
        ],
        tech: ['Docker', 'Docker Compose', 'NGINX', 'PHP-FPM', 'MariaDB', 'WordPress', 'Bash'],
        repoUrl: 'https://github.com/adamzahraoui/42-Inception',
        kind: 'Coursework',
      },
      {
        name: 'Born2BeRoot',
        tagline: 'Linux server setup, hardening and administration',
        description:
          'A Debian virtual machine configured from scratch: sudo and group-based permissions, SSH access, a UFW firewall restricted to port 4242, strict password policies, and scheduled scripts — documented step by step from first boot onward.',
        details: [
          'Users, groups and sudo policies, with logging of sudo commands.',
          'OpenSSH installed and configured for remote administration.',
          'UFW firewall allowing only port 4242, plus password policy rules from login.defs and PAM.',
          'Shell scripts scheduled with crontab, and a signature file for verification.',
        ],
        tech: ['Linux', 'Debian', 'Bash', 'SSH', 'UFW', 'Crontab'],
        repoUrl: 'https://github.com/adamzahraoui/42-Born2BeRoot',
        kind: 'Coursework',
      },
      {
        name: 'Cub3D',
        tagline: 'Raycasting 3D engine inspired by Wolfenstein 3D',
        description:
          'A small 3D renderer in C that casts one ray per screen column against a 2D grid map, picks the nearest wall intersection, corrects the fish-eye effect and draws textured vertical wall slices through MiniLibX.',
        details: [
          'Ray / grid intersection maths with trigonometry and distance checks.',
          'Texture mapping that scales per-pixel to the projected wall height.',
          'Player movement, strafing and rotation from a top-down map file.',
        ],
        tech: ['C', 'MiniLibX', 'Math.h', 'Makefile'],
        repoUrl: 'https://github.com/adamzahraoui/42-cub3d',
        kind: 'Coursework',
      },
      {
        name: 'Minishell',
        tagline: 'A simplified Unix shell implemented in C',
        description:
          'A command-line shell that parses input, runs built-ins such as cd, echo, export, unset, exit and pwd in-process, spawns external commands with fork() and execve(), and chains them with pipes and I/O redirection while handling signals.',
        details: [
          'Input, output, append and heredoc redirection to files.',
          'Pipelines for chaining commands, with environment variable handling.',
          'Signal handling for Ctrl+C and Ctrl+D to keep the shell stable.',
        ],
        tech: ['C', 'Unix processes', 'Signals', 'Pipes', 'Makefile'],
        repoUrl: 'https://github.com/adamzahraoui/42-minishell',
        kind: 'Pair project',
      },
      {
        name: 'Philosophers',
        tagline: 'Dining Philosophers solved with threads and mutexes',
        description:
          'The classic concurrency problem modelled in C: each philosopher runs as a POSIX thread, forks are shared resources guarded by mutexes, and a monitor detects starvation so the simulation stops cleanly when a philosopher dies or the meal count is reached.',
        details: [
          'pthread_create / pthread_join with mutex-protected forks.',
          'Deadlock avoidance through fork ordering and an odd / even strategy.',
          'Timing built on gettimeofday with custom millisecond utilities.',
        ],
        tech: ['C', 'POSIX threads', 'Mutexes', 'Makefile'],
        repoUrl: 'https://github.com/adamzahraoui/42-Philosophers',
        kind: 'Coursework',
      },
      {
        name: 'libft',
        tagline: 'A custom C standard library, rebuilt from scratch',
        description:
          'A reusable C library that reimplements a selection of standard library functions — memory, string, character and linked-list utilities — later reused by other projects in the curriculum, written to the 42 Norminette style rules.',
        details: [
          'Memory helpers such as memset, memcpy, memmove and calloc.',
          'String utilities including split, substr, strjoin, itoa and strmapi.',
          'A linked-list API: new, add front/back, size, last, clear, iter and map.',
        ],
        tech: ['C', 'Makefile', 'Norminette'],
        repoUrl: 'https://github.com/adamzahraoui/42-libft',
        kind: 'Coursework',
      },
      {
        name: 'Push_Swap',
        tagline: 'Sorting integers across two stacks',
        description:
          'A sorting program that aims to minimize operations using two stacks. It reads integers from its arguments, then applies swaps, pushes, rotations and reverse rotations to order them, with a bonus checker that verifies any instruction list it is given.',
        details: [
          'Restricted instruction set: sa, sb, ss, pa, pb, ra, rb, rr, rra, rrb, rrr.',
          'Input parsing with duplicate and error handling.',
          'Bonus checker that validates a piped operation sequence.',
        ],
        tech: ['C', 'Algorithms', 'Makefile'],
        repoUrl: 'https://github.com/adamzahraoui/42-push_swap',
        kind: 'Coursework',
      },
    ] as Project[],

    /** Shown as a compact list under the grid. */
    moreRepos: [
      { name: 'NetPractice', note: 'IP addressing, subnetting and routing exercises' },
      { name: 'so_long', note: '2D maze game with MiniLibX' },
      { name: 'Minitalk', note: 'Client/server messaging over Unix signals' },
      { name: 'ft_printf', note: 'Recreation of printf with format specifiers' },
      { name: 'get_next_line', note: 'Line-by-line file descriptor reader' },
      { name: '1337 Pool', note: 'One-month introductory pool exercises' },
    ],
    moreReposNote: 'Coursework repositories, each with its own README.',
  },

  terminal: {
    heading: 'Explore my projects',
    intro:
      'A small simulated shell for browsing my repositories. Nothing is executed — it only reads the project data already on this page.',
    prompt: 'adam@portfolio:~$',
    pwd: '/home/adam/portfolio',
    windowTitle: 'adam@portfolio — terminal',
    welcome: [
      'Welcome to my project terminal. It lists the same repositories you will find on this page.',
      'Type help to get started.',
    ],
    cdHint: 'cd <project> opens that project on GitHub in this tab.',
    quickCommands: ['help', 'ls', 'ls -l', 'skills', 'cd Inception'],
    inputLabel: 'Terminal command input',
    outputLabel: 'Terminal output',
  },

  education: {
    heading: 'Education',
    intro: 'What I am studying now, and where I am heading.',
    entries: [
      {
        institution: '1337 School (UM6P)',
        programme: 'Full Stack Development & DevOps',
        context: '42 Network campus · Morocco',
        details: [
          'Studying Full Stack Development and DevOps, with the 42 Network curriculum as the backbone of my work.',
          'Coursework published in the open: libft, ft_printf, get_next_line, push_swap, so_long, minishell, Philosophers, cub3d, NetPractice, Born2BeRoot and Inception.',
          'Current focus: React, Next.js, TypeScript and backend development, alongside Linux, Docker and NGINX.',
        ],
      },
    ] satisfies EducationEntry[],
    goalsTitle: 'Learning goals',
    goals: [
      'Master C++',
      'Improve software architecture skills',
      'Ship full stack web applications',
      'Develop cloud, deployment and CI/CD skills',
      'Contribute to open source',
    ],
  },

  contact: {
    heading: 'Contact',
    intro: 'The fastest ways to reach me.',
    links: [
      {
        label: 'GitHub',
        href: profile.htmlUrl,
        description: 'All of my public repositories and activity.',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/adam-zahraoui-a9bb8a32a/',
        description: 'Professional profile and experience.',
      },
      {
        label: 'Email',
        href: `mailto:${profile.blog}`,
        description: 'Direct email — I read everything that lands here.',
      },
    ] satisfies SocialLink[],
  },

  footer: {
    note: 'Built with React, TypeScript and Tailwind CSS.',
    links: [
      { label: 'GitHub', href: profile.htmlUrl },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-zahraoui-a9bb8a32a/' },
    ],
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
}

/** Raw snapshot (profile + repositories) refreshed with `npm run refresh:github`. */
export const github = snapshot

export type Portfolio = typeof portfolio

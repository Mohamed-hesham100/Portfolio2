'use client'

import { useEffect, useState, useRef, type CSSProperties } from 'react'

const PHOTO = '/profile.jpg'
const CV =
  'https://drive.google.com/file/d/1i-e-Jb6SL9HZ5JmEGPMcyiQtjTxp3a8T/view?usp=sharing'
const MAIL = 'apohamed1235@gmail.com'
const GITHUB = 'https://github.com/Mohamed-hesham100'
const LINKEDIN = 'https://www.linkedin.com/in/mohamed-hisham-3362b53a1/'

const nav = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
]

type TermTok = { t: string; c?: string }

type TermStep =
  | { kind: 'cmd'; text: string; pause?: number }
  | { kind: 'line'; tokens: TermTok[]; pause?: number }
  | { kind: 'wait'; ms: number }

/* MDev — a tiny invented welcome language (not real code) */
const TERM_SCRIPT: TermStep[] = [
  { kind: 'cmd', text: 'OPEN.GATE', pause: 320 },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'Hello. You made it here.', c: 'out' },
    ],
    pause: 280,
  },
  { kind: 'cmd', text: 'SAY.NAME', pause: 260 },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'I am ', c: 'out' },
      { t: 'Mohamed Hisham', c: 's' },
      { t: '.', c: 'out' },
    ],
    pause: 240,
  },
  { kind: 'cmd', text: 'SAY.CRAFT', pause: 260 },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'I build ', c: 'out' },
      { t: 'web solutions', c: 'p' },
      { t: ' that scale.', c: 'out' },
    ],
    pause: 160,
  },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'APIs, apps, and the quiet work behind them.', c: 'out' },
    ],
    pause: 300,
  },
  { kind: 'cmd', text: 'SAY.HOME', pause: 240 },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'From ', c: 'out' },
      { t: 'Cairo', c: 's' },
      { t: ' · open for freelance.', c: 'out' },
    ],
    pause: 280,
  },
  { kind: 'cmd', text: 'INVITE.YOU', pause: 260 },
  {
    kind: 'line',
    tokens: [
      { t: '◆ ', c: 'ok' },
      { t: 'Look around. Stay a while. Say hello.', c: 'out' },
    ],
    pause: 500,
  },
  { kind: 'wait', ms: 2800 },
]

function flattenTokens(tokens: TermTok[]) {
  return tokens.map((x) => x.t).join('')
}

function sliceTokens(tokens: TermTok[], n: number): TermTok[] {
  const out: TermTok[] = []
  let left = n
  for (const tok of tokens) {
    if (left <= 0) break
    if (tok.t.length <= left) {
      out.push(tok)
      left -= tok.t.length
    } else {
      out.push({ t: tok.t.slice(0, left), c: tok.c })
      left = 0
    }
  }
  return out
}

const MDEV_PROMPT: TermTok[] = [
  { t: '◇', c: 'pr' },
  { t: ' ' },
  { t: 'mdev', c: 'cwd' },
  { t: ' › ', c: 'm' },
]

function HeroTerminal() {
  const [lines, setLines] = useState<{ key: string; tokens: TermTok[] }[]>([])
  const [live, setLive] = useState<TermTok[] | null>(null)
  const [done, setDone] = useState(false)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion.current) {
      const all: { key: string; tokens: TermTok[] }[] = []
      TERM_SCRIPT.forEach((step, i) => {
        if (step.kind === 'cmd') {
          all.push({
            key: `f${i}`,
            tokens: [...MDEV_PROMPT, { t: step.text, c: 'cmd' }],
          })
        } else if (step.kind === 'line') {
          all.push({ key: `f${i}`, tokens: step.tokens })
        }
      })
      setLines(all)
      setDone(true)
      return
    }

    let cancelled = false
    let timers: number[] = []
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms)
        timers.push(id)
      })

    const typeTokens = async (tokens: TermTok[], speed = 28) => {
      const full = flattenTokens(tokens)
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return
        setLive(sliceTokens(tokens, i))
        const ch = full[i - 1]
        const delay =
          ch === ' ' ? speed * 0.45 : ch === ',' || ch === '.' ? speed * 2.2 : speed
        await sleep(delay)
      }
    }

    const run = async () => {
      const committed: { key: string; tokens: TermTok[] }[] = []
      let loop = 0

      while (!cancelled) {
        for (let i = 0; i < TERM_SCRIPT.length; i++) {
          if (cancelled) return
          const step = TERM_SCRIPT[i]

          if (step.kind === 'wait') {
            setLive(null)
            setDone(true)
            await sleep(step.ms)
            setDone(false)
            continue
          }

          if (step.kind === 'cmd') {
            setLive([...MDEV_PROMPT])
            await sleep(160)
            if (cancelled) return

            for (let n = 1; n <= step.text.length; n++) {
              if (cancelled) return
              setLive([...MDEV_PROMPT, { t: step.text.slice(0, n), c: 'cmd' }])
              const ch = step.text[n - 1]
              await sleep(ch === '.' ? 45 : 32)
            }

            const finalToks = [...MDEV_PROMPT, { t: step.text, c: 'cmd' }]
            committed.push({ key: `${loop}-${i}`, tokens: finalToks })
            setLines([...committed])
            setLive(null)
            await sleep(step.pause ?? 200)
            continue
          }

          await typeTokens(step.tokens, 22)
          if (cancelled) return
          committed.push({ key: `${loop}-${i}`, tokens: step.tokens })
          setLines([...committed])
          setLive(null)
          await sleep(step.pause ?? 160)
        }

        await sleep(900)
        if (cancelled) return
        committed.length = 0
        setLines([])
        setLive(null)
        setDone(false)
        loop += 1
        await sleep(400)
      }
    }

    run()
    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const renderToks = (tokens: TermTok[]) =>
    tokens.map((tok, i) =>
      tok.c ? (
        <span key={i} className={tok.c}>
          {tok.t}
        </span>
      ) : (
        <span key={i}>{tok.t}</span>
      ),
    )

  return (
    <div className="hero-term">
      <div className="hero-term-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="hero-term-title">mdev · welcome protocol</span>
      </div>
      <pre className="hero-term-body" aria-hidden>
        <code>
          {lines.map((ln) => (
            <span key={ln.key} className="ln">
              {renderToks(ln.tokens)}
            </span>
          ))}
          {live && (
            <span className="ln">
              {renderToks(live)}
              <span className="cursor">█</span>
            </span>
          )}
          {!live && (
            <span className="ln prompt-idle">
              {renderToks(MDEV_PROMPT)}
              <span className={`cursor${done ? ' blink' : ''}`}>█</span>
            </span>
          )}
        </code>
      </pre>
    </div>
  )
}

const projects = [
  {
    title: 'Secrela',
    desc: 'SaaS vault for company secrets — API keys, passwords & access control',
    tags: ['SaaS', 'NestJS', 'PostgreSQL', 'Next.js'],
    link: 'https://secrela.com/',
    image: '/secrela.png',
  },
  {
    title: 'MedSupplySA',
    desc: 'Medical supply platform with payments',
    tags: ['Next.js', 'TypeScript', 'Node.js'],
    link: 'https://medsupplysa.com/',
    image: '/medsupply.jpg',
  },
  {
    title: 'OnOff',
    desc: 'Arabic e-commerce storefront — categories, cart & checkout',
    tags: ['Next.js', 'React', 'Node.js'],
    link: 'https://onoffeg.com/',
    image: '/onoff.png',
  },
  {
    title: 'LMS Platform',
    desc: 'Education portals on PostgreSQL',
    tags: ['Express', 'PostgreSQL', 'Next.js'],
    link: 'https://frontend-lms-f775.vercel.app/',
    image: '/lms.png',
  },
  {
    title: 'Realtime Chat',
    desc: 'Socket.io messaging with Redis',
    tags: ['Socket.io', 'Express', 'Redis'],
    link: 'https://chat-app-hb1u.vercel.app/',
    image: '/chat.png',
  },
  {
    title: 'JobConnect',
    desc: 'Recruiting portal with filters',
    tags: ['Express', 'React', 'MongoDB'],
    link: 'https://job-portal-mocha-seven.vercel.app/',
    image: '/jobconnect.png',
  },
  {
    title: 'Sharaf DG Egypt',
    desc: 'Retail checkout & inventory',
    tags: ['Next.js', 'MongoDB', 'Node.js'],
    link: 'https://egypt.sharafdg.com/',
    image: '/sharafdg.png',
  },
  {
    title: 'Diar Real Estate',
    desc: 'Arabic luxury real estate landing — search, units & booking',
    tags: ['React', 'Vite', 'Landing'],
    link: 'https://landing-page-realstate.vercel.app/',
    image: '/realestate.png',
  },
  {
    title: 'Savor Luxe',
    desc: 'Premium restaurant landing — menu, private dining & reservations',
    tags: ['React', 'Vite', 'Landing'],
    link: 'https://landing-page-restaurant-psi.vercel.app/',
    image: '/restaurant.png',
  },
  {
    title: 'Beauty Lab',
    desc: 'Modern Arabic beauty e-commerce — skincare, makeup & smart recommendations',
    tags: ['React', 'E-commerce', 'Frontend'],
    link: 'https://ecommerce-frontend-apa5.vercel.app/',
    image: '/beautylab.png',
  },
  {
    title: 'Dapper &',
    desc: 'Fashion brand landing — everyday outfits, bestsellers & drops',
    tags: ['React', 'Vite', 'Landing'],
    link: 'https://brand-landing-page-chi.vercel.app/',
    image: '/dapper.png',
  },
]

const icon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`

const skillBoxes = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: icon('react') },
      { name: 'Next.js', icon: icon('nextjs'), invert: true },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'JavaScript', icon: icon('javascript') },
      { name: 'Tailwind', icon: icon('tailwindcss') },
      { name: 'HTML5', icon: icon('html5') },
      { name: 'CSS3', icon: icon('css3') },
      { name: 'Redux', icon: icon('redux') },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: icon('nodejs') },
      {
        name: 'Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
        invert: true,
      },
      { name: 'NestJS', icon: icon('nestjs') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'MongoDB', icon: icon('mongodb') },
      { name: 'Redis', icon: icon('redis') },
      {
        name: 'Socket.io',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
        invert: true,
      },
    ],
  },
  {
    title: 'DevOps',
    items: [
      { name: 'Linux', icon: icon('linux') },
      { name: 'Docker', icon: icon('docker') },
      { name: 'Git', icon: icon('git') },
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        invert: true,
      },
      { name: 'Nginx', icon: icon('nginx') },
      {
        name: 'CI/CD',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
      },
    ],
  },
]

const experience = [
  {
    time: 'Now',
    active: true,
    title: 'Full Stack Engineer — Production & DevOps',
    body: 'Owning the full loop from API to deploy — Linux, Docker, PM2, SSL, DNS, and GitHub Actions.',
    tags: ['Linux', 'Docker', 'CI/CD', 'NestJS'],
    icon: 'code',
  },
  {
    time: '2025',
    active: false,
    title: 'Backend Engineer — Education Platform',
    body: 'NestJS + PostgreSQL for a high-traffic LMS: custom routing, RBAC, and secure REST APIs.',
    tags: ['NestJS', 'PostgreSQL', 'RBAC', 'REST'],
    icon: 'layers',
  },
  {
    time: '2024 – 2025',
    active: false,
    title: 'Software Developer — Freelance & Clients',
    body: 'Realtime chat, storefronts, and payments. E-commerce platforms in Next.js and Node.js.',
    tags: ['Next.js', 'Node.js', 'Socket.io', 'MongoDB'],
    icon: 'briefcase',
  },
  {
    time: '2024',
    active: false,
    title: 'CS Student — Faculty of Computers & Information',
    body: 'Data structures in class, TypeScript everywhere else. Shipped 15+ projects while learning.',
    tags: ['TypeScript', 'Algorithms', 'CS'],
    icon: 'grad',
  },
]

function NavSectionIcon({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (id === 'home') {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z" />
        <path d="M9.5 21.5V14h5v7.5" />
      </svg>
    )
  }
  if (id === 'about') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19.5c1.4-3.2 3.8-4.8 6.5-4.8s5.1 1.6 6.5 4.8" />
      </svg>
    )
  }
  if (id === 'skills') {
    return (
      <svg {...common}>
        <path d="M12 3.5 14.2 9H20l-4.6 3.5L17.5 18 12 14.6 6.5 18l2.1-5.5L4 9h5.8L12 3.5Z" />
      </svg>
    )
  }
  if (id === 'projects') {
    return (
      <svg {...common}>
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="12.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="12.5" width="7" height="7" rx="1.5" />
      </svg>
    )
  }
  if (id === 'experience') {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.7A8 8 0 1 1 21 12Z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.16h4.56V23H.22V8.16Zm7.44 0h4.37v2.02h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.2h-4.55v-7.27c0-1.73-.03-3.96-2.41-3.96-2.42 0-2.79 1.89-2.79 3.84V23H7.66V8.16Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="16" height="16" aria-hidden>
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19.5h16" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17" aria-hidden>
      <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.7A8 8 0 1 1 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuToggleIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="22" height="22" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="22" height="22" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatYearsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M8 7.5 4.5 12 8 16.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7.5 19.5 12 16 16.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2 5.5 10.8 18.5" strokeLinecap="round" />
    </svg>
  )
}

function StatProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="12.5" width="7" height="7" rx="1.5" />
      <path d="M14.5 16.5h5M17 14v5" strokeLinecap="round" />
    </svg>
  )
}

function StatLiveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6" strokeLinecap="round" />
      <path d="M5.5 5.5a9.2 9.2 0 0 0 0 13M18.5 5.5a9.2 9.2 0 0 1 0 13" strokeLinecap="round" />
    </svg>
  )
}

function StatDeployIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 16.5V5.5m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18.5h14" strokeLinecap="round" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="16" height="16" aria-hidden>
      <path d="M21 4 10.5 14.5M21 4l-7.5 17-3-8.5L2 9.5 21 4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExpIcon({ kind }: { kind: string }) {
  if (kind === 'layers') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" strokeLinejoin="round" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'grad') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" strokeLinejoin="round" />
        <path d="M6 11.5v4.2c0 .8 2.7 2.3 6 2.3s6-1.5 6-2.3v-4.2M22 9v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3.5V7M16 3.5V7M3.5 10h17" strokeLinecap="round" />
    </svg>
  )
}

function BriefIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" strokeLinecap="round" />
    </svg>
  )
}

function ProjectCard({
  project,
}: {
  project: { title: string; desc: string; tags: string[]; link: string; image: string }
}) {
  const [imgOk, setImgOk] = useState(true)
  const external = project.link.startsWith('http')

  return (
    <a
      href={project.link}
      {...(external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {})}
      className="proj-card flex flex-col overflow-hidden rounded-[14px] border border-stroke bg-white/[0.03] text-inherit no-underline transition hover:-translate-y-0.5 hover:border-violet/45"
    >
      <div className="proj-thumb relative aspect-[16/10] overflow-hidden bg-[#12121c]">
        {imgOk ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="block h-full w-full object-cover object-center transition duration-500 hover:scale-105"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="proj-thumb-fallback absolute inset-0 flex items-end p-4 text-[1.05rem] font-bold text-white">
            {project.title}
          </div>
        )}
      </div>
      <div className="proj-body flex flex-1 flex-col gap-1.5 px-4 pb-[1.1rem] pt-[0.95rem]">
        <div className="proj-title-row flex items-center justify-between gap-2">
          <h3 className="m-0 text-base font-semibold text-white">{project.title}</h3>
          <span className="text-[0.9rem] text-text-3" aria-hidden>
            ↗
          </span>
        </div>
        <p className="proj-desc m-0 text-[0.82rem] leading-snug text-text-2">{project.desc}</p>
        <div className="proj-tags mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-stroke bg-white/[0.03] px-2.5 py-0.5 text-[0.68rem] text-text-2"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [photoOk, setPhotoOk] = useState(true)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)

      const offset = 140
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100

      if (nearBottom) {
        setActive(nav[nav.length - 1].id)
        return
      }

      let current = 'home'
      for (const item of nav) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= offset) current = item.id
      }
      setActive(current)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      {/* ── NAV ── */}
      <header className={`nav ${scrolled || open ? 'on' : ''}`}>
        <div className="wrap flex h-full items-center justify-between gap-4">
          <a href="#home" className="logo" aria-label="Mohamed Hisham" onClick={() => setOpen(false)}>
            <img src="/logo-mh.png" alt="Mohamed Hisham" className="logo-img" width={40} height={40} />
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={CV} target="_blank" rel="noopener noreferrer" className="btn btn-cv hidden sm:inline-flex">
              <DownloadIcon />
              Download CV
            </a>
            <button
              type="button"
              className={`nav-menu-btn ${open ? 'is-open' : ''}`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuToggleIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mnav-root ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="mnav-backdrop"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <nav id="mobile-nav" className="mnav" aria-label="Mobile">
          <div className="mnav-head">
            <p className="mnav-name">Mohamed Hisham</p>
          </div>

          <ul className="mnav-list">
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as CSSProperties}>
                <a
                  href={`#${item.id}`}
                  className={`mnav-link is-${item.id} ${active === item.id ? 'is-active' : ''}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  <span className="mnav-ico" aria-hidden>
                    <NavSectionIcon id={item.id} />
                  </span>
                  <span className="mnav-label">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mnav-foot">
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="mnav-cv"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <DownloadIcon />
              Download CV
            </a>
            <div className="mnav-social">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" tabIndex={open ? 0 : -1}>
                <GithubIcon />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" tabIndex={open ? 0 : -1}>
                <LinkedinIcon />
              </a>
              <a href={`mailto:${MAIL}`} aria-label="Email" tabIndex={open ? 0 : -1}>
                <MailIcon />
              </a>
            </div>
          </div>
        </nav>
      </div>

      <main>
        {/* ── HERO ── */}
        <section id="home" className="hero">
          <div className="hero-bg" aria-hidden />
          <div className="hero-glow" aria-hidden />

          <div className="wrap relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="relative z-10 pb-10 pt-6 lg:py-0">
              <p className="hi-line">
                Hi, my name is <b>Mohamed</b>
              </p>
              <h1 className="hero-h1">
                I Build Scalable
                <span className="grad">Web Solutions</span>
              </h1>
              <p className="hero-p">
                I&apos;m a passionate Full Stack Developer who loves building performant web
                applications and exceptional digital experiences.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a href="#projects" className="btn btn-fill">
                  View My Work
                  <span aria-hidden>→</span>
                </a>
                <a href="#contact" className="btn btn-line">
                  <ChatIcon />
                  Contact Me
                </a>
              </div>

              <div className="mt-10">
                <p className="findme">FIND ME ON</p>
                <div className="mt-4 flex gap-3.5">
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                  <a href={`mailto:${MAIL}`} className="soc" aria-label="Email">
                    <MailIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-stage">
              <HeroTerminal />

              <div className="avail-badge">
                <i />
                Available for freelance
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="sec">
          <div className="wrap about-layout">
            <div className="about-copy-col min-w-0">
              <p className="sec-tag">/// About Me</p>
              <h2 className="about-title">
                Who <span>I am</span>
              </h2>
              <div className="about-copy">
                <p>
                  CS student in Cairo and a self-taught engineer where the degree stops. Two and a
                  half years shipping products that handle money, users, and bad input — deepest in{' '}
                  <b>NestJS</b>, <b>PostgreSQL</b>, and the pipelines that keep releases boring.
                </p>
                <p>
                  I own the layer that fails at 2 a.m.: auth, payments, sockets, schemas, deploys.
                  The frontend is mine too when the product needs one person who can finish the
                  loop. Remote from Cairo, overlapping EU and US mornings.
                </p>
              </div>

              <div className="about-pills">
                {[
                  { name: 'NestJS', icon: icon('nestjs') },
                  { name: 'PostgreSQL', icon: icon('postgresql') },
                  { name: 'TypeScript', icon: icon('typescript') },
                  { name: 'Docker', icon: icon('docker') },
                  { name: 'Linux', icon: icon('linux') },
                ].map((t) => (
                  <span key={t.name} className="about-pill">
                    <img src={t.icon} alt="" width={16} height={16} />
                    {t.name}
                  </span>
                ))}
              </div>

              <div className="about-stats">
                <div className="about-stat">
                  <span className="ic" aria-hidden>
                    <StatYearsIcon />
                  </span>
                  <span className="n">2.5+</span>
                  <span className="l">Years experience</span>
                </div>
                <div className="about-stat">
                  <span className="ic" aria-hidden>
                    <StatProjectsIcon />
                  </span>
                  <span className="n">15+</span>
                  <span className="l">Projects shipped</span>
                </div>
                <div className="about-stat">
                  <span className="ic" aria-hidden>
                    <StatLiveIcon />
                  </span>
                  <span className="n">6</span>
                  <span className="l">Live products</span>
                </div>
                <div className="about-stat">
                  <span className="ic" aria-hidden>
                    <StatDeployIcon />
                  </span>
                  <span className="n">∞</span>
                  <span className="l">Deploys & updates</span>
                </div>
              </div>

              <div className="about-foot">
                <span>Cairo, Egypt</span>
                <span>EU & US mornings</span>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-frame">
                {photoOk ? (
                  <img
                    src={PHOTO}
                    alt="Mohamed Hisham"
                    width={520}
                    height={650}
                    onError={() => setPhotoOk(false)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl font-bold text-text-3">
                    MH
                  </div>
                )}
              </div>

              <div className="about-chip who" aria-hidden>
                <span className="g">$</span> whoami
                <br />
                mohamed <span className="g">&gt;_</span>
              </div>

              <div className="about-chip note">
                • Building reliable systems for real problems.
              </div>

              <div className="about-chip side" aria-hidden>
                <div>
                  <b>2.5+</b>
                  <span>Years experience</span>
                </div>
                <div>
                  <b>15+</b>
                  <span>Projects shipped</span>
                </div>
                <div>
                  <b>6</b>
                  <span>Live products</span>
                </div>
              </div>

              <div className="about-sign">
                <p>Mohamed Hisham</p>
                <i />
              </div>

              <p className="about-end">CODE / BUILD / IMPROVE</p>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="sec">
          <div className="wrap">
            <div className="skills-head">
              <h2>My Skills</h2>
              <a href="#projects">View All Skills</a>
            </div>
            <div className="skill-boxes">
              {skillBoxes.map((box) => (
                <div key={box.title} className="skill-box">
                  <h3>{box.title}</h3>
                  <div className="skill-grid">
                    {box.items.map((item) => (
                      <div key={item.name} className="skill-item">
                        <img
                          src={item.icon}
                          alt=""
                          width={24}
                          height={24}
                          className={item.invert ? 'invert' : undefined}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="sec">
          <div className="wrap">
            <div className="proj-head flex items-baseline justify-between gap-4 mb-6">
              <h2 className="m-0 text-[clamp(1.15rem,2.5vw,1.4rem)] font-bold tracking-[0.1em] uppercase text-violet-2">
                Featured Projects
              </h2>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.92rem] text-violet-2 no-underline hover:text-white"
              >
                View All Projects
              </a>
            </div>
            <div className="proj-grid grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="sec">
          <div className="wrap exp-layout">
            <div className="exp-intro">
              <p className="sec-tag">// Experience</p>
              <h2 className="exp-title">
                Where I&apos;ve <span>been</span>
              </h2>
              <p className="exp-copy">
                A path of building, shipping, and owning production systems — from CS foundations
                to full-stack delivery and DevOps.
              </p>
              <p className="exp-stamp">[ BUILD / DEPLOY / IMPROVE ]</p>
            </div>

            <div className="exp-rail" aria-label="Experience timeline">
              {experience.map((item) => (
                <article key={item.title} className={`exp-card${item.active ? ' active' : ''}`}>
                  <div className="exp-icon">
                    <ExpIcon kind={item.icon} />
                  </div>
                  <div className="exp-main">
                    <div className="exp-top">
                      {item.active ? <span className="exp-now">Now</span> : null}
                      <h3>{item.title}</h3>
                      <span className="exp-date">
                        <CalendarIcon />
                        {item.time}
                      </span>
                    </div>
                    <p className="exp-body">
                      <BriefIcon />
                      <span>{item.body}</span>
                    </p>
                    <div className="exp-tags">
                      {item.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="sec">
          <div className="wrap">
            <div className="contact-stage">
              <div className="contact-band">
              <div className="contact-top">
                <div>
                  <p className="sec-tag">Let&apos;s work together</p>
                  <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.45rem)] font-bold leading-tight tracking-tight text-white">
                    Have a <span className="text-violet-2">project</span> in mind?
                  </h2>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-text-2">
                    I&apos;m currently available for freelance work. Let&apos;s build something amazing
                    together.
                  </p>
                </div>

                <div className="contact-meta">
                  <div className="contact-meta-item">
                    <span className="ic">
                      <MailIcon />
                    </span>
                    <div>
                      <p className="label">Email</p>
                      <a href={`mailto:${MAIL}`} className="value no-underline hover:text-violet-2">
                        {MAIL}
                      </a>
                    </div>
                  </div>
                  <div className="contact-meta-item">
                    <span className="ic">
                      <PinIcon />
                    </span>
                    <div>
                      <p className="label">Location</p>
                      <p className="value">Cairo, Egypt</p>
                    </div>
                  </div>
                  <div className="contact-meta-item">
                    <span className="ic">
                      <ClockIcon />
                    </span>
                    <div>
                      <p className="label">Response Time</p>
                      <p className="value">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="contact-code" aria-hidden>
                  <pre>
                    <span className="cc-k">if</span> <span className="cc-m">(</span>
                    <span className="cc-v">idea</span> <span className="cc-m">&amp;&amp;</span>{' '}
                    <span className="cc-t">passion</span>
                    <span className="cc-m">) {'{'}</span>
                    {'\n'}  <span className="cc-f">let&apos;sBuildGreatThings</span>
                    <span className="cc-m">();</span>
                    {'\n'}
                    <span className="cc-m">{'}'}</span>
                  </pre>
                </div>
              </div>

              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  const data = new FormData(e.currentTarget)
                  const name = String(data.get('name') || '').trim()
                  const email = String(data.get('email') || '').trim()
                  const message = String(data.get('message') || '').trim()
                  const subject = encodeURIComponent(
                    name ? `Hello from ${name}` : 'Hello from portfolio',
                  )
                  const body = encodeURIComponent(
                    `${message}\n\n— ${name || 'Visitor'}${email ? `\n${email}` : ''}`,
                  )
                  window.location.href = `mailto:${MAIL}?subject=${subject}&body=${body}`
                }}
              >
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span>Name</span>
                    <input
                      className="field"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      className="field"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </label>
                </div>
                <label className="contact-field">
                  <span>Message</span>
                  <textarea
                    className="field field-area"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project…"
                    required
                  />
                </label>
                <button type="submit" className="btn btn-fill contact-submit">
                  Send Message
                  <SendIcon />
                </button>
              </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap inner">
          <a href="#home" className="logo" aria-label="Mohamed Hisham">
            <img src="/logo-mh.png" alt="Mohamed Hisham" className="logo-img" width={40} height={40} />
          </a>
          <p className="text-sm text-text-3">
            © {new Date().getFullYear()} Mohamed Dev. All rights reserved.
          </p>
          <a href="#home" className="text-sm text-text-2 no-underline transition-colors hover:text-violet-2">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  )
}

'use client'

import Link from 'next/link'

interface NavbarProps {
  links?: Array<{ label: string; href: string }>
  logo?: string
}

export function Navbar({
  links,
  logo = 'MH.',
}: NavbarProps) {
  const defaultLinks = [
    { label: 'About', href: '#about' },
    { label: 'Path', href: '#experience' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const navLinks = links || defaultLinks

  return (
    <nav className="sticky top-0 z-50 border-b border-line/70 bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-10">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          {logo.endsWith('.') ? (
            <>
              {logo.slice(0, -1)}
              <span className="text-signal">.</span>
            </>
          ) : (
            logo
          )}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarProps {
  links?: Array<{ label: string; href: string }>
  logo?: string
}

export function Navbar({ links, logo = 'Portfolio' }: NavbarProps) {
  const defaultLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  const navLinks = links || defaultLinks

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[rgba(15,15,30,0.7)] border-b border-glass-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:opacity-80 transition-opacity">
              {logo}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-medium hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  href?: string
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  href,
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-glow-purple',
    secondary: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-glow-blue',
    accent: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-glow-blue',
  }

  const baseClasses = cn(
    'relative inline-flex items-center justify-center',
    'rounded-lg font-medium transition-all duration-300',
    'before:absolute before:inset-0 before:rounded-lg before:bg-white before:opacity-0 before:transition-opacity',
    'hover:scale-105 hover:before:opacity-10',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    'overflow-hidden group',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    )
  }

  return (
    <button className={baseClasses} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}

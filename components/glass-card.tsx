'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  border?: boolean
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false,
  border = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-glass rounded-lg p-6',
        'bg-glass-dark border border-glass-border',
        'shadow-glass transition-all duration-500',
        hover && 'hover:shadow-glow-md hover:bg-glass-darker hover:border-opacity-30',
        gradient && 'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-purple-500/10 before:to-transparent before:pointer-events-none',
        !border && 'border-0',
        'relative overflow-hidden group',
        className
      )}
    >
      {gradient && <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'

interface TechBadgeProps {
  name: string
  color?: 'purple' | 'blue' | 'cyan' | 'pink'
  size?: 'sm' | 'md'
  icon?: string
}

export function TechBadge({ name, color = 'purple', size = 'sm', icon }: TechBadgeProps) {
  const colorClasses = {
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-200 shadow-glow-sm',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-200 shadow-glow-blue',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200 shadow-glow-blue',
    pink: 'bg-pink-500/10 border-pink-500/30 text-pink-200 shadow-glow-sm',
  }

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-2 text-sm',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5',
        'border rounded-full',
        'transition-all duration-300',
        'hover:shadow-glow-md hover:scale-105 hover:border-opacity-100',
        colorClasses[color],
        sizeClasses[size]
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span className="font-medium whitespace-nowrap">{name}</span>
    </div>
  )
}

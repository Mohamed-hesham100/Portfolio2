'use client'

import { GlassCard } from './glass-card'
import { cn } from '@/lib/utils'

interface StatsWidgetProps {
  number: string
  label: string
  unit?: string
  color?: 'purple' | 'blue' | 'cyan'
  animate?: boolean
}

export function StatsWidget({ number, label, unit, color = 'purple', animate = true }: StatsWidgetProps) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 shadow-glow-sm',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 shadow-glow-blue',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 shadow-glow-blue',
  }

  const gradient = {
    purple: 'from-purple-400 to-purple-600',
    blue: 'from-blue-400 to-blue-600',
    cyan: 'from-cyan-400 to-cyan-600',
  }

  return (
    <GlassCard
      className={cn(
        'text-center border bg-gradient-to-br',
        colorClasses[color]
      )}
      hover
    >
      <div className={cn(animate && 'animate-float')}>
        <div className={cn('text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r', gradient[color])}>
          {number}
          {unit && <span className="text-2xl">{unit}</span>}
        </div>
        <p className="text-gray-400 text-sm mt-2">{label}</p>
      </div>
    </GlassCard>
  )
}

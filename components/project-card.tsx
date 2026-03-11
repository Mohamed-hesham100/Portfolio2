'use client'

import { GlassCard } from './glass-card'
import { TechBadge } from './tech-badge'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  technologies: string[]
  featured?: boolean
  link?: string
  stats?: Array<{ label: string; value: string }>
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  featured = false,
  link,
  stats,
}: ProjectCardProps) {
  const content = (
    <GlassCard
      className={cn(
        featured && 'border-purple-500/50 shadow-glow-md hover:shadow-glow-lg',
        'flex flex-col h-full group'
      )}
      hover
      gradient
    >
      {image && (
        <div className="mb-4 overflow-hidden rounded-lg h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      {featured && (
        <div className="mb-3 inline-block">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
            Featured Project
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
        {title}
      </h3>

      <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>

      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-glass-border">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-xs text-gray-400">{stat.label}</div>
              <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <TechBadge key={tech} name={tech} size="sm" color="purple" />
        ))}
      </div>

      {link && (
        <a
          href={link}
          className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium group/link"
        >
          View Project
          <span className="ml-2 transition-transform group-hover/link:translate-x-1">→</span>
        </a>
      )}
    </GlassCard>
  )

  return content
}

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  hover?: boolean
}

export function GlassCard({ 
  children, 
  className = '',
  title,
  description,
  hover = true
}: GlassCardProps) {
  return (
    <Card className={cn(
      'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
      hover && 'hover:bg-white/15 hover:shadow-2xl transition-all duration-300',
      className
    )}>
      {title && (
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          {description && (
            <p className="text-white/70">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="text-white">
        {children}
      </CardContent>
    </Card>
  )
}


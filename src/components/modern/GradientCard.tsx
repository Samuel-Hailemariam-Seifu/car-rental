import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GradientCardProps {
  children: ReactNode
  gradient?: string
  className?: string
  title?: string
  description?: string
}

export function GradientCard({ 
  children, 
  gradient = 'from-blue-500 to-purple-600', 
  className = '',
  title,
  description 
}: GradientCardProps) {
  return (
    <Card className={cn(
      'bg-gradient-to-br backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300',
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


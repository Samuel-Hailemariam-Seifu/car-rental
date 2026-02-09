import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'glass'
}

export function FloatingActionButton({ 
  children, 
  onClick, 
  className = '',
  size = 'md',
  variant = 'gradient'
}: FloatingActionButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  }

  const variantClasses = {
    default: 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 rounded-full z-50 transition-all duration-300 hover:scale-110',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Button>
  )
}


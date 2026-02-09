'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  animated?: boolean
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className = '',
  showLabel = true,
  animated = true,
  color = 'blue'
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setProgress(percentage)
    }
  }, [percentage, animated])

  const colorClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            colorClasses[color]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}


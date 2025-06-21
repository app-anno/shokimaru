'use client'

import { ButtonHTMLAttributes } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingButton({
  children,
  isLoading = false,
  loadingText = '処理中...',
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}: LoadingButtonProps) {
  const baseClasses = 'font-bold rounded-lg transition-all duration-200 inline-flex items-center justify-center'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-secondary disabled:bg-gray-300',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-300',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="border-current" className="mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}
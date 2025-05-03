'use client'

interface FrostedContainerProps {
  children: React.ReactNode
  className?: string
}

export default function FrostedContainer({ children, className = '' }: FrostedContainerProps) {
  return (
    <div
      className={`rounded-xl border border-pink-200 bg-white/30 p-6 shadow-lg backdrop-blur-lg ${className}`}
    >
      {children}
    </div>
  )
}

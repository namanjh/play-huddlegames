'use client'

interface SecondaryButtonProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export default function SecondaryButton({
  text,
  onClick,
  type = 'button',
  className = '',
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full bg-gradient-to-tr from-yellow-100 via-teal-100 to-blue-100 px-6 py-3 text-sm font-semibold text-gray-700 shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105 ${className}`}
    >
      {text}
    </button>
  )
}

'use client'

interface PrimaryButtonProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export default function PrimaryButton({
  text,
  onClick,
  type = 'button',
  className = '',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full bg-gradient-to-tr from-pink-300 via-purple-200 to-lime-100 px-6 py-3 text-sm font-semibold text-gray-800 shadow-xl backdrop-blur-md transition-transform duration-200 hover:scale-105 ${className}`}
    >
      {text}
    </button>
  )
}

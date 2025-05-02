'use client'

interface TertiaryButtonProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export default function TertiaryButton({
  text,
  onClick,
  type = 'button',
  className = '',
}: TertiaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg border border-pink-200 bg-white/70 px-4 py-2 text-sm text-pink-800 shadow-sm hover:bg-pink-50 transition ${className}`}
    >
      {text}
    </button>
  )
}

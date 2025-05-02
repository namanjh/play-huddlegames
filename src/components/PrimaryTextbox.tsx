'use client'

interface PrimaryTextboxProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

export default function PrimaryTextbox({
  value,
  onChange,
  placeholder,
  className = '',
}: PrimaryTextboxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-pink-300 bg-white/80 px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none ${className}`}
    />
  )
}

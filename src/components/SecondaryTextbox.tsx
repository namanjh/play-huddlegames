'use client'

interface SecondaryTextboxProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

export default function SecondaryTextbox({
  value,
  onChange,
  placeholder,
  className = '',
}: SecondaryTextboxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-purple-200 bg-white/70 px-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none ${className}`}
    />
  )
}

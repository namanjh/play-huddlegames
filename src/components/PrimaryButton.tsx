interface PrimaryButtonProps {
    text: string
    onClick: () => void
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
  }

  export default function PrimaryButton({
    text,
    onClick,
    size = 'md',
    fullWidth = false,
  }: PrimaryButtonProps) {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        onClick={onClick}
        className={`rounded-full bg-gradient-to-tr from-pink-300 via-purple-200 to-lime-100 font-semibold text-gray-800 shadow-xl backdrop-blur-md transition-transform duration-200 hover:scale-105
          ${sizeClasses[size]} ${fullWidth ? 'w-full' : 'w-auto'}`}
      >
        {text}
      </button>
    )
  }

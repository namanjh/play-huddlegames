'use client'

interface PlayerCardProps {
  name: string
  isAdmin?: boolean
  avatarUrl?: string
}

export default function PlayerCard({ name, isAdmin = false, avatarUrl }: PlayerCardProps) {
  return (
    <div
      className="w-full rounded-xl p-4 flex items-center gap-4 shadow-md backdrop-blur-md text-gray-800"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,192,203,0.15) 0%, rgba(255,221,177,0.15) 25%, rgba(173,216,230,0.15) 50%, rgba(221,160,221,0.15) 75%, rgba(152,251,152,0.15) 100%)',
        border: '1px solid rgba(255, 182, 193, 0.5)',
      }}
    >
      {/* Avatar */}
      <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold text-white">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : (
          name[0].toUpperCase()
        )}
      </div>

      {/* Player Info */}
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{name}</span>
        {isAdmin && <span className="text-xs text-pink-700 font-semibold">Admin</span>}
      </div>
    </div>
  )
}

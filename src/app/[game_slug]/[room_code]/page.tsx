'use client'

import { use } from 'react'

interface RoomPageProps {
  params: Promise<{ game_slug: string; room_code: string }>
}

export default function RoomPage({ params }: RoomPageProps) {
  const { game_slug, room_code } = use(params)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-pink-700">
        🎮 Room: <span className="uppercase">{game_slug}</span> – {room_code}
      </h1>
    </div>
  )
}

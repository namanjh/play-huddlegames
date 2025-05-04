'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PrimaryTextbox from './PrimaryTextbox'
import PrimaryButton from './PrimaryButton'
import { savePlayerToStorage } from '@/utils/playerStorage'

interface JoinPromptProps {
  gameSlug: string
  roomCode: string
}

export default function JoinPrompt({ gameSlug, roomCode }: JoinPromptProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleJoin = async () => {
    if (!name.trim()) return setError('Name is required')

    const res = await fetch('/api/join-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_code: roomCode, player_name: name }),
    })

    const data = await res.json()
    if (!res.ok) {
      return setError(data.error || 'Failed to join')
    }

    savePlayerToStorage(roomCode, {
      player_name: data.player.player_name,
      is_admin: false,
      player_id: data.player.id,
      room_id: data.player.room_id,
      game_slug: gameSlug,
    })

    router.refresh() // Refreshes the page to load room UI
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 px-4">
      <h1 className="text-2xl font-bold text-pink-700">Enter Your Name to Join</h1>
      <PrimaryTextbox value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <PrimaryButton text="Join Game" onClick={handleJoin} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

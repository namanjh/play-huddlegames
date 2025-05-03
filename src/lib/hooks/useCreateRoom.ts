'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useCreateRoom(gameSlug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createRoom = async (playerName: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_slug: gameSlug,
          player_name: playerName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create room')
        return
      }

      const roomCode = data.room.room_code
      router.push(`/${gameSlug}/${roomCode}`)
    } catch (err) {
      setError('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { createRoom, loading, error }
}

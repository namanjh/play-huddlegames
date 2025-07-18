'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { savePlayerToStorage } from '@/utils/playerStorage'

export function useCreateRoom(gameSlug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createRoom = async (playerName: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_slug: gameSlug, player_name: playerName }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Room creation failed')
      }

      const { room, player } = data

      savePlayerToStorage(room.room_code, player)

      router.push(`/${gameSlug}/${room.room_code}`)
    } catch (err: any) {
      setError(err.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return { createRoom, loading, error }
}

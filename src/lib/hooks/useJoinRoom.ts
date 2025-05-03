'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useJoinRoom(gameSlug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const joinRoom = async (roomCode: string, playerName: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_code: roomCode,
          player_name: playerName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to join room')
        return
      }

      router.push(`/${gameSlug}/${roomCode}`)
    } catch (err) {
      setError('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { joinRoom, loading, error }
}

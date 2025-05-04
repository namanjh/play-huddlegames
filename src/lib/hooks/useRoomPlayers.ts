// src/lib/hooks/useRoomPlayers.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Player {
  id: string
  player_name: string
  room_id: string
  is_admin: boolean
  team: string
}

export function useRoomPlayers(roomId: string) {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    if (!roomId) return

    // Initial fetch
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId)
        .order('joined_at', { ascending: true })
      console.log(`this is data ${data}`);
      console.log(`this is roomId ${roomId}`);

      setPlayers(data || [])
    }

    fetchPlayers()

    // Realtime updates
    const channel = supabase
      .channel(`players-room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          fetchPlayers() // simple re-fetch strategy
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  return players
}

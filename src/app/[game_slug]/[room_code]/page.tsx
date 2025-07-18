// src/app/[game_slug]/[room_code]/page.tsx

'use client'

import { use, useEffect, useState } from 'react'
import FrostedContainer from '@/components/FrostedContainer'
import PrimaryButton from '@/components/PrimaryButton'
import PlayerCard from '@/components/PlayerCard'
import ShareQRCode from '@/components/ShareQRCode'
import CopyRoomLink from '@/components/CopyRoomLink'
import JoinPrompt from '@/components/JoinPrompt'
import HowToSection from '@/components/HowToSection'
import { getPlayerFromStorage } from '@/utils/playerStorage'
import io from 'socket.io-client'
import { supabase } from '@/lib/supabaseClient'

interface RoomPageProps {
  params: Promise<{ game_slug: string; room_code: string }>
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000')

export default function RoomPage({ params }: RoomPageProps) {
  const { game_slug, room_code } = use(params)
  const [localPlayer, setLocalPlayer] = useState<any | null>(null)
  const [playerReady, setPlayerReady] = useState(false)
  const [onlinePlayers, setOnlinePlayers] = useState<any[]>([])
  const [gameDetails, setGameDetails] = useState<any>(null)

  useEffect(() => {
    const player = getPlayerFromStorage(room_code)
    setLocalPlayer(player)
    setPlayerReady(true)

    const fetchGameDetails = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('slug', game_slug)
        .single()

      if (error) {
        console.error('Error fetching game details:', error)
      } else {
        setGameDetails(data)
      }
    }
    fetchGameDetails()
  }, [room_code, game_slug])

  useEffect(() => {
    if (playerReady && localPlayer) {
      socket.emit('join-room', {
        roomCode: room_code,
        player: localPlayer,
      })

      socket.on('players-update', (players) => {
        setOnlinePlayers(players)
      })

      return () => {
        socket.off('players-update')
      }
    }
  }, [playerReady, localPlayer, room_code])

  if (!playerReady || !gameDetails) return null

  if (!localPlayer) {
    return (
      <JoinPrompt
        gameSlug={game_slug}
        roomCode={room_code}
        gameName={gameDetails.name}
        onPlayerJoined={setLocalPlayer}
      />
    )
  }

  const handleStartGame = async () => {
    // Only admin can start the game
    if (!localPlayer.is_admin) {
      alert('Only the room admin can start the game.');
      return;
    }

    try {
      const response = await fetch('/api/assign-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_code: room_code, room_id: localPlayer.room_id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to assign teams');
      }

      // Update local state with newly assigned teams
      setOnlinePlayers(data.players);

      // Emit a socket event to notify others that teams are assigned
      socket.emit('teams-assigned', { roomCode: room_code, players: data.players });

    } catch (error) {
      console.error('Error starting game and assigning teams:', error);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-6 pt-8 pb-28">

        {/* LEFT: Player List (reverted to original) */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h2 className="text-xl font-bold text-pink-800 mb-2">
            👥 Players in Room ({onlinePlayers.length})
          </h2>
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col gap-3">
              {onlinePlayers.map((p) => (
                <PlayerCard key={p.player_id} name={p.player_name} isAdmin={p.is_admin} />
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: Game Info + QR */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-bold text-pink-700">
            Welcome to {game_slug.replace('-', ' ')}
          </h1>
          <p className="text-gray-700 font-medium text-sm">
            Room ID: <span className="font-mono text-pink-600">{room_code}</span>
          </p>
          <CopyRoomLink link={typeof window !== 'undefined' ? window.location.href : ''} />
          <ShareQRCode value={typeof window !== 'undefined' ? window.location.href : ''} />
        </div>

        {/* RIGHT: Rules */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <HowToSection
                title="How to Play"
                icon="🎮"
                titleColor="text-purple-800"
                items={gameDetails.how_to_play || []}
            />
            <HowToSection
                title="How to Win"
                icon="🏆"
                titleColor="text-purple-800"
                items={gameDetails.how_to_win || []}
            />
        </div>
      </div>

      {/* Fixed Start Game Button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <PrimaryButton text="Start Game" onClick={handleStartGame} size="lg" fullWidth />
      </div>
    </div>
  )
}

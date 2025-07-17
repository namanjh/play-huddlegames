'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PrimaryTextbox from './PrimaryTextbox'
import PrimaryButton from './PrimaryButton'
import HowToSection from './HowToSection' // Import HowToSection
import { savePlayerToStorage } from '@/utils/playerStorage'
import { generateRandomName } from '@/lib/generateRandomName'

interface JoinPromptProps {
  gameSlug: string
  roomCode: string
  gameName: string // New prop for game name
  onPlayerJoined: (player: any) => void // Callback to update localPlayer in parent
}

export default function JoinPrompt({
  gameSlug,
  roomCode,
  gameName,
  onPlayerJoined,
}: JoinPromptProps) {
  const [name, setName] = useState(generateRandomName())
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

    onPlayerJoined(data.player) // Call the callback to update localPlayer in parent
  }

  // Dummy data for HowToSection
  const dummyHowToPlay = [
    'Join the room and enter your name.',
    'One person gives clues — others guess.',
    'Alternate between teams. Time it!',
  ];

  const dummyHowToWin = [
    'Score more points than the other team.',
    'Guess with fewer clues.',
    'Time your turns and collaborate!',
  ];

  return (
    <div className="flex flex-1 items-center justify-center w-full px-4 py-6">
      <div className="flex w-full max-w-7xl flex-col lg:flex-row items-start justify-center gap-12">
        {/* Left: Join Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full gap-6">
          <h1 className="text-2xl font-bold text-pink-700">
            Join {gameName}
          </h1>
          <PrimaryTextbox
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <PrimaryButton text="Join Game" onClick={handleJoin} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Right: How to Play / How to Win */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <HowToSection
            title="How to Play"
            icon="🎮"
            titleColor="text-purple-800"
            items={dummyHowToPlay}
          />
          <HowToSection
            title="How to Win"
            icon="🏆"
            titleColor="text-purple-800"
            items={dummyHowToWin}
          />
        </div>
      </div>
    </div>
  )
}
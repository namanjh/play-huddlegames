'use client'

import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import GameRoomActions from '@/components/GameRoomActions'
import FrostedContainer from '@/components/FrostedContainer'
import { useCreateRoom } from '@/lib/hooks/useCreateRoom'
import { generateRandomName } from '@/lib/generateRandomName'

interface GamePageProps {
  params: Promise<{ game_slug: string }>
}

export default function GamePage({ params }: GamePageProps) {
  const { game_slug } = use(params)
  const router = useRouter()

  const { createRoom, loading, error } = useCreateRoom(game_slug)
  const [creatorName, setCreatorName] = useState(generateRandomName())

  const validGames = ['password-game', 'categories']

  if (!validGames.includes(game_slug)) {
    notFound()
  }

  const handleJoinRoom = (roomCode: string, playerName: string) => {
    const url = `/${game_slug}/${roomCode}?playerName=${encodeURIComponent(playerName)}`
    router.push(url)
  }

  return (
    <div className="flex flex-1 items-center justify-center w-full px-4 py-6">
      <div className="flex w-full max-w-7xl flex-col lg:flex-row items-start justify-center gap-12">
        <div className="w-full lg:w-1/2 flex justify-center items-center h-full">
          <GameRoomActions
            onCreateRoom={() => createRoom(creatorName)}
            onJoinRoom={handleJoinRoom}
            creatorName={creatorName}
            setCreatorName={setCreatorName}
            loading={loading}
            error={error}
          />
        </div>

        {/* Right: How to Play / How to Win */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <FrostedContainer>
            <h2 className="text-xl font-bold mb-4 text-pink-800">🎮 How to Play</h2>
            <ul className="list-disc pl-6 text-sm text-gray-800">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Aliquam tincidunt erat nec justo laoreet, eget elementum nulla tincidunt.</li>
              <li>Curabitur ac leo vitae justo tincidunt blandit.</li>
              <li>Quisque tincidunt velit sed magna porta, nec placerat augue commodo.</li>
              <li>Donec convallis sem ut tellus viverra, a cursus justo rutrum.</li>
            </ul>
          </FrostedContainer>

          <FrostedContainer>
            <h2 className="text-xl font-bold mb-4 text-pink-800">🏆 How to Win</h2>
            <ul className="list-disc pl-6 text-sm text-gray-800">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Scoring is based on successful turns and minimal clues.</li>
              <li>Time management and deduction are key!</li>
            </ul>
          </FrostedContainer>
        </div>
      </div>
    </div>
  )

}

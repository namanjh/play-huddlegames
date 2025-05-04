'use client'

import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import GameRoomActions from '@/components/GameRoomActions'
import FrostedContainer from '@/components/FrostedContainer'
import HowToSection from '@/components/HowToSection'
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

  const validGames = ['find-my-password', 'categories']

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
            <HowToSection
                title="How to Play"
                icon="🎮"
                items={[
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Aliquam tincidunt erat nec justo laoreet, eget elementum nulla tincidunt.',
                'Curabitur ac leo vitae justo tincidunt blandit.',
                'Quisque tincidunt velit sed magna porta, nec placerat augue commodo.',
                'Donec convallis sem ut tellus viverra, a cursus justo rutrum.',
                ]}
            />
            <HowToSection
                title="How to Win"
                icon="🏆"
                items={[
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Scoring is based on successful turns and minimal clues.',
                'Time management and deduction are key!',
                ]}
            />
        </div>
      </div>
    </div>
  )

}

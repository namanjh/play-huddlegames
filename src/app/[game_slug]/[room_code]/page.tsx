'use client'

import { use } from 'react'
import FrostedContainer from '@/components/FrostedContainer'
import PrimaryButton from '@/components/PrimaryButton'
import PlayerCard from '@/components/PlayerCard'
import ShareQRCode from '@/components/ShareQRCode'
import CopyRoomLink from '@/components/CopyRoomLink'

interface RoomPageProps {
  params: Promise<{ game_slug: string; room_code: string }>
}

export default function RoomPage({ params }: RoomPageProps) {
  const { game_slug, room_code } = use(params)

  const players = ['Alice', 'Bob', 'Charlie', 'Markand', 'HeroHiraLAL123123', 'retser', 'radomtest']

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-6 pt-8 pb-28">

        {/* LEFT: Player List */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h2 className="text-xl font-bold text-pink-800 mb-2">
            👥 Players in Room ({players.length})
          </h2>
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col gap-3">
              {players.map((name, i) => (
                <PlayerCard key={i} name={name} isAdmin={i === 0} />
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
          <FrostedContainer>
            <h2 className="text-xl font-bold mb-2 text-purple-800">🎮 How to Play</h2>
            <ul className="list-disc pl-6 text-sm text-gray-800">
              <li>Join the room and enter your name.</li>
              <li>One person gives clues — others guess.</li>
              <li>Alternate between teams. Time it!</li>
            </ul>
          </FrostedContainer>
          <FrostedContainer>
            <h2 className="text-xl font-bold mb-2 text-purple-800">🏆 How to Win</h2>
            <ul className="list-disc pl-6 text-sm text-gray-800">
              <li>Score more points than the other team.</li>
              <li>Guess with fewer clues.</li>
              <li>Time your turns and collaborate!</li>
            </ul>
          </FrostedContainer>
        </div>
      </div>

      {/* Fixed Start Game Button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <PrimaryButton text="Start Game" onClick={() => {}} size="lg" fullWidth />
      </div>
    </div>
  )
}

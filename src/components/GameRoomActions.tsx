'use client'

import { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import PrimaryTextbox from './PrimaryTextbox'
import SecondaryTextbox from './SecondaryTextbox'

interface GameRoomActionsProps {
  onCreateRoom: () => void
  onJoinRoom: (roomCode: string, playerName: string) => void
  creatorName: string
  setCreatorName: (name: string) => void
  loading?: boolean
  error?: string | null
}

export default function GameRoomActions({
  onCreateRoom,
  onJoinRoom,
  creatorName,
  setCreatorName,
  loading,
  error,
}: GameRoomActionsProps) {
  const [joinName, setJoinName] = useState('')
  const [joinRoomCode, setJoinRoomCode] = useState('')

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm gap-10">
      {/* Create Game */}
      <div className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-2xl font-semibold">Create a Game</h2>
        <PrimaryTextbox
          placeholder="Enter Your Name"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
        />
        <PrimaryButton text={loading ? 'Creating...' : 'Create Game'} onClick={onCreateRoom} />
      </div>

      {/* Horizontal OR Divider */}
      <div className="relative w-full flex items-center justify-center my-4">
        <div className="absolute left-0 right-0 h-px bg-pink-200" />
        <span className="bg-white/80 z-10 px-4 text-gray-500 font-semibold text-sm">OR</span>
      </div>

      {/* Join Game */}
      <div className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-2xl font-semibold">Join a Game</h2>
        <PrimaryTextbox
          placeholder="Enter Your Name"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
        />
        <SecondaryTextbox
          placeholder="Enter Room Code"
          value={joinRoomCode}
          onChange={(e) => setJoinRoomCode(e.target.value)}
        />
        <SecondaryButton text="Join Game" onClick={() => onJoinRoom(joinRoomCode, joinName)} />
      </div>
    </div>
  )
}

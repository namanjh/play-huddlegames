'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import InputField from './InputField';

interface GameRoomActionsProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomCode: string, playerName: string) => void;
  creatorName: string;
  setCreatorName: (name: string) => void;
  roomLink: string | null;
  loading?: boolean;
  error?: string | null;
}

export default function GameRoomActions({
  onCreateRoom,
  onJoinRoom,
  creatorName,
  setCreatorName,
  roomLink,
  loading,
  error,
}: GameRoomActionsProps) {
  const [joinName, setJoinName] = useState('');
  const [joinRoomCode, setJoinRoomCode] = useState('');

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-4xl">

      {/* Create Game */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <h2 className="text-2xl font-semibold">Create a Game</h2>
        <InputField
          placeholder="Enter Your Name"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
        />
        <PrimaryButton text={loading ? "Creating..." : "Create Game"} onClick={onCreateRoom} />

        {roomLink && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-sm">Share this link:</p>
            <a href={roomLink} className="text-blue-500 underline break-all" target="_blank">{roomLink}</a>
            <QRCodeSVG value={roomLink} size={128} />
          </div>
        )}
      </div>

      {/* OR Divider */}
      <div className="flex items-center justify-center w-full md:w-auto">
        <span className="text-gray-400 text-xl font-bold">OR</span>
      </div>

      {/* Join Game */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <h2 className="text-2xl font-semibold">Join a Game</h2>
        <InputField
          placeholder="Enter Your Name"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
        />
        <InputField
          placeholder="Enter Room Code"
          value={joinRoomCode}
          onChange={(e) => setJoinRoomCode(e.target.value)}
        />
        <SecondaryButton text="Join Game" onClick={() => onJoinRoom(joinRoomCode, joinName)} />
      </div>

    </div>
  );
}

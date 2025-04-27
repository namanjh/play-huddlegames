'use client';

import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import InputField from './InputField';
import { QRCodeSVG } from 'qrcode.react';

interface GameRoomActionsProps {
  onCreateRoom: (name: string) => string | null;
  onJoinRoom: (roomCode: string, name: string) => void;
}

export default function GameRoomActions({ onCreateRoom, onJoinRoom }: GameRoomActionsProps) {
  const [creatorName, setCreatorName] = useState(generateRandomName());
  const [joinerName, setJoinerName] = useState(generateRandomName());
  const [roomCode, setRoomCode] = useState('');
  const [createdRoomLink, setCreatedRoomLink] = useState<string | null>(null);

  const handleCreate = () => {
    const roomLink = onCreateRoom(creatorName);
    setCreatedRoomLink(roomLink);
  };

  const handleJoin = () => {
    onJoinRoom(roomCode, joinerName);
  };

  return (
<div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-4xl">
<div className="flex flex-col items-center gap-4 w-full max-w-sm">
  <h2 className="text-2xl font-semibold">Create a Game</h2>
  <InputField
    placeholder="Enter Your Name"
    value={creatorName}
    onChange={(e) => setCreatorName(e.target.value)}
  />
  <PrimaryButton text="Create Game" onClick={handleCreate} />

  {createdRoomLink && (
    <div className="flex flex-col items-center gap-2 mt-4">
      <p className="text-sm">Share this link:</p>
      <a href={createdRoomLink} className="text-blue-500 underline break-all" target="_blank">{createdRoomLink}</a>
      <QRCodeSVG value={createdRoomLink} size={128} />
    </div>
  )}
</div>

{/* OR divider */}
<div className="flex items-center justify-center w-full md:w-auto">
  <span className="text-gray-400 text-xl font-bold">OR</span>
</div>

{/* Join a Game */}
<div className="flex flex-col items-center gap-4 w-full max-w-sm">
  <h2 className="text-2xl font-semibold">Join a Game</h2>
  <InputField
    placeholder="Enter Your Name"
    value={joinerName}
    onChange={(e) => setJoinerName(e.target.value)}
  />
  <InputField
    placeholder="Enter Room Code"
    value={roomCode}
    onChange={(e) => setRoomCode(e.target.value)}
  />
  <SecondaryButton text="Join Game" onClick={handleJoin} />
</div>

</div>

  );
}

function generateRandomName() {
  const adjectives = ['Cool', 'Fast', 'Happy', 'Sneaky', 'Witty', 'Brave', 'Lucky'];
  const animals = ['Tiger', 'Eagle', 'Panda', 'Lion', 'Falcon', 'Otter', 'Wolf'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${Math.floor(Math.random() * 100)}`;
}

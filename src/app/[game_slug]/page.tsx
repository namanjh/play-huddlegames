'use client';

import { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import GameRoomActions from '@/components/GameRoomActions';
import { useCreateAndJoinRoom } from '@/lib/hooks/useCreateAndJoinRoom';

interface GamePageProps {
  params: Promise<{ game_slug: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const { game_slug } = use(params);  // ✅ correctly unwrapping Promise
  const router = useRouter();

  const { createAndJoinRoom, roomLink, loading, error } = useCreateAndJoinRoom(game_slug);
  const [creatorName, setCreatorName] = useState(generateRandomName());

  const validGames = ['password-game', 'categories'];

  if (!validGames.includes(game_slug)) {
    notFound();
  }

  const handleJoinRoom = (roomCode: string, playerName: string) => {
    const roomLink = `/${game_slug}/${roomCode}?playerName=${encodeURIComponent(playerName)}`;
    router.push(roomLink);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 capitalize">{game_slug.replace('-', ' ')}</h1>

      <GameRoomActions
        onCreateRoom={() => createAndJoinRoom(creatorName)}
        onJoinRoom={handleJoinRoom}
        creatorName={creatorName}
        setCreatorName={setCreatorName}
        roomLink={roomLink}
        loading={loading}
        error={error}
      />
    </main>
  );
}

// Helper function to generate a random player name
function generateRandomName() {
  const adjectives = ['Cool', 'Fast', 'Happy', 'Sneaky', 'Witty', 'Brave', 'Lucky'];
  const animals = ['Tiger', 'Eagle', 'Panda', 'Lion', 'Falcon', 'Otter', 'Wolf'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${Math.floor(Math.random() * 100)}`;
}

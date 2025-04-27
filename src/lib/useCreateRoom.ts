'use client';

import { useRouter } from 'next/navigation';
import { generateRoomCode } from './generateRoomCode';

export function useCreateRoom(gameSlug: string) {
  const router = useRouter();

  const createRoom = () => {
    const roomCode = generateRoomCode();
    router.push(`/${gameSlug}/${roomCode}`);
  };

  return { createRoom };
}

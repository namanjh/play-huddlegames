'use client';

import { useState } from 'react';

export function useCreateAndJoinRoom(gameSlug: string) {
  const [roomLink, setRoomLink] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAndJoinRoom = async (playerName: string) => {
    try {
      setLoading(true);
      setError(null);

      const createResponse = await fetch('/api/create-room', { method: 'POST' });
      const createData = await createResponse.json();

      if (!createResponse.ok) {
        setError(createData.error || 'Failed to create room');
        setLoading(false);
        return;
      }

      const createdRoomCode = createData.room.room_code;

      const joinResponse = await fetch('/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_code: createdRoomCode,
          player_name: playerName,
        }),
      });

      const joinData = await joinResponse.json();

      if (!joinResponse.ok) {
        setError(joinData.error || 'Failed to join room');
        setLoading(false);
        return;
      }

      const fullRoomLink = `${window.location.origin}/${gameSlug}/${createdRoomCode}`;
      setRoomCode(createdRoomCode);
      setRoomLink(fullRoomLink);

    } catch (err) {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { createAndJoinRoom, roomLink, roomCode, loading, error };
}

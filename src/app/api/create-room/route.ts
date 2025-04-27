import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { generateRoomCode } from '@/lib/generateRoomCode';

export async function POST() {
  const roomCode = generateRoomCode();
  const gameSlug = 'password-game';

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('rooms')
    .insert([
      {
        room_code: roomCode,
        game_slug: gameSlug,
        created_at: createdAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ room: data });
}

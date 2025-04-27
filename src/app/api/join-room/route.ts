import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  const { room_code, player_name } = await request.json();

  if (!room_code || !player_name) {
    return NextResponse.json({ error: 'Missing room code or player name' }, { status: 400 });
  }

  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_code', room_code)
    .single();

  if (roomError || !room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  const { count } = await supabase
    .from('players')
    .select('id', { count: 'exact', head: true })
    .eq('room_id', room.id);

  const team = (count || 0) % 2 === 0 ? 'team1' : 'team2';

  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert([
      {
        room_id: room.id,
        player_name,
        team,
      }
    ])
    .select()
    .single();

  if (playerError) {
    return NextResponse.json({ error: playerError.message }, { status: 400 });
  }

  return NextResponse.json({ player });
}

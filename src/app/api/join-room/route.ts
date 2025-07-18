import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  const { room_code, player_name } = await request.json()

  if (!room_code || !player_name) {
    return NextResponse.json({ error: 'Missing room code or player name' }, { status: 400 })
  }

  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_code', room_code)
    .single()

  if (roomError || !room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  // Get current player count to determine if this player is the admin
  const { count: playerCount, error: playersError } = await supabase
    .from('players')
    .select('id', { count: 'exact', head: true })
    .eq('room_id', room.id)

  if (playersError) {
    return NextResponse.json({ error: playersError.message }, { status: 500 })
  }

  let isAdmin = false;

  if (playerCount === 0) {
    // First player in the room is the admin
    isAdmin = true;
  }

  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert([
      {
        room_id: room.id,
        player_name,
        team: null, // Set team to null initially
        is_admin: isAdmin,
      },
    ])
    .select()
    .single()

  if (playerError) {
    return NextResponse.json({ error: playerError.message }, { status: 400 })
  }

  return NextResponse.json({ player })
}
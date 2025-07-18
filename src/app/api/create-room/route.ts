import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { generateRoomCode } from '@/lib/generateRoomCode'

export async function POST(request: NextRequest) {
  const { game_slug, player_name } = await request.json()

  if (!game_slug || !player_name) {
    return NextResponse.json({ error: 'Missing game_slug or player_name' }, { status: 400 })
  }

  const room_code = generateRoomCode()
  const createdAt = new Date()
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000)

  // 1. Create room
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .insert([
      {
        room_code,
        game_slug,
        created_at: createdAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    ])
    .select()
    .single()

  if (roomError || !room) {
    console.error('Supabase Room Creation Error:', roomError); // ADDED THIS LINE
    return NextResponse.json({ error: roomError?.message || 'Failed to create room' }, { status: 400 })
  }

  // 2. Create admin player
  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert([
      {
        room_id: room.id,
        player_name,
        team: null,
        is_admin: true,
      },
    ])
    .select()
    .single()

  if (playerError || !player) {
    console.error('Supabase Player Creation Error:', playerError); // ADDED THIS LINE
    return NextResponse.json({ error: playerError?.message || 'Failed to create player' }, { status: 400 })
  }

  // 3. Update room with admin_player_id
  await supabase
    .from('rooms')
    .update({ admin_player_id: player.id })
    .eq('id', room.id)

  return NextResponse.json({ room, player })
}

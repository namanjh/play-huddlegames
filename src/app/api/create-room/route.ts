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
    return NextResponse.json({ error: roomError?.message }, { status: 400 })
  }

  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert([
      {
        room_id: room.id,
        player_name,
        team: 'Pink', // Changed from 'team1' to 'Pink'
        is_admin: true,
      },
    ])
    .select()
    .single()

  if (playerError || !player) {
    return NextResponse.json({ error: 'Player not found!!' }, { status: 400 })
  }

  // 3. Update room with admin_player_id
  await supabase
    .from('rooms')
    .update({ admin_player_id: player.id })
    .eq('id', room.id)

  return NextResponse.json({ room, player })
}

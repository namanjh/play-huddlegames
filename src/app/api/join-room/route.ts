import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  const { room_code, player_name } = await request.json() // Removed is_admin from destructuring, will determine it here

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

  // Get current player count and team distribution in the room
  const { data: existingPlayers, count: playerCount, error: playersError } = await supabase
    .from('players')
    .select('id, team', { count: 'exact' })
    .eq('room_id', room.id)

  if (playersError) {
    return NextResponse.json({ error: playersError.message }, { status: 500 })
  }

  let assignedTeam: 'Pink' | 'Purple';
  let isAdmin = false;

  if (playerCount === 0) {
    // First player in the room is the admin and goes to Pink team
    assignedTeam = 'Pink';
    isAdmin = true;
  } else {
    // Count players in each team
    const pinkTeamCount = existingPlayers?.filter(p => p.team === 'Pink').length || 0;
    const purpleTeamCount = existingPlayers?.filter(p => p.team === 'Purple').length || 0;

    // Assign to the team with fewer players
    assignedTeam = pinkTeamCount <= purpleTeamCount ? 'Pink' : 'Purple';
    isAdmin = false; // Only the first player is admin
  }

  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert([
      {
        room_id: room.id,
        player_name,
        team: assignedTeam, // Use the newly assigned team
        is_admin: isAdmin,   // Use the newly determined admin status
      },
    ])
    .select()
    .single()

  if (playerError) {
    return NextResponse.json({ error: playerError.message }, { status: 400 })
  }

  return NextResponse.json({ player })
}
// src/app/api/assign-teams/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  const { room_code, room_id } = await request.json() // Added room_id to destructuring

  if (!room_code || !room_id) {
    return NextResponse.json({ error: 'Missing room_code or room_id' }, { status: 400 })
  }

  // 1. Fetch all players in the room who don't have a team assigned
  const { data: playersToAssign, error: fetchError } = await supabase
    .from('players')
    .select('*')
    .eq('room_id', room_id) 
    .is('team', null) // Select players with null team

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  if (!playersToAssign || playersToAssign.length === 0) {
    return NextResponse.json({ message: 'No players to assign teams to.' }, { status: 200 }) // Changed status to 200 for no players to assign
  }

  // 2. Implement team assignment logic
  const updatedPlayers = [];
  let pinkTeamCount = 0;
  let purpleTeamCount = 0;

  // First, assign the admin to Pink if they are among playersToAssign
  const adminPlayer = playersToAssign.find(p => p.is_admin);
  if (adminPlayer) {
    adminPlayer.team = 'Pink';
    updatedPlayers.push(adminPlayer);
    pinkTeamCount++;
  }

  // Assign remaining players alternately
  for (const player of playersToAssign) {
    if (player.is_admin && adminPlayer) continue; // Skip admin if already processed

    let assignedTeam: 'Pink' | 'Purple';
    if (pinkTeamCount <= purpleTeamCount) {
      assignedTeam = 'Pink';
      pinkTeamCount++;
    } else {
      assignedTeam = 'Purple';
      purpleTeamCount++;
    }
    player.team = assignedTeam;
    updatedPlayers.push(player);
  }

  // 3. Update players in Supabase
  const { error: updateError } = await supabase
    .from('players')
    .upsert(updatedPlayers) // Use upsert to update existing players
    .select()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 }) // Changed status to 500 for update error
  }

  // 4. Return the updated list of players (or just a success message)
  // For simplicity, let's return all players in the room after assignment
  const { data: allPlayersInRoom, error: allPlayersError } = await supabase
    .from('players')
    .select('*')
    .eq('room_id', room_id) // Use room_id here

  if (allPlayersError) {
    return NextResponse.json({ error: allPlayersError.message }, { status: 500 }) // Changed status to 500 for all players error
  }

  return NextResponse.json({ players: allPlayersInRoom })
}

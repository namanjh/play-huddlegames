// src/components/TeamDisplay.tsx

'use client'

import React from 'react'
import PlayerCard from './PlayerCard' // Assuming PlayerCard exists
import FrostedContainer from './FrostedContainer' // Assuming FrostedContainer exists

interface Player {
  player_id: string;
  player_name: string;
  is_admin: boolean;
  team: 'Pink' | 'Purple';
  // Add other player properties as needed (e.g., points, turn_indicator)
}

interface TeamDisplayProps {
  teamName: 'Pink' | 'Purple';
  players: Player[];
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ teamName, players }) => {
  const teamColorClass = teamName === 'Pink' ? 'bg-pink-100 border-pink-300' : 'bg-purple-100 border-purple-300';
  const textColorClass = teamName === 'Pink' ? 'text-pink-800' : 'text-purple-800';

  return (
    <FrostedContainer className={`p-4 border-2 ${teamColorClass}`}>
      <h3 className={`text-lg font-bold mb-4 ${textColorClass}`}>
        Team {teamName} ({players.length})
      </h3>
      <div className="max-h-60 overflow-y-auto pr-2"> {/* Max height and scrollability */}
        <div className="flex flex-col gap-3">
          {players.map((player) => (
            <PlayerCard
              key={player.player_id}
              name={player.player_name}
              isAdmin={player.is_admin}
              // Add placeholder props for turn indicator and points
              // turnIndicator={player.is_current_turn}
              // points={player.points}
            />
          ))}
        </div>
      </div>
    </FrostedContainer>
  );
};

export default TeamDisplay;

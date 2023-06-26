import React from 'react';

const PlayerStats = () => {
  const fakePlayerStats = [
    { id: 1, playerName: 'Player A', goals: 10, assists: 5 },
    { id: 2, playerName: 'Player B', goals: 7, assists: 3 },
    { id: 3, playerName: 'Player C', goals: 3, assists: 8 },
  ];

  return (
    <div>
      <h2>Player Stats</h2>
      <ul>
        {fakePlayerStats.map(player => (
          <li key={player.id}>
            <span>{player.playerName}</span> - Goals: {player.goals}, Assists: {player.assists}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerStats;
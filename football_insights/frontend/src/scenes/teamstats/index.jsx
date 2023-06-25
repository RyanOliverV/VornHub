import React from 'react';

const TeamStats = () => {
  const fakeTeamStats = {
    teamName: 'Team A',
    wins: 5,
    losses: 2,
    draws: 3,
    goalsFor: 15,
    goalsAgainst: 8,
  };

  return (
    <div>
      <h2>Team Stats - {fakeTeamStats.teamName}</h2>
      <ul>
        <li>Wins: {fakeTeamStats.wins}</li>
        <li>Losses: {fakeTeamStats.losses}</li>
        <li>Draws: {fakeTeamStats.draws}</li>
        <li>Goals For: {fakeTeamStats.goalsFor}</li>
        <li>Goals Against: {fakeTeamStats.goalsAgainst}</li>
      </ul>
    </div>
  );
};

export default TeamStats;
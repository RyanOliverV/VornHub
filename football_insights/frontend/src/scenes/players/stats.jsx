import React from 'react';

const PlayerStats = () => {
  // Fake player stats data
  const playerStats = {
    name: 'John Doe',
    age: 25,
    goals: 10,
    assists: 5,
    yellowCards: 2,
    redCards: 0,
  };

  return (
    <div>
      <h2>Player Stats</h2>
      <p>Name: {playerStats.name}</p>
      <p>Age: {playerStats.age}</p>
      <p>Goals: {playerStats.goals}</p>
      <p>Assists: {playerStats.assists}</p>
      <p>Yellow Cards: {playerStats.yellowCards}</p>
      <p>Red Cards: {playerStats.redCards}</p>
    </div>
  );
};

export default PlayerStats;
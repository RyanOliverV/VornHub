import React from 'react';

const FixtureDetails = () => {
  // Fake fixture data
  const fixture = {
    id: 1,
    team1: 'Team A',
    team2: 'Team B',
    date: '2023-07-15',
    time: '17:00',
    home_score: 2,
    away_score: 1,
    stadium: 'Stadium XYZ',
    team1_logo: 'https://example.com/teamA.png',
    team2_logo: 'https://example.com/teamB.png',
  };

  return (
    <div>
      <h2>Fixture Details</h2>
      <div>
        <h3>{fixture.team1} vs {fixture.team2}</h3>
        <p>Date: {fixture.date}</p>
        <p>Time: {fixture.time}</p>
        <p>Score: {fixture.home_score} - {fixture.away_score}</p>
        <p>Stadium: {fixture.stadium}</p>
      </div>
    </div>
  );
};

export default FixtureDetails;
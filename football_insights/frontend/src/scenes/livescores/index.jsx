import React from 'react';

const LiveScores = () => {
  const fakeScores = [
    { id: 1, team1: 'Team A', team2: 'Team B', score1: 2, score2: 1 },
    { id: 2, team1: 'Team C', team2: 'Team D', score1: 0, score2: 0 },
    { id: 3, team1: 'Team E', team2: 'Team F', score1: 3, score2: 2 },
  ];

  return (
    <div>
      <h2>Live Scores</h2>
      <ul>
        {fakeScores.map(score => (
          <li key={score.id}>
            <span>{score.team1}</span> <span>{score.score1}</span> -
            <span>{score.score2}</span> <span>{score.team2}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveScores;
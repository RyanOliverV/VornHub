import React from 'react';

const ScorePrediction = () => {
  const fakePrediction = {
    team1: 'Team A',
    team2: 'Team B',
    predictedScore1: 2,
    predictedScore2: 1,
  };

  return (
    <div>
      <h2>Score Prediction</h2>
      <p>{fakePrediction.team1} vs {fakePrediction.team2}</p>
      <p>Predicted Score: {fakePrediction.predictedScore1} - {fakePrediction.predictedScore2}</p>
    </div>
  );
};

export default ScorePrediction;
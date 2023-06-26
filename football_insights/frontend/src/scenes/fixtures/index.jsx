import React from 'react';

const Fixtures = () => {
  const fakeFixtures = [
    { id: 1, team1: 'Team A', team2: 'Team B', date: '2023-07-01' },
    { id: 2, team1: 'Team C', team2: 'Team D', date: '2023-07-02' },
    { id: 3, team1: 'Team E', team2: 'Team F', date: '2023-07-03' },
  ];

  return (
    <div>
      <h2>Fixtures</h2>
      <ul>
        {fakeFixtures.map(fixture => (
          <li key={fixture.id}>
            <span>{fixture.team1}</span> vs <span>{fixture.team2}</span> - Date: {fixture.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fixtures;
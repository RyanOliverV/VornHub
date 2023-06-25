import React from 'react';

const LeagueTable= () => {
  const fakeLeagueTable = [
    { id: 1, teamName: 'Team A', wins: 5, losses: 2, draws: 3, points: 18 },
    { id: 2, teamName: 'Team B', wins: 4, losses: 3, draws: 3, points: 15 },
    { id: 3, teamName: 'Team C', wins: 3, losses: 4, draws: 3, points: 12 },
    { id: 4, teamName: 'Team D', wins: 2, losses: 5, draws: 3, points: 9 },
  ];

  return (
    <div>
      <h2>League Table</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {fakeLeagueTable.map(team => (
            <tr key={team.id}>
              <td>{team.teamName}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.draws}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;